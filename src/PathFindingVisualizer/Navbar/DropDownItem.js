import React from "react";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "../redux/navBarReducer";

const DropdownItem = (props) => {
  const dispatch = useDispatch();
  const dropDownFunction = props.dropDownFunction;
  return (
    <a
      href="#"
      className="menu-item"
      onClick={() => {
        props.goToMenu && dispatch(setActiveMenu(props.goToMenu));
        if (props.algo) {
          dispatch(dropDownFunction(props.algo));
        } else if (props.hex) {
          dispatch(dropDownFunction(props.hex));
        }
      }}
    >
      {props.leftIcon ? (
        <span
          className="icon-button"
          onClick={() => dispatch(setActiveMenu(props.goToMenu))}
        >
          {props.leftIcon}
        </span>
      ) : (
        ""
      )}
      {props.children}

      <span className="icon-right">{props.rightIcon}</span>
    </a>
  );
};

export default DropdownItem;
