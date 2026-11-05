# EduPath — Student Career & University Platform Development Journal

---

# 1. Project Overview

**Project Name:** EduPath

**Project Type:** Full-Stack Web Application

**Target Audience:** South African high school students and prospective university students.

EduPath is a full-stack web application designed to help South African students discover universities, calculate APS scores, explore courses and understand their qualification eligibility.

The platform aims to make university and career exploration easier by providing students with useful academic information and personalised study recommendations.

This project is being developed as a long-term software engineering portfolio project to demonstrate practical full-stack development, software architecture, database design, automated testing and cloud-ready development.

**GitHub Repository:**
https://github.com/JerryReneke/EduPath

---

# 2. Technology Stack

## Frontend

- React
- JavaScript
- React Router
- HTML
- CSS
- Fetch API

## Backend

- Node.js
- Express.js
- REST API
- CommonJS
- dotenv
- CORS

## Database

- PostgreSQL
- pgAdmin
- node-postgres (`pg`)
- SQL

## Development & Engineering Tools

- Visual Studio Code
- Git
- GitHub
- PowerShell
- Node.js built-in testing framework
- npm

---

# 3. Original Development History

The following sections document the original development milestones and what was implemented throughout the initial construction of EduPath.

# Phase 1 — Backend Foundations

## Objectives

- Learn how a backend works.
- Build the first REST API.
- Understand frontend versus backend communication.

## Completed

- Installed Node.js and npm.
- Created an Express server.
- Structured the backend project.
- Built the first REST API endpoints.
- Successfully started the backend server.

### Initial API Endpoints

- `GET /courses`
- `GET /courses/:id`
- `GET /universities`
- `GET /universities/:code`
- `GET /aps`
- `POST /aps/calculate`

## What I Learned

- What Express.js is.
- What a REST API is.
- The difference between frontend and backend.
- GET requests.
- Route parameters.
- Basic server architecture.

## Problems Encountered

### PowerShell Execution Policy

**Problem:**

- npm commands were initially blocked by PowerShell.

**Solution:**

- Updated the PowerShell execution policy and verified that npm was working correctly.

### Syntax Errors

**Problem:**

- Small typing mistakes prevented the server from starting.

**Solution:**

- Learned to read error messages and identify and correct syntax mistakes.

---

# Phase 2 — React Frontend

## Objectives

- Build the user interface.
- Learn React fundamentals.

## Completed

- Created the React application.
- Installed dependencies.
- Created reusable components.
- Built the application layout.
- Added navigation.
- Built reusable cards.

## What I Learned

- JSX.
- React components.
- Props.
- useState.
- React architecture.
- Component communication.

## Problems Encountered

### React Folder Structure

**Problem:**

- Initially struggled to understand where files belonged.

**Solution:**

- Learned the purpose of each folder and organised components properly.

### Running Two Servers

**Problem:**

- Needed both the React frontend and Express backend running simultaneously.

**Solution:**

- Learned to run the frontend and backend in separate terminals.

---

# Phase 3 — APS Calculator & Recommendation System

## Objectives

- Build an APS calculator.
- Recommend universities.
- Introduce course eligibility checking.

## Completed

- Built an APS calculator.
- Implemented a basic qualification checker.
- Added university search.
- Added featured universities.
- Created a basic match percentage system.
- Introduced Safety / Target / Reach recommendation badges.
- Added eligible university recommendations.
- Implemented course eligibility checking.

**Development Note:**

The initial APS calculator and recommendation functionality is a prototype. Its calculation rules and eligibility logic still require significant improvements before they can provide reliable university admission guidance.

## What I Learned

- State management.
- Conditional rendering.
- Array filtering.
- Mapping arrays.
- Recommendation logic.

## Problems Encountered

### State Management

**Problem:**

- APS score was not available across different components.

**Solution:**

- Lifted the state into a parent component and passed it through props.

### Recommendation Logic

**Problem:**

- Universities were not being ranked correctly.

**Solution:**

- Built a basic match percentage calculation and recommendation badge system.

---

# Phase 4 — Routing & Dynamic Pages

## Objectives

- Create multiple pages.
- Build dynamic university pages.

