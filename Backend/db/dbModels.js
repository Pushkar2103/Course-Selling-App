import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number,
    createdBy: String
})

const Course = mongoose.model('Course', courseSchema);

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Admin = mongoose.model('Admin', AdminSchema);

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        default: []
    }]
});

const User = mongoose.model('User', UserSchema);


export {User, Admin, Course};