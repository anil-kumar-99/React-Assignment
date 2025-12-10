#  React Feedback App

A simple and clean feedback collection application built using **React**, **React Router**, **Custom Hooks**, and **JSON Server**.  
Users can submit their feedback through a form and view all submitted feedback on a separate page.

---

##  Project Features

- Modern UI with centered form and responsive feedback list.
- Stores feedback using **JSON Server** (fake REST API backend).
- Uses a **custom hook** for managing all feedback logic.
- Implements:
  - `useEffect` for fetching feedback.
  - `useCallback` for API methods.
  - `useMemo` (optional computation example included).
- Organized folder structure for scalability.

---

## 📁 Folder Structure


/src
├── components
│ └── FeedbackForm.jsx
├── hooks
│ └── useFeedback.jsx
├── pages
│ └── FeedbackPage.jsx
├── App.jsx
├── main.jsx
└── index.css

### **Clone the project**
```sh
git clone https://github.com/anil-kumar-99/React-Assignment
cd feedback-app

### ****Install Dependencies****
npm install

🗄️ 2. Setup JSON Server (Backend)
Start JSON Server

Your db.json should look like:

{
  "feedback": []
}


**Run the server:**

npx json-server --watch db.json --port 4000


This creates a fake REST API at:

GET    http://localhost:4000/feedback
POST   http://localhost:4000/feedback

**Run the React App**
npm run dev
