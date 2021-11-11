import { useContext, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../contexts/authContext";

const LogoutModal = () => {
  const [ disabled, setDisabled ] = useState(false);
  const auth = useContext(AuthContext);
  const history = useHistory();

  const onClick = async () => {
    setDisabled(true);
    try {
      await auth.logout();
      history.push('/')
    } catch(e) {
      console.error(e);
      setDisabled(false);
    }
  }

  return (
    <div className="modal fade" id="logoutModal" tabIndex="-1" aria-labelledby="logoutLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="logoutLabel">Log out</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Are you sure you want to log out?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-danger" disabled={disabled} data-bs-dismiss="modal" onClick={onClick}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal;