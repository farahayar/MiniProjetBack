const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const multipart = require('connect-multiparty');
const { mongooose } = require('./../db/config');

const { Formateur } = require('./../models/Formateur');
const { Formation } = require('./../models/formation');
const { User } = require('./../models/user');
const { Groupe } = require('./../models/groupe');
const { Formalabeur } = require('./../models/formalabeur');
var app = express();
app.use(bodyParser.json());

const multipartMiddleware = multipart({ uploadDir: './assets' });





app.get("/fini/:cin", (req, res) => {
    let formations =[];
    Formalabeur.find({cin: req.params.cin},(err,f)=>{
        let c=f.cin;
    Groupe.find({c},(err, formalabeur) => {
            let idfor =formalabeur.idFormation;
            Formation.find({idfor},(err,formation) => {
                formation.forEach(element => {
                    if(element.duree <(new Date()-new Date(element.date))) 
                    formations.push(element);
                        console.log(new Date("12/09/2019")-new Date(element.date));
                    });
                    res.send(formations);  
            });
    }).catch((e) => {
        res.status(400).send({
            message: "erreur : " + e
        })
});
});
});

app.post("/inscriptionformation/:id", (req, res) => {
    let data = req.body;
    let idf = req.params.id;
    console.log("indc" + data._nom);
    console.log("idfor" + idf);

    let user = new User({
        nom: data._nom,
        prenom: data._prenom,
        age: data._age,
        tel: data._tel,
        email: data._email,
        cin: data._cin,
        lienfb: data._lienfb
    })

    user.save().then((us) => {
        console.log("babababab");
        console.log("iduser" + us._id);


        let groupe = new Groupe({
            idFormation: idf,
            cin: us.cin
        })
        groupe.save().then((gr) => {
            console.log("groupe" + gr);

        }).catch((err) => {
            res.status(400).send({
                message: "erreur : " + err
            })
        });
        res.status(200).send(us);
        console.log("user" + user);


    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    });
});

app.post("/ajoutFormalabeur", multipartMiddleware, (req, res) => {
    let data = JSON.parse(req.body.formalabeur);
    let image = req.files.image;

    let privateKey = 10;
    let hashedPassword = bcrypt.hashSync(data._pwd, privateKey);

    let ext = image.type.split('/')[1];
    let imagePath = "assets/" + data._nom + "." + ext;
    console.log(imagePath);

    fs.renameSync(req.files.image.path, imagePath);
    let im = "http://localhost:3000/" + data._nom + "." + ext;

    let formalabeur = new Formalabeur({
        nom: data._nom,
        prenom: data._prenom,
        age: data._age,
        tel: data._tel,
        email: data._email,
        cin: data._cin,
        lienfb: data._lienfb,
        pwd: hashedPassword,
        img: im
    })

    formalabeur.save().then(() => {
        res.status(200).send(formalabeur);
    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err

        })
        console.log(err);
    })
})
/*
app.get("/getAllUsers/:titre", (req, res) => {
    console.log("aaaaaa");

    let titre = req.params.titre;
    var us = [{}];
    Formation.findOne({ titre: titre }).then((form) => {
        console.log("form :" + form);

        Groupe.find({ idFormation: form._id }).then((grs) => {
            for (let i = 0; i < grs.length; i++) {
                gr = grs[i];
                console.log("gr" + gr);

                User.findOne({
                    cin: gr.cin
                }).then((users) => {
                    us.push(users);
                    console.log("usI" + us[i+1]);

                    console.log("users " + users);

                    if (users.length == 0) { res.status(400).send({ message: "aucun users pour cet utilisateur" }) };

                })
            }
            res.status(200).send(us);
            for (let i = 0; i < us.length; i++) {

                console.log("us" + us[i].nom);

            }

           
        }).catch((err) => { res.status(400).send("errr"); })


    })
})

*/


app.get("/getAllUsers", (req, res) => {

    Formalabeur.find().then((formalabeur) => {
        if (formalabeur)
            res.status(200).send(formalabeur);
    }).catch((e) => {
        res.status(400).send({
            message: "erreur : " + e
        })
    })
})

module.exports = app;

