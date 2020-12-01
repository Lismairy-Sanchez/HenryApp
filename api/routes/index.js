const express = require("express");
const router = express();
const userRoutes = require("./user");
const cohortRoutes = require("./cohort");
const adminRoutes = require("./admin");
const instructorRoutes = require("./instructor");
const PpRoutes = require("./pair-programming");
const groupRoutes = require("./group");
const authRoutes = require("./auth");
const emailRoutes = require("./email");
const calendarRoutes = require("./calendar")
const moduleRoutes = require("./module");
const feedbackRoutes = require("./feedback");
const clasesRoutes = require("./clases")


router.use("/admin", adminRoutes);
router.use("/cohort", cohortRoutes);
router.use("/student", userRoutes);
router.use("/feedback", feedbackRoutes);
router.use("/instructor", instructorRoutes);
router.use("/PP", PpRoutes);
router.use("/group", groupRoutes);
router.use("/auth", authRoutes);
router.use("/email", emailRoutes);
router.use("/calendar", calendarRoutes);
router.use("/module", moduleRoutes);
router.use("/clases", clasesRoutes)


module.exports = router;