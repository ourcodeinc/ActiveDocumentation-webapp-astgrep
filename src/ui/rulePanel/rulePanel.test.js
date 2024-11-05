import "@testing-library/jest-dom";
import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {countSnippets} from "../../core/ruleProcessor";
import RulePanel from "./rulePanel";
import {mockRuleSix} from "../../__mocks__/mockRules";

// Mock SnippetView
// eslint-disable-next-line react/display-name
jest.mock("./snippetView", () => ({snippetData}) =>
    (<div data-testid="snippet-view">Snippet Data: {snippetData.snippet}</div>));
jest.mock("../../core/ruleProcessor", () => ({
    countSnippets: jest.fn(),
}));

describe("RulePanel Component", () => {
    const mockRule = {...mockRuleSix};

    beforeEach(() => {
        // Reset mocks before each test
        countSnippets.mockReturnValue({
            totalSatisfiedSnippetsCount: 1,
            totalViolatedSnippetsCount: 1,
        });
    });

    it("renders rule title and description", () => {
        render(<RulePanel ruleI={mockRule} />);

        expect(screen.getByText(mockRule.title)).toBeInTheDocument();
        expect(screen.getByText(mockRule.description)).toBeInTheDocument();
    });

    it("renders tags correctly", () => {
        render(<RulePanel ruleI={mockRule} />);

        expect(screen.getByText("Tag1")).toBeInTheDocument();
        expect(screen.getByText("Tag2")).toBeInTheDocument();
    });

    it("renders satisfied snippet tab", () => {
        render(<RulePanel ruleI={mockRule} />);

        const examplesTabHeader = screen.getByText("Examples");
        expect(examplesTabHeader).toBeInTheDocument();

        fireEvent.click(examplesTabHeader);

        expect(screen.getByText("Snippet Data: satisfied snippet 1")).toBeInTheDocument();
        expect(screen.getByText("Snippet Data: satisfied snippet 2")).toBeInTheDocument();
    });

    it("renders violated snippet tab", () => {
        render(<RulePanel ruleI={mockRule} />);

        const violatedTabHeader = screen.getByText("Violated");
        expect(violatedTabHeader).toBeInTheDocument();

        fireEvent.click(violatedTabHeader);

        expect(screen.getByText("Snippet Data: violated snippet 1")).toBeInTheDocument();
    });

    it("collapses and expands panel correctly", async () => {
        const {container} = render(<RulePanel ruleI={mockRule} />);

        expect(container.querySelector(".collapse.show")).toBeInTheDocument();

        // Click the caret up to collapse the panel
        fireEvent.click(screen.getByTestId("caret-up"));
        await waitFor(() => {
            expect(container.querySelector(".collapse.show")).not.toBeInTheDocument();
        });

        // Click the caret down to expand the panel
        fireEvent.click(screen.getByTestId("caret-down"));
        await waitFor(() => {
            expect(container.querySelector(".collapse.show")).toBeInTheDocument();
        });
    });
});
