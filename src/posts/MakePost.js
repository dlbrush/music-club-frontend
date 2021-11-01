import ChosenAlbum from "./ChosenAlbum";
import NewPostForm from "../forms/NewPostForm";

const MakePost = ({ albumChoice }) => {
  return (
    <section className="MakePost row">
      <h3 className="text-center">Post your recommendation</h3>
      <ChosenAlbum className="col-4 border-end pt-4 text-center" album={albumChoice}/>
      <div className="col-8">
        <NewPostForm discogsId={albumChoice.id} />
      </div>
    </section>
  )
}

export default MakePost;