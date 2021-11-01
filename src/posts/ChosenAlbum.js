const ChosenAlbum = ({ album, className }) => {
  return (
    <div className={className}>
      <h4>Recommending</h4>
      <img className="img-fluid" src={album.coverImgUrl} alt={`Album cover for ${album.title}`} />
      <h5 className="mt-3">{album.title}</h5>
      <p className="lead">{album.year}</p>
    </div>
  )
}

export default ChosenAlbum;