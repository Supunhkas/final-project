const express = require("express");
const axios = require("axios");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/disease-detection", async (req, res) => {
  try {
    const image = fs.readFileSync(req.body.filePath, { encoding: "base64" });

    const response = await axios({
      method: "POST",
      url: "https://detect.roboflow.com/nail-disease-detection-system/3",
      params: {
        api_key: "uaZamnbnrVZrva9hch1A",
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
