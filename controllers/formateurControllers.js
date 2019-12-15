const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const multipart = require('connect-multiparty');
const { mongooose } = require('./../db/config');
/****/ const nodemailer = require ('nodemailer');
/******/
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

    let data = JSON.parse(req.body.formation);
    let image = req.files.image;

    let ext = image.type.split('/')[1];
    let imagePath = "assets/" + data._titre + "." + ext;
    console.log(imagePath);

    fs.renameSync(req.files.image.path, imagePath);
    let im = "http://localhost:3000/" + data._titre + "." + ext;

    console.log("nom" + data._idformateur);

    Formateur.findOne({ nom: data._idformateur }).then((f) => {
        console.log("f" + f._id);


        let formation = new Formation({
            titre: data._titre,
            description: data._description,
            volume_horaire: data._volume_horaire,
            prix: data._prix,
            idformateur: f._id,
            image_Formation: im

        });

        formation.save().then(() => {

            console.log("form" + formation);
/********************************************* */

const message = ` <h1 color='red' align="center">Formalab </h1> <br>
            
`;

const mail=` 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
<meta content="width=device-width" name="viewport"/>
<!--[if !mso]><!-->
<meta content="IE=edge" http-equiv="X-UA-Compatible"/>
<!--<![endif]-->
<title></title>
<!--[if !mso]><!-->
<!--<![endif]-->
<style type="text/css">
		body {
			margin: 0;
			padding: 0;
		}

		table,
		td,
		tr {
			vertical-align: top;
			border-collapse: collapse;
		}

		* {
			line-height: inherit;
		}

		a[x-apple-data-detectors=true] {
			color: inherit !important;
			text-decoration: none !important;
		}
	</style>
<style id="media-query" type="text/css">
		@media (max-width: 520px) {

			.block-grid,
			.col {
				min-width: 320px !important;
				max-width: 100% !important;
				display: block !important;
			}

			.block-grid {
				width: 100% !important;
			}

			.col {
				width: 100% !important;
			}

			.col>div {
				margin: 0 auto;
			}

			img.fullwidth,
			img.fullwidthOnMobile {
				max-width: 100% !important;
			}

			.no-stack .col {
				min-width: 0 !important;
				display: table-cell !important;
			}

			.no-stack.two-up .col {
				width: 50% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num8 {
				width: 66% !important;
			}

			.no-stack .col.num4 {
				width: 33% !important;
			}

			.no-stack .col.num3 {
				width: 25% !important;
			}

			.no-stack .col.num6 {
				width: 50% !important;
			}

			.no-stack .col.num9 {
				width: 75% !important;
			}

			.video-block {
				max-width: none !important;
			}

			.mobile_hide {
				min-height: 0px;
				max-height: 0px;
				max-width: 0px;
				display: none;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide {
				display: block !important;
				max-height: none !important;
			}
		}
	</style>
</head>
<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
<!--[if IE]><div class="ie-browser"><![endif]-->
<table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="table-layout: fixed; vertical-align: top; min-width: 320px; Margin: 0 auto; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top;" valign="top">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
<div style="background-color:#c48f4d;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #333333;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#333333;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#c48f4d;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#333333"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#333333;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 14px;">
<p style="text-align: center; line-height: 1.2; word-break: break-word; mso-line-height-alt: NaNpx; margin: 0;"><span style="color: #ffffff;"><strong><span style="font-size: 22px;">FORMALAB</span></strong></span></p>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<div align="center" class="img-container center autowidth" style="padding-right: 0px;padding-left: 0px;">
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img align="center" alt="Image" border="0" class="center autowidth" src=http://localhost:3000/logo_2.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; border: 0; height: auto; width: 100%; max-width: 362px; display: block;" title="Image" width="362"/>
<!--[if mso]></td></tr></table><![endif]-->

</div>
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<div style="background-color:#c48f4d;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #333333;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#333333;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#c48f4d;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#333333"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#333333;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<div style="background-color:#c48f4d;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #333333;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#333333;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#c48f4d;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#333333"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#333333;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top: 5px; padding-bottom: 5px; font-family: Verdana, sans-serif"><![endif]-->
<div style="color:#555555;font-family:Verdana, Geneva, sans-serif;line-height:1.2;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;">
<div style="font-size: 14px; line-height: 1.2; font-family: Verdana, Geneva, sans-serif; color: #555555; mso-line-height-alt: 17px;">
<p style="font-size: 16px; line-height: 1.2; word-break: break-word; text-align: center; font-family: Verdana, Geneva, sans-serif; mso-line-height-alt: 19px; margin: 0;"><span style="font-size: 16px; color: #ffffff;">WE HAVE A NEW TRAINING. COME AND JOINS US</span><br/><br/></p>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
<div style="color:#555555;font-family:Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-size: 14px; line-height: 1.2; font-family: Tahoma, Verdana, Segoe, sans-serif; color: #555555; mso-line-height-alt: 17px;">
<p style="font-size: 16px; line-height: 1.2; word-break: break-word; text-align: center; font-family: Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 19px; margin: 0;"><span style="font-size: 16px; color: #ffffff;">More Details</span></p>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<div style="background-color:#c48f4d;">
<div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #333333;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#333333;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#c48f4d;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#333333"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="166" style="background-color:#333333;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 164px; width: 166px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-size: 14px; line-height: 1.2; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 17px;">
<ul>
<li style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px;"><span style="color: #ffffff;">Title :</span></li>
</ul>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td><td align="center" width="333" style="background-color:#333333;width:333px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 328px; width: 333px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<div style="font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif; color:white"><br>
<div class="our-class"> ${formation.titre} </div>
</br></div>
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<div style="background-color:#c48f4d;">
<div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #333333;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#333333;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#c48f4d;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#333333"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="166" style="background-color:#333333;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 164px; width: 166px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-size: 14px; line-height: 1.2; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 17px;">
<ul>
<li style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px;"><span style="color: #ffffff;">Descritpion :</span></li>
</ul>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td><td align="center" width="333" style="background-color:#333333;width:333px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 328px; width: 333px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<div style="font-size:16px;text-align:center;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;color:white"><br>
<div class="our-class"> ${formation.description} </div>
</br></div>
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<div style="background-color:#c48f4d;">
<div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #333333;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#333333;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#c48f4d;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#333333"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="166" style="background-color:#333333;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 164px; width: 166px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-size: 14px; line-height: 1.2; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 17px;">
<ul>
<li style="font-size: 14px; line-height: 1.2; mso-line-height-alt: 17px;"><span style="color: #ffffff;">Duration</span></li>
</ul>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td><td align="center" width="333" style="background-color:#333333;width:333px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 328px; width: 333px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<div style="font-size:16px;text-align:center;color:white; font-family:Arial, Helvetica Neue, Helvetica, sans-serif"><br/>
<div class="our-class"> ${formation.volume_horaire} </div>
</div>
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<div style="background-color:#c48f4d;">
<div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #333333;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#333333;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#c48f4d;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#333333"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="166" style="background-color:#333333;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 164px; width: 166px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="line-height: 1.2; font-size: 12px; color: #555555; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
<ul>
<li style="line-height: 1.2; font-size: 14px; mso-line-height-alt: 17px;"><span style="font-size: 14px; color: #ffffff;">Start Date :</span></li>
</ul>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td><td align="center" width="333" style="background-color:#333333;width:333px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 328px; width: 333px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<div style="font-size:16px;text-align:center;color:white;font-family:Arial, Helvetica Neue, Helvetica, sans-serif"><br/>
<div class="our-class">${formation.datef} </div>
</div>
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<div style="background-color:#c48f4d;">
<div class="block-grid mixed-two-up" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #333333;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#333333;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#c48f4d;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#333333"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="166" style="background-color:#333333;width:166px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num4" style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 164px; width: 166px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Verdana, sans-serif"><![endif]-->
<div style="color:#555555;font-family:Verdana, Geneva, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-size: 14px; line-height: 1.2; font-family: Verdana, Geneva, sans-serif; color: #555555; mso-line-height-alt: 17px;">
<ul>
<li style="font-size: 14px; line-height: 1.2; text-align: left; mso-line-height-alt: 17px;"><span style="color: #ffffff;">Price</span></li>
</ul>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td><td align="center" width="333" style="background-color:#333333;width:333px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num8" style="display: table-cell; vertical-align: top; min-width: 320px; max-width: 328px; width: 333px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<div style="font-size:16px;text-align:center;color:white;font-family:Arial, Helvetica Neue, Helvetica, sans-serif"><br/>
<div class="our-class"> ${formation.prix}  </div>
</div>
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<div style="background-color:#c48f4d;">
<div class="block-grid" style="Margin: 0 auto; min-width: 320px; max-width: 500px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; background-color: #333333;">
<div style="border-collapse: collapse;display: table;width: 100%;background-color:#333333;">
<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#c48f4d;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#333333"><![endif]-->
<!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#333333;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
<div class="col num12" style="min-width: 320px; max-width: 500px; display: table-cell; vertical-align: top; width: 500px;">
<div style="width:100% !important;">
<!--[if (!mso)&(!IE)]><!-->
<div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
<!--<![endif]-->
<table border="0" cellpadding="0" cellspacing="0" class="divider" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td class="divider_inner" style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
<table align="center" border="0" cellpadding="0" cellspacing="0" class="divider_content" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 1px solid #BBBBBB; width: 100%;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;" valign="top"><span></span></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
<div style="color:#555555;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
<div style="font-size: 14px; line-height: 1.2; color: #555555; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 17px;">
<p style="font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin: 0;"><span style="color: #ffffff;">Don't hesitate.</span></p>
</div>
</div>
<!--[if mso]></td></tr></table><![endif]-->
<table cellpadding="0" cellspacing="0" class="social_icons" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="top" width="100%">
<tbody>
<tr style="vertical-align: top;" valign="top">
<td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;" valign="top">
<table activate="activate" align="center" alignment="alignment" cellpadding="0" cellspacing="0" class="social_table" role="presentation" style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: undefined; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;" to="to" valign="top">
<tbody>
<tr align="center" style="vertical-align: top; display: inline-block; text-align: center;" valign="top">
<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px;" valign="top"><a href="https://www.facebook.com/" target="_blank"><img alt="Facebook" height="32" src="http://localhost:3000/facebook@2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Facebook" width="32"/></a></td>
<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px;" valign="top"><a href="https://twitter.com/" target="_blank"><img alt="Twitter" height="32" src="http://localhost:3000/twitter@2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Twitter" width="32"/></a></td>
<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px;" valign="top"><a href="https://instagram.com/" target="_blank"><img alt="Instagram" height="32" src="http://localhost:3000/instagram@2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="Instagram" width="32"/></a></td>
<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 3px; padding-left: 3px;" valign="top"><a href="https://www.linkedin.com/" target="_blank"><img alt="LinkedIn" height="32" src="http://localhost:3000/linkedin@2x.png" style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: none; display: block;" title="LinkedIn" width="32"/></a></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if (!mso)&(!IE)]><!-->
</div>
<!--<![endif]-->
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
<!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
</div>
</div>
</div>
<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
</td>
</tr>
</tbody>
</table>
<!--[if (IE)]></div><![endif]-->
</body>
</html>



`;

let transporter = nodemailer.createTransport({

    service : 'gmail',
    auth: {
        user : 'formalab7@gmail.com',
        pass : 'azerty-123'
         }
    });


    let fe = [];
    Formalabeur.find().then((fa) => {
        console.log("lenththth:"+fa.length);
    
       for (let i = 0; i < fa.length; i++) {
        fe = fa[i].email;
        let mailoptions={
            from : 'formalab7@gmail.com',
            to: fe,
            subject: 'Formation Register' , 
            html :mail
            
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
            
    
    
    
    











/*************************************** */




/********************************** */
            res.status(200).send(formation);

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

app.get('/ListerFormations', (req, res) => {

    Formation.find().then((formations) => {
        if (formations) {
            res.status(200).send(formations);
        }
        else { console.log("not found" + err.message) }

    })

});

/************ lister les formations disponible 'avec date'   ***************** */
app.get('/ListerFormations2', (req, res) => {

    let formationtab=[];
    Formation.find().then((formations) => {
          formations.forEach(f => {
         let parts =f.datef.split('/') ;          
        let d=parseInt(parts[0]);
        let m=parseInt(parts[1]-1);
         let y=parseInt(parts[2]);
         var myDate2 = new Date();
        myDate2.setDate(d);
         myDate2.setMonth(m);
        myDate2.setFullYear(y);
        console.log(myDate2);
        if(myDate2>new Date())
        formationtab.push(f);
        console.log(formationtab);
        
        }),


        res.status(200).send(formationtab);
    }).catch((e) => {
        res.status(400).send({
            message: "erreur : " + e
        })


    });
})

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



/******************** activer ou désactiver admin **************** */
app.put('/activer/:id', (req, res) => {


    let id = req.params.id;



    Formateur.findById({ _id: id }).then( (f) => {


        if (!f) {
            res.status(400).send(console.log("foramteur not found" + err));
        }
        else {
            let e = f.admin;

            x: String;
            if(e=="active")

            x = "desactive";
            else 
            if(e== "desactive")
            x="active"
            var fr= {
                admin: x
            }

           Formateur.findByIdAndUpdate({ _id: f.id }, { $set: fr }, { new: true }, (err, doc) => {
                if (!err) { res.status(200).send(doc); }
                else {
                    res.status(400).send(console.log("erreur de mise a jour" + err));
                }
            });
        }

    });
})

/*app.put('/desactive/:id', (req, res) => {

    
    
        let id = req.params.id;
    
    

    
        Formateur.findById({ _id: id }).then( (f) => {
    
    
            if (!f) {
                res.status(400).send(console.log("foramteur not found" + err));
            }
            else {
                let e = f.admin;
    
                x: String;
                x = (e == "desactive") ? "active" : "desactive"
    
                var fr= {
                    admin: x
                }
    
               Formateur.findByIdAndUpdate({ _id: f.id }, { $set: fr }, { new: true }, (err, doc) => {
                    if (!err) { res.status(200).send(doc); }
                    else {
                        res.status(400).send(console.log("erreur de mise a jour" + err));
                    }
                });
            }
    
        });
    })*/
/************************* ajout formation avec date **************************** */
    app.post("/ajouterformationdate", multipartMiddleware, (req, res) => {
        let data = JSON.parse(req.body.formateur);
      
        let image = req.files.image;
    
        let ext = image.type.split('/')[1];
        let imagePath = "assets/" + data._titre + "." + ext;
        console.log(imagePath);
    
        fs.renameSync(req.files.image.path, imagePath);
        let im = "http://localhost:3000/" + data._titre + "." + ext;
    
        console.log("nom" + data._idformateur);
    
        Formateur.findOne({ nom: data._idformateur }).then((f) => {
            console.log("f" + f._id);
           /* var parts =data._datef.split('/');            
            let d=parseInt(parts[0]);
         let m=parseInt(parts[1]-1);
         let y=parseInt(parts[2]);
    var myDate2 = new Date();
    myDate2.setDate(d);
    myDate2.setMonth(m);
    myDate2.setFullYear(y);*/
            let formation = new Formation({
                titre: data._titre,
                description: data._description,
                volume_horaire: data._volume_horaire,
                prix: data._prix,
                idformateur: f._id,
                image_Formation:im,            
                datef:data._datef   
                });
                console.log("formation"+ formation);
                
                formation.save().then(() => {
                    /********************* */
                 
                console.log("form" + formation);
                res.status(200).send(formation);
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
    














    app.get("/Allformalabeurs", (req, res) => {
        Formalabeur.find().then((forma) => {
      console.log("aaaaaaaaaaaa"+forma.length);
      var fe = [];
    
      /*
      for (let i = 0; i < forma.length; i++) {
          fe = forma[i].email;
    
          console.log("gr" + fe);}
          */
         forma.forEach(element=>{
             fe.push(element.email);
         }
            )
    
              res.status(200).send(fe);
              console.log("length + "+fe.length);
              
    
    })
    });

module.exports = app;

