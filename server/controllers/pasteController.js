import Paste from "../models/Paste.js"
import { nanoid } from "nanoid"

export const getPastes = async (req, res) => {
  try {
    const pastes = await Paste.find().sort({ createdAt: -1 })
    res.status(200).json(pastes)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getPasteBySlug = async (req, res) => {
  try {
    const paste = await Paste.findOne({ slug: req.params.slug })
    if (!paste) {
      return res.status(404).json({ error: "Paste not found" })
    }
    res.status(200).json(paste)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getPasteById = async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id)
    if (!paste) {
      return res.status(404).json({ error: "Paste not found" })
    }
    res.status(200).json(paste)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const createPaste = async (req, res) => {
  try {
    let slug
    let isUnique = false
    while (!isUnique) {
      slug = nanoid(7)
      const existing = await Paste.findOne({ slug })
      if (!existing) isUnique = true
    }

    const newPaste = new Paste({
      ...req.body,
      slug,
    })
    const savedPaste = await newPaste.save()
    res.status(201).json(savedPaste)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const updatePaste = async (req, res) => {
  try {
    const updated = await Paste.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deletePaste = async (req, res) => {
  try {
    await Paste.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
