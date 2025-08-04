import React , {useContext} from 'react'
import './alert.css'
import alertContext from './context/alert/AlertContext'

function Alert() {
  const context = useContext(alertContext);
  const {alert} = context;
  return (
    <div className='alert-container' >
    {alert &&<div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
    <strong>{alert.msgType[0].toUpperCase()+alert.msgType.slice(1)}</strong>: {alert.msg}
   </div>}
   </div>
  )
}

export default Alert
