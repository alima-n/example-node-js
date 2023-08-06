const express = require("express");
const authMiddleware = require("../middleware/auth");
const {
  getRaspberryPisController,
  createRaspberryPisController,
  deleteRaspberryPi,
  updateRaspberryPisController,
} = require("../controllers/devices");

const router = express.Router();

router.get("/devices", authMiddleware, getRaspberryPisController);
router.post("/devices", authMiddleware, createRaspberryPisController);
router.put("/devices/:id", authMiddleware, updateRaspberryPisController);
router.delete("/devices/:id", authMiddleware, deleteRaspberryPi);

module.exports = router;
