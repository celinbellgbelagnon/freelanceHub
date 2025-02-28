import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./Components/Layout/Navbar/Navbar";
import Home from "./Components/Pages/Home/Home";
import Contacts from "./Components/Pages/Contacts/Contacts";
import OptionConnect from "./Components/Pages/OptionConnect/OptionConnect";
import Login from "./Components/Pages/Login/Login";
import Signup from "./Components/Pages/Signup/Signup";
import Bienvenue from "./Components/Pages/Bienvenue/Bienvenue";
import EnregistrerProjet from "./Components/Pages/ProjetRegister/ProjetRegister";
import ProjectList from "./Components/Pages/ProjetList/ProjectList";
import ProjetMap from "./Components/Pages/ProjetMap/ProjetMap";
import ConditionsUtilisation from "./Components/Pages/UserCondition/UserCondition";
import PolitiqueConfidentialite from "./Components/Pages/ConfidentialPolitic/ConfidentialPolitic";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home/>} />
          <Route path="/contacts" element={<Contacts/>} />
          <Route path="/bienvenue" element={<Bienvenue/>} />
          <Route path="/enregistrer-projet" element={<EnregistrerProjet/>} /> 
          <Route path="/projectList" element={<ProjectList/>} />
          <Route path="/projetMap" element={<ProjetMap/>} />
          <Route path="/conditionUtilisation" element={<ConditionsUtilisation/>} />
          <Route path="/politiqueConfidentialite" element={<PolitiqueConfidentialite/>} />
        </Route>
        <Route path="/optionconnect" element={<OptionConnect/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
