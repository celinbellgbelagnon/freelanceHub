import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import styles from "./ProjetMap.module.css";
import L from "leaflet";

// Icône personnalisée pour les marqueurs
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ProjetMap = () => {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/projets")
      .then(response => {
        setProjets(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des projets:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.mapContainer}>
      <h2 className={styles.title}>Carte des Projets Soumis</h2>
      {loading ? (
        <p className={styles.loading}>Chargement des projets...</p>
      ) : (
        <MapContainer center={[48.8566, 2.3522]} zoom={5} className={styles.map}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {projets.map((projet, index) => (
            <Marker
              key={index}
              position={[projet.latitude, projet.longitude]}
              icon={customIcon}
            >
              <Popup>
                <h3>{projet.titreProjet}</h3>
                <p><strong>Client :</strong> {projet.clientNom}</p>
                <p><strong>Description :</strong> {projet.descriptionProjet}</p>
                <p><strong>Budget :</strong> {projet.budget} €</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default ProjetMap;
