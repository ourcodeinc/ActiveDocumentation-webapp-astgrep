import "@testing-library/jest-dom";
import React from "react";
import {render, screen} from "@testing-library/react";
import SnippetView from "./snippetView";

describe("SnippetView Component", () => {
    const mockSnippetData = {
        snippet: "Line 1\nLine 2\nLine 3\nLine 4",
    };
    const mockFilePath = "path/to/snippet.js";

    it("renders snippet data correctly", () => {
        render(<SnippetView snippetData={mockSnippetData} snippetFilePath={mockFilePath} />);

        expect(screen.getByTestId("file-path")).toHaveTextContent(mockFilePath);

        expect(screen.getByText(/Line 1/)).toBeInTheDocument();
        expect(screen.getByText(/Line 2/)).toBeInTheDocument();
        expect(screen.queryByText(/Line 3/)).not.toBeInTheDocument();
    });

    it("updates state on prop change", () => {
        const {rerender} = render(<SnippetView snippetData={mockSnippetData} snippetFilePath={mockFilePath} />);

        const newSnippetData = {
            snippet: "New Line 1\nNew Line 2\nNew Line 3",
        };
        const newFilePath = "path/to/newSnippet.js";

        rerender(<SnippetView snippetData={newSnippetData} snippetFilePath={newFilePath} />);

        expect(screen.getByTestId("file-path")).toHaveTextContent(newFilePath);

        expect(screen.getByText(/New Line 1/)).toBeInTheDocument();
        expect(screen.getByText(/New Line 2/)).toBeInTheDocument();
        expect(screen.queryByText(/New Line 3/)).not.toBeInTheDocument();
    });

    it("does not update state if props are the same", () => {
        const {rerender} = render(<SnippetView snippetData={mockSnippetData} snippetFilePath={mockFilePath} />);

        rerender(<SnippetView snippetData={mockSnippetData} snippetFilePath={mockFilePath} />);

        expect(screen.getByTestId("file-path")).toHaveTextContent(mockFilePath);
        expect(screen.getByText(/Line 1/)).toBeInTheDocument();
        expect(screen.getByText(/Line 2/)).toBeInTheDocument();
        expect(screen.queryByText(/Line 3/)).not.toBeInTheDocument();
    });
});
