import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import Show from "./Show.js";
import Saving from "./Saving.js";
import Deleting from "./Deleting.js"
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  
  const { id, interview, time, interviewers, bookInterview, onEdit, onDelete, cancelInterview } = props
  // console.log(props)
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)

  const onAdd = () => transition(CREATE);
  const onCancel = () => back();
  const onStatus = () => transition(SAVING)
  const onSave = () => transition(SHOW)
  const onDeleting = () => transition(DELETING)
  const onEmpty = () => transition(EMPTY)

  function save(name, interviewer) {
    onStatus()
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(id, interview)
    .then((response) => {
      // console.log(response);
      onSave()
    }, (error) => {
      // console.log(error);
    });
  }

  function cancel() {
   
    onDeleting();
  
    props.cancelInterview(id)
      .then((response) => {
        console.log(response)
        onEmpty();
      }, (error) => {
        console.log(error)
      })
  }


  
  return (
    <>
      <article className="Appointment">
        <Header time={time} />
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SAVING && <Saving message="Saving" />}
        {mode === DELETING && <Deleting message="Deleting" />}
        {mode === SHOW && (
          <Show
            id={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDeleting={cancel}
          />
        )}
        {mode === CREATE && (
          <Form interviewers={interviewers} onCancel={onCancel} onSave={save}  />
        )}
      </article>
    </>
  )
}