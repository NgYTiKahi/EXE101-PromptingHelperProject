# Prompting Helper Project

## Project Overview
This project aims to assist users who want to create AI-generated videos or images to advertise their products. The core problem it solves is the users' lack of prompting skills. We help them by utilizing a powerful open-source LLM, such as Gemma 4, to enhance and optimize their initial prompts, ensuring high-quality outputs from generative AI tools.

## Tech Stack
*   **Backend Framework:** Python with FastAPI
*   **Database:** MongoDB
*   **AI/LLM:** Open-source LLMs (e.g., Gemma 4) for prompt enhancement

## Workflow
1.  **User Input:** The user provides a basic, potentially poorly-constructed prompt or a simple description of what they want to generate for their product advertisement.
2.  **Prompt Enhancement:** The FastAPI backend receives the input and sends it to the integrated LLM (e.g., Gemma 4). The LLM processes the input and generates an enriched, highly-detailed prompt suitable for AI image/video generators.
3.  **Storage:** The original input, enhanced prompt, and related metadata are stored in MongoDB for history, analytics, and potential future refinements.
4.  **Output:** The enhanced prompt is returned to the user (or passed directly to the generative AI service).

## Rules for AI Agents
When assisting with this project, AI agents should adhere to the following rules:
*   **Tech Stack Adherence:** Always prioritize Python and FastAPI for backend development, and use MongoDB for data storage. Do not introduce new major frameworks or databases unless explicitly requested by the user.
*   **Focus on Prompt Quality:** When writing logic for prompt enhancement, remember the end goal is to generate high-quality advertising images/videos. Keep the target audience (users with lack of prompting skills) in mind.
*   **Asynchronous Operations:** Since LLM calls and database operations can involve latency, utilize asynchronous programming (`async`/`await`) in FastAPI.
*   **Documentation:** Maintain clear documentation, especially around the LLM integration logic, so future agents and developers can easily understand the flow.
*   **Use Specialized Skills:** Actively utilize the project-specific skills defined in the `.agents/skills` directory (such as `enhance-prompt`) when working on tasks related to prompt enhancement, optimization, or other specialized logic.

## Project Memory / Progress
*   **[2026-07-01] Backend Setup:** Initialized a virtual environment (`.venv`) and installed FastAPI.
*   **[2026-07-01] Authentication:** Created a basic asynchronous login endpoint in `Backend/Authentication.py` using FastAPI and `motor` (for async MongoDB connections).
*   **[2026-07-01] Frontend Setup & UI Generation:** Created a React + Vite frontend and set up TailwindCSS (v3). Used Stitch to generate a high-fidelity Login UI, extracted the design tokens into `resources/style-guide.json`, and implemented a modular `LoginCard.tsx` component.
*   **[2026-07-01] Documentation:** Updated the root `README.md` with a comprehensive Quick Start guide for the team.
