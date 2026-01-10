const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const { analyzeResumeWithAI } = require('../services/aiService');

const analyzeJD = async (req, res) => {
  try {
    const { jdText, resumeId, jobTitle, company } = req.body;

    // Basic validation
    if (!jdText || !resumeId) {
      return res.status(400).json({ message: 'JD text and resume required' });
    }

    if (jdText.trim().length < 40) {
      return res.status(400).json({
        message: 'Job description is too short for meaningful analysis'
      });
    }

    // Fetch resume
    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id
    });

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // English only guard
    // if (!/^[\x00-\x7F]*$/.test(resume.extractedText)) {
    //   return res.status(400).json({
    //     message: 'Currently only English resumes are supported'
    //   });
    // }

    // Limit resume text length for AI
    const resumeText =
      resume.extractedText.length > 8000
        ? resume.extractedText.slice(0, 8000)
        : resume.extractedText;

    // Cache check
    const existingAnalysis = await Analysis.findOne({
      resume: resume._id,
      jobDescription: jdText
    });

    if (existingAnalysis) {
      return res.status(200).json({
        message: 'Cached AI analysis',
        analysis: existingAnalysis
      });
    }

    // AI Prompt
    const prompt = `
You are an ATS system for Resume vs Job Description matching.

Tasks:
1. Compare Resume and Job Description.
2. Extract skills intelligently (consider synonyms).
3. Identify experience level: Junior, Mid, Senior.
4. Categorize missing skills as "core" or "optional".
5. Calculate a realistic match percentage.
6. Explain the match percentage briefly.

Return ONLY valid JSON. No markdown. No explanation.

JSON format:
{
  "matchedSkills": [],
  "missingSkills": [
    { "skill": "", "type": "core | optional" }
  ],
  "experienceLevel": "",
  "matchPercentage": 0,
  "summary": "",
  "suggestions": []
}

Resume:
${resumeText}

Job Description:
${jdText}
`;

    // Helper to clean Gemini response
    const cleanAIResponse = (text) => {
      return text
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();
    };

    const aiRawText = await analyzeResumeWithAI(prompt);
    const cleanedText = cleanAIResponse(aiRawText);

    let aiResult;
    try {
      aiResult = JSON.parse(cleanedText);
    } catch (err) {
      console.error('Invalid AI JSON:', cleanedText);
      return res.status(500).json({ message: 'AI returned invalid JSON' });
    }

    // Save analysis
    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      jobDescription: jdText,
      jobTitle,
      company,
      matchedSkills: aiResult.matchedSkills || [],
      missingSkills: aiResult.missingSkills || [],
      experienceLevel: aiResult.experienceLevel || '',
      matchPercentage: aiResult.matchPercentage || 0,
      aiSummary: aiResult.summary || '',
      aiSuggestions: aiResult.suggestions || []
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