import React from "react";

export function getAppointmentsForDay(state, day) {
  let apptArray = [];

  const appointments = state.days.filter(item => {
   
    if (item.name === day) {
      
      apptArray = item.appointments.map(appt => {
        let obj = state.appointments[appt]
        return obj;       
      })
    }
  })
  return apptArray
}    