## Completed

- Integrated React Router.
- Configured BrowserRouter.
- Created dynamic routes.
- Built the University Detail page.
- Implemented useParams.
- Added clickable university cards.

## What I Learned

- Single Page Applications.
- Dynamic routing.
- URL parameters.
- Navigation between React components.

## Problems Encountered

### Router Configuration

**Problem:**

- Incorrect route configuration prevented navigation.

**Solution:**

- Corrected the routing structure and route parameters.

---

# Phase 5 — Full-Stack Integration

## Objectives

- Connect React to Express.
- Display live backend data.

## Completed

- Created `client/src/api.js`.
- Connected the frontend to the backend.
- Integrated the Fetch API.
- Implemented course search.
- Added eligibility filtering.
- Added the Show Eligible Courses Only toggle.

## What I Learned

- Fetch API.
- Async/Await.
- API consumption.
- CORS.
- Browser networking.
- Frontend and backend communication.

## Problems Encountered

### HTTPS vs HTTP

**Problem:**

- React attempted to fetch data using HTTPS instead of HTTP.

**Solution:**

- Updated the development API URL to use:

`http://localhost:5000`

### CORS Errors

**Problem:**

- The browser blocked frontend requests.

**Solution:**

- Configured CORS correctly in the Express server.

### Empty API Responses

**Problem:**

- Components displayed no data.

**Solution:**

- Used console logging to inspect API responses and corrected backend routes.

### Property Name Mismatch

**Problem:**

- React expected `course.name`, but PostgreSQL returned `course_name`.

**Solution:**

- Mapped the database fields into frontend-friendly objects.

---

# Phase 6 — PostgreSQL Database Integration

## Objectives

- Replace hardcoded data.
- Build a relational database.
- Connect the backend to PostgreSQL.

## Completed

- Installed PostgreSQL.
- Configured pgAdmin.
- Connected Express to PostgreSQL.
- Created the universities table.
- Populated the database.
- Created relationships between universities and courses.
- Updated backend routes.
- Built relational API endpoints.
- Removed the old `universitiesData.js` implementation.
- Converted university and course retrieval into database-driven functionality.

**Development Note:**

University and course information is currently retrieved from PostgreSQL. The APS calculation engine is still provisional and is not yet a fully university-specific database-driven system.

## What I Learned

- PostgreSQL.
- SQL.
- SELECT.
- INSERT.
- UPDATE.
- ORDER BY.
- Primary keys.
- Foreign keys.
- One-to-many relationships.
- SQL JOINs.
- Database normalisation.
- Transforming SQL data into frontend-friendly JSON.

## Problems Encountered

### Existing Table Error

**Problem:**

- PostgreSQL returned:

`relation "universities" already exists`

**Solution:**

- Recognised that the table had already been created and avoided recreating it.

### SQL Ordering

**Problem:**

- Updated university records appeared in a different position.

**Solution:**

- Added ORDER BY id to ensure consistent ordering.

### Backend Route Errors

**Problem:**

- University routes returned "University not found."

**Solution:**

- Replaced the old hardcoded lookup with PostgreSQL queries.

### Undefined Variables

**Problem:**

- Backend threw ReferenceError exceptions after refactoring.

**Solution:**

- Updated routes to use PostgreSQL query results instead of deleted variables.

### JOIN Queries

**Problem:**

- University details no longer contained course information.

**Solution:**

- Queried the university first, then retrieved related courses using the foreign key relationship.
- Transformed the results with `.map()`.
- Combined the information into a single JSON response.

### Field Name Differences

**Problem:**

- PostgreSQL column names did not match the property names expected by React.

**Solution:**

Transformed:

- `course_name` → `name`
- `aps_required` → `aps`

before returning the API response.

---

# 4. Initial Testing Strategy

Throughout the initial development of EduPath, major features were tested by:

- Running the Express server.
- Running the React application.
- Testing API endpoints directly in the browser.
- Inspecting JSON responses.
- Using console.log() for debugging.
- Querying PostgreSQL using pgAdmin.
- Restarting the server after backend changes.
- Refreshing the frontend after database updates.

