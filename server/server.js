const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const projetSubRoute = require('./Routes/ProjetSubRoute');
const freelanceRoute = require('./Routes/FrelanceRoute');
const freelanceListRoute = require('./Routes/FreelanceListRoute');
const adminRoute = require('./Routes/AdminRoute');




app.use(express.json());
app.use(cors());

// Ajoute cette ligne pour servir les fichiers PDF
app.use('/uploads', express.static('uploads'));
app.use('/projet', projetSubRoute);
app.use('/freelace', freelanceRoute);
app.use("/freelanceList", freelanceListRoute);
app.use("/admin", adminRoute);

app.listen(5000, ()=>{
    console.log('Server runnig on port 5000')
});