
const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

// Reusable API request handler
const apiRequest = async (endpoint, options = {}) => {
    let response;

    // Handle network errors
    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    } catch (error) {
        throw new Error(
            "Unable to connect to EduPath's server. Please check your connection."
        );
    }

    // Read the server response
    const contentType = response.headers.get("content-type") || "";

    let data;

    try {
        data = contentType.includes("application/json")
            ? await response.json()
            : await response.text();
    } catch (error) {
        throw new Error("The server returned an invalid response.");
    }

    // Handle unsuccessful HTTP responses
    if (!response.ok) {
        const message =
            typeof data === "object" && data !== null
                ? data.message
                : data;

        throw new Error(
            message || `Request failed with status ${response.status}`
        );
    }

    return data;
};

// Retrieve all courses
export const getCourses = async () => {
    return await apiRequest("/courses");
};

// Retrieve all universities
export const getUniversities = async () => {
    return await apiRequest("/universities");
};

// Retrieve one university by its code
export const getUniversityByCode = async (code) => {
    return await apiRequest(
        `/universities/${encodeURIComponent(code)}`
    );
};
