import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, onValue, set, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDRHUy9BdhSMuWPC-x_RA9UJ7PNgGGtGfg",
  authDomain: "ospital-56cc0.firebaseapp.com",
  databaseURL: "https://ospital-56cc0-default-rtdb.firebaseio.com",
  projectId: "ospital-56cc0",
  storageBucket: "ospital-56cc0.firebasestorage.app",
  messagingSenderId: "234588509822",
  appId: "1:234588509822:web:9442e586a15ce520d76a2f"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔹 Auto-update dashboard values
onValue(ref(db, "dashboard"), (snapshot) => {
  const data = snapshot.val();
  if (!data) return;
  document.getElementById("totalBeds").textContent = data.totalBeds;
  document.getElementById("sanitized").textContent = data.sanitized;
  document.getElementById("needsCleaning").textContent = data.needsCleaning;
  document.getElementById("inProgress").textContent = data.inProgress;
});

// 🔹 Auto-update bot section
onValue(ref(db, "bot"), (snapshot) => {
  const data = snapshot.val();
  if (!data) return;
  document.getElementById("battery").textContent = data.battery + "%";
  document.getElementById("currentBed").textContent = data.currentBed;
  document.getElementById("botStatus").textContent = data.status;
});

// 🔹 Send bot to next bed (button)
document.getElementById("nextBedBtn").addEventListener("click", () => {
  update(ref(db, "bot"), {
    status: "Cleaning",
    currentBed: "Bed " + Math.floor(Math.random() * 20)
  });

  // Optional: update dashboard stats
  update(ref(db, "dashboard"), {
    inProgress: Math.floor(Math.random() * 10)
  });
});
