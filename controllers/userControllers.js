const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const multipart = require('connect-multiparty');
const { mongooose } = require('./../db/config');

const { Formateur } = require('./../models/formateur');
const { Formation } = require('./../models/formation');
const { User } = require('./../models/user');
const { Groupe } = require('./../models/groupe');
const { Formalabeur } = require('./../models/formalabeur');
var app = express();
app.use(bodyParser.json());

const multipartMiddleware = multipart({ uploadDir: './assets' });



/**************sprint 4******************/
require('dotenv').config();
const nodemailer = require ('nodemailer');
/*************/




/********** ignore those **************/
//const Email = require('email-templates');
/*
app.get('/ListerFormalabeur', (req, res) => {
    var f = [];
    Formalabeur.find().then((forma) => {
        console.log(forma.length);
        
        for (let i = 0; i < forma.length; i++) {
            f = forma[i].email;}


        if (forma) {
            res.status(200).send(f);
        }
        else { console.log("not found" + err.message) }

    })

});

app.get("/getAllFormalabeursEmails", (req, res) => {

    Formalabeur.find().then((form) => {
        console.log(form.email);
      /*  
        if (form)
        {
          // let mail= formalabeur.email;
             console.log(form);
            let f= form.email;
            console.log(f);
               
            res.status(200).send(f);
        }
    }).catch((e) => {
        res.status(400).send({
            message: "erreur : " + e
        })
    })*//*
})
})

app.get('/consulterFormationTitre/:id', (req, res) => {
    let id = req.params.id;
    Formation.findById({_id: id }).then((format) => {
        res.status(200).send(format.titre);
        console.log(res);
    }).catch((e) => {
        res.status(400).send({
            message: "erreur : " + e
        })
    });
})

/****************/ 


