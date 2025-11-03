import mongoose from "mongoose"

const pasteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, unique: true, required: true, index: true },
    language: { type: String, default: "text" },
  },
  { timestamps: true },
)

export default mongoose.model("Paste", pasteSchema)
