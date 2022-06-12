import { Home, AddGithubLinkedin, AddLinkedin, Navbar, Register, Login, Footer } from './components';
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <div className='pageContent'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add-github-linkedin" element={<AddGithubLinkedin />} />
          <Route path="add-linkedin" element={<AddLinkedin />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
