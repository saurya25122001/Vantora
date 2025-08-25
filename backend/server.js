const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ FIXED: Apply CORS before routes
app.use(
  cors({
    origin: [
      "http://localhost:3000",              // local frontend
      process.env.FRONTEND_URL || "*"       // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Allow preflight requests
app.options("*", cors());

app.use(express.json());

// ----------------- TEST ROUTE -----------------
app.get("/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

// ----------------- SAMPLE ROUTES -----------------
app.get("/getSeller", (req, res) => {
  res.json({ seller: "Demo Seller" });
});

app.get("/get-all-events", (req, res) => {
  res.json([{ id: 1, name: "Event 1" }]);
});

app.get("/get-all-products", (req, res) => {
  res.json([{ id: 1, name: "Product 1" }]);
});

app.get("/getuser", (req, res) => {
  res.json({ user: "Demo User" });
});

app.get("/stripeapikey", (req, res) => {
  res.json({ key: "pk_test_123" });
});

app.post("/login-user", (req, res) => {
  res.json({ success: true, message: "Login success 🚀" });
});

// ----------------- START SERVER -----------------
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
