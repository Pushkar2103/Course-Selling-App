import express from 'express';
import {Admin, Course} from '../db/dbModels.js';
import jwt from 'jsonwebtoken';
import { secretKey } from '../env.js';

const router = express.Router();

const authorization = (req, res, next)=> {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, admin) => {
        if (err) {
            res.sendStatus(403);
        }
        req.admin = admin;
        next();
        });
    } else {
        res.sendStatus(401);
    }
}

router.post('/signup', async (req, res)=> {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username: username});
    if(admin)  res.status(409).json({message:'Admin with this username already exists!'});
    else {
        const newAdmin = new Admin({username: username, password: password});
        try {
            await newAdmin.save();
        } catch(e) {
            console.log(e);
        }
        const token = jwt.sign({ username: username}, secretKey, { expiresIn: '1h' });
        res.status(200).json({token:token, message:'Admin created successfully'});
    }
});

router.post('/login', async (req, res)=> {
    const {username, password} = req.body;
    const admin = await Admin.findOne({username: username});
    if(!admin)  res.status(404).json({message:'Wrong username or password!'});
    else {
        if(admin.password !== password) res.status(404).json({message:'Wrong username or password!'});
        else {
            const token = jwt.sign({ username: username}, secretKey, { expiresIn: '1h' });
            res.status(200).json({token:token, message:'Logged in successfully'});
        }
    }
});

router.get('/me', authorization, (req, res)=> {
    try {
        res.status(200).json({username: req.admin.username});
    }
    catch(e) {
        res.status(403);
    }
});

router.get('/courses', authorization, async (req, res)=> {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    }
    catch(e) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Server error');
    }
});

router.post('/create-course', authorization, async (req, res)=> {
    const {title, description, imageLink, price} = req.body;
    const adm = await Admin.findOne({username: req.admin.username});

    const newCrs = new Course({
        title: title, 
        description: description, 
        imageLink: imageLink, 
        price: price,
        createdBy: adm.username});
    newCrs.save().then(()=> {
        res.status(200).json({message:'Course created successfully'});
    }).catch((e)=> {
        console.log(e);
        res.status(500).json({message:'Error while creating course'});
    })
});

router.get('/courses/:courseId', authorization, async (req, res) => {
    const courseId = req.params.courseId;
    const findCrs = await Course.findById(courseId);

    if (!findCrs) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(findCrs);
});

router.put('/update-course/:courseId', authorization, async (req, res)=> {
    const courseId = req.params.courseId;
    const {title, createdBy, description, imageLink, price} = req.body;

    try {
        const result = await Course.findByIdAndUpdate(courseId, {title, description, createdBy, imageLink, price}, {
          new: true, 
          runValidators: true, 
        });
    
        if (!result) {
          return res.status(404).json({ message: 'Course not found' });
        }

    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

    res.status(200).json({message:'Course updated successfully'});
});


router.delete('/delete-course/:courseId', authorization, async(req, res) => {
    const courseId = req.params.courseId;

    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


export default router;