const axios = require('axios');

const getATSScores = async (fileUrl) => {
    try {
        const response = await axios.post(
            'https://api.apideck.com/ats/analyze',
            { fileUrl },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.ATS_API_KEY}`,
                    'X-App-Id': process.env.ATS_APP_ID,
                    'Content-Type': 'application/json'
                }
            }
        );

        return {
            score: response.data.score,
            feedback: response.data.feedback
        };
    } catch (err) {
        console.error("ATS API Error:", err.response?.data || err.message);
        // fallback dummy score if API fails
        return {
            score: 0,
            feedback: "ATS API failed. Please try again."
        };
    }
};

module.exports = { getATSScores };
