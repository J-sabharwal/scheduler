import React from "react";
import "./styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Form from "./Form";
import Show from "./Show.js";
import Saving from "./Saving.js";
import Confirm from "./Confirm.js";
import Error from "./Error.js";
import ErrorSave from "./ErrorSave.js";
import Deleting from "./Deleting.js"
import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {
  
  const { id, interview, time, interviewers} = props
  // console.log(props)
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const ERROR_DELETE = "ERROR_DELETE"
  const ERROR_SAVE = "ERROR_SAVE"

  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY)

  const onAdd = () => transition(CREATE);
  const onCancel = () => back();
  const onStatus = () => transition(SAVING)
  const onSave = () => transition(SHOW)
  const onDeleting = () => transition(CONFIRM)
  const onEmpty = () => transition(EMPTY)
  const onConfirm = () => transition(DELETING, true)
  const onEdit = () => transition(EDIT)
  const onError = () => transition(ERROR_DELETE, true)
  const onErrSave = () => transition(ERROR_SAVE, true)
  
  

  function save(name, interviewer, createNew) {
    onStatus()
    const interview = {
      student: name,
      interviewer,
    };
    props.bookInterview(id, interview, createNew)
      .then((response) => {
        onSave()
      }, (error) => {
        onErrSave();
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
        onError()
      })
  }


  return (
    <>
      <article className="Appointment" data-testid="appointment">
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
            onEdit={onEdit}
            onDelete={cancel}
          />
        )}
        {mode === CREATE && (
          <Form interviewers={interviewers} onCancel={onCancel} onSave={save} creating={true} />
        )}
        {mode === EDIT && ( 
        <Form 
          name={props.interview.student}
          interviewers={props.interviewers} 
          interviewer={props.interview.interviewer.id}
          onCancel={onCancel}
          onSave={save} 
          creating={false}
        /> )}
        {mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment"
          onClick={onCancel}
        />)}
        {mode === ERROR_SAVE && (
        <ErrorSave 
          message="Could not save appointment"
          onClick={onCancel}
        />)}
      </article>
    </>
  )
}