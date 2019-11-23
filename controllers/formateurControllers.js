const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const multipart = require('connect-multiparty');
const { mongooose } = require('./../db/config');

const { Formateur } = require('./../models/formateur');
const { Formation } = require('./../models/formation');
var app = express();
app.use(bodyParser.json());

const multipartMiddleware = multipart({ uploadDir: './assets' });

app.post("/connection", (req, res) => {

    var data = req.body;
    let email = data._email;
    let Password = data._pwd;
    console.log(email);
    console.log(Password);


    Formateur.findOne({ email: email }).then((resultat) => {


        if (!resultat) {

            res.status(400).send({ message: "email  incorrect" })
        }


        if (!(Password === resultat.pwd)) {

            res.status(404).send({ message: "mot de passe incorrect" })
        }
        console.log(" Formateur.admin" + resultat.admin);

        let token = jwt.sign({ id: resultat._id, nom: resultat.nom, admin: resultat.admin }, "k").toString();
        res.status(200).send({ token });

    }).catch((err) => {
        console.log("aaaaa");
        res.status(400).send({
            message: "erreur : " + err
        })
    });

});




app.post("/inscription", (req, res) => {
    let data = req.body;

    let privateKey = 10;
    let hashedPassword = bcrypt.hashSync(data._Password, privateKey);

    var ad = new Formateur({
        login: data._login,


        password: hashedPassword
    });

    ad.save().then(() => {

        res.status(200).send(ad);

    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    });

});

app.get('/Lister', (req, res) => {
    Formateur.find().then((formateurs) => {
        if (formateurs) {
            res.status(200).send(formateurs);
        }
        else { console.log("not found" + err.message) }

    })
});

app.post("/ajoutFormateur", multipartMiddleware, (req, res) => {
    let data = JSON.parse(req.body.formateur);
    let image = req.files.image;

    let ext = image.type.split('/')[1];
    let imagePath = "assets/" + data._nom + "." + ext;
    console.log(imagePath);

    fs.renameSync(req.files.image.path, imagePath);
    let im = "http://localhost:3000/" + data._nom + "." + ext;

    let formateur = new Formateur({
        nom: data._nom,
        prenom: data._prenom,
        age: data._age,
        fonction: data._fonction,
        numero_tel: data._numero_tel,
        email: data._email,
        salaire: data._salaire,
        image_formateur: im
    })

    formateur.save().then(() => {
        res.status(200).send(formateur);
    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err

        })
        console.log(err);
    })
});

app.put('/consulterFormateur/:id', (req, res) => {

    let id = req.params.id;

    Formateur.findById({ _id: id }).then((format) => {


        res.status(200).send(format);
    }).catch((e) => {
        res.status(400).send({
            message: "erreur : " + e
        })


    });
})

app.delete('/supprimerFormateur/:email', (req, res) => {

    let email = req.params.email;
    console.log(email);

    Formateur.findOneAndRemove({ email: email },

        (err, doc) => {
            if (!err) {
                res.status(200).send(doc);
                console.log(doc);
            }
            else { console.log('Error in Employee Delete :' + err) }
        });
});




app.post("/ajouterformation", multipartMiddleware, (req, res) => {
    console.log("aaaaaa");
    
    let data = JSON.parse(req.body.formation);
    let image = req.files.image;
    
    let ext = image.type.split('/')[1];
    let imagePath = "assets/" + data._titre + "." + ext;
    console.log(imagePath);

    fs.renameSync(req.files.image.path, imagePath);
    let im = "http://localhost:3000/" + data._titre + "." + ext;

    let formation = new Formation({
        titre: data._titre,
        description: data._description,
        volume_horaire: data._volume_horaire,
        prix: data._prix,
        idFormateur: data._idformateur,
        image_Formation: im

    });

    formation.save().then(() => {

        res.status(200).send(formation);

    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    })
});

app.get('/ListerFormations', (req, res) => {

    Formation.find().then((formations) => {
        if (formations) {
            res.status(200).send(formations);
        }
        else { console.log("not found" + err.message) }

    })

});



module.exports = app;

