import "@testing-library/jest-dom";
import {render, screen, fireEvent} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";
import WebSocketManager from "./webSocket/webSocketManager";
import {HASH_CONSTANTS} from "./ui/uiConstants";
import {CONFIG} from "./config";

jest.mock("./webSocket/webSocketManager");

const mockStore = configureStore([]);

beforeEach(() => {
    WebSocketManager.mockClear();
    WebSocketManager.prototype.close = jest.fn();
});

describe("App Component", () => {
    let reduxStore;

    beforeEach(() => {
        reduxStore = mockStore({
            loadingGif: false,
            loadingMessage: "",
        });
        // jest.clearAllMocks();
    });

    it("sets initial hash to INDEX on component mount", () => {
        render(
            <Provider store={reduxStore}>
                <App />
            </Provider>,
        );
        expect(window.location.hash).toBe("#/" + HASH_CONSTANTS.INDEX);
    });

    describe("Rendering Tests", () => {
        it("should render the App component", () => {
            render(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            const navElement = screen.getByTestId("navbar");
            expect(navElement).toBeInTheDocument();
        });

        it("shows the loading spinner when loadingGif is true", () => {
            reduxStore = mockStore({
                loadingGif: true,
                loadingMessage: "Loading Rules",
            });

            render(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            const loadingMessageElement = screen.getByText(/Loading Rules/i);
            expect(loadingMessageElement).toBeInTheDocument();
            expect(screen.getByTestId("loadingGif")).toBeVisible();
        });

        it("hides the loading spinner when loadingGif is false", () => {
            reduxStore = mockStore({
                loadingGif: false,
                loadingMessage: "",
            });

            render(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            const loadingElement = screen.queryByTestId("loadingGif");
            expect(loadingElement).toBeNull();
        });
    });

    describe("WebSocketManager Tests", () => {
        it("sets up the WebSocket connection on mount", () => {
            const {unmount} = render(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );
            expect(WebSocketManager).toHaveBeenCalledWith(
                `ws://localhost:${CONFIG.WEBSOCKET_PORT}`,
                expect.any(Function),
                expect.any(Function),
            );
            unmount();
        });
    });

    describe("Redux State Updates", () => {
        it("updates loadingGif and loadingMessage when redux props change", () => {
            const {rerender} = render(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            reduxStore = mockStore({
                loadingGif: true,
                loadingMessage: "New Loading Message",
            });

            rerender(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            const loadingMessageElement = screen.getByText("New Loading Message");
            expect(loadingMessageElement).toBeInTheDocument();
            expect(screen.getByTestId("loadingGif")).toBeVisible();
        });
    });

    describe("Hash Change Handling", () => {
        it("updates the hash state when the hash changes", () => {
            const {rerender} = render(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            window.location.hash = "#/allRules";
            fireEvent(window, new HashChangeEvent("hashchange"));

            rerender(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            expect(screen.queryByTestId("tableOfContents")).toBeNull();
        });

        it("renders TableOfContents when hash is set to INDEX", () => {
            window.location.hash = "#/" + HASH_CONSTANTS.INDEX;

            render(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            const tableOfContents = screen.getByTestId("tableOfContents");
            expect(tableOfContents).toBeInTheDocument();
        });
    });

    describe("Edge Case Handling", () => {
        it("alerts the user when WebSocket is not supported", () => {
            delete window.WebSocket;
            const alertMock = jest.fn();
            window.alert = alertMock;

            render(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            expect(alertMock).toHaveBeenCalledWith("FATAL: WebSocket not natively supported. ActiveDocumentation will not work.");

            alertMock.mockRestore();
        });

        it("handles empty hash by setting it to INDEX", () => {
            window.location.hash = "";

            render(
                <Provider store={reduxStore}>
                    <App />
                </Provider>,
            );

            expect(window.location.hash).toBe("#/" + HASH_CONSTANTS.INDEX);
        });
    });
});
