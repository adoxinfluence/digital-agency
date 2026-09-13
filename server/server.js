const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// FormHub business knowledge load करें
const knowledgePath = path.join(
    __dirname,
    "..",
    "ai",
    "business-knowledge.txt"
);

const businessKnowledge = fs.readFileSync(
    knowledgePath,
    "utf-8"
);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "FormHub AI backend is running.",
        knowledgeLoaded: businessKnowledge.length > 0
    });
});

app.listen(PORT, () => {
    console.log(`FormHub AI server running at http://localhost:${PORT}`);
});


// LOCAL HOST CHAT BOAT

app.post("/api/chat", (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({
            error: "Message is required."
        });
    }

    const message = userMessage.toLowerCase();

    let reply;

    if (
        message.includes("service") ||
        message.includes("services") ||
        message.includes("क्या service") ||
        message.includes("kya service")
    ) {
        reply =
            "FormHub एक digital agency है जो Website Design & Development, WordPress Website, Video Editing, Graphic Design, Thumbnail / Poster / Logo Design और SEO services प्रदान करती है।";
    }

    else if (
        message.includes("price") ||
        message.includes("pricing") ||
        message.includes("cost") ||
        message.includes("कीमत") ||
        message.includes("kitna")
    ) {
        reply =
            "FormHub में fixed public pricing नहीं है। हर project के requirements, scope, design complexity, features और technical needs के अनुसार custom quote दिया जाता है। Exact quote के लिए FormHub से contact करें।";
    }

    else if (
        message.includes("contact") ||
        message.includes("whatsapp") ||
        message.includes("number") ||
        message.includes("फोन")
    ) {
        reply =
            "आप FormHub से +91 9389669126 पर Phone या WhatsApp के माध्यम से contact कर सकते हैं।";
    }

    else if (
        message.includes("time") ||
        message.includes("timing") ||
        message.includes("working hours") ||
        message.includes("समय")
    ) {
        reply =
            "FormHub की working hours सुबह 8:00 बजे से रात 10:00 बजे तक हैं।";
    }

    else {
        reply =
            "मैं FormHub की services, pricing, project process और contact information के बारे में मदद कर सकता हूँ। अपना सवाल थोड़ा detail में पूछें।";
    }

    res.json({
        reply: reply
    });
});