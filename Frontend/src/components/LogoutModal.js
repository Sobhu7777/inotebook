import React,{useContext, useRef} from "react";
import { useNavigate } from "react-router-dom";
import alertContext from "./context/alert/AlertContext";
import AuthContext from "./context/Authorisation/AuthContext";

function LogoutModal() {
  const authContext=useContext(AuthContext)
  const {handleLogout}=authContext
  const context = useContext(alertContext)
  const {showalert}=context
  let navigate = useNavigate();
  const ref = useRef(null);
  const Logout = () => {
    ref.current.click();
  }
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("SignUptoken");
  //   navigate("/login"); // redirect to the login page after logout
  //   showalert("Logged out successfully","success","Logout",2000)

  // }
  return (
    <div>
        {/* Logout Button trigger modal */}
      <button
        ref={ref}
        type="button"
        onClick={Logout}
        className="btn btn-outline-danger"
        data-bs-toggle="modal"
        data-bs-target="#LogoutModal"
      >
        Logout
      </button>
        {/* Modal */}
      <div
        className="modal fade"
        id="LogoutModal"
        tabIndex="-1"
        aria-labelledby="LogoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
              Confirm Logout
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body"><p>Are you sure you want to log out?</p></div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleLogout} data-bs-dismiss="modal">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
