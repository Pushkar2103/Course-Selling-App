import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Courses from './components/Courses';
import Course from './components/Course';
import AddCourse from './components/AddCourse';
import './app.css'
import {RecoilRoot, useSetRecoilState} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Router>
      <div>
        <Navbar/>
        <div id='bg'></div>
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
    </RecoilRoot>
  );
}

export default App;