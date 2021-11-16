import { Link } from "react-router-dom";

const ClubList = ({ clubs }) => {
  return (
    <ul className="list-group">
      {clubs.map(club => {
        const cardStyle = {
          backgroundImage: `url("${club.bannerImgUrl}")`,
          'backgroundSize': '100%'
        };
        const contentStyle = {
          "backgroundColor": "rgba(255, 255, 255, 0.7)"
        }
        return (
          <Link to={`/clubs/${club.id}`} key={club.id} className="my-1 list-group-item list-group-item-action" style={cardStyle}>
            <div className="py-2 px-3" style={contentStyle}>
              <div>
                <h2 className="h4 mt-3 py-2 px-1 bg-dark text-white d-inline-block">{club.name}</h2>
              </div>
              <div>
                <p className="bg-dark p-1 text-white w-auto d-inline-block">{club.description}</p>
              </div>
              <div>
                <p className="bg-dark p-1 text-white d-inline-block"><small>Founder: {club.founder}</small></p>
              </div>
            </div>
          </Link>
        )
      })}
    </ul>
  )
}

export default ClubList;