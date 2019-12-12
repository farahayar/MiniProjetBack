const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const multipart = require('connect-multiparty');

const { mongoose } = require('./../db/config');
const { Formateur } = require('./../models/Formateur');
const { Formation } = require('./../models/formation');
const { User } = require('./../models/user');
const { Groupe } = require('./../models/groupe');
const { Formalabeur } = require('./../models/formalabeur');

var app = express();
app.use(bodyParser.json());

const multipartMiddleware = multipart({ uploadDir: './assets' });

// Afficher les formations d'un formateur

app.get("/formationformateur/:id", (req, res) => {

    Formation.find({ idformateur: req.params.id},(err, data) => {
            if (!err) {
                res.send(data);
            }
            else { console.log('Formateur introuvable :' + err) }
        });

});

// Afficher Les formations d'un formalabeur

app.get("/formalabeurformation/:id", (req, res) => {
    let idfor = [];
    Formalabeur.find({cin: req.params.id},(err,f)=>{
    if(!err)
    {
        Groupe.find({cin:req.params.id},(err, formalabeur) => {
 
            formalabeur.forEach(element => {
                idfor.push(element.idFormation);
            });
            
            Formation.find({_id:idfor},(err,formation) => {
                res.send(formation);
            });
        });
    }
    else
        console.log("formateur introuvable");
    });
});

// Afficher les formation encour du formalabeur
 
app.get("/encour/:cin", (req, res) => {
    let idfor = [];
    let formations=[];
    Formalabeur.find({cin: req.params.cin},(err,f)=>{
    if(!err)
    {
        Groupe.find({cin:req.params.cin},(err, formalabeur) => {
 
            formalabeur.forEach(element => {
                idfor.push(element.idFormation);
            });
            
            Formation.find({_id:idfor},(err,formation) => {
                formation.forEach(element => {
                    if(new Date()>new Date(element.date))
                    {
                        if((element.duree*3600000)>(new Date()-new Date(element.date))) 
                            formations.push(element);
                        console.log((element.duree*3600000)+" et "+(new Date()-new Date(element.date)));
                    }
                    });
                    res.send(formations);
            });
        });
    }
    else
        console.log("formateur introuvable");
    });

});

// Afficher les formation fini du formalabeur

app.get("/fini/:cin", (req, res) => {
    let idfor = [];
    let formations=[];
    Formalabeur.find({cin: req.params.cin},(err,f)=>{
    if(!err)
    {
        Groupe.find({cin:req.params.cin},(err, formalabeur) => {
 
            formalabeur.forEach(element => {
                idfor.push(element.idFormation);
            });
            
            Formation.find({_id:idfor},(err,formation) => {
                formation.forEach(element => {
                    if(new Date()>new Date(element.date))
                    {
                        if((element.duree*3600000) <(new Date()-new Date(element.date))) 
                            formations.push(element);
                        console.log((element.duree*3600000)+" et "+(new Date()-new Date(element.date)));
                    }
                });
            res.send(formations);
            });
        });
    }
    else
        console.log("formateur introuvable");
    });

});


/**************************************************************************************************************************** */


app.delete('/deleteFormateur/:id', (req, res) => {

    Formateur.findOneAndRemove(
        {
            _id: req.params.id,
        },

        (err, doc) => {
            if (!err) {
                res.status(200).send(doc);
                console.log(doc);
            }
            else { console.log('Error in Formateur Delete :' + err) }
        });
});


app.delete('/supprimerFormation/:id', (req, res) => {

    let id = req.params.id;

    Formation.findOneAndRemove(
        {
            _id:id,
        },

        (err, doc) => {
            if (!err) {
                res.status(200).send(doc);
                console.log(doc);
            }
            else { console.log('Error in Formation Delete :' + err) }
        });
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