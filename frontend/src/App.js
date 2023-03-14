/*import Login from "./Login";

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;*/

import Login from "./Login";
import { BrowserRouter, Route, Switch } from "react-router-dom"; 
function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/Login" component={Login} />
      <Route path="/JoinToMembership" component={JoinToMembership} />
    </Router>
  );
} 

export default App;