import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import Show from "./Show.js";
import Saving from "./Saving.js";
import Confirm from "./Confirm.js";
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
  const CONFIRM = "CONFIRM"

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)

  const onAdd = () => transition(CREATE);
  const onCancel = () => back();
  const onStatus = () => transition(SAVING)
  const onSave = () => transition(SHOW)
  const onDeleting = () => transition(CONFIRM)
  const onEmpty = () => transition(EMPTY)
  const onConfirm = () => transition(DELETING)

  function save(name, interviewer) {
    onStatus()
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(id, interview)
    .then((response) => {
      onSave()
    }, (error) => {
      // console.log(error);
    });
  }

  function cancel() {
    onDeleting();
  }

  function confirmedCancel() {
    onConfirm()
    props.cancelInterview(id)
      .then((response) => {
        onEmpty();
      }, (error) => {
        // console.log(error)
      })
  }


  return (
    <>
      <article className="Appointment">
        <Header time={time} />
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SAVING && <Saving message="Saving" />}
        {mode === CONFIRM && <Confirm message="Delete the appointment?" onConfirm={confirmedCancel} onCancel={onCancel} />}
        {mode === DELETING && <Deleting message="Deleting" />}
        {mode === SHOW && (
          <Show
            id={props.id}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={cancel}
          />
        )}
        {mode === CREATE && (
          <Form interviewers={interviewers} onCancel={onCancel} onSave={save}  />
        )}
      </article>
    </>
  )
}