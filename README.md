# 🧬 Rick and Morty Characters App

Frontend application built with React 18, TypeScript, GraphQL, and Clean Architecture to explore characters from the Rick and Morty universe.

This project was developed as part of a technical assessment, focusing on scalability, maintainability, code quality, and usability.

---

## 🚀 Tech Stack

- React 18  
- TypeScript  
- Vite  
- TailwindCSS  
- React Router v6  
- Apollo Client (GraphQL)  
- React Testing Library  
- Firebase Hosting  
- GitHub Actions  

---

## 📁 Project Architecture

The project follows a feature-based Clean Architecture approach to ensure scalability and maintainability.

### Folder Structure

src/  
├── app/  
│   ├── router/  
│   └── providers/  
│  
├── modules/  
│   └── characters/  
│       ├── domain/  
│       ├── data/  
│       └── presentation/  
│  
├── shared/  
├── styles/  
└── main.tsx  

---

## ✨ Features

- List characters in responsive cards  
- View detailed character information  
- Mark characters as favorites  
- Add and manage comments per character  
- Soft delete characters (logical deletion)  
- Sort characters (A-Z / Z-A)  
- Filter by status, species, and gender  
- Local persistence using LocalStorage  
- Unit tests for core components  

---

## 🌐 API

This project uses the official Rick and Morty GraphQL API.

Endpoint:  
https://rickandmortyapi.com/graphql  

Documentation:  
https://rickandmortyapi.com/documentation/

---

## 🚀 Deployment (Firebase Hosting)

The application is deployed using Firebase Hosting and is publicly available at:

<YOUR_FIREBASE_URL>

### Manual Deployment

npm run build  
firebase deploy  

---

## 🔄 CI/CD Pipeline (GitHub Actions)

This project uses GitHub Actions for continuous integration and deployment.

### Pipeline Workflow

On every push to main or master, the pipeline executes:

1. Install dependencies  
2. Run unit tests  
3. Build the project  
4. Deploy to Firebase Hosting  

### Workflow File

.github/workflows/deploy.yml  

This ensures automatic and reliable delivery.

---

## 🛠️ Installation

### Prerequisites

- Node.js >= 18  
- npm or yarn  
- Firebase CLI  

Install Firebase CLI:

npm install -g firebase-tools  

---

### Clone Repository

git clone <https://github.com/ferleysilva/prueba-blossom.git>  
cd prueba-blossom 

---

### Install Dependencies

npm install  

---

### Run Development Server

npm run dev  

The application will be available at:

http://localhost:5173  

To check in production:

https://prueba-blossom.web.app

---

## 🧪 Running Tests

npm run test  

---

## 📖 Usage Guide

### Home Page

- Displays all characters in a responsive grid  
- Includes filters and sorting controls  
- Click on a card to view details  

### Character Detail Page

- Shows full character information  
- Allows adding/removing favorites  
- Supports user comments  

All favorites and comments are stored locally in the browser.

---

## 👨‍💻 Author

Anderson Silva  
Frontend / Software Developer  

---

## 📄 License

This project is developed for technical evaluation purposes only.
