import React, { useState }from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList"

export default function Form(props) {

  const [error, setError] = useState("");

  const { onSave, onCancel, interviewers, creating  } = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer, creating);
  }
  
  function inputName(event) {
    setName(event.target.value)
  }

  // function handleInterviewer(event) {
  //   setInterviewer(event)
  // }

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
            data-testid="student-name-input"
            />
        <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList interviewers={interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          {/* onSave function required to save name and interviewer selected */}
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}