import { Groq } from "groq-sdk";
import "dotenv/config";

// Initialize the Groq client using the API key from .env.
const groq = new Groq({ apiKey: process.env.GROQ_LLM_KEY });

async function main() {
  // Send a simple chat prompt to verify the integration end-to-end.
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    // temperature: 0.7,
    // stop: ["vi"],
    // max_completion_tokens: 100,  //generate a 100 tokens response
    // frequency_penalty: 0.5,      // Reduce the likelihood of repeating the same line verbatim
    // presence_penalty: 0.5,
    messages: [
      {
        role: "system",
        content: `You are an expert fitness coach, sports nutritionist, and workout planner.
                  Your task is to analyze a user's fitness profile, workout routine, and diet, then evaluate whether their current plan will help them achieve their fitness goal.
                  You must think step-by-step and provide a clear evaluation before making a decision.
                  When a user provides input such as weight, height, goal, workout routine, and diet, perform the following steps:
                  1. Analyze the user's body profile and fitness goal.
                  2. Evaluate whether the workout routine supports the goal.
                  3. Evaluate whether the diet supports the goal.
                  4. Identify strengths in the user's routine.
                  5. Identify weaknesses or missing elements.
                  6. Provide specific improvement suggestions.

                  After analysis, produce a structured output.
                  Your output MUST follow this format:
                  User Profile:
                  - Weight:
                  - Height:
                  - Goal:
                  Workout Analysis:
                  - Volume:
                  - Frequency:
                  - Effectiveness:
                  Diet Analysis:
                  - Protein intake:
                  - Calorie sufficiency:
                  - Nutritional balance:
                  Strengths:
                  - List key positive points
                  Weaknesses:
                  - List problems or gaps
                  Suggestions:
                  - Provide 3-5 actionable improvements

                  Final Decision:
                  Choose one of the following:
                  OPTIMAL PLAN
                  NEEDS IMPROVEMENT
                  INEFFECTIVE PLAN

                  Growth Probability:
                  Estimate likelihood of achieving the goal as a percentage.

                  Be concise, practical, and realistic.
                  Do not provide generic motivational advice.
                  Base your decision on fitness science principles like progressive overload, protein intake, and recovery.`,
      },
      {
        role: "user",
        content: `Weight: 64kg
                  Height: 5'11
                  Goal: Lean muscle gain
                  Workout: Chest + Triceps, Back + Biceps, Legs, Shoulders
                  Workout time: 1.5 hours daily
                  Diet: Oats pre workout, gainer + eggs post workout, chapati sabzi lunch, rajma snack, dinner veg meal`,
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}

main();
