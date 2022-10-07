import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "../../redux/navBarReducer";
import { toggleMenu } from "../../redux/navBarReducer";

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
          dispatch(toggleMenu(false));
          dispatch(dropDownFunction(props.algo));
        } else if (props.hex) {
          dispatch(toggleMenu(false));
          dispatch(dropDownFunction(props.hex));
        } else if (props.maze) {
          dropDownFunction();
        }
      }}
    >
      {props.leftIcon ? (
        <span
          className="icon-left"
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
