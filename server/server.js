const http = require('http');
const express = require('express');
const cors = require('cors');
const app = express();
const projetSubRoute = require('./Routes/ProjetSubRoute');
const freelanceRoute = require('./Routes/FrelanceRoute')
const freelanceListRoute = require('./Routes/FreelanceListRoute');



app.use(express.json());
app.use(cors());
app.use('/projet', projetSubRoute);
app.use('/freelace', freelanceRoute);
app.use("/freelanceList", freelanceListRoute);

app.listen(5000, ()=>{
    console.log('Server runnig on port 5000')
}); 