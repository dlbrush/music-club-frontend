import API from '../api';
import ClubList from './ClubList';

import { useEffect, useState } from "react";

const PublicClubsView = () => {

  const [ publicClubs, setPublicClubs ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const getPublicClubs = async () => {
      try {
        const clubs = await API.getPublicClubs();
        console.log(clubs);
        setPublicClubs(clubs);
      } catch (e) {
        console.warn(e);
      };
      setLoading(false);
    }
    getPublicClubs();
  }, []);
  
  return (
    <main className="PublicClubsView col-md-9 col-lg-10">
      <h1 className="border-bottom border-dark mt-4 pb-2">
        Public Clubs
      </h1>
      {loading && <p>Loading list of clubs...</p>}
      {!loading &&
        <div className="PublicClubs-Loaded">
          <p>
          Click any club to preview it.
          </p>
          <ClubList clubs={publicClubs}/>
        </div>
      }
    </main>
  )
}

export default PublicClubsView;