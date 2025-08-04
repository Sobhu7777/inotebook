import "./App.css";
import About from "./components/About";
import Alert from "./components/Alert";
import Home from "./components/Home";
import SignUp from "./components/SignUp"
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NoteState from "./components/context/notes/NoteState";
import AlertState from "./components/context/alert/AlertState";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Notes from "./components/Notes";
import { useContext } from "react";
import AuthContext from "./components/context/Authorisation/AuthContext";

function App() {
 const context = useContext(AuthContext)
 const {isAuthenticated}=context
  return (
    <>
      <AlertState> 
      <NoteState> {/*wrapping the NoteState inside the alertState to access the showalert function*/}
      <Router>
        <Navbar />
        <Alert/>
        <div className="container">
        <Routes>
          <Route path="/" element={isAuthenticated?<Home/>:<Navigate to="/login"/>}/> {/*if the user is authenticated then show the Home component else redirect to the login page*/}
          <Route path="/Notes" element={isAuthenticated?<Notes/>:<Navigate to="/login"/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/login" element={isAuthenticated?<Navigate to="/"/>: <Login/>}/> {/*if the user is authenticated then redirect to the home page else show the login page*/}
        </Routes>
        </div>
      </Router>
      </NoteState>
      </AlertState>
    </>
  );
}

export default App;
