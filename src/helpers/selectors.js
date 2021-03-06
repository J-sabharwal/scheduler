export default function getAppointmentsForDay(state, day) {
  let apptArray = [];

  state.days.filter(eachDay => {
    
    if (eachDay.name === day) {
      
      apptArray = eachDay.appointments.map(appt => {
       
        let obj = state.appointments[appt];
        return obj;       
      })
    }
  })
 
  return apptArray;
}  

export function getInterviewersForDay(state, day) {
  
  let intArray = [];
  state.days.filter(item => {

    if (item.name === day) {

      intArray = item.interviewers.map(appt => {
        let interviewers = state.interviewers[appt]
        return interviewers;
      })
    }
  })
  return intArray;
}  


export function getInterview(state, interview) {
  let interviews = {};

  if (interview === null) {
    return null;
  } else {
    let interviewId = interview.interviewer;
    interviews = {
      student: interview.student,
      interviewer: state.interviewers[interviewId]
      } 
  }
  return interviews
}