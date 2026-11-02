export const getCourses = async () => {
    const res = await fetch("http://localhost:5000/courses");
    const data = await res.json();
    return data;
};


export const getUniversities = async () => {
    const res = await fetch("http://localhost:5000/universities");
    const data = await res.json();
    return data;
};


export const getUniversityByCode = async (code) => {
    const res = await fetch(`http://localhost:5000/universities/${code}`);
    return await res.json();
};