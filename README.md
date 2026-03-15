# 🏋️ Gym Workout Optimizer (LLM Project)

A simple **LLM-powered fitness analysis tool** that evaluates a user's workout routine and diet plan, then gives suggestions and a final decision on whether the plan is effective for achieving their fitness goal.

This project demonstrates how **Large Language Models (LLMs)** can be used for **analysis, reasoning, and decision-making**, not just text generation.

---

## 🚀 Features

- Analyze user **fitness profile**
- Evaluate **workout routine effectiveness**
- Analyze **diet and nutrition balance**
- Identify **strengths and weaknesses**
- Provide **actionable suggestions**
- Return a **final decision**:
  - `OPTIMAL PLAN`
  - `NEEDS IMPROVEMENT`
  - `INEFFECTIVE PLAN`

---

## 🧠 Models Used

This project uses multiple LLM providers for experimentation and comparison:

- Groq Cloud
- Llama Model
- Gemini Model

---

## 🛠 Tech Stack

Backend:

- Node.js
- Express.js

AI Models:

- Groq Cloud API
- Llama
- Gemini

---

## 📂 Project Structure

```
invoke-LLM
│
├── main.js            # Main server entry file
├── .env               # API keys
├── package-lock.json  # Dependency lock file
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Shreyass48/gym-workout-optimizer.git
cd gym-workout-optimizer
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add environment variables

Create a `.env` file:

```
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Start the server

```bash
node server.js
```

Server will run on:

```
http://localhost:3000
```

---

## 📥 Example Input

```
Weight: 64kg
Height: 5'11
Goal: Lean muscle gain

Workout:
Chest + Triceps
Back + Biceps
Legs
Shoulders

Diet:
Oats pre workout
Eggs post workout
Chapati + sabzi lunch
Rajma snack
Vegetarian dinner
```

---

## 📤 Example Output

```
Workout Analysis:
Frequency: Good
Volume: Moderate
Effectiveness: Suitable for hypertrophy

Diet Analysis:
Protein intake: Slightly low
Calorie sufficiency: Moderate

Strengths:
- Consistent training routine
- Good post workout nutrition

Weaknesses:
- Low protein intake
- Limited calorie surplus

Suggestions:
- Increase protein intake
- Add paneer or tofu in dinner
- Track progressive overload

Final Decision:
NEEDS IMPROVEMENT

Growth Probability:
68%
```

---

## 🔮 Future Improvements

- Frontend UI (React / Next.js)
- Workout plan generator
- Diet macro calculator
- Fitness progress tracker
- User authentication
- Database for saving workouts

---

## 📌 Status

Backend prototype completed.
Frontend UI coming soon.

---

## 👨‍💻 Author

Shreyas Kulkarni
Frontend Developer exploring **AI + LLM applications**
