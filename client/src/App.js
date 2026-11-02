import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import UniversityDetail from "./components/UniversityDetail";

import Home from "./pages/Home";
import UniversitiesPage from "./pages/UniversitiesPage";
import APSPage from "./pages/APSPage";
import CoursesPage from "./pages/CoursePage";

import Layout from "./components/layout/Layout";

function App() {
  const [apsScore, setApsScore] = useState(null);

  return (
    <Routes>

      <Route
        path="/"
        element={
          <Layout>
            <Home
              apsScore={apsScore}
              setApsScore={setApsScore}
            />
          </Layout>
        }
      />

      <Route
        path="/universities"
        element={
          <Layout>
            <UniversitiesPage apsScore={apsScore} />
          </Layout>
        }
      />

      <Route
        path="/aps"
        element={
          <Layout>
            <APSPage setApsScore={setApsScore} />
          </Layout>
        }
      />

      <Route
        path="/courses"
        element={
          <Layout>
            <CoursesPage apsScore={apsScore} />
          </Layout>
        }
      />

      <Route
        path="/university/:code"
        element={
          <Layout>
            <UniversityDetail apsScore={apsScore} />
          </Layout>
        }
      />

    </Routes>
  );
}

export default App;