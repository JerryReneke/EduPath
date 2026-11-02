# Student Career & University Platform — Development Journal

---

# Project Overview

The Student Career & University Platform is a full-stack web application built to help South African students discover universities, calculate APS scores, explore courses, and determine qualification eligibility.

This project is being developed as a long-term portfolio project to demonstrate practical software engineering, full-stack development, database design, and cloud-ready architecture.

---

# Phase 1 — Backend Foundations

## Objectives

* Learn how a backend works
* Build the first REST API
* Understand frontend vs backend communication

## Completed

* Installed Node.js and npm
* Created Express server
* Structured backend project
* Built first REST API endpoints

  * GET /courses
  * GET /courses/:id
  * GET /aps/calculate
* Successfully started the backend server

## What I Learned

* What Express.js is
* What a REST API is
* Difference between frontend and backend
* GET requests
* Route parameters
* Basic server architecture

## Problems Encountered

### PowerShell Execution Policy

Problem:

* npm commands were blocked by PowerShell.

Solution:

* Updated the PowerShell execution policy and verified npm was working correctly.

---

### Syntax Errors

Problem:

* Small typing mistakes prevented the server from starting.

Solution:

* Carefully read the error messages and corrected the syntax.

---

# Phase 2 — React Frontend

## Objectives

* Build the user interface
* Learn React fundamentals

## Completed

* Created React application
* Installed dependencies
* Created reusable components
* Built application layout
* Added navigation
* Built reusable cards

## What I Learned

* JSX
* Components
* Props
* useState
* React architecture
* Component communication

## Problems Encountered

### React Folder Structure

Problem:

* Initially struggled to understand where files belonged.

Solution:

* Learned the purpose of each folder and organized components properly.

---

### Running Two Servers

Problem:

* Needed both the React frontend and Express backend running together.

Solution:

* Learned to run the frontend and backend in separate terminals.

---

# Phase 3 — APS Calculator & Recommendation System

## Objectives

* Build APS calculation
* Recommend universities

## Completed

* APS Calculator
* Qualification checker
* University search
* Featured universities
* Match percentage system
* Safety / Target / Reach badges
* Eligible university recommendations
* Course eligibility checking

## What I Learned

* State management
* Conditional rendering
* Array filtering
* Mapping arrays
* Recommendation logic

## Problems Encountered

### State Management

Problem:

* APS score was not available across components.

Solution:

* Lifted the state into a parent component and passed it through props.

---

### Recommendation Logic

Problem:

* Universities were not being ranked correctly.

Solution:

* Built a match percentage calculation and recommendation badge system.

---

# Phase 4 — Routing & Dynamic Pages

## Objectives

* Create multiple pages
* Build dynamic university pages

## Completed

* React Router
* BrowserRouter
* Dynamic routes
* University Detail page
* useParams
* Clickable university cards

## What I Learned

* Single Page Applications
* Dynamic routing
* URL parameters

## Problems Encountered

### Router Configuration

Problem:

* Incorrect route configuration prevented navigation.

Solution:

* Corrected the routing structure and route parameters.

---

# Phase 5 — Full Stack Integration

## Objectives

* Connect React to Express
* Display live backend data

## Completed

* Created api.js
* Connected frontend to backend
* Fetch API integration
* Course search
* Eligibility filtering
* Show Eligible Courses Only toggle

## What I Learned

* Fetch API
* Async/Await
* API consumption
* CORS
* Browser networking

## Problems Encountered

### HTTPS vs HTTP

Problem:

* React attempted to fetch data using HTTPS instead of HTTP.

Solution:

* Updated the API URL to use:
  http://localhost:5000

---

### CORS Errors

Problem:

* Browser blocked frontend requests.

Solution:

* Configured CORS correctly in the Express server.

---

### Empty API Responses

Problem:

* Components displayed no data.

Solution:

* Used console logging to inspect API responses and corrected the backend routes.

---

### Property Name Mismatch

Problem:

* React expected:

course.name

but PostgreSQL returned:

course_name

Solution:

* Mapped the database fields into frontend-friendly objects.

---

# Phase 6 — PostgreSQL Database Integration

## Objectives

* Replace hardcoded data
* Build a relational database

## Completed

* Installed PostgreSQL
* Configured pgAdmin
* Connected Express to PostgreSQL
* Created universities table
* Populated database
* Created relationships between universities and courses
* Updated backend routes
* Built relational API endpoints
* Removed universitiesData.js
* Converted the project into a fully database-driven application

## What I Learned

* PostgreSQL
* SQL
* SELECT
* INSERT
* UPDATE
* ORDER BY
* Primary Keys
* Foreign Keys
* One-to-Many Relationships
* SQL JOINs
* Database Normalization
* Transforming SQL data into frontend-friendly JSON

## Problems Encountered

### Existing Table Error

Problem:

* PostgreSQL returned:

relation "universities" already exists

Solution:

* Recognized the table had already been created and avoided recreating it.

---

### SQL Ordering

Problem:

* Updated university records appeared in a different position.

Solution:

* Added ORDER BY id to ensure consistent ordering.

---

### Backend Route Errors

Problem:

* University routes returned "University not found."

Solution:

* Replaced the old hardcoded lookup with PostgreSQL queries.

---

### Undefined Variables

Problem:

* Backend threw ReferenceError exceptions after refactoring.

Solution:

* Updated the routes to use the PostgreSQL query results instead of deleted variables.

---

### JOIN Queries

Problem:

* University details no longer contained course information.

Solution:

* Queried the university first, then queried related courses using the foreign key relationship, transformed the results with .map(), and combined them into a single JSON response.

---

### Field Name Differences

Problem:

* PostgreSQL column names did not match the property names expected by React.

Solution:

* Transformed:
* course_name → name
* aps_required → aps

before returning the API response.

---

### Testing Strategy

Throughout development every major feature was tested by:

* Running the Express server
* Running the React application
* Testing API endpoints directly in the browser
* Inspecting JSON responses
* Using console.log() for debugging
* Querying PostgreSQL using pgAdmin
* Restarting the server after backend changes
* Refreshing the frontend after database updates

---

# Current Skills Demonstrated

## Frontend

* React
* React Router
* useState
* useEffect
* Conditional Rendering
* Component Architecture
* API Integration

## Backend

* Node.js
* Express
* REST APIs
* Async/Await
* Error Handling
* CORS

## Database

* PostgreSQL
* SQL
* Data Modeling
* Primary Keys
* Foreign Keys
* Relationships
* JOINs

## Software Engineering

* Debugging
* Problem Solving
* Software Architecture
* API Design
* Database Design
* Full Stack Development

---

# Long-Term Goal

Student Career & University Platform

↓

Junior Full Stack Developer

↓

Cloud Engineer

↓

DevOps Engineer

---

# Future Roadmap

* University Comparison
* User Authentication
* User Profiles
* Saved Universities
* Saved Courses
* Career Recommendation Engine
* Admin Dashboard
* AWS Cloud Deployment
* CI/CD Pipelines
* Mobile Application
