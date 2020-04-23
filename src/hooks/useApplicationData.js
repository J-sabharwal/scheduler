import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const setDay = day => setState({ ...state, day });
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {

    const daysURL = 'http://localhost:8001/api/days';
    const apptURL = 'http://localhost:8001/api/appointments';
    const intURL = 'http://localhost:8001/api/interviewers';
    const promiseDay = axios.get(daysURL);
    const promiseAppt = axios.get(apptURL);
    const promiseInterviewers = axios.get(intURL);

    Promise.all([promiseDay, promiseAppt, promiseInterviewers])
      .then((all) =>  {
        setState(prev => ({
          ...prev, 
          days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data  
        }));
      });
  }, []);

  let bookInterview = function(id, interview, createNew) {   
 
    if (createNew === true) {

      state.days.map(day => {
        day.appointments.map(apptId => {

          if (id === apptId) {
            return day.spots--;
            }
        })  
      })
    };

    const appointment = {...state.appointments[id], interview: { ...interview }};
    const appointments = {...state.appointments, [id]: appointment};

    setState({...state, appointments});

    return axios.put(`http://localhost:8000/api/appointments/${id}`, {interview});
  }

  let cancelInterview = function(id) {
    const appt = {...state.appointments[id], interview: null};
    const appts = {...state.appoointments, [id]: appt };
    
    let spots = state.days.map(day => {
      day.appointments.map(apptId => {
        
        if (id === apptId) {
          return day.spots++;
        }
      })  
    });
    
    setState({...state, spots});
    
    return axios.delete(`http://localhost:8000/api/appointments/${id}`);
  };
  
  return { state, setDay, bookInterview, cancelInterview };
};


