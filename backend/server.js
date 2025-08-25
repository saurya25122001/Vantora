// server.js
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Custom modules
const connectDatabase = require("./db/Database");
const ErrorHandler = require("./middleware/error");

// Load environment variables
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config/.env" });
}

const app = express();

// Connect database
connectDatabase();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

// CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman) or allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
}));

// Serve static uploads
app.use("/", express.static("uploads"));

// Test route
app.get("/test", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/v2/user", require("./controller/user"));
app.use("/api/v2/conversation", require("./controller/conversation"));
app.use("/api/v2/message", require("./controller/message"));
app.use("/api/v2/order", require("./controller/order"));
app.use("/api/v2/shop", require("./controller/shop"));
app.use("/api/v2/product", require("./controller/product"));
app.use("/api/v2/event", require("./controller/event"));
app.use("/api/v2/coupon", require("./controller/coupounCode"));
app.use("/api/v2/payment", require("./controller/payment"));
app.use("/api/v2/withdraw", require("./controller/withdraw"));

// Error handler
app.use(ErrorHandler);

// Start server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  server.close(() => process.exit(1));
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
