/**
 * Counts the number of total violated and satisfied snippets for a rule.
 * For performance, we used for loops instead of forEach and reduce functions.
 * @param {Rule} rule
 * @returns {totalSatisfiedSnippetsCount: number, totalViolatedSnippetsCount: number}
 */
export const countSnippets = (rule) => {
    let totalSatisfiedSnippetsCount = 0;
    let totalViolatedSnippetsCount = 0;

    const fileGroups = rule.results;
    const fileGroupsLength = rule.results?.length ?? 0;

    for (let i = 0; i < fileGroupsLength; i++) {
        const fileGroup = fileGroups[i];
        const filesLength = fileGroups[i]?.length ?? 0;

        for (let j = 0; j < filesLength; j++) {
            const file = fileGroup[j];
            const snippets = file?.snippets;

            totalSatisfiedSnippetsCount += snippets?.satisfiedSnippets?.length ?? 0;
            totalViolatedSnippetsCount += snippets?.violatedSnippets?.length ?? 0;
        }
    }
    return {totalSatisfiedSnippetsCount, totalViolatedSnippetsCount};
};
