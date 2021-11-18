import EditClubForm from "../forms/EditClubForm";
import DeleteClubModal from "./DeleteClubModal";

const EditClub = ({ club, editClub, deleteClub }) => {
  return (
    <section className="EditClub mb-5">
      <h3 className="mt-4 border-bottom mb-2">Edit Club</h3>
      <EditClubForm club={club} editClub={editClub}/>
      <div className="d-grid">
        <button type="button" data-testid="deleteButton1" data-bs-toggle="modal" data-bs-target="#deleteClubModal" className="btn btn-danger mt-3">Delete Club</button>
      </div>
      <DeleteClubModal deleteClub={deleteClub}/>
    </section>
  )
}

export default EditClub;