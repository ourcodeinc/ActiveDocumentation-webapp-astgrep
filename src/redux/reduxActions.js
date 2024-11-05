import {REDUX_STORE_ACTIONS} from "./reduxConstants";

/**
 * Updates the loadingGif property.
 * @param {boolean} loadingGifStatus
 * @param {string} loadingGifMessage
 * @return {{data: {loadingGif: boolean, loadingMessage: string}, type: string}}
 */
export const updateLoadingGif = (loadingGifStatus, loadingGifMessage) => {
    return {
        type: REDUX_STORE_ACTIONS.ACTION_UPDATE_LOADING_GIF,
        data: {
            loadingGifStatus,
            loadingGifMessage,
        },
    };
};

/**
 * Updates the ruleTable
 * @param {object[]} ruleTable
 * @param {string} reduxMessage a redux message specifying the condition in which
 * the RuleTable is updated.
 * @return {{data: {ruleTable: object[]}, type: string}}
 */
export const updateRuleTable = (ruleTable, reduxMessage) => {
    return {
        type: REDUX_STORE_ACTIONS.ACTION_UPDATE_RULE_TABLE,
        data: {
            ruleTable,
            reduxMessage,
        },
    };
};
