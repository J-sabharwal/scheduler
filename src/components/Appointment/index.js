import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";

export default function Appointment(props) {

  const { id, interview, time, onEdit, onDelete} = props


  return (
    <article className="Appointment">
      <Header time={time} />
      {interview ? 
        <Show {...interview}/> : 
        <Empty />
        
      }
        
    </article>

  )
}