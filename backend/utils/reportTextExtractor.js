// const fs = require("fs");
// const { PDFParse } = require("pdf-parse");
// const Tesseract = require("tesseract.js");

// const extractReportText = async (filePath, mimeType) => {
//     try {
//         // ================= PDF =================

//         if (mimeType === "application/pdf") {
//             const buffer = fs.readFileSync(filePath);

//             const parser = new PDFParse({
//                 data: buffer,
//             });

//             const result = await parser.getText();

//             await parser.destroy();

//             return result.text.trim();
//         }

//         // ================= IMAGE OCR =================

//         if (
//             mimeType === "image/jpeg" ||
//             mimeType === "image/jpg" ||
//             mimeType === "image/png"
//         ) {
//             const result = await Tesseract.recognize(
//                 filePath,
//                 "eng"
//             );

//             return result.data.text.trim();
//         }

//         throw new Error("Unsupported file type");

//     } catch (error) {
//         console.error("TEXT EXTRACTION ERROR:", error);
//         throw error;
//     }
// };

// module.exports = extractReportText;

const fs = require("fs");
const { PDFParse } = require("pdf-parse");
const Tesseract = require("tesseract.js");

const extractReportText = async (filePath, mimeType) => {
    try {

        // ================= PDF =================

        if (mimeType === "application/pdf") {

            const buffer = fs.readFileSync(filePath);

            const parser = new PDFParse({
                data: buffer,
            });

            try {
                const result = await parser.getText();

                console.log(
                    "PDF EXTRACTED TEXT:",
                    result.text
                );

                return result.text?.trim() || "";

            } finally {
                await parser.destroy();
            }
        }

        // ================= IMAGE OCR =================

        // if (
        //     mimeType === "image/jpeg" ||
        //     mimeType === "image/jpg" ||
        //     mimeType === "image/png"
        // ) {

        //     console.log("Starting OCR...");

        //     const result = await Tesseract.recognize(
        //         filePath,
        //         "eng"
        //     );

        //     console.log(
        //         "OCR EXTRACTED TEXT:",
        //         result.data.text
        //     );

        //     return result.data.text?.trim() || "";
        // }

        // throw new Error(
        //     `Unsupported file type: ${mimeType}`
        // );

        // ================= IMAGE OCR =================

if (
    mimeType === "image/jpeg" ||
    mimeType === "image/jpg" ||
    mimeType === "image/png"
) {
    console.log("================================");
    console.log("IMAGE OCR STARTED");
    console.log("File:", filePath);
    console.log("MIME:", mimeType);
    console.log("================================");

    const result = await Tesseract.recognize(
        filePath,
        "eng",
        {
            logger: (info) => {
                console.log(
                    `OCR ${info.status}:`,
                    Math.round((info.progress || 0) * 100) + "%"
                );
            },
        }
    );

    const extractedText = result.data.text?.trim() || "";

    console.log("================================");
    console.log("OCR EXTRACTED TEXT:");
    console.log(extractedText);
    console.log("================================");

    return extractedText;
}

    } catch (error) {

        console.error(
            "TEXT EXTRACTION ERROR:",
            error
        );

        throw error;
    }
};

module.exports = extractReportText;