import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import Show from "./Show.js";
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const { id, interview, time, interviewers, onEdit, onDelete} = props
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE"

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)

  const onAdd = () => transition(CREATE);
  const onCancel = () => back();

  
  
  return (
    <>
      <article className="Appointment">
        <Header time={time} />
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )}
        {mode === CREATE && (
          <Form interviewers={interviewers} onCancel={onCancel} onSave={props.onSave} />
        )}
      </article>
    </>
  )
}