import express from 'express';
import {User, Course} from '../db/dbModels.js';
import jwt from 'jsonwebtoken';
import { secretKey } from '../env.js';

const router = express.Router();

const authorization = (req, res, next)=> {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            res.sendStatus(403);
        }
        req.user = user;
        next();
        });
    } else {
        res.sendStatus(401);
    }
}

router.post('/signup', async (req, res)=> {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if(user)  res.status(409).json({message:'User with this username already exists!'});
    else {
        const newUser = new User({username: username, password: password});
        try {
            await newUser.save();
        } catch(e) {
            console.log(e);
            res.status(500).json({message: 'Error while creating user'});
        }
        const token = jwt.sign({ username: username}, secretKey, { expiresIn: '1h' });
        res.status(200).json({token:token, message:'User created successfully'});
    }
});

router.post('/login', async (req, res)=> {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if(!user)  res.status(404).json({message:'Wrong username or password!'});
    else {
        if(user.password !== password) res.status(404).json({message:'Wrong username or password!'});
        else {
            const token = jwt.sign({ username: username}, secretKey, { expiresIn: '1h' });
            res.status(200).json({token:token, message:'Logged in successfully'});
        }
    }
});

router.get('/me', authorization, (req, res)=> {
    res.status(200).json({username: req.user.username});
});

router.get('/courses', async (req, res)=> {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    }
    catch(e) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Server error');
    }
});

router.get('/courses/:courseId', authorization, async (req, res) => {
    const username = req.user.username; 
    const courseId = req.params.courseId;

    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const coursePurchased = user.purchasedCourses.some(crs => crs.toString() === courseId);
    let crs = await Course.findById(courseId);

    if (!coursePurchased) {
        return res.status(200).json({course:crs, purchased:false})
    }
    
    res.status(200).json({course:crs, purchased:true})
});

router.put('/course/:courseId', authorization, async (req, res) => {
    const username = req.user.username; 
    const courseId = req.params.courseId;

    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const coursePurchased = user.purchasedCourses.some(crs => crs.toString() === courseId);

    if (!coursePurchased) {
        user.purchasedCourses.push(courseId);
        await user.save(); 
        return res.status(200).json({ message: 'Course added to purchased courses' });
    }

    res.status(200).json({ message: 'Course already purchased' });
});

router.get('/purchasedCourses', authorization, async (req, res)=> {
    const username = req.user.username; 

    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const purchasedCourses = await Promise.all(
        user.purchasedCourses.map((crsId) => Course.findById(crsId))
    );

    res.status(200).json(purchasedCourses);
});

export default router;