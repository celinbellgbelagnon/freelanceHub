import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Layout/Navbar/Navbar";
import Footer from "./Components/Layout/Footer/Footer";

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
import ProjetListClient from "./Components/Pages/ProjetListClient/ProjetListClient";
import SavoirPlus from "./Components/Pages/SavoirPlus/SavoirPlus";
import Services from "./Components/Pages/Services/Services";
import Auth from "./Components/Pages/Auth/Auth";
import ProfilUser from "./Components/Pages/ProfilUser/ProfilUser";
import ProtectedRoute from "./Components/Pages/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/bienvenue" element={<Bienvenue />} />
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/enregistrer-projet" element={<ProtectedRoute><EnregistrerProjet /></ProtectedRoute> } />
        <Route path="/projectList" element={<ProtectedRoute><ProjectList /></ProtectedRoute> } />
        <Route path="/projetMap" element={<ProtectedRoute><ProjetMap /></ProtectedRoute> } />
        <Route path="/conditionUtilisation" element={<ProtectedRoute><ConditionsUtilisation /></ProtectedRoute> } />
        <Route path="/politiqueConfidentialite" element={<ProtectedRoute><PolitiqueConfidentialite /></ProtectedRoute> } />
        <Route path="/projetListClient" element={<ProtectedRoute><ProjetListClient /></ProtectedRoute> } />
        <Route path="/optionconnect" element={<ProtectedRoute><OptionConnect /></ProtectedRoute>} />
        <Route path="/savoirPlus" element={<ProtectedRoute><SavoirPlus /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/profiluser" element={<ProtectedRoute><ProfilUser /></ProtectedRoute>} />

        
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
