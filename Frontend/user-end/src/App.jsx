import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Courses from './components/Courses';
import Course from './components/Course';
import MyCourses from './components/MyCourses'

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<SignIn/>} />
          <Route path='/courses' element={<Courses/>} />
          <Route path='/courses/:courseId' element={<Course/>} />
          <Route path='/myCourses' element={<MyCourses/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;