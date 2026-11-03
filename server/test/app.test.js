
const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");

const app = require("../app");

let server;
let baseUrl;

// Start a temporary server before testing
before(async () => {
    server = app.listen(0);

    await new Promise((resolve) => {
        server.once("listening", resolve);
    });

    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
});

// Close the temporary server after testing
after(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
});

// Test the API homepage
test("GET / should return the EduPath API message", async () => {
    const response = await fetch(`${baseUrl}/`);

    assert.equal(response.status, 200);

    const message = await response.text();

    assert.equal(message, "EduPath API is running");
});

// Test retrieving all universities
test("GET /universities should return university records", async () => {
    const response = await fetch(`${baseUrl}/universities`);

    assert.equal(response.status, 200);

    const universities = await response.json();

    assert.ok(Array.isArray(universities));
    assert.ok(universities.length > 0);

    assert.ok(
        universities.some((university) => university.code === "SPU"),
        "Universities should include SPU"
    );
});

// Test retrieving all courses
test("GET /courses should return course records", async () => {
    const response = await fetch(`${baseUrl}/courses`);

    assert.equal(response.status, 200);

    const courses = await response.json();

    assert.ok(Array.isArray(courses));
    assert.ok(courses.length > 0);

    assert.ok(
        courses.every((course) =>
            course.id &&
            course.name &&
            course.aps !== undefined &&
            course.code &&
            course.university_name
        ),
        "Courses should contain the expected information"
    );
});

// Test retrieving an individual university
test("GET /universities/SPU should return university details and courses", async () => {
    const response = await fetch(`${baseUrl}/universities/SPU`);

    assert.equal(response.status, 200);

    const university = await response.json();

    assert.equal(university.code, "SPU");
    assert.ok(Array.isArray(university.courses));
    assert.ok(university.courses.length > 0);
});



test("GET /universities/INVALID should return 404", async () => {
    const response = await fetch(`${baseUrl}/universities/INVALID`);

    assert.equal(response.status, 404);

    const data = await response.json();

    assert.equal(data.message, "University not found");
});

test("GET /courses/999999 should return 404", async () => {
    const response = await fetch(`${baseUrl}/courses/999999`);

    assert.equal(response.status, 404);

    const data = await response.json();

    assert.equal(data.message, "Course not found");
});


// Test rejecting an empty marks array
test("POST /aps/calculate should reject empty marks", async () => {
    const response = await fetch(`${baseUrl}/aps/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marks: [] })
    });

    assert.equal(response.status, 400);

    const data = await response.json();

    assert.equal(data.message, "Marks must be a non-empty array");
});

// Test rejecting non-numeric marks
test("POST /aps/calculate should reject non-numeric marks", async () => {
    const response = await fetch(`${baseUrl}/aps/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marks: [75, "eighty", 65] })
    });

    assert.equal(response.status, 400);

    const data = await response.json();

    assert.equal(
        data.message,
        "All marks must be numbers between 0 and 100"
    );
});

// Test rejecting marks outside the valid range
test("POST /aps/calculate should reject marks outside 0-100", async () => {
    const response = await fetch(`${baseUrl}/aps/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marks: [75, 105, -5] })
    });

    assert.equal(response.status, 400);

    const data = await response.json();

    assert.equal(
        data.message,
        "All marks must be numbers between 0 and 100"
    );
});

// Test accepting valid numeric marks
test("POST /aps/calculate should accept valid marks", async () => {
    const response = await fetch(`${baseUrl}/aps/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marks: [75, 80, 65, 70, 60] })
    });

    assert.equal(response.status, 200);

    const data = await response.json();

    assert.equal(typeof data.apsScore, "number");
});



test("POST /aps/calculate should handle malformed JSON", async () => {
    const response = await fetch(`${baseUrl}/aps/calculate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: '{"marks":[75,80'
    });

    assert.equal(response.status, 400);

    const data = await response.json();

    assert.equal(data.message, "Invalid JSON request body");
});
