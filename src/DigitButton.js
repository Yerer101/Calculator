import { ACTIONS } from "./App";

export const DigitButton = ({ dispatch, digit }) => {
  //   console.log("click");
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
};