The project has since progressed from primarily manual testing to automated backend integration testing.

---

# 5. Git, GitHub & Version Control

## Completed

- Created a local Git repository for EduPath.
- Configured the main branch.
- Configured Git author identity using GitHub's private noreply email.
- Enabled GitHub email privacy for command-line commits.
- Generated an Ed25519 SSH key.
- Protected the private SSH key with a passphrase.
- Registered the public SSH key with GitHub.
- Successfully authenticated using SSH.
- Created a public GitHub repository.
- Published the initial EduPath codebase.
- Established a workflow for committing and pushing changes.

## GitHub Repository

https://github.com/JerryReneke/EduPath

## Commit History

| Commit | Description |
|---|---|
| `c8da0d5` | Initial commit - EduPath project foundation |
| `4cfdb8f` | Security update - Fix npm dependency vulnerabilities |

**Current Branch:** `main`

**Note:** The backend architecture restructuring and automated testing improvements documented below have been completed locally but have not yet been committed and pushed.

---

# 6. Backend Architecture Improvements

## Objectives

- Improve backend organisation.
- Separate application configuration from server startup.
- Centralise environment configuration.
- Introduce consistent error handling.
- Make the backend easier to maintain and test.

## Completed

### Application and Server Separation

Previously, `server.js` handled both Express configuration and server startup.

This was restructured by introducing:

- `server/app.js` for Express application configuration.
- `server/server.js` for starting the server.

This separation makes it easier to test the Express application independently.

### Centralised Environment Configuration

Created:

`server/config/env.js`

Responsibilities:

- Loads environment variables from the server `.env` file.
- Provides one central environment configuration entry point.
- Prevents duplicate dotenv configuration.

Updated `server/db.js` to use the centrally loaded environment variables.

### Centralised Error Handling

Created:

`server/middleware/errorHandler.js`

Implemented:

- Centralised Express error handling.
- Error forwarding using `next(err)`.
- Consistent JSON error responses.
- Handling for malformed JSON requests.
- Server-side logging for unexpected server errors.
- Protection against attempting to send a second response after headers have been sent.

Updated the university and course routes to forward unexpected errors to the central error handler.

### Improved APS Input Validation

Updated:

`server/routes/aps.js`

The APS endpoint now validates:

- Marks must be provided as an array.
- The marks array cannot be empty.
- Marks must be numeric.
- Marks must be finite numbers.
- Marks must be between 0 and 100.

Invalid requests receive HTTP 400 responses.

**Important:** The existing backend APS calculation formula is still temporary. A university-specific APS calculation engine remains part of future development.

## Updated Backend Structure

```text
server/
│
├── config/
│   └── env.js
│
├── middleware/
│   └── errorHandler.js
│
├── routes/
│   ├── aps.js
│   ├── courses.js
│   └── universities.js
│
├── test/
│   └── app.test.js
│
├── app.js
├── db.js
├── server.js
├── package.json
├── package-lock.json
├── .env
└── .env.example
```

The `.env` file is excluded from Git, while `.env.example` provides a template for required environment variables.

## What I Learned

- Separation of concerns.
- Express middleware.
- Centralised error handling.
- Environment variable management.
- Modular backend architecture.
- Error propagation using `next(err)`.
- Application and server separation.
- Improving testability through application architecture.

---

# 7. Security & Dependency Management

## Objectives

- Identify vulnerable dependencies.
- Resolve reported security vulnerabilities.
- Maintain a secure backend dependency structure.

## Initial npm Security Audit

The initial backend npm audit identified three vulnerabilities:

| Package | Initial Severity |
|---|---|
| body-parser | High |
| proxy-addr | Critical |
| qs | Moderate |

These were transitive dependencies introduced through Express and its supporting packages.

## Completed Security Updates

Applied available updates using `npm audit fix`, without forcing major-version upgrades.

| Package | Previous Version | Updated Version |
|---|---:|---:|
| body-parser | 2.2.2 | 2.4.0 |
| proxy-addr | 2.0.7 | 2.0.8 |
| qs | 6.15.2 | 6.17.1 |
| side-channel | 1.1.0 | 1.1.1 |
| iconv-lite | 0.7.2 | 0.7.3 |

