/**
 * Results with satisfied and violated results in one file.
 */
export const mockRuleOne = {
    "index": "1",
    "title": "Title Rule 1",
    "description": "Results with satisfied and violated results in one file.",
    "tags": [
        "Tag1", "Tag2",
    ],
    "filesAndFolders": [
        "src/UserCon.js",
        "src/com",
    ],
    "rulePatternQuantifier": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
        },
    },
    "rulePatternConstraint": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
            "has": {
                "kind": "property_identifier",
                "regex": "^getAll.*$",
            },
        },
    },
    "language": "JavaScript",
    "results": [
        [
            {
                "relativeFilePath": "src/UserCon.js",
                "snippets": {
                    "satisfiedSnippets": [
                        {
                            "snippet": "@override\n    getAllUsers() {\n        return [\"User1\", \"User2\", \"User3\"];\n    }",
                            "lines": {
                                "start": 5,
                                "end": 8,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 83,
                                "end": 162,
                            },
                        },
                        {
                            "snippet": "getUser(id) {\n        return `User with ID: ${id}`;\n    }",
                            "lines": {
                                "start": 1,
                                "end": 3,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 20,
                                "end": 77,
                            },
                        },
                    ],
                    "violatedSnippets": [
                        {
                            "snippet": "getTY() {\n        return 0;\n    }",
                            "lines": {
                                "start": 16,
                                "end": 18,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 206,
                                "end": 239,
                            },
                        },
                    ],
                },
            },
        ],
    ],
};

/**
 * Results in two differnt files, one with no satisfied, one with no violations.
 */
export const mockRuleTwo = {
    "index": "2",
    "title": "Title Rule 2",
    "description": "Results in two differnt files, one with no satisfied, one with no violations.",
    "tags": [
        "Tag1", "Tag2", "Tag3",
    ],
    "filesAndFolders": [
        "src/UserCon.js",
        "src/SomeFile.js",
    ],
    "rulePatternQuantifier": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
        },
    },
    "rulePatternConstraint": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
            "has": {
                "kind": "property_identifier",
                "regex": "^getAll.*$",
            },
        },
    },
    "language": "JavaScript",
    "results": [
        [
            {
                "relativeFilePath": "src/UserCon.js",
                "snippets": {
                    "satisfiedSnippets": [],
                    "violatedSnippets": [
                        {
                            "snippet": "getUser(id) {\n        return `User with ID: ${id}`;\n    }",
                            "lines": {
                                "start": 1,
                                "end": 3,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 20,
                                "end": 77,
                            },
                        },
                        {
                            "snippet": "getTY() {\n        return 0;\n    }",
                            "lines": {
                                "start": 16,
                                "end": 18,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 206,
                                "end": 239,
                            },
                        },
                    ],
                },
            },
            {
                "relativeFilePath": "src/SomeFile.js",
                "snippets": {
                    "satisfiedSnippets": [
                        {
                            "snippet": "@override\n    getAllUsers() {\n        return [\"User1\", \"User2\", \"User3\"];\n    }",
                            "lines": {
                                "start": 5,
                                "end": 8,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 83,
                                "end": 162,
                            },
                        },
                    ],
                    "violatedSnippets": [],
                },
            },
        ],
    ],
};

/**
 * Results in one files, with no satisfied result.
 */
export const mockRuleThree = {
    "index": "3",
    "title": "Title Rule 3",
    "description": "Results in one files, with no satisfied result.",
    "tags": [
        "Tag1", "Tag2", "Tag3",
    ],
    "filesAndFolders": [
        "src/UserCon.js",
    ],
    "rulePatternQuantifier": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
        },
    },
    "rulePatternConstraint": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
            "has": {
                "kind": "property_identifier",
                "regex": "^getAll.*$",
            },
        },
    },
    "language": "JavaScript",
    "results": [
        [
            {
                "relativeFilePath": "src/UserCon.js",
                "snippets": {
                    "satisfiedSnippets": [],
                    "violatedSnippets": [
                        {
                            "snippet": "getUser(id) {\n        return `User with ID: ${id}`;\n    }",
                            "lines": {
                                "start": 1,
                                "end": 3,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 20,
                                "end": 77,
                            },
                        },
                        {
                            "snippet": "getTY() {\n        return 0;\n    }",
                            "lines": {
                                "start": 16,
                                "end": 18,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 206,
                                "end": 239,
                            },
                        },
                    ],
                },
            },
        ],
    ],
};

