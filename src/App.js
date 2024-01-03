import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom'
import './App.css'
import NotFound from './Components/NotFound'
import Login from './Components/Login'
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute'
import Jobs from './Components/Jobs'
import JobItemDetails from './Components/JobItemDetails'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
