const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const multipart = require('connect-multiparty');
const { mongooose } = require('./../db/config'); 



//************ */
/************** */
require('dotenv').config();
const nodemailer = require ('nodemailer');
const Email = require('email-templates');
/****************/ 

const { Formateur } = require('./../models/formateur');
const { Formation } = require('./../models/formation');

/*user:sprint 3 */
const { User } = require('./../models/user');
/***********/ 


var app = express();
app.use(bodyParser.json());

const multipartMiddleware = multipart({ uploadDir: './assets' });



/*
app.get("/Allformalabeurs", (req, res) => {
    Formalabeur.find().then((forma) => {
  console.log("aaaaaaaaaaaa"+forma.length);
  var fe = [];

  /*
  for (let i = 0; i < forma.length; i++) {
      fe = forma[i].email;

      console.log("gr" + fe);}
      */
     /*
     forma.forEach(element=>{
         fe.push(element.email);
     }
        )

          res.status(200).send(fe);
          console.log("length + "+fe.length);
          

})
});
*/


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

   // fs.renameSync(req.files.image.path, imagePath);
    let im = "http://localhost:3000/" + data._nom + "." + ext;

    let formateur = new Formateur({
        nom: data._nom,
        prenom: data._prenom,
        age: data._age,
        fonction: data._fonction,
        numero_tel: data._numero_tel,
        email: data._email,
        salaire: data._salaire,
        pwd :data._pwd,
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


/*

app.post("/ajouterformation", multipartMiddleware, (req, res) => {

    let data = JSON.parse(req.body.formation);
    let image = req.files.image;

    let ext = image.type.split('/')[1];
    let imagePath = "assets/" + data._titre + "." + ext;
    console.log(imagePath);

    //fs.renameSync(req.files.image.path, imagePath);
    let im = "http://localhost:4200/" + data._titre + "." + ext;

    console.log("nom" + data._idformateur);

    Formateur.findOne({ nom: data._idformateur }).then((f) => {
        console.log("f" + f._id);
        let fort = new Formation({
            titre: data._titre,
            description: data._description,
            volume_horaire: data._volume_horaire,
            prix: data._prix,
            idformateur: f._id,
            image_Formation: im

        });
        console.log("formation:"+fort);
        fort.save().then((forma) => {
        console.log("form" + forma);
            /**********  EMAIL  ******* */
                    /*********** */
      // const mail=" <p> you have registered in our formation dear ${us._nom</p>  "
      /*
      const output = ` <h1 color='red' align="center">Formalab </h1> <br>
                <br> <p align="center"> WE HAVE A NEW FORMATION </span>  </p>
                <p align="center"> titre:${fort.titre}  </p>
                <p align="center"> description : ${fort.description} </p>
                <p align="center"> prix  : ${fort.prix}  </p>
                `;
        let transporter = nodemailer.createTransport({  
            service : 'gmail',
            auth: {
                user : 'formalab7@gmail.com',
                pass : 'azerty-123'
                 }
            });
            let mailoptions={
                from : 'formalab7@gmail.com',
               // to:,
                subject: 'FORMALAB NEW FORMATION' , 
                html :output
             };
        /***********/
            /******* */
            /*

            transporter.sendMail(mailoptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                else {
                    console.log("email sent");
                }
                });
            /*********/ 
            /*************** */
            /*
            res.status(200).send(forma);

        }).catch((err) => {
            res.status(400).send({
                message: "erreur : " + err
            })
        })

    }).catch((e) => {
        res.status(400).send({
            message: "erreur : " + e
        })


    });
});

*/

app.post("/ajouterformation", multipartMiddleware, (req, res) => {
   // let data = JSON.parse(req.body.formation);
    let image = req.files.image;
    var j = [];
   
   console.log("hhhh"+j);
   
    //let ext = image.type.split('/')[1];
    //let imagePath = "assets/" + data._titre + "." + ext;
    //console.log(imagePath);

    //fs.renameSync(req.files.image.path, imagePath);
  // let im = "http://localhost:3000/" + data._titre + "." + ext;
   //console.log(im);

    var fe = [];

    //console.log("nom" + data._idformateur);

    Formateur.findOne({ nom: data._idformateur }).then((f) => {
        console.log("f" + f._id);


        let formation = new Formation({
            titre: data._titre,
            description: data._description,
            volume_horaire: data._volume_horaire,
            prix: data._prix,
            idformateur: f._id,
           // image_Formation: im

        });
        console.log("formation"+formation);
        

        formation.save().then((rese) => {
          console.log("rese"+rese);
          
            rese.status(200).send(rese);
           
                Formalabeur.find().then((forma) => {
                    console.log("aaaaaaaaaaaa"+forma.length);
                    
                    for (let i = 0; i < forma.length; i++) {
                        fe = forma[i].email;
            
                        console.log("gr" + fe);}
        
                   
            
                })
            
           
            console.log("form" + formation);
            console.log("forml" + fe);

            /**********  EMAIL  ******* */
                    /*********** */
      // const mail=" <p> you have registered in our formation dear ${us._nom</p>  "
     /*const output = ` <h1 color='red' align="center">Formalab </h1> <br>
      <br> <p align="center"> WE HAVE A NEW FORMATION </span>  </p>
      <p align="center"> titre:${formation.titre}  </p>
      <p align="center"> description : ${formation.description} </p>
      <p align="center"> prix  : ${formation.prix}  </p>
      <p align="center"> Don't hesitate to join us.</p>
      `;
let transporter = nodemailer.createTransport({  
  service : 'gmail',
  auth: {
      user : 'formalab7@gmail.com',
      pass : 'azerty-123'
       }
  });
  //for(var i=0;i<fe.length;i++)
 // {
      console.log("fee"+fe[i]);
      
  var mailoptions={
      from : 'formalab7@gmail.com',
      to: 'gramiamal7@gmail.com',
      subject: 'FORMALAB NEW FORMATION' , 
      html :output
  // };
}
/***********/
  /******* /
  transporter.sendMail(mailoptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      else {
          console.log("email sent");
      }
      });
  /*********/ 
  /*************** */

         

        }).catch((err) => {
            res.status(400).send({
                message: "erreur aaaaaaaa: " + err
            })
        })

    }).catch((e) => {
        res.status(400).send({
            message: "erreur bbbb: " + e
        })


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

app.put('/consulterFormateur/:id', (req, res) => {

    let id = req.params.id;

    Formation.findById({ _id: id }).then((format) => {


        res.status(200).send(format);
    }).catch((e) => {
        res.status(400).send({
            message: "erreur : " + e
        })


    });
})

app.delete('/supprimerFormation/:id', (req, res) => {

    let id = req.params.id;
    console.log("id=" + id);

    Formation.findOneAndRemove(
        {
            titre: id,
        },

        (err, doc) => {
            if (!err) {
                res.status(200).send(doc);
                console.log(doc);
            }
            else { console.log('Error in Formation Delete :' + err) }
        });
});

app.get('/getImageFormateur/:id', (req, res) => {

    let id = req.params.id;
    Formateur.findById({ _id: id }, (err, doc) => {
        if (!err) {
            res.status(200).send(doc);
            console.log(doc);
        }
        else { console.log('Error :' + err) }
    })

});

/*
app.put("/ModifierFormateurAdmin/:id", (req, res) => {
    
    
    let data = req.body;
    let token = req.headers.authorization;
    let i = jwt.verify(token, 'TokenModif'); 
    Formation.findByIdAndUpdate({
        _id: req.params.id


});
*/








/***************************sprint 3****************************/


app.get('/ListerUsers', (req, res) => {

    User.find().then((users) => {
        if (users) {
            res.status(200).send(users);
        }
        else { console.log("not found" + err.message) }

    })

});

app.delete('/supprimerUser/:email', (req, res) => {

    let email = req.params.email;
    

    User.findOneAndRemove({ email: email },

        (err, doc) => {
            if (!err) {
                res.status(200).send(doc);
                console.log(doc);
            }
            else { console.log('Error in Users Delete :' + err) }
        });
});


app.put('/consulterInscription/:id', (req, res) => {

    let id = req.params.id;

    User.findById({ _id: id }).then((us) => {


        res.status(200).send(us);
    }).catch((e) => {
        res.status(400).send({
            message: "erreur :" + e
        })


    });
})




/*******************************************************/

module.exports = app;

