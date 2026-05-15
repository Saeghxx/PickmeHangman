const express = require("express")
const router = express.Router()
const Word = require("../models/Word")

router.get("/", async (req, res) => {
  const words = await Word.find()
  res.json(words)
})

router.get("/random", async (req, res) => {
  const { difficulty } = req.query
  const filter = difficulty ? { difficulty } : {}
  const words = await Word.find(filter)
  const random = words[Math.floor(Math.random() * words.length)]
  res.json(random)
})

module.exports = router