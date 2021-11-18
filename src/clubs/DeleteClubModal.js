import { useContext, useState } from "react";
import { useHistory } from "react-router";

import UserContext from "../contexts/userContext";

const DeleteClubModal = ({ clubId, deleteClub }) => {
  const [ disabled, setDisabled ] = useState(false);
  const history = useHistory();
  const { user } = useContext(UserContext);

  const onClick = async () => {
    setDisabled(true);
    try {
      await deleteClub(clubId);
      history.push(`/users/${user.username}/clubs`)
    } catch(e) {
      console.error(e);
      setDisabled(false);
    }
  }

  return (
    <div className="modal fade" id="deleteClubModal" tabIndex="-1" aria-labelledby="deleteClubLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteClubLabel">Delete Club</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this club?
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" data-testid="deleteButton2" className="btn btn-danger" disabled={disabled} data-bs-dismiss="modal" onClick={onClick}>Delete Club</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteClubModal;