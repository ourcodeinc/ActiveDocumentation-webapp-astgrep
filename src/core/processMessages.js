import {parseJson, createDefaultObjectFromStructure, isValidInput} from "./utilities";
import {WEBSOCKET_RECEIVED_MESSAGE, WEBSOCKET_MESSAGE_STRUCTURE} from "../webSocket/webSocketConstants";
import {updateRuleTable} from "../redux/reduxActions";
import {validRules} from "./types";
import {REDUX_STORE_MESSAGES} from "../redux/reduxConstants";

/**
 * @param {string} receivedMessage
 */
export const processReceivedMessage = (receivedMessage, dispatch) => {
    const parsedMessage = parseReceivedWebSocketMessage(receivedMessage);
    switch (parsedMessage.command) {
        case WEBSOCKET_RECEIVED_MESSAGE.WEBSOCKET_CONNECTED_MSG:
            break;

        case WEBSOCKET_RECEIVED_MESSAGE.WEBSOCKET_DISCONNECTED_MSG:
            break;

        case WEBSOCKET_RECEIVED_MESSAGE.RULE_TABLE_MSG:
            const validRuleTable = validRules(parsedMessage.data);
            dispatch(updateRuleTable(validRuleTable, REDUX_STORE_MESSAGES.INITIAL_RULE_TABLE_MSG));
            break;

        case WEBSOCKET_RECEIVED_MESSAGE.UPDATED_RULE_TABLE_MSG:
            const validUpdatedRuleTable = validRules(parsedMessage.data);
            dispatch(updateRuleTable(validUpdatedRuleTable, REDUX_STORE_MESSAGES.UPDATED_RULE_TABLE_MSG));
            break;

        case WEBSOCKET_RECEIVED_MESSAGE.UPDATED_CODE_MSG:
            const validUpdatedCodeRuleTable = validRules(parsedMessage.data);
            dispatch(updateRuleTable(validUpdatedCodeRuleTable, REDUX_STORE_MESSAGES.UPDATED_CODE_RULE_TABLE_MSG));
            break;

        case "":
            console.error("processMessages.processReceivedMessage:", "The received message is empty or invalid", receivedMessage);
            break;
    }
};


/**
 * parse the string format of the json message
 * @param {string} receivedMessage
 * @returns {{command: string, data: object}}
 */
export const parseReceivedWebSocketMessage = (receivedMessage) => {
    const defaultMessage = createDefaultObjectFromStructure(WEBSOCKET_MESSAGE_STRUCTURE);
    const message = parseJson(receivedMessage, "Received Message", defaultMessage);

    if (!message || !isValidInput(message, "object", WEBSOCKET_MESSAGE_STRUCTURE)) {
        console.log("processMessages.parseReceivedWebSocketMessage:", "Received an invalid WebSocket message.");
        return defaultMessage;
    }

    return message;
};
