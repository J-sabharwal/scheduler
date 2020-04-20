import React, { useState }from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"

export default function Form(props) {

  const { onSave, onCancel, interviewers, creating  } = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function inputName(event) {
    setName(event.target.value)
  }

  function handleInterviewer(event) {
    setInterviewer(event)
  }

  function reset() {
    setName("");
    setInterviewer(null)
  }

  function cancel() {
    reset();
    onCancel();
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off" >
          <input
            className="appointment__create-input text--semi-bold"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            onChange={inputName}
          />
        </form>
        <InterviewerList interviewers={interviewers} interviewer={interviewer} setInterviewer={handleInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          {/* onSave function required to save name and interviewer selected */}
          <Button confirm onClick={() => onSave(name, interviewer, creating)}>Save</Button>
        </section>
      </section>
    </main>
  );
}