import AppNav from './AppNav';
import MainRoutes from './MainRoutes';
// Component separating the body of the doc into the Nav on the left and the Main content on the right
const Body = () => {
  return (
    <div className="Body row">
      <AppNav />
      <MainRoutes />
    </div> 
  )
}

export default Body;