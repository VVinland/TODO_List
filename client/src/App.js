import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./components/AppRoute";
import './style/app.css';
import { authCheck } from "./http/userApi";
import { Context } from ".";

function App() {

  const { user } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    authCheck()
      .then(data => {
        user.setUser(data);
        user.setIsAuth(true);
      })
  })

  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
