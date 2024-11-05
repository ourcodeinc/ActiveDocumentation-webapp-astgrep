import {countSnippets} from "./ruleProcessor";

describe("RulePanel countSnippets", () => {
    it("should return 0 for both counts when ruleI is empty", () => {
        const result = countSnippets({results: []});
        expect(result).toEqual({totalSatisfiedSnippetsCount: 0, totalViolatedSnippetsCount: 0});
    });

    it("should count satisfied and violated snippets correctly", () => {
        const ruleI = {
            results: [
                [
                    {
                        snippets: {
                            satisfiedSnippets: [{snippet: "satisfied 1"}, {snippet: "satisfied 2"}],
                            violatedSnippets: [{snippet: "violated 1"}],
                        },
                    },
                ],
                [
                    {
                        snippets: {
                            satisfiedSnippets: [{snippet: "satisfied 3"}],
                            violatedSnippets: [],
                        },
                    },
                ],
            ],
        };

        const result = countSnippets(ruleI);
        expect(result).toEqual({totalSatisfiedSnippetsCount: 3, totalViolatedSnippetsCount: 1});
    });

    it("should return correct counts when there are no satisfied snippets", () => {
        const ruleI = {
            results: [
                [
                    {
                        snippets: {
                            satisfiedSnippets: [],
                            violatedSnippets: [{snippet: "violated 1"}, {snippet: "violated 2"}],
                        },
                    },
                ],
            ],
        };

        const result = countSnippets(ruleI);
        expect(result).toEqual({totalSatisfiedSnippetsCount: 0, totalViolatedSnippetsCount: 2});
    });

    it("should return correct counts when there are no violated snippets", () => {
        const ruleI = {
            results: [
                [
                    {
                        snippets: {
                            satisfiedSnippets: [{snippet: "satisfied 1"}],
                            violatedSnippets: [],
                        },
                    },
                ],
            ],
        };

        const result = countSnippets(ruleI);
        expect(result).toEqual({totalSatisfiedSnippetsCount: 1, totalViolatedSnippetsCount: 0});
    });

    it("should handle multiple file groups", () => {
        const ruleI = {
            results: [
                [
                    {
                        snippets: {
                            satisfiedSnippets: [{snippet: "satisfied 1"}],
                            violatedSnippets: [],
                        },
                    },
                    {
                        snippets: {
                            satisfiedSnippets: [{snippet: "satisfied 2"}],
                            violatedSnippets: [{snippet: "violated 1"}],
                        },
                    },
                ],
                [
                    {
                        snippets: {
                            satisfiedSnippets: [],
                            violatedSnippets: [{snippet: "violated 2"}],
                        },
                    },
                ],
            ],
        };

        const result = countSnippets(ruleI);
        expect(result).toEqual({totalSatisfiedSnippetsCount: 2, totalViolatedSnippetsCount: 2});
    });
});
