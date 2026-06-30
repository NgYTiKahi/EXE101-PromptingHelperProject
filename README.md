# EXE101-PromptingHelperProject

## Project Overview
This project helps users who want to use AI generative video or image models to advertise their products, but lack the necessary prompting skills. The application leverages a powerful open-source LLM (such as Gemma 4) to automatically enhance and structure the user's initial simple descriptions into highly effective prompts.

## Tech Stack
* **Backend Framework:** Python with FastAPI
* **Database:** MongoDB (via Motor driver)
* **Frontend:** React, TypeScript, Vite, TailwindCSS (v3)
* **AI/LLM:** Open-source LLMs (e.g., Gemma 4) for prompt enhancement

## Prerequisites
- Node.js (v18 or higher recommended)
- npm
- Python 3.10+
- MongoDB server (running locally or via MongoDB Atlas)

## Quick Start Guide

### 1. Backend Setup

The backend handles API requests, authentication, and communication with the LLM.

1. **Navigate to the root directory:**
   ```bash
   cd EXE101-PromptingHelperProject
   ```

2. **Activate the Virtual Environment:**
   A virtual environment (`.venv`) is already initialized in the root folder.
   - On Windows:
     ```powershell
     .\.venv\Scripts\Activate.ps1
     ```
   - On macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

3. **Install Dependencies:**
   ```bash
   pip install -r Backend/requirements.txt
   ```

4. **Run the Backend Server:**
   ```bash
   cd Backend
   uvicorn main:app --reload
   ```
   The backend API will be available at `http://127.0.0.1:8000`. You can view the Swagger UI API documentation at `http://127.0.0.1:8000/docs`.

   *Note: If you encounter an error like `[WinError 10013] An attempt was made to access a socket in a way forbidden by its access permissions`, it means port 8000 is already in use by another application. You can fix this by specifying a different port:*
   ```bash
   uvicorn main:app --reload --port 8080
   ```

### 2. Database & Test Account Setup

The backend requires a MongoDB database to handle user authentication and store prompt history.

1. **Start MongoDB:** Ensure you have a local MongoDB instance running on the default port (`localhost:27017`), or update the connection string in the backend if you are using MongoDB Atlas. The database will automatically be created on the first connection.
2. **Create a Test Account:** You can create a test account to log in to the Home page by sending a POST request to the registration endpoint.
   - Using PowerShell:
     ```powershell
     Invoke-RestMethod -Uri "http://127.0.0.1:8000/auth/register" -Method Post -ContentType "application/json" -Body '{"username":"testing1","password":"yln321"}'
     ```
   - Using curl (macOS/Linux):
     ```bash
     curl -X POST "http://127.0.0.1:8000/auth/register" -H "Content-Type: application/json" -d '{"username":"testing1","password":"yln321"}'
     ```
3. **Log In:** You can now go to the Frontend login page and sign in using the credentials `testing1` and `yln321`.

### 3. Frontend Setup

The frontend provides the user interface for interacting with the Prompting Helper application, built with React and Vite.

1. **Navigate to the Frontend directory:**
   ```bash
   cd Frontend
   ```

2. **Install Node modules:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   The frontend app will start on a local port (usually `http://localhost:5173`). Open this URL in your browser to view the application.

## Project Structure
- `Backend/`: Contains FastAPI backend services. `Authentication.py` provides the initial async login endpoints.
- `Frontend/`: The React + Vite frontend application.
- `Frontend/src/components/`: Modular React UI components (e.g., `LoginCard.tsx`).
- `Frontend/resources/style-guide.json`: Design system tokens used to align the Tailwind configuration.
- `.agents/`: Holds project-specific workflows, memory, rules (`GEMINI.md`), and automated AI agent skills.