/**
 * Results in one files, with no violations.
 */
export const mockRuleFour = {
    "index": "4",
    "title": "Title Rule 4",
    "description": "Results in one files, with no violations.",
    "tags": [
        "Tag1", "Tag2", "Tag3",
    ],
    "filesAndFolders": [
        "src/UserCon.js",
    ],
    "rulePatternQuantifier": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
        },
    },
    "rulePatternConstraint": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
            "has": {
                "kind": "property_identifier",
                "regex": "^getAll.*$",
            },
        },
    },
    "language": "JavaScript",
    "results": [
        [
            {
                "relativeFilePath": "src/UserCon.js",
                "snippets": {
                    "satisfiedSnippets": [
                        {
                            "snippet": "@override\n    getAllUsers() {\n        return [\"User1\", \"User2\", \"User3\"];\n    }",
                            "lines": {
                                "start": 5,
                                "end": 8,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 83,
                                "end": 162,
                            },
                        },
                    ],
                    "violatedSnippets": [],
                },
            },
        ],
    ],
};

/**
 * No results
 */
export const mockRuleFive = {
    "index": "5",
    "title": "Title Rule 5",
    "description": "No results",
    "tags": [
        "Tag1", "Tag2", "Tag3",
    ],
    "filesAndFolders": [
        "src/UserCon.js",
        "src/SomeFile.js",
    ],
    "rulePatternQuantifier": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
        },
    },
    "rulePatternConstraint": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
            "has": {
                "kind": "property_identifier",
                "regex": "^getAll.*$",
            },
        },
    },
    "language": "JavaScript",
    "results": [
        [
            {
                "relativeFilePath": "src/UserCon.js",
                "snippets": {
                    "satisfiedSnippets": [],
                    "violatedSnippets": [],
                },
            },
            {
                "relativeFilePath": "src/SomeFile.js",
                "snippets": {
                    "satisfiedSnippets": [],
                    "violatedSnippets": [],
                },
            },
        ],
    ],
};

/**
 * Results with one line satisfied and violated results in one file.
 */
export const mockRuleSix = {
    "index": "6",
    "title": "Title Rule 6",
    "description": "Results with one line satisfied and violated results in one file.",
    "tags": [
        "Tag1", "Tag2",
    ],
    "filesAndFolders": [
        "src/UserCon.js",
    ],
    "rulePatternQuantifier": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
        },
    },
    "rulePatternConstraint": {
        "rule": {
            "kind": "method_definition",
            "pattern": "$FUNC",
            "inside": {
                "kind": "class_body",
                "follows": {
                    "kind": "identifier",
                    "regex": "^.*Con$",
                },
            },
            "has": {
                "kind": "property_identifier",
                "regex": "^getAll.*$",
            },
        },
    },
    "language": "JavaScript",
    "results": [
        [
            {
                "relativeFilePath": "src/UserCon.js",
                "snippets": {
                    "satisfiedSnippets": [
                        {
                            "snippet": "satisfied snippet 1",
                            "lines": {
                                "start": 5,
                                "end": 8,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 83,
                                "end": 162,
                            },
                        },
                        {
                            "snippet": "satisfied snippet 2",
                            "lines": {
                                "start": 1,
                                "end": 3,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 20,
                                "end": 77,
                            },
                        },
                    ],
                    "violatedSnippets": [
                        {
                            "snippet": "violated snippet 1",
                            "lines": {
                                "start": 16,
                                "end": 18,
                            },
                            "columns": {
                                "start": 4,
                                "end": 5,
                            },
                            "offsets": {
                                "start": 206,
                                "end": 239,
                            },
                        },
                    ],
                },
            },
        ],
    ],
};
