import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Homepage'
import SignUp from './pages/Signup';
import DashBoard from './pages/dashboard';
import Customized from './pages/CustomizedProfile'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} exact />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/CustomizedProfile" element={<Customized />} />
        
      </Routes>
    </Router>
  );
};

export default App;
