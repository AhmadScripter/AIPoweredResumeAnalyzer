const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const extractText = async (filePath, fileType) => {

    if (fileType === 'application/pdf') {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        return data.text;
    }

    if (
        fileType === 'application/msword' ||
        fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
        const result = await mammoth.extractRawText({ path: filePath });
        return result.value;
    }

    throw new Error('Unsupported file type');
};

module.exports = extractText;