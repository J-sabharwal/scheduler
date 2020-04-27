import React from "react";
import "components/DayListItem.scss";
const classNames = require('classnames');

export default function DayListItem(props) {

  const { spots } = props;   

  const formatSpots = numSpots => {     
    if (numSpots === 0) {       
      return `no spots remaining`;     
    } else if (numSpots === 1) {
      return "1 spot remaining";
    } else {
      return `${numSpots} spots remaining`;
    }
  };

  let dayClass = classNames({
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
    "text--light": props.spots > 0,
    "day-list__item": props.name
 });

  return (
      <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
        <h2 className={dayClass}>{props.name}</h2> 
        <h3 className={dayClass}>{formatSpots(spots)}</h3>
    </li>
  );
};