import { useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../contexts/authContext";

const LogoutButton = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logout = async () => {
    try {
      await auth.logout();
      history.push('/');
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <button className="list-group-item list-group-item-action" onClick={logout}>
      Log Out
    </button>
  )
}

export default LogoutButton;