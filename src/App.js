import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'antd/dist/antd.css'
import PrivateRoute from './components/auth/privateRoute'
import Dashboard from './components'
import Login from './components/auth/login'
import Register from './components/auth/register'

function App() {
  return (
    <Router>
    <div className="App">
   <PrivateRoute path="/admin" component={Dashboard} />
   <Route path="/" component={Login} exact/>
      {/* <Route path="/register" component={Register} exact/> */}

    </div>
    </Router>
  );
}

export default App;
