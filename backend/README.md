
PROJET OPENCLASSROOM P6: so pekocko

INSTALLATION DE BASE

Ce projet utilise NodeJs 10.13.0, Express et MongoDB pour le backend, et Angular CLI 7.0.2 et node-sass 5.0 pour le frontend. Vous devrez avoir Node, npm, Angular et node-sass installés localement sur votre machine.

MISE EN PLACE

Veuillez cloner ce référentiel: ce sera la partie backend de l'application SoPekocko. Pour obtenir la partie frontend, veuillez cloner le référentiel GitHub suivant: https://github.com/OpenClassrooms-Student-Center/dwj-projet6.

ACCÈS À LA BASE DE DONNÉES

Cette application utilise le plugin dotenv pour masquer les données de connexion. Dans ce dossier, vous trouverez un fichier ".env-evaluator", qui vous donnera accès à la base de données mongodb , une fois remplie avec les bonnes valeurs. Pour le faire fonctionner, veuillez changer son nom en ".env". 

Lancez l'application

Vous aurez besoin de deux fenêtres de terminal: une pour le frontend, une pour le backend. Terminal frontal: exécutez "ng serve". Le frontend de l'application est visible sur http: // localhost: 4200 /. Terminal backend: lancez "npm install" (ou "sudo npm install" sur Mac) puis "node server" ou "nodemon server.js". Le serveur doit fonctionner sur localhost avec le port par défaut 3000.