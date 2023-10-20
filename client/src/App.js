import React from "react";
import { Route, Routes } from "react-router-dom";
//page
import Dashboard from "./components/page/dashboard";
//page-auth
import Login from "./components/page/auth/login"
import CreateUser from "./components/page/user/createUser";
//layout
import Navber from "./components/layouts/navber";
//function
import { currentUser } from "./components/functions/auth";
//redux
import { useDispatch } from 'react-redux';
//Route
import UserRoute from "./components/routes/userRoute";
//page-role
import Roles from "./components/page/option/roles";
//page-title
import Titles from "./components/page/option/titles";
//page-institution
import Institution from "./components/page/option/institution";
//page-score
import Score from "./components/page/score/listscore";
//page-user
import ListUser from "./components/page/user/listUser";
//page-schedules
import ListSchedules from "./components/page/schedule/listSchedules";
//toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const idtoken = localStorage.token
  const dispatch = useDispatch()
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.payload.user.username,
            role: res.data.payload.user.role,
            firstname: res.data.payload.user.firstname,
            lastname: res.data.payload.user.lastname,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  return (
    <div className="App">
      <ToastContainer />
      <Navber />
      <Routes>
        {/* role == genaral */}
        <Route path="/" element={<Login />}></Route>

        {/* role == admin and emp */}
        <Route path="/schedules" element={
          <UserRoute>
            <ListSchedules />
          </UserRoute>
        }></Route>

        <Route path="/role" element={
          <UserRoute>
            <Roles />
          </UserRoute>
        }></Route>

        <Route path="/title" element={
          <UserRoute>
            <Titles />
          </UserRoute>
        }></Route>

        <Route path="/institution" element={
          <UserRoute>
            <Institution />
          </UserRoute>
        }></Route>

        <Route path="/listUser" element={
          <UserRoute>
            <ListUser />
          </UserRoute>
        }></Route>

        <Route path="/scores" element={
          <UserRoute>
            <Score />
          </UserRoute>
        }></Route>

        <Route path="/createuser" element={
          <UserRoute>
            <CreateUser />
          </UserRoute>
        }></Route>

        <Route path="/dashboard" element={
          <UserRoute>
            <Dashboard />
          </UserRoute>
        }> </Route>

      </Routes>
    </div>
  );
}

export default App;
