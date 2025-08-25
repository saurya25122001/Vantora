const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// ✅ Fix CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",          // local React app
      process.env.FRONTEND_URL          // deployed Vercel frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// ----------------- TEST ROUTE -----------------
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working fine 🚀" });
});

// ----------------- AUTH ROUTE -----------------
app.post("/login-user", (req, res) => {
  // just sample response, replace with real logic
  res.json({ success: true, message: "Login route working" });
});

// ----------------- START SERVER -----------------
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
