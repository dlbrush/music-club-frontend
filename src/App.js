import Header from './Header';
import Body from './Body';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App container">
      <BrowserRouter>
        <Header />
        <Body />
      </BrowserRouter>
    </div>
  );
}

export default App;
