import { useState } from "react"
import alertContext from "./AlertContext"

const AlertState = (props) => {
    const[alert,setalert]=useState(null)
  const showalert = (message,type,messageType,tout)=>{
    setalert({
      msg:message,
      type:type,
      msgType:messageType
    })
    setTimeout(() => {
      setalert(null)
    },tout);

  }
  return (
    <alertContext.Provider value={{alert,showalert}}>
      {props.children}
    </alertContext.Provider>
  )
}

export default AlertState
