const fs = require('fs');
const path = require('path');

module.exports = {

    onPreBuild: async () => {
        const filePath = path.join(__dirname, '../../netlify/data.json');
        const content = {
            "repoURL": process.env.REPOSITORY_URL
        };

        console.log(content);

        fs.writeFile(filePath, JSON.stringify(content), (err) => {
            if (err) {
                console.error('Error stashing repo url to data file:', err);
            }
        });
    },

    onSuccess: async ({ constants }) => {
        // If the site has been deployed, we'll send the score to the leaderboard
        if (constants.IS_LOCAL) {
            console.log("Local build. We'll only tell the leaderboard if it's deployed.");
            return;
        }
        await fetch('https://compose-challenge.netlify.app/submission', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "url": process.env.URL,
                "excluded": false
            })
        });
    },
}