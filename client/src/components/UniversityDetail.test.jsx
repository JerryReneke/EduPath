
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UniversityDetail from "./UniversityDetail";
import { getUniversityByCode } from "../api";

vi.mock("../api", () => ({
    getUniversityByCode: vi.fn()
}));

const mockUniversity = {
    id: 3,
    name: "Sol Plaatje University",
    code: "SPU",
    aps: 20,
    courses: [
        {
            id: 1,
            name: "Computer Science",
            aps: 22
        },
        {
            id: 2,
            name: "ICT",
            aps: 20
        }
    ]
};

function renderUniversityDetail(apsScore = null, code = "SPU") {
    return render(
        <MemoryRouter initialEntries={[`/university/${code}`]}>
            <Routes>
                <Route
                    path="/university/:code"
                    element={<UniversityDetail apsScore={apsScore} />}
                />
            </Routes>
        </MemoryRouter>
    );
}

describe("UniversityDetail", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        getUniversityByCode.mockResolvedValue(mockUniversity);
    });

    it("should display university details", async () => {
        renderUniversityDetail();

        expect(
            await screen.findByText("Sol Plaatje University")
        ).toBeInTheDocument();

        expect(screen.getByText(/APS Requirement:/)).toBeInTheDocument();
        expect(
            screen.getByText("APS Requirement:").parentElement
        ).toHaveTextContent("20");
    });

    it("should display courses offered by the university", async () => {
        renderUniversityDetail();

        expect(
            await screen.findByText("Computer Science")
        ).toBeInTheDocument();

        expect(
            screen.getByText("ICT")
        ).toBeInTheDocument();
    });


    it("should show recommended courses based on APS", async () => {
        renderUniversityDetail(22);

        const computerScienceItem = await screen.findByText("Computer Science");
        const ictItem = screen.getByText("ICT");

        expect(computerScienceItem.closest("li"))
            .toHaveTextContent("You meet the listed APS threshold");

        expect(ictItem.closest("li"))
            .toHaveTextContent("You meet the listed APS threshold");

    });


    it("should display university not found when the API returns 404", async () => {
        getUniversityByCode.mockRejectedValue(
            new Error("University not found")
        );

        renderUniversityDetail(null, "INVALID");

        expect(
            await screen.findByText("Unable to load university")
        ).toBeInTheDocument();

        expect(
            screen.getByText("University not found")
        ).toBeInTheDocument();
    });

    it("should display an error when the API connection fails", async () => {
        getUniversityByCode.mockRejectedValue(
            new Error("Unable to connect to EduPath's server.")
        );

        renderUniversityDetail();

        expect(
            await screen.findByRole("alert")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Unable to connect to EduPath's server.")
        ).toBeInTheDocument();
    });

});
