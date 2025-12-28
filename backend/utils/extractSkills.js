const skillsList = require('./skillList');

const extractSkills = (text) => {
    if (!text) return [];

    const lowerText = text.toLowerCase();
    const foundSkills = [];

    skillsList.forEach(skill => {
        if (lowerText.includes(skill)) {
            foundSkills.push(skill);
        }
    });

    return foundSkills;
};

module.exports = extractSkills;