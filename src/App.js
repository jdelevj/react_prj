import logo from './logo.svg';
import './App.css';
import { NavMenu } from './components/organisms/NavMenu';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavMenu />
      </header>
      <Outlet />
    </div>
  );
}

export default App;
