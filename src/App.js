import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <h1 className="text-center">iNotebook-Notes on cloud</h1>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<SignUp/>} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
