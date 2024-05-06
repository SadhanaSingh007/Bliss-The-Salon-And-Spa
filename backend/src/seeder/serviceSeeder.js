import mongoose from "mongoose";
import Services from "../models/Services.js";
import { config } from "dotenv";

const servicesData = [
  {
    title: "Manicure",
    description: "Nail care and manicure service",
    price: 20,
    duration: "1 hr",
  },
  
  {
    title: "Pedicure",
    description: "Nail care and pedicure service",
    price: 25,
    duration: "1 hr",
    
  },
  {
    title: "Long layers-Haircut",
    description: "Professional Haircut with Step Layers.",
    price: 30,
    duration: "1 hr",
    
  },
  {
    title: "Lob-Haircut",
    description: "An asymmetrical lob is a shorter and medium-length Professional haircut ",
    price: 25,
    duration: "1 hr",
    
  },

  {
    title: "Hot Stone-Massage",
    description: "A hot stone massage is gentle massage to ease mental and physical tension..",
    price: 70,
    duration: "1 hr",
  },
  {
    title: "Swedish-Massage",
    description: "Swedish massage is a gentle full-body massage, ideal for those who are new to massage, stressed, and sensitive to touch.",
    price: 40,
    duration: "1 hr",
  },
  {
    title: "Classic-Facial",
    description: "Classic facial includes deep cleansing, toning, exfoliating, a head and neck massage, and a face mask.",
    price: 40,
    duration: "1 hr",
    
  },
  {
    title: "Hydra-Facial",
    description: "The hydrafacial is, as you might expect, a cleansing and hydrating facial that tackles dehydrated, dull skin and restores a dewy glow.",
    price: 50,
    duration: "1 hr",
    
  },
  {
    title: "Light therapy",
    description: "LED light therapy facials use different colored LED lights to penetrate the skin, targeting specific concerns such as acne, hyperpigmentation, or fine lines.",
    price: 90,
    duration: "1 hr",
    
  },
];
// Function to seed services into the database
async function seedServices() {
  try {
    // Clear existing services
    await Services.deleteMany();

    // Insert the new services
    await Services.insertMany(servicesData);

    console.log("Services seeded successfully.");
  } catch (err) {
    console.error("Error seeding services:", err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}
config();
// Connect to the database and run the seeder function
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Connected to the database.");
    seedServices();
  })
  .catch((err) => console.error("Error connecting to the database:", err));
