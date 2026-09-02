import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Doctor from './models/doctor.model.js';
import Specialty from './models/specialty.model.js';
import Procedure from './models/procedure.model.js';
import Review from './models/review.model.js';
import Article from './models/article.model.js';
import FAQ from './models/faq.model.js';
import { seedAdminUser } from './seedAdmin.js';

const doctorData = {
  id: 1,
  name: "Dr. Arjun Sharma",
  title: "MD, DM (Cardiology), FESC",
  specialty: "Interventional Cardiologist",
  tagline: "Expert Care. Personal Attention. Better Health.",
  bio: "Dr. Arjun Sharma is a board-certified Interventional Cardiologist with over 18 years of experience in diagnosing and treating complex cardiovascular conditions. He completed his medical training at AIIMS New Delhi and his fellowship at the Cleveland Clinic, USA. Known for his compassionate approach and cutting-edge techniques, Dr. Sharma has performed over 5,000 successful cardiac procedures and has helped thousands of patients reclaim their heart health.",
  shortBio: "Board-certified Interventional Cardiologist with 18+ years of experience. Trained at AIIMS New Delhi & Cleveland Clinic, USA.",
  mission: "To deliver world-class cardiac care with empathy, precision, and innovation — ensuring every patient feels heard, respected, and empowered in their health journey.",
  quote: "The heart is not just a pump. It is the center of life. I treat every patient as if they were my own family.",
  phone: "+91 98765 43210",
  email: "dr.sharma@heartcare.in",
  address: "Suite 401, Medicity Tower, Sector 44, Gurugram, Haryana 122003",
  workingHours: [
    { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { day: "Saturday", time: "9:00 AM – 2:00 PM" },
    { day: "Sunday", time: "Emergency Only" },
  ],
  stats: [
    { label: "Years Experience", value: "18+", icon: "award" },
    { label: "Patients Treated", value: "12,000+", icon: "users" },
    { label: "Procedures Done", value: "5,000+", icon: "activity" },
    { label: "Awards Won", value: "24", icon: "award" },
  ],
  socials: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  values: [
    {
      icon: "heart",
      title: "Patient First",
      desc: "Every decision is made with the patient's best interest at heart.",
    },
    {
      icon: "shield",
      title: "Evidence-Based Care",
      desc: "Treatment plans grounded in the latest clinical research and guidelines.",
    },
    {
      icon: "zap",
      title: "Innovation",
      desc: "Leveraging the most advanced cardiac technologies available.",
    },
    {
      icon: "users",
      title: "Holistic Approach",
      desc: "Treating the whole person — mind, body, and lifestyle — not just symptoms.",
    },
  ],
};

const specialtiesData = [
  {
    id: 1,
    slug: "coronary-artery-disease",
    icon: "heart",
    title: "Coronary Artery Disease",
    shortDesc: "Comprehensive diagnosis and treatment of blocked or narrowed coronary arteries.",
    fullDesc: "Coronary Artery Disease (CAD) is the most common type of heart disease. Dr. Sharma specializes in both medical management and interventional treatment of CAD, including balloon angioplasty and stent placement.",
    color: "#e74c6e",
  },
  {
    id: 2,
    slug: "heart-failure",
    icon: "activity",
    title: "Heart Failure Management",
    shortDesc: "Advanced management strategies for acute and chronic heart failure conditions.",
    fullDesc: "Heart failure occurs when the heart cannot pump enough blood. Dr. Sharma provides comprehensive heart failure programs including medication optimization, device therapy, and lifestyle counseling.",
    color: "#1a6bbd",
  },
  {
    id: 3,
    slug: "arrhythmia",
    icon: "zap",
    title: "Cardiac Arrhythmia",
    shortDesc: "Diagnosis and treatment of irregular heart rhythms using modern techniques.",
    fullDesc: "Arrhythmias are irregular heartbeat patterns. Dr. Sharma is expert in evaluating and treating all types of arrhythmias including atrial fibrillation, ventricular tachycardia, and bradyarrhythmias.",
    color: "#0ea5a0",
  },
  {
    id: 4,
    slug: "hypertension",
    icon: "trending-up",
    title: "Hypertension & Risk",
    shortDesc: "Personalized blood pressure management to prevent cardiovascular events.",
    fullDesc: "Hypertension is a major risk factor for heart disease and stroke. Dr. Sharma provides evidence-based hypertension management with a focus on long-term cardiovascular risk reduction.",
    color: "#7c3aed",
  },
  {
    id: 5,
    slug: "preventive-cardiology",
    icon: "shield",
    title: "Preventive Cardiology",
    shortDesc: "Proactive strategies to reduce your lifetime risk of heart disease.",
    fullDesc: "Prevention is better than cure. Dr. Sharma's preventive cardiology program includes comprehensive risk assessment, lifestyle optimization, genetic counseling, and early intervention strategies.",
    color: "#059669",
  },
  {
    id: 6,
    slug: "structural-heart",
    icon: "layers",
    title: "Structural Heart Disease",
    shortDesc: "Minimally invasive repair of structural cardiac defects and valve disease.",
    fullDesc: "Structural heart disease includes conditions affecting the heart valves, walls, and chambers. Dr. Sharma specializes in TAVR, MitraClip, ASD/VSD closure, and other structural interventions.",
    color: "#d97706",
  },
];

const proceduresData = [
  {
    id: 1,
    specialtyId: 1,
    category: "Interventional",
    title: "Coronary Angioplasty & Stenting",
    desc: "A minimally invasive procedure to open blocked coronary arteries using a balloon catheter and drug-eluting stent.",
    duration: "1–2 hours",
    recovery: "1–2 days",
    anesthesia: "Local + sedation",
  },
  {
    id: 2,
    specialtyId: 1,
    category: "Diagnostic",
    title: "Coronary Angiography",
    desc: "An X-ray imaging procedure to visualize the coronary arteries with contrast dye and identify blockages with sub-millimeter precision.",
    duration: "30–60 minutes",
    recovery: "Same day",
    anesthesia: "Local",
  },
  {
    id: 3,
    specialtyId: 2,
    category: "Interventional",
    title: "Cardiac Resynchronization Therapy (CRT)",
    desc: "Device therapy to coordinate the contractions of the heart's ventricles in heart failure patients.",
    duration: "2–3 hours",
    recovery: "2–3 days",
    anesthesia: "General/Local",
  },
  {
    id: 4,
    specialtyId: 3,
    category: "Interventional",
    title: "Radiofrequency Ablation",
    desc: "A procedure using heat energy to destroy abnormal heart tissue causing arrhythmia and restore normal sinus rhythm.",
    duration: "2–4 hours",
    recovery: "1–2 days",
    anesthesia: "Sedation",
  },
  {
    id: 5,
    specialtyId: 3,
    category: "Interventional",
    title: "Pacemaker Implantation",
    desc: "Surgical placement of a small device to regulate slow or irregular heartbeats with intelligent pacing algorithms.",
    duration: "1–2 hours",
    recovery: "1–2 days",
    anesthesia: "Local",
  },
  {
    id: 6,
    specialtyId: 6,
    category: "Structural",
    title: "TAVR (Transcatheter Aortic Valve Replacement)",
    desc: "A minimally invasive catheter procedure to replace a diseased aortic valve without open-heart surgery.",
    duration: "2–3 hours",
    recovery: "3–5 days",
    anesthesia: "General",
  },
  {
    id: 7,
    specialtyId: 1,
    category: "Diagnostic",
    title: "Stress Echocardiography",
    desc: "An ultrasound of the heart performed during treadmill exercise or pharmacological stress to detect ischemia.",
    duration: "45–60 minutes",
    recovery: "Same day",
    anesthesia: "None",
  },
  {
    id: 8,
    specialtyId: 5,
    category: "Preventive",
    title: "Cardiac CT Calcium Scoring",
    desc: "A rapid, non-invasive CT scan to measure calcified plaque in coronary arteries as an early risk marker.",
    duration: "15–20 minutes",
    recovery: "Immediate",
    anesthesia: "None",
  },
];

const reviewsData = [
  {
    id: 1,
    name: "Rajesh Khanna",
    age: 58,
    condition: "Coronary Angioplasty",
    rating: 5,
    review: "Dr. Sharma literally saved my life. His calm demeanor and extraordinary skill gave me total confidence before the angioplasty. Two years later, I'm healthier than ever.",
    avatar: "RK",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Sunita Patel",
    age: 52,
    condition: "Hypertension & CAD Prevention",
    rating: 5,
    review: "The most thorough, patient, and compassionate doctor I have ever visited. He explained my condition using diagrams and gave me a clear, manageable plan. Highly recommended.",
    avatar: "SP",
    date: "2024-01-28",
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    age: 65,
    condition: "TAVR Procedure",
    rating: 5,
    review: "My family was terrified of open-heart surgery for my mother. Dr. Sharma performed TAVR and she was walking the very next day. A true miracle worker.",
    avatar: "VM",
    date: "2024-02-04",
  },
  {
    id: 4,
    name: "Ananya Deshmukh",
    age: 44,
    condition: "Cardiac Arrhythmia",
    rating: 5,
    review: "After years of misdiagnoses, Dr. Sharma identified my arrhythmia within the first consultation. The ablation procedure completely resolved it.",
    avatar: "AD",
    date: "2024-02-18",
  },
  {
    id: 5,
    name: "Harish Gupta",
    age: 61,
    condition: "Heart Failure Management",
    rating: 5,
    review: "Dr. Sharma doesn't just treat heart disease; he treats the person. His holistic guidance on diet, exercise, and medication transformed my quality of life completely.",
    avatar: "HG",
    date: "2024-02-25",
  },
  {
    id: 6,
    name: "Meera Sen",
    age: 49,
    condition: "Preventive Cardiology",
    rating: 5,
    review: "With strong family history of early heart attacks, I went to Dr. Sharma for screening. His advanced lipid profile and CT scoring gave me clear roadmap for prevention.",
    avatar: "MS",
    date: "2024-03-02",
  },
];

const articlesData = [
  {
    id: 1,
    slug: "understanding-coronary-artery-disease",
    title: "Understanding Coronary Artery Disease: Prevention, Symptoms & Treatment",
    category: "Heart Disease",
    excerpt: "Learn about the leading cause of heart attacks, risk factors, and proactive steps you can take to protect your cardiovascular system.",
    content: "Coronary Artery Disease (CAD) develops when the major blood vessels that supply your heart become damaged or diseased. Plaque buildup (cholesterol deposits) is usually the cause. Regular screening and lifestyle changes are your first line of defense...",
    readTime: "5 min read",
    date: "2024-02-10",
    featured: true,
    tags: ["CAD", "heart attack", "prevention", "cholesterol"],
  },
  {
    id: 2,
    slug: "hypertension-the-silent-killer",
    title: "Hypertension: The Silent Killer and How to Control It",
    category: "Hypertension",
    excerpt: "High blood pressure often has no warning signs. Discover why regular monitoring is crucial and practical ways to keep it in check.",
    content: "Hypertension is called a silent killer because it often has no warning signs or symptoms until serious damage has occurred. Maintaining blood pressure below 120/80 mmHg through DASH diet, salt restriction, and daily exercise can add a decade to your life...",
    readTime: "4 min read",
    date: "2024-02-05",
    featured: false,
    tags: ["hypertension", "blood pressure", "lifestyle"],
  },
  {
    id: 3,
    slug: "heart-attack-vs-cardiac-arrest",
    title: "Heart Attack vs Cardiac Arrest: Knowing the Life-Saving Difference",
    category: "Emergency",
    excerpt: "These two cardiac events are often confused, but knowing the difference can literally save a life in an emergency.",
    content: "A heart attack is a circulation problem where blood flow to the heart muscle is blocked. Cardiac arrest is an electrical problem where the heart abruptly malfunctions and stops beating unexpectedly. Immediate CPR and AED deployment are vital in cardiac arrest...",
    readTime: "6 min read",
    date: "2024-01-29",
    featured: false,
    tags: ["emergency", "cardiac arrest", "heart attack", "first aid"],
  },
  {
    id: 4,
    slug: "cardiac-diet-foods-that-heal",
    title: "The Cardiac Diet: 8 Foods That Actively Protect Your Arteries",
    category: "Nutrition",
    excerpt: "Evidence-backed nutritional advice on what to eat — and what to avoid — for lasting heart health.",
    content: "What you eat directly impacts vascular inflammation and endothelial function. Incorporating fatty fish, walnuts, leafy greens, berries, oats, extra virgin olive oil, and garlic has been shown to reduce cardiac events by up to 30%...",
    readTime: "5 min read",
    date: "2024-01-20",
    featured: false,
    tags: ["diet", "nutrition", "cholesterol", "heart food"],
  },
  {
    id: 5,
    slug: "angioplasty-what-to-expect",
    title: "Undergoing an Angioplasty: A Patient's Step-by-Step Guide",
    category: "Procedures",
    excerpt: "A clear, reassuring walkthrough of what happens before, during, and after a coronary angioplasty and stenting procedure.",
    content: "If your doctor has recommended an angioplasty, knowing what to expect can ease anxiety. The procedure is performed through a tiny wrist or groin puncture under local anesthesia and takes only 1 to 2 hours with most patients discharged within 24 hours...",
    readTime: "7 min read",
    date: "2024-01-14",
    featured: false,
    tags: ["angioplasty", "stent", "procedure", "recovery"],
  },
  {
    id: 6,
    slug: "atrial-fibrillation-explained",
    title: "Atrial Fibrillation: Managing the Most Common Heart Rhythm Disorder",
    category: "Arrhythmia",
    excerpt: "What causes AFib, the stroke risk associated with it, and modern catheter ablation treatments that cure it.",
    content: "Atrial fibrillation is an irregular and often very rapid heartbeat that can lead to blood clots in the heart and increase stroke risk five-fold. Early detection through ECG and modern catheter ablation techniques offer long-term cure for many patients...",
    readTime: "5 min read",
    date: "2024-01-08",
    featured: false,
    tags: ["AFib", "arrhythmia", "ablation", "stroke prevention"],
  },
];

const faqsData = [
  {
    id: 1,
    category: "Appointments",
    question: "How do I book an appointment with Dr. Sharma?",
    answer: "You can book an appointment using the 'Book Appointment' button on this website, calling our clinic at +91 98765 43210, or emailing dr.sharma@heartcare.in. Our team confirms all online bookings within 24 hours.",
  },
  {
    id: 2,
    category: "Appointments",
    question: "What documents should I bring for my first consultation?",
    answer: "Please bring all recent medical reports, ECG tracings, blood test results (especially lipid profile, HbA1c, kidney function), current prescription list, and any prior angiography or echocardiogram CDs/reports.",
  },
  {
    id: 3,
    category: "Appointments",
    question: "Do you accept health insurance and cashless claims?",
    answer: "Yes, our associated hospital (Medicity Heart Centre) is empaneled with all major government and private health insurance TPAs for cashless hospitalization and cardiac procedures.",
  },
  {
    id: 4,
    category: "Procedures",
    question: "How long is the recovery time after a coronary angioplasty?",
    answer: "Most patients who undergo radial (wrist) angioplasty can walk within 4–6 hours, go home the next morning, and resume light desk work within 3–4 days. Vigorous exercise should be avoided for 2 weeks.",
  },
  {
    id: 5,
    category: "Procedures",
    question: "Is angioplasty safe for elderly patients?",
    answer: "Yes. With modern drug-eluting stents and radial artery access, angioplasty is very safe even for patients in their 70s, 80s, and 90s. Dr. Sharma evaluates risk-benefit meticulously for every individual.",
  },
  {
    id: 6,
    category: "Heart Health",
    question: "At what age should I get my first preventive cardiac checkup?",
    answer: "For individuals with a family history of premature heart disease, diabetes, or high cholesterol, screening should begin at age 25–30. For those without specific risk factors, baseline screening is recommended at age 35–40.",
  },
  {
    id: 7,
    category: "Heart Health",
    question: "What is the difference between chest pain from gas vs a heart attack?",
    answer: "Cardiac chest pain is typically described as pressure, heaviness, or squeezing in the center or left of the chest, often radiating to the left arm, neck, or jaw, and accompanied by sweating or shortness of breath. Gas pain is usually sharp, shifts location, and improves with belching. Never guess — any new severe chest discomfort warrants immediate medical evaluation.",
  },
  {
    id: 8,
    category: "Emergency",
    question: "What should I do if someone near me seems to be having a heart attack?",
    answer: "Call emergency medical services (+91 102/108/local ambulance) immediately. Have the person sit down and rest. If not allergic, give one 300mg chewable Aspirin. If the person becomes unresponsive and stops breathing normally, begin CPR immediately.",
  },
  {
    id: 9,
    category: "Emergency",
    question: "Does Dr. Sharma provide 24/7 emergency cardiac care?",
    answer: "Yes. Dr. Sharma leads the 24/7 Primary Angioplasty (STEMI) team at Medicity Heart Centre. Emergency cardiac patients can be received at the emergency department around the clock.",
  },
  {
    id: 10,
    category: "Procedures",
    question: "What is TAVR and who is it suitable for?",
    answer: "TAVR (Transcatheter Aortic Valve Replacement) is a cutting-edge, minimally invasive procedure to replace a narrowed aortic valve without cracking open the chest. It is ideal for patients with severe aortic stenosis who are at intermediate, high, or prohibitive risk for open-heart surgery.",
  },
];

async function seedDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI not defined in .env file.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  console.log("Connected successfully!");

  try {
    // 1. Doctor Profile
    console.log("Seeding Doctor Profile...");
    await Doctor.deleteMany({});
    await Doctor.create(doctorData);
    console.log("✅ Doctor profile seeded.");

    // 2. Specialties
    console.log("Seeding Specialties...");
    await Specialty.deleteMany({});
    await Specialty.insertMany(specialtiesData);
    console.log(`✅ ${specialtiesData.length} specialties seeded.`);

    // 3. Procedures
    console.log("Seeding Procedures...");
    await Procedure.deleteMany({});
    await Procedure.insertMany(proceduresData);
    console.log(`✅ ${proceduresData.length} procedures seeded.`);

    // 4. Reviews
    console.log("Seeding Reviews...");
    await Review.deleteMany({});
    await Review.insertMany(reviewsData);
    console.log(`✅ ${reviewsData.length} reviews seeded.`);

    // 5. Articles
    console.log("Seeding Articles...");
    await Article.deleteMany({});
    await Article.insertMany(articlesData);
    console.log(`✅ ${articlesData.length} articles seeded.`);

    // 6. FAQs
    console.log("Seeding FAQs...");
    await FAQ.deleteMany({});
    await FAQ.insertMany(faqsData);
    console.log(`✅ ${faqsData.length} FAQs seeded.`);

    // 7. Admin User
    console.log("Verifying Admin User...");
    await seedAdminUser();

    console.log("\n🎉 Database successfully seeded with all initial data!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
