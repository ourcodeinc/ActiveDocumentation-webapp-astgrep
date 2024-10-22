import {REDUX_STORE_ACTIONS} from "./reduxConstants";

/**
 * update the loadingGif property.
 * @param {boolean} status
 * @param {string} message
 * @return {{data: {loadingGif: boolean, loadingMessage: string}, type: string}}
 */
export const updateLoadingGif = (status, message) => {
    return {
        type: REDUX_STORE_ACTIONS.ACTION_UPDATE_LOADING_GIF,
        data: {
            loadingGif: status,
            loadingMessage: message,
        },
    };
};
