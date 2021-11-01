import { useState } from 'react';

import AlbumSearchForm from '../forms/AlbumSearchForm';
import AlbumSearchResultList from './AlbumSearchResultList';

const ChooseAlbum = ({ setAlbumChoice }) => {
  const [ checkedAlbum, setCheckedAlbum ] = useState(null);
  const [ searchResults, setSearchResults ] = useState([]);
  const buttonText = checkedAlbum ? 'Next' : 'Choose an album before continuing';
  const chooseAlbum = () => {
    setAlbumChoice(checkedAlbum);
  }
  return (
    <section className="ChooseAlbum">
      <h3>Search for an album to recommend</h3>
      <AlbumSearchForm setSearchResults={setSearchResults}/>
      {searchResults.length > 0 && 
      <div className="d-grid my-2">
        <button onClick={chooseAlbum} className="btn btn-success" disabled={!Boolean(checkedAlbum)}>
          {buttonText}
        </button>
      </div>}
      {searchResults.length > 0 && <AlbumSearchResultList searchResults={searchResults} setCheckedAlbum={setCheckedAlbum} checkedAlbum={checkedAlbum}/>}
    </section>
  )
}

export default ChooseAlbum;