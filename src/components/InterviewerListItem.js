import React from "react";
import "components/InterviewerListItem.scss";
const classNames = require('classnames')

export default function InterviewerListItem(props) {

  const { id, name, avatar, selected, setInterviewer } = props;   


  let intClass = classNames({
    "interviewers__item--selected": props.selected,
    "interviewers__item-image": props.avatar,
    "interviewers__item": props.name
 })

  return (
    <li className={intClass} onClick={props.setInterviewer}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
     {props.selected && props.name}
  </li>
  );
}