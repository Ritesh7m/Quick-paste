import Paste from "../models/Paste.js";

export const getPastes = async (req, res) => {
  try {
    const pastes = await Paste.find().sort({ createdAt: -1 });
    res.status(200).json(pastes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createPaste = async (req, res) => {
  try {
    const newPaste = new Paste(req.body);
    const savedPaste = await newPaste.save();
    res.status(201).json(savedPaste);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePaste = async (req, res) => {
  try {
    const updated = await Paste.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePaste = async (req, res) => {
  try {
    await Paste.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};