const express = require("express");
const Reservation = require("../models/reservation.model");
const logger = require("../config/logger"); // Import your Winston logger

const router = express.Router();

let feedbackRouter;



try {
  feedbackRouter = require("./feedbackRouter");
} catch (error) {
  logger.error("Error loading feedbackRouter:", error); // Log the error with Winston
  feedbackRouter = (req, res) => {
    res
      .status(500)
      .json({ error: "Feedback functionality is currently unavailable" });
  };
}


router.get("/", (req, res) => {
  res.json({
    message: "Welcome to the restaurant API!",
    version: "1.0.0",
    endpoints: {
      Reservation: "/reservation",
      Feedback: "/feedback", // Added feedback endpoint documentation
    },
    documentation: "https://api-docs-url.com",
  });
});


router.use("/admin", require("./adminRouter"));
router.use("/feedback", feedbackRouter);
router.use("/user", require("./customerRouter"));
router.use("/reservation", require("./reservationRouter"));
router.use("/newsletter", require("./newsletterRoute"));


module.exports = router;
