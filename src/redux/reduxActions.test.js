import * as actions from "./reduxActions";
import {REDUX_STORE_ACTIONS} from "./reduxConstants";

describe("All exported functions return objects with required properties", () => {
    Object.entries(actions).forEach(([actionName, fn]) => {
        it(`${actionName} should return an object with 'type' and 'data' properties`, () => {
            const mockArgs = [true, "Test message"];

            const result = fn(...mockArgs);

            expect(typeof result).toBe("object");
            expect(result).toHaveProperty("type");
            expect(result).toHaveProperty("data");
            expect(Object.values(REDUX_STORE_ACTIONS)).toContain(result.type);
        });
    });
});
