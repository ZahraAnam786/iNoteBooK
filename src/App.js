import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NoteState from './Context/NoteState';

function App() {
  return (
   <>
   <div>
    <NoteState>
        <Router>
          <Navbar />
          <div  style={{ marginTop: '4rem' }}>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/about" element={<About/>} />
          </Routes>       
          </div>  
          </Router>       
        </NoteState>
      </div>
   </>
  );
}

export default App;
