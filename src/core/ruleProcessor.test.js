import {countSnippets} from "./ruleProcessor";
import {mockRuleOne, mockRuleTwo, mockRuleThree, mockRuleFour, mockRuleFive} from "../__mocks__/mockRules";


describe("RulePanel countSnippets", () => {
    it("should return 0 for both counts when ruleI is empty", () => {
        const ruleI = {...mockRuleFive};
        const result = countSnippets(ruleI);
        expect(result).toEqual({totalSatisfiedSnippetsCount: 0, totalViolatedSnippetsCount: 0});
    });

    it("should count satisfied and violated snippets correctly", () => {
        const ruleI = {...mockRuleOne};
        const result = countSnippets(ruleI);
        expect(result).toEqual({totalSatisfiedSnippetsCount: 2, totalViolatedSnippetsCount: 1});
    });

    it("should return correct counts when there are no satisfied snippets", () => {
        const ruleI = {...mockRuleThree};

        const result = countSnippets(ruleI);
        expect(result).toEqual({totalSatisfiedSnippetsCount: 0, totalViolatedSnippetsCount: 2});
    });

    it("should return correct counts when there are no violated snippets", () => {
        const ruleI = {...mockRuleFour};

        const result = countSnippets(ruleI);
        expect(result).toEqual({totalSatisfiedSnippetsCount: 1, totalViolatedSnippetsCount: 0});
    });

    it("should handle multiple file groups", () => {
        const ruleI = {...mockRuleTwo};
        const result = countSnippets(ruleI);
        expect(result).toEqual({totalSatisfiedSnippetsCount: 1, totalViolatedSnippetsCount: 2});
    });
});
