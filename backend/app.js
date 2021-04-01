const express = require('express');//Importation du package express (frameworks pour faciliter l'usage de Node js)
const bodyParser = require('body-parser');//Importation du package bodyparser, pour rendre les données du corps de tous types de requêtes exploitable
const mongoose = require('mongoose');//Importation du package mongoose, pour l'accès à la base de données et à ses fonctionnalités pour un site dynamique
const path = require('path');//Importation pour accéder au path du server

const sauceRoutes = require('./routes/sauce');//Importation des routers pour les requêtes sauce/user
const userRoutes = require('./routes/user');//Importation des routers pour les requêtes sauce/user




////////////////////////////////////////////////////////////////////
/*Importation des packages de sécurité pour être aux normes OWASP*/




//Package helmet (13 middleware pour sécuriser les données et les connexions)
const helmet = require("helmet");
//Package hpp (to protect your system from HTTP parameter pollution attacks)
const hpp = require("hpp");
//Middleware limiter.js contre le "brute force" 
const limiter = require("./middleware/limiter");
//Middleware toobusy.js pour empêcher le Denial of Service (DoS) en monitorant le event loop
const toobusy = require("./middleware/toobusy");
//Middleware session.js pour sécuriser les cookies de session
//Package express-session, pour définir les flags des cookies (contre attaques XSS et CSRF)
const session = require("./middleware/session");
//Package mongo-express-sanitize : validation des données, enlève les données qui commencent par $, qui peuvent être utilisées par des hackers
const mongoSanitize = require("express-mongo-sanitize");
//////////////////////////////////////////////////////////////////////




//Connexion à la base de données avec Mongoose.connect et dotenv
require('dotenv').config();//Plugin dotenv (masquage des données de connextion à la DBbase via un fichier dotenv et une création de variables pour le nom du user et le password)

mongoose.connect('mongodb+srv://'+process.env.LOGIN+':'+process.env.PASSWORD+"@"+process.env.URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));



//////////////////////////////////////////////////////////////////////
const app = express();//Déclaration de notre appli comme fonctionnant avec express (et donc Node)




//////////////////////////////////////////////////////////////////////
//Ajout des headers aux réponses pour permettre le CORS 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});





///////////////////////////////////////////////////////////////////////
/*SECURITE : lancement des middlewares et plugins de sécurité*/
app.use(helmet());
app.use(hpp());
app.use("/api/auth", limiter);/*SECURITE : juste sur l authentification*/
app.use(toobusy);
app.use(session);
app.use(mongoSanitize());



//////////////////////////////////////////////////////////////////////////
app.use(express.json());//Mise à un format exploitable du body des requêtes


//Définit les route des deux routeurs "Sauce"/"User" ainsi que pour les images téléchargées
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);


module.exports = app;//Exportation de l'appli vers server.js 
