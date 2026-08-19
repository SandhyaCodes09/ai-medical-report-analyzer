// const fs = require("fs");
// const { PDFParse } = require("pdf-parse");

// const extractPdfText = async (filePath) => {
//     const dataBuffer = fs.readFileSync(filePath);

//     const parser = new PDFParse({
//         data: dataBuffer,
//     });

//     const result = await parser.getText();

//     await parser.destroy();

//     return result.text;
// };

// module.exports = extractPdfText;

const fs = require("fs");
const { PDFParse } = require("pdf-parse");

const extractPdfText = async (filePath) => {
    let parser;

    try {
        const dataBuffer = fs.readFileSync(filePath);

        parser = new PDFParse({
            data: dataBuffer,
        });

        const result = await parser.getText();

        console.log("PDF EXTRACTED TEXT:", result.text);

        return result.text?.trim() || "";

    } catch (error) {
        console.error("PDF TEXT EXTRACTION ERROR:", error);
        throw error;

    } finally {
        if (parser) {
            await parser.destroy();
        }
    }
};

module.exports = extractPdfText;