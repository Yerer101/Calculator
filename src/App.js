import React, { useReducer } from "react";
import "./App.css";
import { DigitButton } from "./DigitButton";
import { OperationButton } from "./OperationButton";
import { ActionButton } from "./ActionButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digits",
  CHOOSE_OPERATION: "choose-operation",
  EVALUATE: "evaluate",
  DELETE: "delete",
  CLEAR: "clear",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "." && state.currentOperand == null) {
        return {
          ...state,
          currentOperand: `${0}${payload.digit}`,
        };
      }
      if (payload.digit === 0 && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      if (state.overwirte) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwirte: false,
        };
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.previousOperand,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      if (state.previousOperand == null) {
        return {
          ...state,
        };
      }

      return {
        ...state,
        overwirte: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    case ACTIONS.DELETE:
      if (state.overwirte) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length == 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.CLEAR:
      return {};
  }
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let calc = null;

  switch (operation) {
    case "+":
      calc = prev + current;
      break;
    case "-":
      calc = prev - current;
      break;
    case "*":
      calc = prev * current;
      break;
    case "/":
      calc = prev / current;
      break;
  }
  return calc.toString();
};

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calulator-grid">
      <div className="operand">
        <div className="previousOperand">
          {previousOperand} {operation}
        </div>
        <div className="currentOperand">{currentOperand}</div>
      </div>
      <ActionButton
        btnName="AC"
        action={ACTIONS.CLEAR}
        dispatch={dispatch}
        style="span-two"
      />
      <ActionButton
        btnName="DEL"
        action={ACTIONS.DELETE}
        dispatch={dispatch}
        style=""
      />
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <ActionButton
        btnName="="
        action={ACTIONS.EVALUATE}
        dispatch={dispatch}
        style="span-two"
      />
    </div>
  );
}

export default App;
