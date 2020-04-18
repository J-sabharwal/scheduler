import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay, { getInterview, getInterviewersForDay} from "../helpers/selectors"


export default function Application(props) {
  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
   console.log(state)
  
  useEffect(() => {

    const daysURL = 'http://localhost:8001/api/days'
    const apptURL = 'http://localhost:8001/api/appointments'
    const intURL = 'http://localhost:8001/api/interviewers'
    const promiseDay = axios.get(daysURL)
    const promiseAppt = axios.get(apptURL)
    const promiseInterviewers = axios.get(intURL)

    Promise.all([promiseDay, promiseAppt, promiseInterviewers])
      .then((all) =>  {
        // console.log({  days: all[0].data, appointnments: all[1].data, interviewers: all[2].data   })
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data  
        }));
      })
    }, []);

    let bookInterview = function(id, interview) {
      // console.log(id, interview);
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      setState({
        ...state,
        appointments
      });
      return axios.put(`http://localhost:8000/api/appointments/${id}`, {interview})
      
    }
    console.log(state)

    let cancelInterview = function(id) {
      const appointment = {
        ...state.appointment[id],
        interview: null
      };
      const appointments = {
        ...state.appoointments,
        [id]: appointment 
      };
      // setState({
      //   ...state,
      //   appointments
      // });
      // return axios.delete(`http://localhost:8000/api/appointments/${id}`)
    }
  
    const appointments = getAppointmentsForDay(state, state.day);
    const interviewers = getInterviewersForDay(state, state.day);
    const appointmentSlot =  appointments.map((timeslot) => {
      const interview = getInterview(state, timeslot.interview);
      
      return (
      <Appointment 
        key={timeslot.id} 
        id={timeslot.id}
        time={timeslot.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
      />
      );
  });

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
          />
        </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointmentSlot}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}