An additional dependency, `content-type`, was added as part of the dependency updates.

## Final Security Audit

Latest confirmed result:

```text
found 0 vulnerabilities
```

- Moderate vulnerabilities: 0
- High vulnerabilities: 0
- Critical vulnerabilities: 0

The updated backend was also tested successfully after the dependency changes.

## What I Learned

- npm audit.
- Dependency vulnerabilities.
- Transitive dependencies.
- Dependency updates.
- Package-lock management.
- Secure environment configuration.
- Avoiding unnecessary forced package upgrades.

---

# 8. Automated Backend Testing

## Objectives

- Introduce automated testing.
- Verify API functionality.
- Test database-backed endpoints.
- Test invalid requests.
- Verify error-handling behaviour.

## Testing Framework

Introduced Node.js's built-in testing framework.

Tools used:

- `node:test`
- `node:assert/strict`
- Fetch API

Created:

`server/test/app.test.js`

Updated the backend package scripts:

```json
"scripts": {
  "start": "node server.js",
  "test": "node --test"
}
```

## Automated Tests Implemented

The backend currently has eleven automated integration tests.

| No. | Test | Expected Behaviour |
|---:|---|---|
| 1 | GET `/` | Returns the EduPath API message |
| 2 | GET `/universities` | Returns university records |
| 3 | GET `/courses` | Returns course records |
| 4 | GET `/universities/SPU` | Returns university details and associated courses |
| 5 | GET `/universities/INVALID` | Returns HTTP 404 |
| 6 | GET `/courses/999999` | Returns HTTP 404 |
| 7 | POST `/aps/calculate` with empty marks | Returns HTTP 400 |
| 8 | POST `/aps/calculate` with non-numeric marks | Returns HTTP 400 |
| 9 | POST `/aps/calculate` with marks outside 0–100 | Returns HTTP 400 |
| 10 | POST `/aps/calculate` with valid marks | Accepts the request and returns a numerical APS result |
| 11 | POST `/aps/calculate` with malformed JSON | Returns HTTP 400 with a clean error message |

## Latest Test Results

```text
tests 11
pass 11
fail 0
cancelled 0
skipped 0
todo 0
```

**Latest confirmed result: 11/11 tests passed.**

The tests use a temporary Express server on an available port and close the server after testing.

The university and course integration tests also use the actual PostgreSQL database.

## What I Learned

- Automated testing.
- Integration testing.
- Test assertions.
- HTTP status codes.
- Testing API endpoints.
- Request validation.
- Testing error responses.
- Temporary test servers.
- Test setup and teardown.
- Testing application behaviour independently of the production server port.

---

# 9. Current Skills Demonstrated

## Frontend

- React.
- React Router.
- JavaScript.
- JSX.
- useState.
- useEffect.
- Conditional rendering.
- Component architecture.
- Props.
- API integration.
- Fetch API.

## Backend

- Node.js.
- Express.
- REST APIs.
- CommonJS.
- Async/Await.
- Middleware.
- Error handling.
- Environment variables.
- CORS.
- Application architecture.

## Database

- PostgreSQL.
- SQL.
- Data modelling.
- Primary keys.
- Foreign keys.
- Relationships.
- JOINs.
- Database queries.
- Connection pooling.

## Software Engineering

- Git and GitHub.
- SSH authentication.
- Version control.
- Dependency management.
- npm security auditing.
- Automated testing.
- Integration testing.
- Debugging.
- Problem solving.
- Software architecture.
- API design.
- Database design.
- Full-stack development.

---

# 10. Current Technical Limitations & Future Improvements

The following areas still require attention.

## APS Calculation Engine

- Frontend and backend currently use different simplified calculation methods.
- The existing backend formula is temporary.
- University-specific APS calculation rules still need to be researched and implemented.
- Subject-specific requirements must be supported.
- Life Orientation treatment must be configurable according to institutional rules.
- The system must distinguish overall APS eligibility from compulsory subject requirements.
- Final calculations must use verified university admission criteria.

## University & Course Information

