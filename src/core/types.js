import {isValidInput, isTypedCorrectly} from "./utilities";

const ruleStructure = {
    index: "string",
    title: "string",
    description: "string",
    tags: "array",
    rulePatternQuantifier: "plain object", // an object with a `rule` property
    rulePatternConstraint: "plain object", // an object with a `rule` property
    language: "string",
    filesAndFolders: "array",
    results: "array",
};

/**
 * Checks if an object is a valid Rule.
 * @param {any} input - The object to check.
 * @returns {boolean} - True if the object matches the Rule structure, otherwise false.
 */
export const isValidRuleType = (input) => {
    if (!isValidInput(input, "plain object", ruleStructure)) {
        return false;
    }
    // Additional checks for arrays
    return Array.isArray(input.tags) && input.tags.every((tag) => typeof tag === "string");
};

/**
 * Checks if the given object is a valid ruleTable; array of rule objects
 * @param {any} input
 * @returns {boolean}
 */
export const isValidRuleTable = (input) => {
    if (!isTypedCorrectly(input, "array")) {
        return false;
    }
    return input.every((rule) => isValidRuleType(rule));
};

/**
 * Returns valid rules from the input
 * @param {any} input
 * @returns {Rule[]}
 */
export const validRules = (input) => {
    if (!isTypedCorrectly(input, "array")) {
        return [];
    }
    return input.filter((rule) => {
        const isValid = isValidRuleType(rule);
        if (!isValid) {
            console.log("types.validRules:", "Invalid Rule:", rule);
        }
        return isValid;
    });
};

/**
 * @typedef {snippet: string, lines: { start: number, end: number },
 *           columns: { start: number, end: number }, offsets: { start: number, end: number }} Snippet
 * @typedef {relativePath: string,
 *           snippets: {satisfiedSnippets: Snippet[], violatedSnippets: Snippet[]}} ResultObject
 * @typedef {index: string, title: string, description: string, tags: string[],
 *           rulePatternQuantifier: {rule: object}, rulePatternQuantifier: {rule: object},
 *           language: string, fileAndFolders: string[], results: ResultObject[][]} Rule
 */
