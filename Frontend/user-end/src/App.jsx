import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;