- The current university and course records form a small demonstration dataset.
- More South African universities and qualifications must be added.
- Programme-specific admission requirements need to be verified.
- Course eligibility must eventually consider compulsory subjects and minimum subject marks.
- University information must be maintained using reliable official sources.

## Frontend & API Improvements

- Introduce environment-based frontend API URLs.
- Improve frontend API error handling.
- Add APS calculator input validation.
- Improve loading and error states.
- Improve application state persistence.
- Add appropriate 404 handling for frontend routes.
- Expand automated frontend testing.
- Improve responsive design.

## Recommendation System

- Replace basic APS-only recommendations with more meaningful eligibility checks.
- Improve Safety / Target / Reach classifications.
- Avoid presenting simple APS ratios as admission probabilities.
- Introduce qualification-specific eligibility requirements.
- Provide useful alternative course recommendations.

---

# 11. Long-Term Career Goal

The project is also part of my journey towards becoming a software developer.

My intended career progression is:

**Portfolio Projects**

↓

**Junior Full-Stack Developer / Software Developer**

↓

**Cloud Engineer**

↓

**DevOps Engineer**

Future interests include cloud computing, DevOps, automation and potentially AI/ML.

EduPath will serve as one of my main portfolio projects when applying for junior software development opportunities.

---

# 12. Current Development Status

**Current Project:** EduPath

**Current Development Stage:** Phase 1 — Foundation and Project Audit

## Completed Milestones

- Initial application inspection.
- React frontend and Express backend integration.
- PostgreSQL integration.
- Git and GitHub setup.
- SSH authentication.
- Initial project publication.
- Backend security improvements.
- Zero vulnerabilities in the latest backend npm audit.
- Backend architecture restructuring.
- Centralised environment configuration.
- Centralised error handling.
- APS input validation.
- Eleven passing backend automated tests.
- Development documentation review and update.

## Work Still Required Before Phase 1 Is Complete

1. Complete remaining backend architecture improvements.
2. Improve frontend API configuration and error handling.
3. Review frontend and backend integration.
4. Verify the complete application.
5. Expand testing where necessary.
6. Finalise project documentation.
7. Commit and push the current local improvements to GitHub.
8. Complete the Phase 1 verification checklist.

**Current Status:** Phase 1 is in progress. Major backend improvements have been completed locally, but the latest changes still need to be published to GitHub.

---

# 13. Development Roadmap

The following roadmap represents the planned future development of EduPath.

## Phase 1 — Foundation & Project Audit

**Goal:** Establish a reliable, maintainable and secure technical foundation.

Focus areas:

- Backend architecture.
- Database configuration.
- Security.
- API reliability.
- Error handling.
- Automated tests.
- Documentation.
- Initial frontend and backend verification.

## Phase 2 — Design & User Experience

**Goal:** Transform the current interface into a polished educational technology platform.

Planned improvements:

- Establish EduPath's visual identity.
- Redesign the homepage.
- Improve navigation.
- Redesign university pages.
- Improve course cards and course discovery.
- Redesign the APS calculator.
- Improve responsive layouts.
- Introduce consistent styling and interactions.
- Improve accessibility and usability.

## Phase 3 — Database & University Information

**Goal:** Build a more comprehensive and trustworthy South African university and course database.

Planned improvements:

- Expand the university database.
- Add more qualifications and programmes.
- Introduce programme-specific admission requirements.
- Record compulsory subjects.
- Record subject-specific minimum marks.
- Verify admission information using official university sources.
- Improve database relationships and structure.

## Phase 4 — APS Calculator & Eligibility Engine

**Goal:** Build an accurate, configurable APS and admission eligibility system.

Planned improvements:

- Research official university APS rules.
- Support different institutional calculation methods.
- Support configurable subject selection.
- Account for Life Orientation rules.
- Validate student marks.
- Check compulsory subject requirements.
- Explain eligibility results.
- Build automated calculation tests.

## Phase 5 — Smart Recommendations

**Goal:** Help students discover suitable study opportunities.

Planned improvements:

- Safety, Target and Reach recommendations based on clearly defined rules.
- Alternative qualification suggestions.
- Recommendations based on APS and subject results.
- Course suggestions based on student interests.
- Personalised academic guidance.

