module.exports = {
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