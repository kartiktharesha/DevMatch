const mongoose = require("mongoose");

const projects = [

  { title:"E-commerce App", description:"Online shopping system", skillsRequired:["React","Node.js","MongoDB"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80e"), cost:5000 },
  { title:"Chat App", description:"Realtime chat", skillsRequired:["Socket.io","Node.js"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80d"), cost:3000 },
  { title:"Portfolio", description:"Personal website", skillsRequired:["HTML","CSS"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80c"), cost:1500 },
  { title:"Blog System", description:"Blog platform", skillsRequired:["Node","MongoDB"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80b"), cost:2500 },
  { title:"Job Portal", description:"Job platform", skillsRequired:["React","Node"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80a"), cost:6000 },

  { title:"Quiz App", description:"MCQ system", skillsRequired:["JS","HTML"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc809"), cost:1200 },
  { title:"Food Delivery", description:"Food ordering", skillsRequired:["React","MongoDB"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc807"), cost:7000 },
  { title:"Task Manager", description:"Task tracking", skillsRequired:["Node","Express"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc805"), cost:2000 },
  { title:"Weather App", description:"Weather API", skillsRequired:["JS","API"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc803"), cost:1000 },
  { title:"Expense Tracker", description:"Money tracking", skillsRequired:["React","MongoDB"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc802"), cost:2500 },

  { title:"Network Tool", description:"Network monitoring", skillsRequired:["Python","Linux"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc801"), cost:4000 },
  { title:"Security Scanner", description:"Security scan", skillsRequired:["Cyber Security"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc800"), cost:5000 },
  { title:"Firewall", description:"Firewall system", skillsRequired:["Networking"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc813"), cost:6000 },
  { title:"Packet Analyzer", description:"Packet check", skillsRequired:["Python"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc815"), cost:3500 },
  { title:"Login System", description:"Auth system", skillsRequired:["Django"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc816"), cost:3000 },

  { title:"IDS System", description:"Intrusion detection", skillsRequired:["Cyber Security"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc81b"), cost:7000 },
  { title:"VPN Tool", description:"Private network", skillsRequired:["Networking"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc835"), cost:8000 },
  { title:"Log Analyzer", description:"Log system", skillsRequired:["Python"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc836"), cost:2500 },
  { title:"Password Tool", description:"Password check", skillsRequired:["Security"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc830"), cost:2000 },
  { title:"Automation Tool", description:"Automation", skillsRequired:["Python"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc82b"), cost:4500 },

  { title:"Smart Home", description:"IoT system", skillsRequired:["Arduino"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc82a"), cost:6000 },
  { title:"Traffic System", description:"Traffic control", skillsRequired:["Microcontrollers"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc849"), cost:3000 },
  { title:"Temp Monitor", description:"Temperature system", skillsRequired:["Sensors"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc844"), cost:2500 },
  { title:"Robot Arm", description:"Robot control", skillsRequired:["Embedded"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc84a"), cost:8000 },

  // repeat pattern for remaining to make 50
  { title:"Smart Grid", description:"Modern grid", skillsRequired:["Power Systems"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80e"), cost:8000 },
  { title:"Solar System", description:"Solar energy", skillsRequired:["Electrical"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80d"), cost:7000 },
  { title:"Motor Control", description:"Motor speed", skillsRequired:["Electrical"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80c"), cost:5000 },
  { title:"Circuit Analyzer", description:"Analyze circuits", skillsRequired:["Circuit"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80b"), cost:3000 },
  { title:"Transformer", description:"Transformer design", skillsRequired:["Electrical"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc80a"), cost:4000 },

  { title:"Energy Meter", description:"Power usage", skillsRequired:["Sensors"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc809"), cost:2500 },
  { title:"Load Flow", description:"Flow analysis", skillsRequired:["Power Systems"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc807"), cost:4500 },
  { title:"Fault Detection", description:"Detect faults", skillsRequired:["Electrical"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc805"), cost:5500 },
  { title:"Battery System", description:"Battery manage", skillsRequired:["Control"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc803"), cost:3000 },
  { title:"AI Resume Screener", description:"AI hiring system", skillsRequired:["Node","AI"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc802"), cost:9000 },

  { title:"DevMatch Platform", description:"Matching system", skillsRequired:["MERN"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc801"), cost:10000 },
  { title:"Library System", description:"Manage books", skillsRequired:["PHP","MySQL"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc800"), cost:3000 },
  { title:"Attendance System", description:"Track attendance", skillsRequired:["Node"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc813"), cost:2000 },
  { title:"Hospital App", description:"Hospital system", skillsRequired:["MongoDB"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc815"), cost:6000 },
  { title:"Hotel Booking", description:"Booking system", skillsRequired:["React"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc816"), cost:7000 },

  { title:"Ride Sharing", description:"Ride app", skillsRequired:["Node"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc81b"), cost:8000 },
  { title:"Stock Tracker", description:"Stock system", skillsRequired:["API"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc835"), cost:4000 },
  { title:"Crypto App", description:"Crypto tracker", skillsRequired:["JS"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc836"), cost:5000 },
  { title:"News App", description:"News system", skillsRequired:["React"], createdBy:new mongoose.Types.ObjectId("69bac18ccbe38cc2e93dc830"), cost:3000 }
];

module.exports = { data: projects };