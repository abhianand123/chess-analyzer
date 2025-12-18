import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import apiRouter from "./api";

const app = express();

app.use(express.json());

app.use("/static",
    express.static(path.join(__dirname, "public"))
);

app.use("/api", apiRouter);

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "public/pages/report/index.html"));
});

app.get("/privacy", async (req, res) => {
    res.sendFile(path.join(__dirname, "public/pages/privacy/index.html"));
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;