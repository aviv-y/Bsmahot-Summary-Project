const puppeteer = require("puppeteer");
const fs = require("fs");

async function generatePDF(pdfD) {

  let sTtl = pdfD.subTitle.replaceAll("\n", "<br/>");
  let text = pdfD.text.replaceAll('\n', '<br/>')
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // Correct path to Chrome executable
    });
    const page = await browser.newPage();

    // Your HTML content to be converted to PDF
    const htmlContent = `
          <!DOCTYPE html>
          <html lang="he" dir="rtl">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>חוזה ופירוט הסכמים</title>
          </head>
          <body>
              <p>בס"ד</>
              <h5>אתר "בשמחות"</h5>
              <br/>
              <h1>${pdfD.title}</h1>
              <h3>${sTtl}</h3>
              <br/>
              <p>${text}</p>
              <br/>
              <p>${pdfD.remark}</p>
              <br/>
              <h4>${pdfD.signaTtl}</h4>
              <img src="${pdfD.signature}"/>
              <h4>על החתום: ${pdfD.namePU}</h4>
              <img src="${pdfD.signClient}"/>

          </body>
          </html>
      `;

    // Navigate to a blank page
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generate PDF
    const pdfBuffer = await page.pdf({ format: "A4" });

    // Save PDF to file
    fs.writeFileSync("Contract.pdf", pdfBuffer);

    // Convert PDF to base64
    const base64Data = pdfBuffer.toString("base64");

    await browser.close();

    return base64Data;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

module.exports = generatePDF;