## Phase 6 — Student Accounts & Personalisation

**Goal:** Allow students to maintain their own EduPath profiles.

Planned improvements:

- Student registration.
- Secure login.
- Student profiles.
- Saved academic results.
- Favourite universities.
- Saved courses.
- Personalised student dashboard.

## Phase 7 — Testing, Quality & Security

**Goal:** Improve the application's reliability, performance and security.

Planned improvements:

- Expanded frontend and backend tests.
- API testing.
- Security improvements.
- Bug fixing.
- Accessibility testing.
- Mobile testing.
- Performance optimisation.
- Production-readiness checks.

## Phase 8 — Deployment & Portfolio Launch

**Goal:** Make EduPath publicly accessible and ready to showcase to employers.

Planned improvements:

- Deploy the frontend.
- Deploy the backend.
- Set up a production database.
- Configure cloud hosting.
- Configure production environment variables.
- Introduce CI/CD pipelines.
- Complete GitHub documentation.
- Prepare a project demonstration.
- Add EduPath to my professional CV and portfolio.

---

# 14. Long-Term Product Vision

EduPath aims to become a comprehensive South African university and career guidance platform.

The ultimate goal is to help students:

- Discover South African universities.
- Calculate APS scores accurately.
- Explore qualifications and courses.
- Understand university admission requirements.
- Check academic eligibility.
- Compare universities and courses.
- Discover alternative study opportunities.
- Receive useful academic recommendations.
- Make informed decisions about their futures.

The long-term objective is to turn EduPath into a polished, reliable, secure and publicly accessible educational technology product.

**The vision is not simply to build another university directory. It is to build a platform that genuinely helps South African students make better decisions about their education and future careers.**

---

**Project:** EduPath
**Developer:** Jerry Reneke
**GitHub:** https://github.com/JerryReneke/EduPath
**Current Stage:** Phase 1 — Foundation and Project Audit




---

# Development Update — 5 November 2026

## Frontend Improvements

### Completed

Improved the existing EduPath frontend without rebuilding the application from scratch.

Implemented:

- Environment-based API configuration.
- Reusable API request handling.
- HTTP response validation.
- Network error handling.
- Loading states.
- Error messages for failed API requests.
- University detail error handling.
- Improved course search and filtering.
- University name and code displayed alongside courses.
- APS input validation.
- Empty subject validation.
- Percentage validation (0–100).
- Clearing previous APS results when marks change.
- Functional homepage navigation buttons.
- Improved university APS comparisons.
- Correct handling of zero APS scores.
- Improved eligibility messages.
- Added a dedicated 404 Not Found page.
- Added wildcard routing.

### University Recommendation Improvements

Replaced potentially misleading recommendation percentages and Safety/Target/Reach labels with direct APS comparisons.

Students can now see:

- Their APS score.
- The university's listed APS requirement.
- How many APS points they are above or below the requirement.

Important limitation:

Meeting a listed APS threshold does not guarantee admission. Subject-specific and programme requirements must also be considered.

The current APS scoring system remains provisional.

---

## Frontend Architecture Migration — Create React App to Vite

### Completed

Migrated the frontend from Create React App to Vite.

Removed:

- react-scripts.
- Create React App build configuration.
- Create React App development scripts.
- Old Create React App HTML entry point.
- Old Create React App starter test.

Installed:

- Vite 8.3.6.
- @vitejs/plugin-react 6.2.1.
- React Router 7.18.3.

Created:

- client/vite.config.mjs.
- New root client/index.html.

Updated:

- Frontend entry point from index.js to index.jsx.
- JSX-containing application files to .jsx extensions.
- API environment variable from REACT_APP_API_URL to VITE_API_URL.
- Frontend environment configuration.
- Development, build and preview scripts.

Preserved:

- Existing React components.
- CSS and application styling.
- React state management.
- React Router navigation.
- API integration.
- PostgreSQL backend communication.
- Public assets.

The frontend continues using port 3000, with the Express backend on port 5000.

The local client/.env file remains excluded from Git.

### Production Build Results

Successfully generated the Vite production build.

