require("dotenv").config()
const mongoose = require("mongoose")
const Word = require("./models/Word")

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB connected")

    await Word.deleteMany({})

    await Word.insertMany([
   
      { word: "CAT", theme: "Animals - Fluffy House Pet", difficulty: "easy" },
      { word: "DOG", theme: "Animals - Loyal Best Friend", difficulty: "easy" },
      { word: "COW", theme: "Animals - Farm Dairy Queen", difficulty: "easy" },
      { word: "PIG", theme: "Animals - Cute Farm Buddy", difficulty: "easy" },
      { word: "HEN", theme: "Animals - Feathery Farm Girl", difficulty: "easy" },
      { word: "FOX", theme: "Animals - Sneaky Forest Trickster", difficulty: "easy" },
      { word: "OWL", theme: "Animals - Wise Night Watcher", difficulty: "easy" },
      { word: "BEE", theme: "Animals - Tiny Honey Maker", difficulty: "easy" },
      { word: "BAT", theme: "Animals - Spooky Night Flyer", difficulty: "easy" },
      { word: "RAT", theme: "Animals - Clever Little Rodent", difficulty: "easy" },
      { word: "FROG", theme: "Animals - Jumpy Pond Resident", difficulty: "easy" },
      { word: "DUCK", theme: "Animals - Quacking Water Bird", difficulty: "easy" },
      { word: "BEAR", theme: "Animals - Fluffy Forest Giant", difficulty: "easy" },
      { word: "WOLF", theme: "Animals - Wild Pack Hunter", difficulty: "easy" },
      { word: "DEER", theme: "Animals - Graceful Forest Runner", difficulty: "easy" },
      { word: "CAKE", theme: "Food - Sweet Birthday Treat", difficulty: "easy" },
      { word: "MILK", theme: "Food - Creamy White Drink", difficulty: "easy" },
      { word: "RICE", theme: "Food - Asian Staple Grain", difficulty: "easy" },
      { word: "SOUP", theme: "Food - Warm Cozy Bowl", difficulty: "easy" },
      { word: "FISH", theme: "Food - Ocean Fresh Dinner", difficulty: "easy" },
      { word: "CORN", theme: "Food - Golden Summer Veggie", difficulty: "easy" },
      { word: "EGGS", theme: "Food - Breakfast Classic", difficulty: "easy" },
      { word: "PIE", theme: "Food - Grandmas Sweet Secret", difficulty: "easy" },
      { word: "JAM", theme: "Food - Fruity Bread Spread", difficulty: "easy" },
      { word: "TACO", theme: "Food - Crunchy Mexican Snack", difficulty: "easy" },
      { word: "PIZZA", theme: "Food - Cheesy Italian Legend", difficulty: "easy" },
      { word: "BREAD", theme: "Food - Freshly Baked Loaf", difficulty: "easy" },
      { word: "HONEY", theme: "Food - Golden Bee Gift", difficulty: "easy" },
      { word: "PASTA", theme: "Food - Italian Comfort Dish", difficulty: "easy" },
      { word: "DONUT", theme: "Food - Glazed Ring of Joy", difficulty: "easy" },

      { word: "NARUTO", theme: "Anime - Shonen Adventure Series", difficulty: "medium" },
      { word: "BLEACH", theme: "Anime - Supernatural Action", difficulty: "medium" },
      { word: "DEATHNOTE", theme: "Anime - Psychological Thriller", difficulty: "medium" },
      { word: "GINTAMA", theme: "Anime - Comedy Action Series", difficulty: "medium" },
      { word: "DORORO", theme: "Anime - Dark Samurai Story", difficulty: "medium" },
      { word: "AKIRA", theme: "Anime - Cyberpunk Classic Movie", difficulty: "medium" },
      { word: "EVANGELION", theme: "Anime - Mecha Psychological Drama", difficulty: "medium" },
      { word: "BERSERK", theme: "Anime - Dark Fantasy Epic", difficulty: "medium" },
      { word: "PANDA", theme: "Anime - Jujutsu Kaisen Character", difficulty: "medium" },
      { word: "ONEPIECE", theme: "Anime - Pirate Adventure Series", difficulty: "medium" },
      { word: "NANA", theme: "Anime - Romance Drama Series", difficulty: "medium" },
      { word: "PARASYTE", theme: "Anime - Sci-Fi Horror", difficulty: "medium" },
      { word: "TOKYO", theme: "Anime - Tokyo Ghoul Universe", difficulty: "medium" },
      { word: "SOUL", theme: "Anime - Soul Eater Universe", difficulty: "medium" },
      { word: "DRAGON", theme: "Anime - Dragon Ball Universe", difficulty: "medium" },
      { word: "SAILOR", theme: "Anime - Sailor Moon Magic Series", difficulty: "medium" },
      { word: "INUYASHA", theme: "Anime - Historical Fantasy Adventure", difficulty: "medium" },
      { word: "HUNTER", theme: "Anime - Hunter x Hunter World", difficulty: "medium" },
      { word: "SHINJI", theme: "Anime - Evangelion Main Character", difficulty: "medium" },
      { word: "LIGHT", theme: "Anime - Death Note Main Character", difficulty: "medium" },

      { word: "JAVASCRIPT", theme: "Programming - The Language of the Web", difficulty: "hard" },
      { word: "ALGORITHM", theme: "Programming - Step by Step Problem Solver", difficulty: "hard" },
      { word: "COMPONENT", theme: "Programming - React Building Block", difficulty: "hard" },
      { word: "VARIABLE", theme: "Programming - Data Storage Container", difficulty: "hard" },
      { word: "FUNCTION", theme: "Programming - Reusable Code Block", difficulty: "hard" },
      { word: "DEVELOPER", theme: "Programming - Code Wizard Career", difficulty: "hard" },
      { word: "DATABASE", theme: "Programming - Data Storage System", difficulty: "hard" },
      { word: "FRAMEWORK", theme: "Programming - Dev Toolkit Structure", difficulty: "hard" },
      { word: "INTERFACE", theme: "Programming - User Interaction Layer", difficulty: "hard" },
      { word: "MIDDLEWARE", theme: "Programming - Backend Request Handler", difficulty: "hard" },
      { word: "ASYNCHRONOUS", theme: "Programming - Non-Blocking Code Flow", difficulty: "hard" },
      { word: "NORMALIZATION", theme: "Programming - Database Design Concept", difficulty: "hard" },
      { word: "RECURSION", theme: "Programming - Function Calling Itself", difficulty: "hard" },
      { word: "DEBUGGING", theme: "Programming - Bug Hunting Process", difficulty: "hard" },
      { word: "REFACTORING", theme: "Programming - Code Cleanup Art", difficulty: "hard" },
    ])

    console.log("Words inserted!")
    await mongoose.disconnect()
  } catch (err) {
    console.log(err)
  }
}

seed()