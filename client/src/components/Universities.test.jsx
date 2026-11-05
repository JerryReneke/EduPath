
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Universities from "./Universities";
import { getUniversities } from "../api";

vi.mock("../api", () => ({
    getUniversities: vi.fn()
}));

// Simplify university cards for testing
vi.mock("./UniversityCard", () => ({
    default: ({ university, children }) => (
        <article>
            <h3>{university.name}</h3>
            {children}
        </article>
    )
}));

const mockUniversities = [
    {
        id: 1,
        name: "University of Cape Town",
        code: "UCT",
        aps: 42,
        description: "University in Cape Town"
    },
    {
        id: 2,
        name: "University of the Witwatersrand",
        code: "Wits",
        aps: 38,
        description: "University in Johannesburg"
    },
    {
        id: 3,
        name: "Sol Plaatje University",
        code: "SPU",
        aps: 20,
        description: "University in Kimberley"
    }
];

describe("Universities", () => {

    beforeEach(() => {
        vi.clearAllMocks();
        getUniversities.mockResolvedValue(mockUniversities);
    });

    it("should display universities retrieved from the API", async () => {
        render(<Universities apsScore={null} />);

        expect(
            await screen.findByText("University of Cape Town")
        ).toBeInTheDocument();

        expect(
            screen.getByText("University of the Witwatersrand")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Sol Plaatje University")
        ).toBeInTheDocument();
    });

    it("should search universities by name", async () => {
        render(<Universities apsScore={null} />);

        await screen.findByText("University of Cape Town");

        fireEvent.change(
            screen.getByPlaceholderText("Search university..."),
            { target: { value: "Sol Plaatje" } }
        );

        expect(
            screen.getByText("Sol Plaatje University")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("University of Cape Town")
        ).not.toBeInTheDocument();
    });

    it("should search universities by code", async () => {
        render(<Universities apsScore={null} />);

        await screen.findByText("University of Cape Town");

        fireEvent.change(
            screen.getByPlaceholderText("Search university..."),
            { target: { value: "SPU" } }
        );

        expect(
            screen.getByText("Sol Plaatje University")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("University of Cape Town")
        ).not.toBeInTheDocument();
    });

    it("should identify universities meeting the APS threshold", async () => {
        render(<Universities apsScore={29} />);

        await screen.findByText(
            "9 APS points above the listed threshold."
        );

        expect(
            screen.getAllByText("You meet the listed APS threshold.")
                .length
        ).toBeGreaterThan(0);

        expect(
            screen.getByText("13 APS points below the listed threshold.")
        ).toBeInTheDocument();

    });

    it("should recognise zero as a calculated APS score", async () => {
        render(<Universities apsScore={0} />);

        expect(
            await screen.findByText(
                "20 APS points below the listed threshold."
            )
        ).toBeInTheDocument();

        expect(
            screen.queryByText(
                "Calculate your APS score to compare it with university requirements."
            )
        ).not.toBeInTheDocument();
    });

    it("should display an error when the API request fails", async () => {
        vi.spyOn(console, "error").mockImplementation(() => {});

        getUniversities.mockRejectedValue(
            new Error("Unable to connect to EduPath's server.")
        );

        render(<Universities apsScore={null} />);

        expect(
            await screen.findByRole("alert")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Unable to connect to EduPath's server.")
        ).toBeInTheDocument();
    });

});
