import "dotenv/config";

import mongoose from "mongoose";

import connectDB from "../config/db.js";

import DatabaseQuestion from "../models/DatabaseQuestion.js";
import CybersecurityQuestion from "../models/CybersecurityQuestion.js";
import OperatingSystemQuestion from "../models/operatingSystemQuestion.js";

import databaseQuestions from "./databaseQuestions.js";
import cybersecurityQuestions from "./cybersecurityQuestions.js";
import operatingSystemQuestions from "./operatingSystemQuestions.js";

import ComputerNetworksQuestion from '../models/ComputerNetworksQuestion.js'
import computerNetworksQuestions from './computerNetworksQuestions.js'

const seed = async () => {
  try {
    await connectDB();

    console.log("🌱 Starting database seeding...\n");

    // -----------------------------
    // DATABASE QUESTIONS
    // -----------------------------

    await DatabaseQuestion.deleteMany({});

    const insertedDatabaseQuestions =
      await DatabaseQuestion.insertMany(databaseQuestions);

    console.log(
      `✅ Databases: ${insertedDatabaseQuestions.length} questions seeded.`,
    );

    // -----------------------------
    // CYBER SECURITY QUESTIONS
    // -----------------------------

    await CybersecurityQuestion.deleteMany({});

    const insertedCybersecurityQuestions =
      await CybersecurityQuestion.insertMany(cybersecurityQuestions);

    console.log(
      `✅ Cyber Security: ${insertedCybersecurityQuestions.length} questions seeded.`,
    );

    // -----------------------------
    // OPERATING SYSTEM QUESTIONS
    // -----------------------------

    await OperatingSystemQuestion.deleteMany({});

    const insertedOperatingSystemQuestions =
      await OperatingSystemQuestion.insertMany(operatingSystemQuestions);

    console.log(
      `✅ Operating Systems: ${insertedOperatingSystemQuestions.length} questions seeded.`,
    );


   // -----------------------------
// COMPUTER NETWORKS & CLOUD COMPUTING
// -----------------------------

await ComputerNetworksQuestion.deleteMany({})

const insertedComputerNetworksQuestions =
  await ComputerNetworksQuestion.insertMany(
    computerNetworksQuestions,
  )

console.log(
  `✅ Computer Networks & Cloud Computing: ${insertedComputerNetworksQuestions.length} questions seeded.`,
)

    console.log("\n🎉 All questions seeded successfully!");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:");
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seed();
