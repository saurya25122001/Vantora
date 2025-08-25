import express from "express";
import cors from "cors";

const app = express();

// ✅ Allow your deployed frontend
const allowedOrigins = [
  "http://localhost:3000",              // local dev
  "https://your-frontend.vercel.app"    // deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin"));
    }
  },
  credentials: true, // if you’re using cookies/auth
}));

// Example route
app.get("/api/v2/test", (req, res) => {
  res.json({ msg: "CORS working 🚀" });
});

export default app;
