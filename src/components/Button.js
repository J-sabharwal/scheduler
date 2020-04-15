import React from "react";
import "components/Button.scss";
const classNames = require('classnames')

export default function Button(props) {

// refactored CSS using classNames library
   let buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
   })

   return (
      <button 
         className={buttonClass}
         onClick={props.onClick} 
         disabled={props.disabled} 
      > 
         {props.children}
      </button>
   );
}  


/* 
- classNames library was used to create a olist of classes for the button element

- actions addon was used to test the event handler
*/