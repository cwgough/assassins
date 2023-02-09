import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TargetDisplay from './components/targetDisplay'
import Login from './components/loginPage'
import Register from './components/registerPage'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route
            path='/:name'
            element={<TargetDisplay />}
          // loader={async ({ params }) => {
          //   return params.name
          // }}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
