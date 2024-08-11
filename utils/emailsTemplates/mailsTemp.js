const htmlTemp = (type, name, token, details, attachment, reactURL) => {

    let client, contractBtn;
    if (details && type=="sendMess") {
        if(details.details[0].userType === "1")
        {
            client = details.pUserName;
            contractBtn = `<td align="center" valign="middle"
                        style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					    color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 100%;"
                            href="${reactURL}/CommentMess?token=${token}&contract=y">
                            אני מעוניין לחתום חוזה!
                        </a>
                    </td>`;
        }
        else {
            client = details.bUserName;
            if (details.details[0].text === "אני מעוניין לחתום חוזה!")
                            contractBtn = `<td align="center" valign="middle"
                        style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					    color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 100%;"
                            href="${reactURL}/Contract?token=${token}">
                            לעריכת חוזה
                        </a>
                    </td>`;
        }
    }
    if (type == "attachment" || type == "signAttachment") {
      client = details;
    }
  let valMail = {
    subject: "",
      body: "",
    attachment: null
  };
  switch (type) {
    case "wellcom":
      valMail.subject = `${name}, ברוך הבא!`;
      valMail.body = `
                            ${name}, ברוך הבא!
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">
                            כמה כיף שהצטרפת!!
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><img border="0" vspace="0" hspace="0"
                                src="https://i.gifer.com/XliJ.gif"
                                alt="reset password" title="password Image" width="560"
                                style="
			width: 100%;
			max-width: 560px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: #000000;
			font-family: sans-serif;" class="paragraph">
                אנחנו שמחים שהצטרפת אלינו!<be/>
בשמחות- זו משפחה!<br/>
מאחלים לך הנאה מרובה, ושימוש יעיל ונוח!

            </td>
                    </tr>
                                </table>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
            </td>
        </tr>
    </table>
</body>
</html>`;
      return valMail;
      break;
    case "reqResetPass":
      valMail.subject = `איפוס סיסמתך`;
      valMail.body = `
                            איפוס סיסמתך
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">
                            התהליך קצר ובטוח, מוזמן להתחיל!
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><img border="0" vspace="0" hspace="0"
                                src="https://t3.ftcdn.net/jpg/01/20/01/74/240_F_120017418_cUA4vLb1F6LgEnBXA3vdmvxJkGHoQ8ls.jpg"
                                alt="reset password" title="password Image" width="560"
                                style="
			width: 100%;
			max-width: 560px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: #000000;
			font-family: sans-serif;" class="paragraph">
                            קיבלנו בקשה לאיפוס הסיסמא שלך. במידה ולא אתה שלחת את הבקשה פשוט התעלם ממייל זה. ללא המשך
                            התהליך לא יהיה ניתן לשנות את הסיסמא והחשבון שלך ימשיך להיות בטוח.<br />
                            במידה ובקשת האיפוס בוצעה על ידך, הקלק על כפתור האיפוס ותבחר סיסמא חדשה שלך יהיה קל לזכור
                            ולאחרים קשה לגלות<br/><br/>
                            לתשומת לב- אסימון איפוס הסיסמא מוגבל זמן
                        </td>
                    </tr>
                    <tr>
                        <!--כפתור-->
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button" style="text-decoration: underline;">
                                <table border="0" cellpadding="0" cellspacing="0" align="center"
                                    style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                                    <tr>
                                        <td align="center" valign="middle"
                                            style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                                            bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 100%;"
                                                href="${reactURL}/ResetPass?token=${token}">
                                                איפוס סיסמא
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
            </td>
        </tr>
    </table>

</body>

</html>`;
      return valMail;
      break;
    case "resetPassword":
      valMail.subject = `סיסמתך שונתה בהצלחה!`;
      valMail.body = `
                            סיסמתך שונתה בהצלחה!
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">
                            ושוב אתה יכול להכנס לבקר אותנו:)
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><img border="0" vspace="0" hspace="0"
                                src="https://t3.ftcdn.net/jpg/01/80/54/12/240_F_180541233_cdGuAJMEYnZcrm0FlAtjgoc2Oo3BTFew.jpg"
                                alt="reset password" title="password Image" width="560"
                                style="
			width: 100%;
			max-width: 560px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: #000000;
			font-family: sans-serif;" class="paragraph">
                            קיבלנו בקשה לשינוי הסיסמא שלך. במידה ולא אתה שלחת את הבקשה פשוט הכנס לאתר וצור סיסמא חדשה ע"י "שכחתי סיסמא" שבדף הכניסה ותבחר סיסמא חדשה שלך יהיה קל לזכור
                            ולאחרים קשה לגלות<br/>
                לאחר התהליך, רק אתה תדע את הסיסמא, והחשבון שלך ימשיך להיות בטוח<br/>  
                        </td>
                    </tr>
                                </table>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
            </td>
        </tr>

    </table>
</body>
</html>`;
      return valMail;
      break;
    case "sendMess":
      valMail.subject = `הודעה מאת ${name} || אתר בשמחות  `;
      valMail.body = `
                            ${client}, שלום! ${name} שלח לך הודעה
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">             
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><img border="0" vspace="0" hspace="0"
                                src="https://cdn.dribbble.com/users/65451/screenshots/2142189/shake.gif"
                                alt="send mess" title="send mess Image" width="360"
                                style="
			width: 100%;
			max-width: 560px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 17px; font-weight: 400; line-height: 160%;
			padding-top: 25px; 
			color: #000000;
			font-family: sans-serif;" class="paragraph">
                            ${details.details[0].text}
                          <br/>  
                        </td>
                    </tr>
                                </table>
                                </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
            </td>
        </tr>
                <tr>
    <!--כפתור-->
    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button" style="text-decoration: underline;">
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                <tr>
                    <td align="center" valign="middle"
                        style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 100%;"
                            href="${reactURL}/CommentMess?token=${token}">
                            לתגובה
                        </a>
                    </td>
                    
                </tr>
                <tr><h1>   </h1></tr>
                <tr> ${contractBtn || ""}</tr>
            </table>
        </a>
    </td>
</tr>
    </table>
</body>
</html>`;
      return valMail;
      break;
      case "attachment":
      valMail.subject = `החוזה שלך ושל ${name} מחכה לחתימה שלך! || אתר בשמחות`
      valMail.body = `
                            ${client}, שלום! ${name} מעוניין לאישורך על החוזה המצורף
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">             
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><img border="0" vspace="0" hspace="0"
                                src="https://media2.giphy.com/media/cEr5WDuNGiLPBYppNo/giphy.gif"
                                alt="send mess" title="send mess Image" width="360"
                                style="
			width: 100%;
			max-width: 560px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                    </tr>
                                </table>
                                </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
            </td>
        </tr>
                <tr>
    <!--כפתור-->
    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button" style="text-decoration: underline;">
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                <tr>
                    <td align="center" valign="middle"
                        style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 100%;"
                            href="${reactURL}/SignClient?token=${token}">
                            לחתימה
                        </a>
                    </td>
                </tr>
            </table>
        </a>
    </td>
</tr>
    </table>
</body>
</html>`;
          valMail.attachment = [
              {
                  filename: "Contract.pdf",
                  content: attachment,
                  encoding: "base64",
              },
          ];
      return valMail;
      break;
      case "signAttachment":
      valMail.subject = `${client} חתם על החוזה בניכם! || אתר בשמחות`
      valMail.body = `
                            ${name}, מזל טוב! ${client} אישר וחתם על חוזה בניכם!
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">             
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><img border="0" vspace="0" hspace="0"
                                src="https://media2.giphy.com/media/cEr5WDuNGiLPBYppNo/giphy.gif"
                                alt="send mess" title="send mess Image" width="360"
                                style="
			width: 100%;
			max-width: 560px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                    </tr>
                                </table>
                                </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
            </td>
        </tr>
                <tr>
    <!--כפתור-->
    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button" style="text-decoration: underline;">
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                <tr>
                    <td align="center" valign="middle"
                        style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 100%;"
                            href="${reactURL}/Home">
                            לאתר שלנו
                        </a>
                    </td>
                </tr>
            </table>
        </a>
    </td>
</tr>
    </table>
</body>
</html>`;
          valMail.attachment = [
              {
                  filename: "Contract.pdf",
                  content: attachment,
                  encoding: "base64",
              },
          ];
      return valMail;
      break;
      case "reminder":
      valMail.subject = `תזכורת חשובה!`
      valMail.body = `
                            תזכורת!
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">             
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><img border="0" vspace="0" hspace="0"
                                src="https://i.gifer.com/4Tlt.gif"
                                alt="send mess" title="send mess Image" width="120"
                                style="
			width: 100%;
			max-width: 240px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                        </tr>
                        <tr>
                        <td><h4>${details}</h4></td>
                    </tr>
                                </table>
                                </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
            </td>
        </tr>
                <tr>
    <!--כפתור-->
    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button" style="text-decoration: underline;">
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                <tr>
                    <td align="center" valign="middle"
                        style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 100%;"
                            href="${reactURL}/Home">
                            לאתר שלנו
                        </a>
                    </td>
                </tr>
            </table>
        </a>
    </td>
</tr>
    </table>
</body>
</html>`;
          valMail.attachment = [
            {
              filename: "Contract.pdf",
              content: attachment,
              encoding: "base64",
            },
          ];
          
      return valMail;
      break;
  
      case "feedback":
      valMail.subject = `נשמח לשמוע איך היה!`
      valMail.body = `
                            אנו מחכים למשוב שלך:)
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">             
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><img border="0" vspace="0" hspace="0"
                                src="https://i.gifer.com/4Tlt.gif"
                                alt="send mess" title="send mess Image" width="120"
                                style="
			width: 100%;
			max-width: 360px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                        </tr>
                        <tr>
                        <td><h4>${details}</h4></td>
                    </tr>
                                </table>
                                </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
            </td>
        </tr>
                <tr>
    <!--כפתור-->
    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button" style="text-decoration: underline;">
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                <tr>
                    <td align="center" valign="middle"
                        style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 100%;"
                            href="${reactURL}/feedback?event=${token}">
                            להוספת התגובה שלך
                        </a>
                    </td>
                </tr>
            </table>
        </a>
    </td>
</tr>
    </table>
</body>
</html>`;
          valMail.attachment = [
            {
              filename: "Contract.pdf",
              content: attachment,
              encoding: "base64",
            },
          ];
          
      return valMail;
      break;
  
      case "feedbackToBUser":
      (valMail.subject = `${details.title}`),
        (valMail.body = `
                            
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%; font-size: 18px; font-weight: 300; line-height: 150%;
			padding-top: 5px;
			color: #000000;
			font-family: sans-serif;" class="subheader">             
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;
			padding-top: 20px;" class="hero"><img border="0" vspace="0" hspace="0"
                                src="https://media.giphy.com/media/9E40ePI5P22Wngf4mA/giphy.gif?cid=790b76112tpia5htjemx5kpcg841zqdefd1weurlgyktcfgw&ep=v1_gifs_search&rid=giphy.gif&ct=g"
                                alt="send mess" title="send mess Image" width="360"
                                style="
			width: 100%;
			max-width: 560px;
			color: #000000; font-size: 13px; margin: 0; padding: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; border: none; display: block;" /></a>
                        </td>
                        </tr>
                        <tr>
                        <td><h1>${details.title}</h1></td></tr>
                        <tr>
                        <td>${details.txt}</td>
                    </tr>
                                </table>
                                </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;" class="line">
                            <hr color="#E0E0E0" align="center" width="100%" size="1" noshade
                                style="margin: 0; padding: 0;" />
                        </td>
                    </tr>
            </td>
        </tr>
                <tr>
    <!--כפתור-->
    <td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 6.25%; padding-right: 6.25%; width: 87.5%;
			padding-top: 25px;
			padding-bottom: 5px;" class="button" style="text-decoration: underline;">
            <table border="0" cellpadding="0" cellspacing="0" align="center"
                style="max-width: 240px; min-width: 120px; border-collapse: collapse; border-spacing: 0; padding: 0;">
                <tr>
                    <td align="center" valign="middle"
                        style="padding: 12px 24px; margin: 0; text-decoration: underline; border-collapse: collapse; border-spacing: 0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; -khtml-border-radius: 4px;"
                        bgcolor="#E9703E"><a target="_blank" style="text-decoration: underline;
					color: #FFFFFF; font-family: sans-serif; font-size: 17px; font-weight: 400; line-height: 100%;"
                            href="${reactURL}">
                            לאתר שלנו
                        </a>
                    </td>
                </tr>
            </table>
        </a>
    </td>
</tr>
    </table>
</body>
</html>`);
          
      return valMail;
      break;
  }
};

module.exports = { htmlTemp }