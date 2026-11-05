
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Courses from "./Courses";
import { getCourses } from "../api";

vi.mock("../api", () => ({
    getCourses: vi.fn()
}));

const mockCourses = [
    {
        id: 1,
        name: "Computer Science",
        aps: 42,
        code: "UCT",
        university_name: "University of Cape Town"
    },
    {
        id: 2,
        name: "Software Engineering",
        aps: 38,
        code: "Wits",
        university_name: "University of the Witwatersrand"
    },
    {
        id: 3,
        name: "ICT",
        aps: 20,
        code: "SPU",
        university_name: "Sol Plaatje University"
    }
];

describe("Courses", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        getCourses.mockResolvedValue(mockCourses);
    });

    it("should display courses retrieved from the API", async () => {
        render(<Courses apsScore={null} />);

        expect(await screen.findByText("Computer Science")).toBeInTheDocument();
        expect(screen.getByText("Software Engineering")).toBeInTheDocument();
        expect(screen.getByText("ICT")).toBeInTheDocument();
    });

    it("should display university information for each course", async () => {
        render(<Courses apsScore={null} />);

        expect(
            await screen.findByText(/University of Cape Town/)
        ).toBeInTheDocument();

        expect(
            screen.getByText(/Sol Plaatje University/)
        ).toBeInTheDocument();
    });

    it("should search courses by university name", async () => {
        render(<Courses apsScore={null} />);

        await screen.findByText("Computer Science");

        fireEvent.change(
            screen.getByPlaceholderText("Search courses or universities..."),
            { target: { value: "Sol Plaatje University" } }
        );

        expect(screen.getByText("ICT")).toBeInTheDocument();
        expect(screen.queryByText("Computer Science")).not.toBeInTheDocument();
    });

    it("should disable eligibility filtering without an APS score", async () => {
        render(<Courses apsScore={null} />);

        await screen.findByText("Computer Science");

        expect(
            screen.getByRole("checkbox", {
                name: /show only courses i qualify for/i
            })
        ).toBeDisabled();
    });

    it("should show only eligible courses when filtering is enabled", async () => {
        render(<Courses apsScore={29} />);

        await screen.findByText("Computer Science");

        const checkbox = screen.getByRole("checkbox", {
            name: /show only courses i qualify for/i
        });

        fireEvent.click(checkbox);

        expect(screen.getByText("ICT")).toBeInTheDocument();
        expect(screen.queryByText("Computer Science")).not.toBeInTheDocument();
        expect(screen.queryByText("Software Engineering")).not.toBeInTheDocument();
    });

    it("should display an error when the API request fails", async () => {
        getCourses.mockRejectedValue(
            new Error("Unable to connect to EduPath's server.")
        );

        render(<Courses apsScore={null} />);

        expect(
            await screen.findByRole("alert")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Unable to connect to EduPath's server.")
        ).toBeInTheDocument();
    });

});
