// workouts.js

// ==== 1. Weekly Plan ====
const workoutPlan = {
  Monday: [
    { name: "Lateral Raises", sets: 3, reps: "12–15", description: "Raise dumbbells out to the sides until shoulder height." },
    { name: "Overhead Dumbbell Press", sets: 3, reps: "10–12", description: "Press dumbbells overhead from shoulder height." },
    { name: "Tricep Rope Pushdowns", sets: 3, reps: "12–15", description: "Push the rope attachment down until arms are fully extended." },
    { name: "Overhead Tricep Extension", sets: 3, reps: "10–12", description: "Extend dumbbell overhead with both hands." },
    { name: "Face Pulls", sets: 3, reps: "12–15", description: "Pull rope toward face while keeping elbows high." },
    { name: "Tricep Dips", sets: 3, reps: "15", description: "Lower your body by bending arms and press back up on parallel bars or a bench." },
    { name: "Finisher: Light Dumbbell Punches", sets: 2, reps: "1 min w/ 1 min rest", description: "Throw light punches continuously for 1 minute. Rest and repeat." }
  ],
  Tuesday: [
    { name: "Dead Bugs", sets: 3, reps: "10/side", description: "Extend opposite arm and leg while keeping core braced." },
    { name: "Bird Dogs", sets: 3, reps: "10/side", description: "Extend opposite arm and leg, hold briefly, and return." },
    { name: "Pallof Press", sets: 3, reps: "12/side", description: "Press resistance band out from chest and hold." },
    { name: "Glute Bridge", sets: 3, reps: "15", description: "Lift hips while squeezing glutes." },
    { name: "Side-Lying Leg Lifts", sets: 3, reps: "15/side", description: "Lift top leg while lying on your side." },
    { name: "Hip Thrusts", sets: 3, reps: "12–15", description: "Drive hips up using glutes with back supported." },
    { name: "Standing Kickbacks", sets: 3, reps: "15/side", description: "Kick one leg back while squeezing glutes." },
    { name: "Clamshells", sets: 3, reps: "15/side", description: "Open legs like a clamshell while lying on your side with knees bent." }
  ],
  Wednesday: [
    { name: "Hip Thrusts or Glute Bridges", sets: 3, reps: "12–15", description: "Drive hips up squeezing glutes." },
    { name: "Reverse Lunges", sets: 3, reps: "12–15/side", description: "Step backward into a lunge, then return." },
    { name: "Step-Ups (Low Step)", sets: 3, reps: "12/leg", description: "Step onto low platform and return." },
    { name: "Romanian Deadlifts", sets: 3, reps: "12", description: "Hinge at hips with straight legs and lower weights." },
    { name: "Banded Side Steps", sets: 3, reps: "15 steps", description: "Step sideways with band tension around thighs." },
    { name: "Light Leg Extensions", sets: 3, reps: "12–15", description: "Extend lower legs using machine with light weight." },
    { name: "Calf Raises", sets: 3, reps: "20", description: "Raise heels off floor and slowly lower." }
  ],
  Thursday: [
    { name: "Lat Pulldowns", sets: 3, reps: "10–12", description: "Pull bar down to chest, squeeze back." },
    { name: "Seated Cable Row", sets: 3, reps: "10–12", description: "Pull cable toward body while squeezing shoulder blades." },
    { name: "Single-Arm Dumbbell Row", sets: 3, reps: "10/side", description: "Row dumbbell while bracing one hand on a bench." },
    { name: "Hammer Curls", sets: 3, reps: "12–15", description: "Curl with palms facing each other." },
    { name: "Alternating Curls (Slow)", sets: 3, reps: "10/side", description: "Curl each arm one at a time with control." },
    { name: "Rear Delt Flys", sets: 3, reps: "12–15", description: "Raise arms out to sides while bent forward." },
    { name: "Finisher: Pulse Curls", sets: 2, reps: "30 sec", description: "Small, fast pulses with very light weight." }
  ],
  Friday: [
    { name: "Plank", sets: 1, reps: "10–20 sec", description: "Hold body in a straight line, resting on forearms." },
    { name: "Side Plank (Modified)", sets: 1, reps: "10–20 sec/side", description: "Hold side plank on forearm with knees bent." },
    { name: "Standing Woodchoppers", sets: 3, reps: "12/side", description: "Rotate upper body while pulling resistance across body." },
    { name: "Glute Bridge March", sets: 3, reps: "10/side", description: "Lift one knee at a time while holding bridge." },
    { name: "Bodyweight Squat to Chair", sets: 3, reps: "12", description: "Squat back to touch chair, then rise." },
    { name: "Incline Pushups", sets: 3, reps: "10", description: "Push up from hands on bench or wall." },
    { name: "Banded Rows", sets: 3, reps: "12", description: "Pull resistance band toward body." },
    { name: "Hip Hinges", sets: 3, reps: "12", description: "Bend at hips while keeping back straight." }
  ]
};

// ==== 2. Calendar Completion Tracker ====
function markDayComplete(dateStr) {
  const completedDays = JSON.parse(localStorage.getItem("completedDays") || "[]");
  if (!completedDays.includes(dateStr)) {
    completedDays.push(dateStr);
    localStorage.setItem("completedDays", JSON.stringify(completedDays));
  }
}

function getCompletedDays() {
  return JSON.parse(localStorage.getItem("completedDays") || "[]");
}

function showConfettiIfMonthComplete() {
  const completedDays = getCompletedDays();
  const currentMonth = new Date().toISOString().slice(0, 7); // e.g., "2025-12"
  const allMonthDays = Array.from({ length: 31 }, (_, i) => `${currentMonth}-${String(i+1).padStart(2, '0')}`);
  const daysThisMonth = allMonthDays.filter(d => new Date(d).getMonth() === new Date().getMonth());
  const isComplete = daysThisMonth.every(d => completedDays.includes(d));
  if (isComplete) launchConfetti();
}

function launchConfetti() {
  if (typeof confetti !== "undefined") {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else {
    console.log("🎉 Month complete!");
  }
}

// ==== 3. Tooltip or Popup Description ====
function attachExerciseDescriptions() {
  const nodes = document.querySelectorAll(".exercise-name");
  nodes.forEach((node, index) => {
    const day = window.currentDay || "Monday";
    const description = workoutPlan[day]?.[index]?.description || "";
    if (description) {
      node.title = description;
    }
  });
}

// ==== 4. Export ====
window.workoutPlan = workoutPlan;
window.markDayComplete = markDayComplete;
window.getCompletedDays = getCompletedDays;
window.showConfettiIfMonthComplete = showConfettiIfMonthComplete;
window.attachExerciseDescriptions = attachExerciseDescriptions;
window.launchConfetti = launchConfetti;
