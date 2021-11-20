import '../css/AlbumSearchResult.css';

const AlbumSearchResult = ({ album, setCheckedAlbum, checkedAlbum }) => {
  const checked = checkedAlbum && album.id === checkedAlbum.id;
  const check = () => {
    if (checked) {
      setCheckedAlbum(null);
    } else { 
      setCheckedAlbum(album);
    }
  }
  return (
    <button onClick={check} className="d-flex row list-group-item align-items-center">
      <div className="col-1">
        <input type="radio" data-testid={`album-${album.id}-radio`} className="form-radio-input" checked={checked}/>
      </div>
      <div className="col-3">
        <img className="img-fluid AlbumSearchResult-cover" src={album.coverImgUrl} alt={`Album cover for ${album.title}`}/>
      </div>
      <div className="col-8 text-start">
        <h3>{album.title}</h3>
        <p className="lead">{album.year}</p>
      </div>
    </button>
  )
}

export default AlbumSearchResult;