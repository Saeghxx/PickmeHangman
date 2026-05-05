require("dotenv").config()
const mongoose = require("mongoose")
const Word = require("./models/Word")

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected")

    await Word.insertMany([
      { word: "REACT", theme: "frontend" },
      { word: "NODE", theme: "backend" },
      { word: "MONGO", theme: "database" }, 
      { word: "JAVASCRIPT", theme: "Programming" },
  { word: "REACT", theme: "Frontend" },
  { word: "FUNCTION", theme: "Programming Concept" },
  { word: "VARIABLE", theme: "Programming Concept" },
  { word: "COMPONENT", theme: "React" },
  { word: "DEVELOPER", theme: "Career" },
  { word: "ALGORITHM", theme: "Computer Science" },
  { word: "OBJECT", theme: "Programming" },
  { word: "ARRAY", theme: "Data Structure" },
  { word: "ASYNC", theme: "JavaScript" },
  { word: "PROMISE", theme: "JavaScript" },
  { word: "DEBUG", theme: "Programming" }
    ])

    console.log("Words inserted")

    await mongoose.disconnect()
  } catch (err) {
    console.log(err)
  }
}

seed()