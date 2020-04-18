import React, { useState } from "react"

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);
  
  function transition(newMode, replace = false) {
 
    if (replace) {
      history.splice(-1, 1, newMode)
      setMode(newMode)
    } else {
    setMode(newMode)
    setHistory(prev => [...prev, newMode]);
    }
    
  }
  
  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length-1])
    }
  }
  
return { mode, transition, back }
}
