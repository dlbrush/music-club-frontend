import { Link } from "react-router-dom";

const ClubList = ({ clubs }) => {
  return (
    <ul className="list-group">
      {clubs.map(club => {
        return (
          <Link to={`/clubs/${club.id}`} key={club.id} className="list-group-item list-group-item-action">
            <h2 className="h4 py-2">{club.name}</h2>
            <p>{club.description}</p>
            <p><small>Founder: {club.founder}</small></p>
          </Link>
        )
      })}
    </ul>
  )
}

export default ClubList;