import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Courses from './components/Courses';
import Course from './components/Course';
import AddCourse from './components/AddCourse';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/admin/' element={<LandingPage/>} />
          <Route path='/admin/signup' element={<SignUp/>} />
          <Route path='/admin/login' element={<SignIn/>} />
          <Route path='/admin/courses' element={<Courses/>} />
          <Route path='/admin/courses/:courseId' element={<Course/>} />
          <Route path='/admin/addCourse' element={<AddCourse/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;