# 🎓 Student Career & University Platform

---

# 📖 Overview

The **Student Career & University Platform** is a full-stack web application designed to help South African students explore universities, discover courses, calculate APS scores, and determine qualification eligibility.

The project is being developed as a long-term portfolio project to demonstrate practical software engineering, full-stack development, REST API development, and relational database design using modern web technologies.

---

# 🎯 Project Goals

The application aims to:

* Help students discover universities
* Allow students to explore university courses
* Calculate APS scores
* Determine university eligibility
* Determine course eligibility
* Recommend universities based on APS scores
* Demonstrate full-stack software engineering skills

---

# ✨ Features

## University Explorer

* Browse available universities
* Search universities by name or code
* View university details
* Read university descriptions
* Explore courses offered by each university

---

## APS Calculator

* Calculate APS score
* Store APS score across the application
* Automatically update eligibility results
* Use APS score throughout the platform

---

## Qualification Checker

* Determine university eligibility
* Determine course eligibility
* Display qualification status
* Compare APS score against university requirements

---

## Recommendation System

* Match percentage calculation
* Safety universities
* Target universities
* Reach universities
* Universities You Can Apply To section

---

## Course Explorer

* View all available courses
* Search courses
* Filter courses by APS eligibility
* Display required APS scores
* Retrieve live course information from PostgreSQL

---

# 🏗 Application Architecture

```text
                React Frontend
                      │
                      ▼
              Express REST API
                      │
                      ▼
             PostgreSQL Database
```

The application follows a three-tier architecture:

* Frontend: React
* Backend: Express.js
* Database: PostgreSQL

---

# 🛠 Technology Stack

## Frontend

* React
* React Router
* JavaScript (ES6+)
* CSS

---

## Backend

* Node.js
* Express.js
* REST APIs
* CORS

---

## Database

* PostgreSQL
* SQL

---

## Development Tools

* Visual Studio Code
* pgAdmin 4
* npm
* Git

---

# 🗄 Database Design

## Current Tables

### universities

Stores:

* University code
* University name
* Description
* APS requirement

---

### courses

Stores:

* Course name
* APS requirement
* Associated university

---

## Relationship

```text
universities.id
        ▲
        │
courses.university_id
```

One university can have many courses.

---

# 🔌 API Endpoints

## Universities

### GET /universities

Returns every university.

---

### GET /universities/:code

Returns a single university together with all of its courses.

---

## Courses

### GET /courses

Returns every course.

---

### GET /courses/:id

Returns details for a single course.

---

# 📂 Project Structure

```text
student-platform
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── api.js
│   │   ├── App.js
│   │   └── index.js
│
├── server
│   ├── routes
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── README.md
└── DEVELOPMENT-JOURNAL.md
```

---

# 🚀 Getting Started

## Prerequisites

Install the following software:

* Node.js
* PostgreSQL
* pgAdmin 4

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

---

Install backend dependencies:

```bash
cd server
npm install
```

---

Install frontend dependencies:

```bash
cd client
npm install
```

---

Start the backend server:

```bash
cd server
npm start
```

---

Start the frontend server:

```bash
cd client
npm start
```

---

Open the application:

```text
http://localhost:3000
```

---

# 📚 Skills Demonstrated

## Frontend

* React
* React Router
* State Management
* Component Architecture
* Conditional Rendering
* API Integration

---

## Backend

* Node.js
* Express.js
* REST API Development
* Async/Await
* Error Handling
* CORS Configuration

---

## Database

* PostgreSQL
* SQL
* Primary Keys
* Foreign Keys
* One-to-Many Relationships
* SQL JOINs

---

## Software Engineering

* Full Stack Development
* Software Architecture
* Database Design
* API Design
* Debugging
* Problem Solving

---

# 📈 Current Project Status

## Completed

* React Frontend
* Express Backend
* PostgreSQL Database Integration
* REST API Development
* APS Calculator
* University Search
* Course Search
* Recommendation System
* Dynamic University Detail Pages
* Relational Database Design

---

# 🔮 Future Enhancements

## Planned Features

* University Comparison Tool
* User Authentication
* User Profiles
* Saved Universities
* Saved Courses
* Career Recommendation Engine
* Admin Dashboard
* Mobile Application
* AWS Cloud Deployment
* CI/CD Pipeline

---

# 👨‍💻 Developer

Built by **Jerry Reneke** as a long-term portfolio project documenting the journey toward becoming a:

* Junior Full Stack Developer
* Cloud Engineer
* DevOps Engineer

---

# 📝 Project Documentation

Additional documentation for this project can be found in:

* DEVELOPMENT-JOURNAL.md

This document explains the project's development phases, technical decisions, challenges encountered, debugging process, and lessons learned throughout the development of the application.
