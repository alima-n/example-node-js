const { RaspberryPi } = require("../models/raspberryPi");

const getRaspberryPisController = async (req, res) => {
  try {
    const raspberryPis = await RaspberryPi.find({ userId: req.userId })
      .sort("-_id")
      .select("-userId -__v");

    return res.json(raspberryPis);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createRaspberryPisController = async (req, res) => {
  try {
    const raspberryPi = new RaspberryPi({
      ...req.body,
      userId: req.userId,
    });

    await raspberryPi.save();

    res.status(201).json({ message: "Raspberry Pi added successfully" });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      res.status(409).json({
        message: `The following values already exist in the database: ${Object.values(
          error.keyValue
        ).join(", ")}`,
      });
    } else {
      res.status(500).json({ message: error });
    }
  }
};

const updateRaspberryPisController = async (req, res) => {
  try {
    const raspberryPi = await RaspberryPi.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-userId -__v");

    if (!raspberryPi) {
      return res.status(404).json({ message: "RaspberryPi not found" });
    }

    res.status(200).json(raspberryPi);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteRaspberryPi = async (req, res) => {
  try {
    const raspberryPi = await RaspberryPi.findByIdAndDelete(req.params.id);

    if (!raspberryPi) {
      return res.status(404).json({ message: "RaspberryPi not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getRaspberryPisController,
  createRaspberryPisController,
  updateRaspberryPisController,
  deleteRaspberryPi,
};
