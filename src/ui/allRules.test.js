import "@testing-library/jest-dom";
import React from "react";
import {render, screen, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import AllRules from "./allRules";
import {updateRuleTable} from "../redux/reduxActions";

// Create a mock store
const mockStore = configureStore([]);

// Mock RulePanel
// eslint-disable-next-line react/display-name
jest.mock("./rulePanel/rulePanel", () => ({ruleI}) =>
    (<div data-testid={"mock-rule-panel"}>{ruleI.name}</div>));

describe("AllRules Component", () => {
    let store;

    const initialState = {
        ruleTable: [
            {id: 1, name: "Rule 1"},
            {id: 2, name: "Rule 2"},
        ],
    };

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it("renders correctly with initial state", () => {
        render(
            <Provider store={store}>
                <AllRules />
            </Provider>,
        );

        expect(screen.getAllByTestId("mock-rule-panel")).toHaveLength(2);
        expect(screen.getByText("Rule 1")).toBeInTheDocument();
        expect(screen.getByText("Rule 2")).toBeInTheDocument();
    });

    it("updates ruleTable when props change", async () => {
        const {rerender} = render(
            <Provider store={store}>
                <AllRules />
            </Provider>,
        );

        expect(screen.getByText("Rule 1")).toBeInTheDocument();
        expect(screen.getByText("Rule 2")).toBeInTheDocument();

        store.dispatch(updateRuleTable([
            {id: 3, name: "Rule 3"},
            {id: 4, name: "Rule 4"},
        ]));

        store = mockStore({
            ruleTable: [
                {id: 3, name: "Rule 3"},
                {id: 4, name: "Rule 4"},
            ],
        });

        rerender(
            <Provider store={store}>
                <AllRules />
            </Provider>,
        );


        await waitFor(() => {
            expect(screen.getByText("Rule 3")).toBeInTheDocument();
            expect(screen.getByText("Rule 4")).toBeInTheDocument();
            expect(screen.queryByText("Rule 1")).not.toBeInTheDocument();
        });
    });
});
