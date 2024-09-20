const fs = require("fs");
const path = require("path");

module.exports = {
  // Stash some env vars for later when they are not usually available to us
  onPreBuild: async () => {
    const filePath = path.join(__dirname, "../../netlify/data.json");
    const content = { "default" : {
            "repoURL": process.env.REPOSITORY_URL,
        }
    };

    fs.writeFile(filePath, JSON.stringify(content), (err) => {
      if (err) {
        console.error("Error stashing repo url to data file:", err);
      }
    });
  },

  onSuccess: async ({ constants }) => {
    // If the site has been deployed, we'll send the score to the leaderboard
    if (constants.IS_LOCAL) {
      console.log(
        "Local build. We'll only tell the leaderboard if it's deployed.",
      );
      return;
    }

    // avoid duplicates due to different protocols
    const url = new URL(process.env.URL);
    const protocol = url.protocol;
    if (protocol !== 'https:') {
        return;
    }

    await fetch("https://compose-challenge.netlify.app/submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: process.env.URL,
        excluded: false,
      }),
    });
  },
};