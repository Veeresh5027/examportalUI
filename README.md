# Exam Portal - Frontend (UI)

[![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?style=flat&logo=angular)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=flat&logo=bootstrap)](https://getbootstrap.com/)

**Exam Portal UI** is a dynamic, multi-role assessment platform built with **Angular**. It provides a secure, intuitive interface for both Administrators to manage exam content and Students to attempt timed quizzes with real-time feedback.

---

## 🚀 Key Features

* **Role-Based Access Control:** Secure routing using `AdminGuard` and `NormalGuard` to separate Admin and User dashboards.
* **Secure API Communication:** Implemented `AuthInterceptor` to automatically attach JWT tokens to every outgoing HTTP request.
* **Comprehensive Admin Dashboard:** Full CRUD operations for Categories, Quizzes, and Questions.
* **Interactive Student Interface:** Responsive quiz-taking environment with timer logic and automated result processing.
* **Real-time Validation:** Advanced form handling for Login, Signup, and Profile management.
* **Modular Service Architecture:** Decoupled business logic using dedicated services for Categories, Quizzes, and Users.

---

## 🛠️ Technical Stack

* **Framework:** Angular 17+
* **Language:** TypeScript
* **State & Security:** JWT-based authentication with Angular Interceptors.
* **Styling:** Material Design / Bootstrap for a modern, responsive feel.
* **API Client:** HttpClient for seamless communication with the Spring Boot server.

---

## 📂 Project Architecture

The project follows a clean, modular structure for better maintainability:

```text
src/app/
├── components/         # Reusable UI elements (Navbar, Footer, etc.)
├── pages/              # Core View Modules
│   ├── admin/          # Admin Dashboard & Quiz Management
│   ├── home/           # Landing page logic
│   ├── login/          # Secure Authentication
│   ├── profile/        # User profile & statistics
│   ├── signup/         # New user onboarding
│   └── user/           # Student Dashboard & Exam interface
├── services/           # API Integration layer (QuizService, UserService, etc.)
├── admin.guard.ts      # Route protection for Admin users
├── normal.guard.ts     # Route protection for Students
└── auth.interceptor.ts # Global JWT injection logic
```

---

## ⚙️ Setup & Installation
# 1. Prerequisites
 * **Node.js (LTS version)**

* **Angular CLI (npm install -g @angular/cli)**
  
2. Installation

    ```bash
    git clone [https://github.com/Veeresh5027/examportalUI.git](https://github.com/Veeresh5027/examportalUI.git)
 
   cd examportalUI

    npm install

```

---


  
