import { useState } from "react"

import ChooseAlbum from './ChooseAlbum';
import MakePost from './MakePost';

const NewPost = ({ club }) => {
  const [ albumChoice, setAlbumChoice ] = useState(null);
  return (
    <section className="NewPost mt-3 mb-5">
      <h2 className="border-dark border-bottom mb-4">New Post</h2>
      {!albumChoice &&
        <ChooseAlbum setAlbumChoice={setAlbumChoice} />
      }
      {albumChoice &&
        <MakePost albumChoice={albumChoice} />
      }
    </section>
  )
}

export default NewPost;