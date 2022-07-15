import { ACTIONS } from "./App";

export const ActionButton = ({ dispatch, action, style, btnName }) => {
  console.log("action", action);
  return (
    <button className={style} onClick={() => dispatch({ type: action })}>
      {btnName}
    </button>
  );
};
