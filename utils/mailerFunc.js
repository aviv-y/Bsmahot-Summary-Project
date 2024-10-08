const nodemailer = require('nodemailer')
const mailsTemp = require('./emailsTemplates/mailsTemp')

function sendmail(type, email, name, token, details, attachment) {
    let html = mailsTemp.htmlTemp(
      type,
      name,
      token,
      details,
      attachment,
      process.env.API_URL
    ); //פונקציה הבוחרת איזה מייל לשלוח
    console.log("**********************" + process.env.API_URL);
    console.log("**********************" + process.env.MY_PASSWORD_MAIL);
    console.log("**********************" + process.env.MY_ADRESS_MAIL);

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MY_ADRESS_MAIL,   //ENVכתובת המייל מתוך הקובץ 
            pass: process.env.MY_PASSWORD_MAIL   //ENVסיסמת המייל מתוך הקובץ
        }
    });
    let mailOptions = {
      from: process.env.MY_ADRESS_MAIL,
      to: email,
      subject: html.subject,
      text: "",
      html: `<!DOCTYPE html>
            <html >
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0;">
    <meta name="format-detection" content="telephone=no" />
    <style>
        body {
            margin: 0;
            padding: 0;
            min-width: 100%;
            width: 100% !important;
            height: 100% !important;
        }
        body, table, td, div, p, a {
            -webkit-font-smoothing: antialiased;
            text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
            line-height: 100%;
        }
        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse !important;
            border-spacing: 0;
        }
        img {
            border: 0;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        /* Rounded corners for advanced mail clients only */
        @media all and (min-width: 560px) {
            .container {
                border-radius: 8px;
                -webkit-border-radius: 8px;
                -moz-border-radius: 8px;
                -khtml-border-radius: 8px;
            }
        }
        /* Set color for auto links (addresses, dates, etc.) */
        a,
        a:hover {
            color: #127DB3;
        }
    </style>
    <!-- MESSAGE SUBJECT -->
    <title>הודעה מאת אתר "בשמחות"</title>
</head>
<!-- BODY -->
<!-- Set message background color (twice) and text color (twice) -->

<body dir="rtl" topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0"
    width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;
	background-color: #F0F0F0;
	color: #000000;" bgcolor="#F0F0F0" text="#000000">
    <!-- SECTION / BACKGROUND -->
    <!-- Set message background color one again -->
    <table width="100%" align="center" border="0" cellpadding="0" cellspacing="0"
        style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background">
        <tr>
            <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;"
                bgcolor="#F0F0F0">
                <!-- WRAPPER -->
                <!-- Set wrapper width (twice) -->
                <table border="0" cellpadding="0" cellspacing="0" align="center" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="wrapper">
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 20px;
			padding-bottom: 20px;">
                            <div style="display: none; visibility: hidden; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; height: 0; max-height: 0; max-width: 0;
			color: #F0F0F0;" class="preheader">

                                <a target="_blank" style="text-decoration: none;" href="https://localhost:3000"><img
                                        border="0" vspace="0" hspace="0" src="https://ibb.co/9WKZHvt"
                                        width="100" height="30" alt="Logo" title="Logo"
                                        style="
				color: #000000;
				font-size: 10px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>

                        </td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#FFFFFF" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit;
	max-width: 560px;" class="container">
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 24px; font-weight: bold; line-height: 130%;
			padding-top: 25px;
			color: #000000;
			font-family: sans-serif;" class="header">${html.body}<a href="https//localhost:3000"><img src="https://ibb.co/9WKZHvt"  border="0" style="display: block;
                                                 margin-left: auto;
                                                 margin-right: auto;
                                                 width: 50%;"/></a>  `,
      attachments: html.attachment
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("משום מה לא הצלחנו לשלוח מייל"+error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {sendmail}