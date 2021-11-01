import AlbumSearchResult from './AlbumSearchResult';

const AlbumSearchResultList = ({ searchResults, setCheckedAlbum, checkedAlbum }) => {
  return (
    <ul className="AlbumSearchResults list-group">
      {searchResults.map(album => {
        return <AlbumSearchResult album={album} setCheckedAlbum={setCheckedAlbum} checkedAlbum={checkedAlbum}/>
      })}
    </ul>
  )
}

export default AlbumSearchResultList;