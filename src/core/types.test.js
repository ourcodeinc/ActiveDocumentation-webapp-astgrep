import {isValidRuleType, isValidRuleTable, validRules} from "./types";
import {mockRuleOne, mockRuleTwo, mockRuleThree, mockRuleFour} from "../__mocks__/mockRules";

describe("PropTypes Validation", () => {
    beforeEach(() => {
        console.log = jest.fn();
        console.error = jest.fn();
    });

    describe("isValidRuleType", () => {
        it("should return true for a valid rule object", () => {
            const validRule = {...mockRuleOne};

            expect(isValidRuleType(validRule)).toBe(true);
        });

        it("should return false for an invalid rule object (missing required title)", () => {
            const invalidRule = {...mockRuleOne};
            delete invalidRule.title; // Title is missing

            expect(isValidRuleType(invalidRule)).toBe(false);
        });

        it("should return false for an invalid rule object (wrong type for index)", () => {
            const invalidRule = {...mockRuleOne};
            invalidRule.index = 1; // Should be a string

            expect(isValidRuleType(invalidRule)).toBe(false);
        });
    });

    describe("isValidRuleTable", () => {
        it("should return true for a valid array of rule objects", () => {
            const validRuleTable = [mockRuleOne, mockRuleTwo];

            const result = isValidRuleTable(validRuleTable);
            expect(result).toBe(true);
        });

        it("should return false for an invalid array (contains invalid rule object)", () => {
            const invalidRuleTable = [
                {
                    index: 1,
                    title: "Rule 1",
                },
                mockRuleOne,
            ];

            const result = isValidRuleTable(invalidRuleTable);
            expect(result).toBe(false);
        });

        it("should return false for a non-array input", () => {
            const invalidRuleTable = mockRuleOne;

            const result = isValidRuleTable(invalidRuleTable);
            expect(result).toBe(false);
        });
    });

    describe("validRules", () => {
        it("should return an empty array for an empty input array", () => {
            const result = validRules([]);
            expect(result).toEqual([]);
        });

        it("should return false for non-array input", () => {
            const result = validRules("not an array");
            expect(result).toEqual([]);
        });

        it("should return only valid rules from the input", () => {
            const invalidRuleTwo = {...mockRuleTwo};
            delete invalidRuleTwo.title; // Title is missing
            const invalidRuleThree = {...mockRuleThree};
            invalidRuleThree.index = 5; // Title is missing
            const input = [
                mockRuleOne,
                invalidRuleTwo,
                invalidRuleThree,
                mockRuleFour,
            ];
            const result = validRules(input);
            expect(result).toEqual([mockRuleOne, mockRuleFour]);
        });

        it("should return an empty array if no valid rules are found", () => {
            const invalidRuleOne = {...mockRuleOne};
            invalidRuleOne.tags = "not an array";
            const invalidRuleTwo = {...mockRuleTwo};
            invalidRuleTwo.tags = null;
            const input = [invalidRuleOne, invalidRuleTwo];
            const result = validRules(input);
            expect(result).toEqual([]);
        });

        it("should handle deeply nested structures and return only valid rules", () => {
            const invalidRuleTwo = {...mockRuleTwo};
            invalidRuleTwo.description = {extra: "info"};
            const input = [
                mockRuleOne,
                invalidRuleTwo,
                mockRuleThree,
            ];
            const result = validRules(input);
            expect(result).toEqual([mockRuleOne, mockRuleThree]);
        });
    });
});
