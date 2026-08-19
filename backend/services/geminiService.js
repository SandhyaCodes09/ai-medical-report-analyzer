const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeMedicalReport = async (reportText) => {
    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-3.6-flash",
        });

        const prompt = `
You are a medical report analysis assistant.

Analyze the following medical report and explain it in simple language.

IMPORTANT:
- Do not provide a final medical diagnosis.
- Do not prescribe medicines.
- Clearly mention that the result is for informational purposes only.
- Highlight abnormal values.
- Explain what each important value generally means.
- Mention possible reasons for abnormal values carefully.
- Suggest what type of doctor/specialist the patient may consult if appropriate.

Medical Report:
${reportText}
`;

        const result = await model.generateContent(prompt);

        const response = await result.response;

        return response.text();
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Failed to analyze medical report");
    }
};

module.exports = {
    analyzeMedicalReport,
};