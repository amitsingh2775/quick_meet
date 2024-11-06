import './App.css';
import SignupCard from './components/Singup'; 
import LoginCard from './components/Login';
import Dashboard from './components/Dashboard';
import { Routes, Route } from 'react-router-dom';


function App() {
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<SignupCard />} />
        <Route path="/login" element={<LoginCard />} />
      </Routes>
    </>
  );
}

export default App;
