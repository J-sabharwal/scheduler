export default function getAppointmentsForDay(state, day) {
  let apptArray = [];

  let appointments = state.days.filter(item => {
    
    if (item.name === day) {
      
      apptArray = item.appointments.map(appt => {
        // console.log(appt)
        let obj = state.appointments[appt]
        return obj;       
      })
    }
  })
  return apptArray
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