Latest verification:

- 35 modules transformed.
- JavaScript bundle: 192.20 kB.
- JavaScript gzip size: 62.48 kB.
- CSS bundle: 6.17 kB.
- Build completed successfully.

Production output is generated in client/dist.

---

## Frontend Automated Testing

### Completed

Replaced the Create React App testing system with Vitest.

Installed:

- Vitest 5.1.0.
- jsdom.
- React Testing Library.
- Jest DOM testing assertions.

Created:

- client/src/test/setup.js.
- client/src/components/APSCalculator.test.jsx.
- client/src/components/Courses.test.jsx.
- client/src/components/Universities.test.jsx.
- client/src/components/UniversityDetail.test.jsx.

Configured automatic cleanup between tests.

### Frontend Test Results

Latest results:

| Component | Tests Passed |
|---|---:|
| APS Calculator | 6 |
| Courses | 6 |
| Universities | 6 |
| University Detail | 5 |
| Total | 23 |

- Tests executed: 23.
- Tests passed: 23.
- Tests failed: 0.
- Test suites passed: 4.

All 23 frontend automated tests passed.

### What I Learned

- Vitest.
- jsdom.
- React Testing Library.
- Component testing.
- Mocking API requests.
- Testing asynchronous React components.
- Testing validation.
- Testing loading and error states.
- Automated test cleanup.

---

## Updated Security Audit Results

### Frontend

- Migrated away from Create React App.
- Removed outdated build tooling.
- Updated React Router.
- Applied compatible dependency updates.
- Added Vite and Vitest.

Final full frontend audit:

0 vulnerabilities.

### Backend

Final backend security audit:

0 vulnerabilities.

Both frontend and backend dependency trees currently report zero known vulnerabilities.

---

## Final Backend Verification

Repeated the complete backend automated test suite after the frontend migration.

Latest results:

- Tests executed: 11.
- Tests passed: 11.
- Tests failed: 0.

All backend integration tests passed.

Backend security audit also returned zero vulnerabilities.

---

## Current Development Status — 5 November 2026

Project: EduPath

Current phase: Phase 1 — Foundation and Project Audit.

### Completed Milestones

- Initial application foundation.
- React frontend.
- Express backend.
- PostgreSQL integration.
- Full-stack API communication.
- Git and GitHub integration.
- Backend architecture restructuring.
- Backend error handling.
- APS input validation.
- Frontend API improvements.
- University and course filtering.
- Frontend routing and 404 handling.
- Create React App to Vite migration.
- Frontend automated testing.
- Backend automated testing.
- Frontend production build.
- Zero reported frontend dependency vulnerabilities.
- Zero reported backend dependency vulnerabilities.

### Current GitHub Milestones

Latest published commit:

0dd01cb — Improve frontend validation and error handling.

Repository:

https://github.com/JerryReneke/EduPath

The Vite migration and automated frontend testing changes are awaiting their next Git commit.

### Remaining Phase 1 Activities

1. Review the complete project changes.
2. Verify Git configuration and environment-file protection.
3. Publish the Vite migration and automated frontend testing changes.
4. Perform the final application verification.
5. Confirm Phase 1 completion.

### Next Development Phase

Phase 2 — UI/UX Design and Redesign.

Planned focus:

- EduPath visual identity.
- Modern and professional interface.
- Improved dashboard layout.
- Better university and course cards.
- Responsive design.
- Improved navigation and user experience.

---

## Important Technical Limitations

The following remain future development priorities:

### APS Calculation Engine

- The current APS formula is provisional.
- Frontend and backend calculation methods still require unification.
- Official university-specific APS rules must be researched.
- Subject-specific admission requirements must be supported.
- Life Orientation treatment must reflect each institution's rules.

### University and Course Data

- Current records remain a demonstration dataset.
- More South African institutions and qualifications must be added.
- APS requirements must be verified against official university sources.
- Admission eligibility must eventually consider additional programme requirements.

### Future Technical Improvements

- APS state persistence.
- Additional frontend tests.
- Authentication and student accounts.
- University comparison functionality.
- AWS deployment.
- CI/CD pipelines.