app.post("/inscriptionformation/:id",(req, res) => {
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
          /***ignore *****/
    /*
    let fe = [];
    Formalabeur.find().then((f) => {
        console.log("lenththth:"+f.length);
        /*
        f.forEach(element=>{
            fe.push(element.email);
        }
        */
       /*
       for (let i = 0; i < f.length; i++) {
        fe = f[i].email;
  
        console.log("gr" + fe);}
    
           
    })*/
 //   console.log("length"+fe.length);
/*
    for(var i=0;i<fe.length;i++){
    console.log("email"+fe[i]);} */


       
       /***ignore *****/
        //var titre = format.titre;
        //var desc = format.description;
       // console.log("titre " +titre);
        
   /*************** */
        
   Formation.findOne({_id: idf}).then((format) => {
      user.save().then((us) => {
        console.log("babababab");
        console.log("iduser" + us._id);
              let groupe = new Groupe({
            idFormation: idf,
            cin: us.cin
        })
        groupe.save().then( (gr) => {
            console.log("groupe" + gr);
             
         /*****ignore*******/   
      // const mail=" <p> you have registered in our formation dear ${us._nom</p>  "
     /* const output = ` <h1 color='red' align="center">Formalab </h1> <br>
                <br> <p align="center"> welcome <span color='grey'> ${user.prenom}</span>  </p>
                <p align="center"> you just made the right the choice, </p>
                <p align="center"> you have registered in our formation  </p>
                `;
                //console.log(); */


                /**************************************ESSAYYY ************************************* /
let fe = [];
Formalabeur.find().then((f) => {
    console.log("lenththth:"+f.length);

   for (let i = 0; i < f.length; i++) {
    fe = f[i].email;

    let mailoptions={
        from : 'formalab7@gmail.com',
        to: fe,
        subject: 'Formation Register' , 
        html :message
        
     };
     transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log("email sent");
        }
        });
}     
})
/****/
/***************************** EMAIL INSCRI FORMATION : SPRINT  4 **************************************** */
        
        const message=`
        <!DOCTYPE html>
        <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta charset="utf-8"> <!-- utf-8 works for most cases -->
            <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
            <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
            <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->
        
            <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
        
            <!-- CSS Reset : BEGIN -->
        <style>
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            background: #f1f1f1;
        }
        /* What it does: Stops email clients resizing small text. */
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }
        /* What it does: Centers email on Android 4.4 */
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }
        /* What it does: Stops Outlook from adding extra spacing to tables. */
        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }
        /* What it does: Fixes webkit padding issue. */
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }
        /* What it does: Uses a better rendering method when resizing images in IE. */
        img {
            -ms-interpolation-mode:bicubic;
        }
        /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
        a {
            text-decoration: none;
        }
        /* What it does: A work-around for email clients meddling in triggered links. */
        *[x-apple-data-detectors],  /* iOS */
        .unstyle-auto-detected-links *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }
        /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
        .a6S {
            display: none !important;
            opacity: 0.01 !important;
        }
        /* What it does: Prevents Gmail from changing the text color in conversation threads. */
        .im {
            color: inherit !important;
        }
        /* If the above doesn't work, add a .g-img class to any image in question. */
        img.g-img + div {
            display: none !important;
        }
        /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
        /* Create one of these media queries for each additional viewport size you'd like to fix */
        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            u ~ div .email-container {
                min-width: 320px !important;
            }
        }
        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            u ~ div .email-container {
                min-width: 375px !important;
            }
        }
        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            u ~ div .email-container {
                min-width: 414px !important;
            }
        }
        </style>
        
        <!-- CSS Reset : END -->
        
        <!-- Progressive Enhancements : BEGIN -->
        <style>
          .primary{
            background: #0d0cb5;
        }
        .bg_white{
            background: #ffffff;
        }
        .bg_light{
            background: #fafafa;
        }
        .bg_black{
            background: #000000;
        }
        .bg_dark{
            background: rgba(0,0,0,.8);
        }
        .email-section{
            padding:2.5em;
        }
        /*BUTTON*/
        .btn{
            padding: 5px 15px;
            display: inline-block;
        }
        .btn.btn-primary{
            border-radius: 5px;
            background: #0d0cb5;
            color: #ffffff;
        }
        .btn.btn-white{
            border-radius: 5px;
            background: #ffffff;
            color: #000000;
        }
        .btn.btn-white-outline{
            border-radius: 5px;
            background: transparent;
            border: 1px solid #fff;
            color: #fff;
        }
        h1,h2,h3,h4,h5,h6{
            font-family: 'Poppins', sans-serif;
            color: #000000;
            margin-top: 0;
        }
        body{
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            font-size: 15px;
            line-height: 1.8;
            color: rgba(0,0,0,.4);
        }
        a{
            color: #0d0cb5;
        }
        table{
        }
        /*LOGO*/
        .logo h1{
            margin: 0;
        }
        .logo h1 a{
            color: #000000;
            font-size: 20px;
            font-weight: 700;
            text-transform: uppercase;
            font-family: 'Poppins', sans-serif;
        }
        .navigation{
            padding: 0;
        }
        .navigation li{
            list-style: none;
            display: inline-block;;
            margin-left: 5px;
            font-size: 13px;
            font-weight: 500;
        }
        .navigation li a{
            color: rgba(0,0,0,.4);
        }
        /*HERO*/
        .hero{
            position: relative;
            z-index: 0;
        }
        .hero .overlay{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            content: '';
            width: 100%;
            background: #000000;
            z-index: -1;
            opacity: .3;
        }
        .hero .icon{
        }
        .hero .icon a{
            display: block;
            width: 60px;
            margin: 0 auto;
        }
        .hero .text{
            color: rgba(255,255,255,.8);
        }
        .hero .text h2{
            color: #ffffff;
            font-size: 30px;
            margin-bottom: 0;
        }
        /*HEADING SECTION*/
        .heading-section{
        }
        .heading-section h2{
            color: #000000;
            font-size: 20px;
            margin-top: 0;
            line-height: 1.4;
            font-weight: 700;
            text-transform: uppercase;
        }
        .heading-section .subheading{
            margin-bottom: 20px !important;
            display: inline-block;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: rgba(0,0,0,.4);
            position: relative;
        }
        .heading-section .subheading::after{
            position: absolute;
            left: 0;
            right: 0;
            bottom: -10px;
            content: '';
            width: 100%;
            height: 2px;
            background: #0d0cb5;
            margin: 0 auto;
        }
        .heading-section-white{
            color: rgba(255,255,255,.8);
        }
        .heading-section-white h2{
            font-family: 
            line-height: 1;
            padding-bottom: 0;
        }
        .heading-section-white h2{
            color: #ffffff;
        }
        .heading-section-white .subheading{
            margin-bottom: 0;
            display: inline-block;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: rgba(255,255,255,.4);
        }
        .icon{
            text-align: center;
        }
        .icon img{
        }
        /*SERVICES*/
        .services{
            background: rgba(0,0,0,.03);
        }
        .text-services{
            padding: 10px 10px 0; 
            text-align: center;
        }
        .text-services h3{
            font-size: 16px;
            font-weight: 600;
        }
        .services-list{
            padding: 0;
            margin: 0 0 20px 0;
            width: 100%;
            float: left;
        }
        .services-list img{
            float: left;
        }
        .services-list .text{
            width: calc(100% - 60px);
            float: right;
        }
        .services-list h3{
            margin-top: 0;
            margin-bottom: 0;
        }
        .services-list p{
            margin: 0;
        }
        /*BLOG*/
        .text-services .meta{
            text-transform: uppercase;
            font-size: 14px;
        }
        /*TESTIMONY*/
        .text-testimony .name{
            margin: 0;
        }
        .text-testimony .position{
            color: rgba(0,0,0,.3);
        }
        /*VIDEO*/
        .img{
            width: 100%;
            height: auto;
            position: relative;
        }
        .img .icon{
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            bottom: 0;
            margin-top: -25px;
        }
        .img .icon a{
            display: block;
            width: 60px;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -25px;
        }
        /*COUNTER*/
        .counter{
            width: 100%;
            position: relative;
            z-index: 0;
        }
        .counter .overlay{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            content: '';
            width: 100%;
            background: #000000;
            z-index: -1;
            opacity: .3;
        }
        .counter-text{
            text-align: center;
        }
        .counter-text .num{
            display: block;
            color: #ffffff;
            font-size: 34px;
            font-weight: 700;
        }
        .counter-text .name{
            display: block;
            color: rgba(255,255,255,.9);
            font-size: 13px;
        }
        /*FOOTER*/
        .footer{
            color: rgba(255,255,255,.5);
        }
        .footer .heading{
            color: #ffffff;
            font-size: 20px;
        }
        .footer ul{
            margin: 0;
            padding: 0;
        }
        .footer ul li{
            list-style: none;
            margin-bottom: 10px;
        }
        .footer ul li a{
            color: rgba(255,255,255,1);
        }
        @media screen and (max-width: 500px) {
            .icon{
                text-align: left;
            }
            .text-services{
                padding-left: 0;
                padding-right: 20px;
                text-align: left;
            }
        }
        </style>
        
        
        </head>
        
        <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #222222;">
            <center style="width: 100%; background-color: #f1f1f1;">
            <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
              &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
            </div>
            <div style="max-width: 600px; margin: 0 auto;" class="email-container">
                <!-- BEGIN BODY -->
              <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                  <tr>
                  <td valign="top" class="bg_white" style="padding: 1em 2.5em;">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                          <tr>
                              <td width="40%" class="logo" style="text-align: left;">
                                <h1><a href="#">Formalab</a></h1>
                              </td>
                              
                          </tr>
                      </table>
                  </td>
                  </tr><!-- end tr -->
                        <tr>
                  <td valign="middle" class="hero bg_white" style="background-image: url(images/bg_1.jpg); background-size: cover; height: 400px;">
                      <div class="overlay"></div>
                    <table>
                        <tr>
                            <td>
                                <div class="text" style="padding: 0 3em; text-align: center;">
                                    <h2> welcome  ${user.prenom}</h2>
                                    <p> you just made the right the choice,</p>
                                    <p> you have registered in our formation ${format.titre}</p>
                                    <p> Descrption :  ${format.description} </p>
                                    <p> thank you </p>
                                    <div class="icon">
                                        <a href="#">
                                  <img src="C:\Users\HPOMEN-I7-1TR\Desktop\nodeexp\miniProjetGit\MiniProjetBack\assets\logo.png" alt="" style="width: 60px; max-width: 600px; height: auto; margin: auto; display: block;">
                                </a>
                              </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                  </td>
                  </tr><!-- end tr -->
                  
                          </table>
                        </td>
                      </tr>
                    </table>
                    </td>
                </tr>
              </table>
        
            </div>
          </center>
        </body>
        </html>
        `

        let transporter = nodemailer.createTransport({
            
            service : 'gmail',
            auth: {
                user : 'formalab7@gmail.com',
                pass : 'azerty-123'
                 }
            });


           /***********//***********//***********/
            let mailoptions={
                from : 'formalab7@gmail.com',
                to: user.email,
                subject: 'Formation Register' , 
                html :message
                
             };
              transporter.sendMail(mailoptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                else {
                    console.log("email sent");
                }
                });
            /*********************/ 

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
}) 
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


        /****************** EMAIL AJOUT FORMALABEUR : Sprint 4 ***************************** */
        const output = ` <h1 color='red' align="center">Formalab </h1> <br>
        <br> <p align="center"> welcome <span color='grey'> ${formalabeur.prenom}</span>  </p>
        <p align="center"> you just made the right the choice, </p>
        <p align="center"> your information: </p>
        <p align="center"> name: ${formalabeur.nom} </p>
        <p align="center"> age: ${formalabeur.age} </p>
        <p align="center"> password: ${data._pwd}</p>
        <p align="center">cin: ${formalabeur.cin} </p>
        <p align="center"> thank you for chosing us. </p>
        `;
        let transporter = nodemailer.createTransport({
            
            service : 'gmail',
            auth: {
                user : 'formalab7@gmail.com',
                pass : 'azerty-123'
                 }
            });
        /**********/
         /*********/  
            let mailoptions={
                from : 'formalab7@gmail.com',
                to: formalabeur.email,
                subject: 'Inscription Formalabeur' , 
                html :output
                
             };
            /********/
            /*******/
              transporter.sendMail(mailoptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                else {
                    console.log("email sent");
                }
                });
            /**************************************************************************/ 

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

