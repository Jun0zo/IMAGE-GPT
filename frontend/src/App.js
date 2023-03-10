import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';

function App() {
  // 토큰이 없으면 로그인 페이지로 이동합니다.
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <h1>메인 페이지</h1> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;