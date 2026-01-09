const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const { analyzeResumeWithAI } = require('../services/aiService');

const analyzeJD = async (req, res) => {
  try {
    const { jdText, resumeId, jobTitle, company } = req.body;

    if (!jdText || !resumeId) {
      return res.status(400).json({ message: 'JD text and resume required' });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const prompt = `
You are an ATS system for Resume vs Job Description matching.

Compare Resume and Job Description.
Extract skills intelligently.

Return ONLY valid JSON. No markdown. No explanation.

JSON format:
{
  "matchedSkills": [],
  "missingSkills": [],
  "matchPercentage": 0,
  "summary": "",
  "suggestions": []
}

Resume:
${resume.extractedText}

Job Description:
${jdText}
`;

    const cleanAIResponse = (text) => {
      return text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
    };
    const aiRawText = await analyzeResumeWithAI(prompt);
    const cleanedText = cleanAIResponse(aiRawText);

    let aiResult;
    try {
      aiResult = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Invalid AI JSON:", cleanedText);
      return res.status(500).json({ message: "AI returned invalid JSON" });
    }

    if (!aiResult) {
      return res.status(500).json({ message: 'AI analysis failed' })
    }
    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      jobDescription: jdText,
      jobTitle,
      company,
      matchedSkills: aiResult.matchedSkills,
      missingSkills: aiResult.missingSkills,
      matchPercentage: aiResult.matchPercentage,
      aiSuggestions: aiResult.suggestions,
      aiSummary: aiResult.summary
    });

    res.status(200).json({
      message: 'AI analysis completed',
      analysis
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { analyzeJD };