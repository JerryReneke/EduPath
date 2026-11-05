
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import APSCalculator from "./APSCalculator";

describe("APSCalculator", () => {

    const enterMarks = (marks) => {
        Object.entries(marks).forEach(([subject, value]) => {
            fireEvent.change(
                screen.getByPlaceholderText(
                    subject === "math" ? "Mathematics %" :
                    subject === "english" ? "English %" :
                    `${subject === "subject3" ? "Subject 3" :
                      subject === "subject4" ? "Subject 4" :
                      "Subject 5"} %`
                ),
                { target: { value } }
            );
        });
    };

    it("should render all five subject inputs", () => {
        render(<APSCalculator setApsScore={vi.fn()} />);

        expect(screen.getByPlaceholderText("Mathematics %")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("English %")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Subject 3 %")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Subject 4 %")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Subject 5 %")).toBeInTheDocument();
    });

    it("should calculate an APS score from valid marks", () => {
        const setApsScore = vi.fn();

        render(<APSCalculator setApsScore={setApsScore} />);

        enterMarks({
            math: "75",
            english: "80",
            subject3: "65",
            subject4: "70",
            subject5: "60"
        });

        fireEvent.click(screen.getByRole("button", {
            name: /calculate aps/i
        }));

        expect(screen.getByText("29")).toBeInTheDocument();
        expect(setApsScore).toHaveBeenLastCalledWith(29);
    });

    it("should reject empty subject fields", () => {
        const setApsScore = vi.fn();

        render(<APSCalculator setApsScore={setApsScore} />);

        fireEvent.click(screen.getByRole("button", {
            name: /calculate aps/i
        }));

        expect(
            screen.getByText("Please enter marks for all five subjects.")
        ).toBeInTheDocument();
    });

    it("should reject marks above 100", () => {
        const setApsScore = vi.fn();

        render(<APSCalculator setApsScore={setApsScore} />);

        enterMarks({
            math: "150",
            english: "80",
            subject3: "65",
            subject4: "70",
            subject5: "60"
        });

        fireEvent.click(screen.getByRole("button", {
            name: /calculate aps/i
        }));

        expect(
            screen.getByText("All subject marks must be between 0 and 100.")
        ).toBeInTheDocument();
    });

    it("should reject negative marks", () => {
        const setApsScore = vi.fn();

        render(<APSCalculator setApsScore={setApsScore} />);

        enterMarks({
            math: "-10",
            english: "80",
            subject3: "65",
            subject4: "70",
            subject5: "60"
        });

        fireEvent.click(screen.getByRole("button", {
            name: /calculate aps/i
        }));

        expect(
            screen.getByText("All subject marks must be between 0 and 100.")
        ).toBeInTheDocument();
    });

    it("should clear the previous APS result when marks change", () => {
        const setApsScore = vi.fn();

        render(<APSCalculator setApsScore={setApsScore} />);

        enterMarks({
            math: "75",
            english: "80",
            subject3: "65",
            subject4: "70",
            subject5: "60"
        });

        fireEvent.click(screen.getByRole("button", {
            name: /calculate aps/i
        }));

        expect(screen.getByText("29")).toBeInTheDocument();

        fireEvent.change(
            screen.getByPlaceholderText("Mathematics %"),
            { target: { value: "70" } }
        );

        expect(screen.queryByText("29")).not.toBeInTheDocument();
        expect(setApsScore).toHaveBeenLastCalledWith(null);
    });

});
