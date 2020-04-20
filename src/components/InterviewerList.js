import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {

  InterviewerList.propTypes = {
    interviewer: PropTypes.number,
    setInterviewer: PropTypes.func.isRequired
  };

const ints = props["interviewers"].map(int => {
 
 return <InterviewerListItem 
    key={int.id} 
    name={int.name} 
    avatar={int.avatar}
    selected={int.id === props.interviewer}
    setInterviewer={() => props.setInterviewer(int.id)}  
  />
})


  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {ints}
    </ul>
  </section>
  );
}