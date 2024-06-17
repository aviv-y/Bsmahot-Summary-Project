
const schedule = require("node-schedule");
const mailerFunc = require("./mailerFunc");

function parseDateString(dateString) {
  const [day, month, year] = dateString.split(".");
  return new Date(`${year}-${month}-${day}`);
}

function scheduleEmail(mailOptions) {
  console.log("Mail Options:", mailOptions);

  const dateToReminder = parseDateString(mailOptions.date);
  console.log("Original Date:", dateToReminder);

  dateToReminder.setDate(dateToReminder.getDate() - 2);
  dateToReminder.setHours(16, 0, 0, 0);
  console.log("Reminder Date:", dateToReminder);

  const dateToFeedback = parseDateString(mailOptions.date);
  dateToFeedback.setDate(dateToFeedback.getDate() + 3);
  dateToFeedback.setHours(16, 0, 0, 0);
  console.log("Feedback Date:", dateToFeedback);

  schedule.scheduleJob(dateToReminder, () => {
    console.log("Sending reminder email...");
    let details = `שלום ${mailOptions.closeBUser[0].name}! רק רצינו להזכיר לך על האירוע שסגרת עם ${mailOptions.pUser.name}\n
    ${mailOptions.category} בעיר ${mailOptions.city} בתאריך ${mailOptions.date} בשעות ה${mailOptions.time}. מצורף החוזה בניכם. בהצלחה מרובה!!`;

    console.log("Reminder Email Details:", details);

    mailerFunc.sendmail(
      "reminder",
      mailOptions.closeBUser[0].userMail,
      mailOptions.closeBUser[0].name,
      0,
      details,
      mailOptions.attachment,
      (error, info) => {
        if (error) {
          console.error("Error sending reminder email:", error);
        } else {
          console.log("Reminder email sent:", info.response);
        }
      }
    );
  });

  schedule.scheduleJob(dateToFeedback, () => {
    console.log("Sending feedback email...");
    const details = `שלום ${mailOptions.pUser.name}!\n מזל טוב על ה${mailOptions.category} שחגגתם. לשם שיפור השירות באתר ולמען משתמשים נוספים, נשמח מאוד שתקדישו כמה דקות לפידבק על השירות שניתן ע"י ${mailOptions.closeBUser[0].name} שהיה אחראי על ה${mailOptions.closeProfession[0]}\nבנוסף צירפנו לך את החוזה בניכם למידה ותהיה מעניין לעיין בו שוב\n שוב תודה והמון מזל טוב ואושר!`;

    console.log("Feedback Email Details:", details);

    mailerFunc.sendmail(
      "feedback",
      mailOptions.pUser.userMail,
      mailOptions.pUser.name,
      mailOptions._id,
      details,
      mailOptions.attachment,
      (error, info) => {
        if (error) {
          console.error("Error sending feedback email:", error);
        } else {
          console.log("Feedback email sent:", info.response);
        }
      }
    );
  });
}

module.exports = { scheduleEmail };
