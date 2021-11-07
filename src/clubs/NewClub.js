import NewClubForm from '../forms/NewClubForm';

const NewClub = () => {
  return (
    <main className="MyClubs col-md-9 col-lg-10">
      <h1 className="mt-4 border-bottom border-dark pb-2">Start a Club</h1>
      <NewClubForm />
    </main>
  )
}

export default NewClub;