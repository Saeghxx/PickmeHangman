const mongoose = require("mongoose")

const WordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  theme: { type: String, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" }
})

module.exports = mongoose.model("Word", WordSchema)