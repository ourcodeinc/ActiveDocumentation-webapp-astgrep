import "@testing-library/jest-dom";
import React from "react";
import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import {countSnippets} from "../../core/ruleProcessor";
import RulePanel from "./rulePanel";

// Mock SnippetView
// eslint-disable-next-line react/display-name
jest.mock("./snippetView", () => (props) =>
    (<div data-testid="snippet-view">Snippet Data: {JSON.stringify(props.snippetData)}</div>));
jest.mock("../../core/ruleProcessor", () => ({
    countSnippets: jest.fn(),
}));

describe("RulePanel Component", () => {
    const mockRule = {
        title: "Test Rule",
        description: "This is a test rule description",
        tags: ["tag1", "tag2"],
        results: [
            [
                {
                    relativeFilePath: "file1.js",
                    snippets: {
                        satisfiedSnippets: [{snippet: "satisfied snippet 1"}, {snippet: "satisfied snippet 2"}],
                        violatedSnippets: [{snippet: "violated snippet 1"}],
                    },
                },
            ],
        ],
    };

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

        expect(screen.getByText("tag1")).toBeInTheDocument();
        expect(screen.getByText("tag2")).toBeInTheDocument();
    });

    it("renders satisfied snippet tab", () => {
        render(<RulePanel ruleI={mockRule} />);

        const examplesTabHeader = screen.getByText("Examples");
        expect(examplesTabHeader).toBeInTheDocument();

        fireEvent.click(examplesTabHeader);

        expect(screen.getByText("Snippet Data: {\"snippet\":\"satisfied snippet 1\"}")).toBeInTheDocument();
        expect(screen.getByText("Snippet Data: {\"snippet\":\"satisfied snippet 2\"}")).toBeInTheDocument();
    });

    it("renders violated snippet tab", () => {
        render(<RulePanel ruleI={mockRule} />);

        const violatedTabHeader = screen.getByText("Violated");
        expect(violatedTabHeader).toBeInTheDocument();

        fireEvent.click(violatedTabHeader);

        expect(screen.getByText("Snippet Data: {\"snippet\":\"violated snippet 1\"}")).toBeInTheDocument();
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
