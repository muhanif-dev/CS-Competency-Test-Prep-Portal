import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../config/db.js";

import DatabaseQuestion from "../models/DatabaseQuestion.js";
import CybersecurityQuestion from "../models/CybersecurityQuestion.js";
import OperatingSystemQuestion from "../models/operatingSystemQuestion.js";
import ComputerNetworksQuestion from '../models/ComputerNetworksQuestion.js';
import WebDevelopmentQuestion from '../models/WebDevelopmentQuestion.js';
import ProblemSolvingQuestion from '../models/ProblemSolvingQuestion.js';
import ProgrammingQuestion from '../models/ProgrammingQuestion.js';
import SoftwareEngineeringQuestion from '../models/SoftwareEngineeringQuestion.js';
import AiMlQuestion from '../models/AiMlQuestion.js';
import DsaQuestion from '../models/DsaQuestion.js';

import databaseQuestions from "./databaseQuestions.js";
import cybersecurityQuestions from "./cybersecurityQuestions.js";
import operatingSystemQuestions from "./operatingSystemQuestions.js";
import computerNetworksQuestions from './computerNetworksQuestions.js';
import webDevelopmentQuestions from './webDevelopmentQuestions.js';
import problemSolvingQuestions from './problemSolvingQuestions.js';
import programmingQuestions from './programmingQuestions.js';
import softwareEngineeringQuestions from './softwareEngineeringQuestions.js';
import aiMlQuestions from './aiMlQuestions.js';
import dsaQuestions from './dsaQuestions.js';

const seed = async () => {
  try {
    await connectDB();
    console.log("🌱 Starting complete database seeding for ALL 10 subjects...\n");

    // 1. DATABASES
    await DatabaseQuestion.deleteMany({});
    const insDatabases = await DatabaseQuestion.insertMany(databaseQuestions);
    console.log(`✅ Databases: ${insDatabases.length} questions seeded.`);

    // 2. CYBER SECURITY
    await CybersecurityQuestion.deleteMany({});
    const insCyber = await CybersecurityQuestion.insertMany(cybersecurityQuestions);
    console.log(`✅ Cyber Security: ${insCyber.length} questions seeded.`);

    // 3. OPERATING SYSTEMS
    await OperatingSystemQuestion.deleteMany({});
    const insOS = await OperatingSystemQuestion.insertMany(operatingSystemQuestions);
    console.log(`✅ Operating Systems: ${insOS.length} questions seeded.`);

    // 4. COMPUTER NETWORKS & CLOUD COMPUTING
    await ComputerNetworksQuestion.deleteMany({});
    const insNetworks = await ComputerNetworksQuestion.insertMany(computerNetworksQuestions);
    console.log(`✅ Computer Networks & Cloud Computing: ${insNetworks.length} questions seeded.`);

    // 5. WEB DEVELOPMENT
    await WebDevelopmentQuestion.deleteMany({});
    const insWebDev = await WebDevelopmentQuestion.insertMany(webDevelopmentQuestions);
    console.log(`✅ Web Development: ${insWebDev.length} questions seeded.`);

    // 6. PROBLEM SOLVING & ANALYTICAL SKILLS
    await ProblemSolvingQuestion.deleteMany({});
    const insProblemSolving = await ProblemSolvingQuestion.insertMany(problemSolvingQuestions);
    console.log(`✅ Problem Solving and Analytical Skills: ${insProblemSolving.length} questions seeded.`);

    // 7. PROGRAMMING (C++/Java/Python)
    await ProgrammingQuestion.deleteMany({});
    const insProgramming = await ProgrammingQuestion.insertMany(programmingQuestions);
    console.log(`✅ Programming (C++/Java/Python): ${insProgramming.length} questions seeded.`);

    // 8. SOFTWARE ENGINEERING
    await SoftwareEngineeringQuestion.deleteMany({});
    const insSoftwareEng = await SoftwareEngineeringQuestion.insertMany(softwareEngineeringQuestions);
    console.log(`✅ Software Engineering: ${insSoftwareEng.length} questions seeded.`);

    // 9. AI / MACHINE LEARNING AND DATA ANALYTICS
    await AiMlQuestion.deleteMany({});
    const insAiMl = await AiMlQuestion.insertMany(aiMlQuestions);
    console.log(`✅ AI / Machine Learning and Data Analytics: ${insAiMl.length} questions seeded.`);

    // 10. DATA STRUCTURES & ALGORITHMS
    await DsaQuestion.deleteMany({});
    const insDsa = await DsaQuestion.insertMany(dsaQuestions);
    console.log(`✅ Data Structures & Algorithms: ${insDsa.length} questions seeded.`);

    const grandTotal = insDatabases.length + insCyber.length + insOS.length + insNetworks.length + insWebDev.length + insProblemSolving.length + insProgramming.length + insSoftwareEng.length + insAiMl.length + insDsa.length;

    console.log(`\n🎉 ALL 10 SUBJECTS seeded successfully! Total questions in Atlas: ${grandTotal}`);

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
