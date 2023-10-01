import React from "react";
import { Route, Routes } from "react-router-dom";

//page-auth
import Login from "./components/page/auth/login"
import CreateUser from "./components/page/user/createUser";
//page-admin
import HomeAdmin from "./components/page/admin/home";

//page-user
import HomeUser from "./components/page/user/home"

//layout
import Navber from "./components/layouts/navber";
//function
import { currentUser } from "./components/functions/auth";
//redux
import { useDispatch } from 'react-redux';
//Route
import UserRoute from "./components/routes/userRoute";
import AdminRote from "./components/routes/adminRoute";
import Roles from "./components/page/combobox/roles";
import Titles from "./components/page/combobox/titles";
import Institution from "./components/page/combobox/institution";
import Score from "./components/page/score/score";
import ListUser from "./components/page/user/listUser";
import ListSchedules from "./components/page/schedule/listSchedules";
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
      .catch((err) => {
        //err
        console.log(err);
      });
  }
  console.log()
  return (
    <div className="App">
      <ToastContainer />
      <Navber />
      <Routes>
        {/* role == genaral */}
        <Route path="/" element={<Login />}></Route>

        {/* role == admin */}
        <Route path="/schedules" element={
          <AdminRote>
            <ListSchedules />
          </AdminRote>
        }></Route>

        <Route path="/role" element={
          <AdminRote>
            <Roles />
          </AdminRote>
        }></Route>

        <Route path="/title" element={
          <AdminRote>
            <Titles />
          </AdminRote>
        }></Route>

        <Route path="/institution" element={
          <AdminRote>
            <Institution />
          </AdminRote>
        }></Route>

        <Route path="/listUser" element={
          <AdminRote>
            <ListUser />
          </AdminRote>
        }></Route>

        <Route path="/scores" element={
          <AdminRote>
            <Score />
          </AdminRote>
        }></Route>

        <Route path="/createuser" element={
          <AdminRote>
            <CreateUser />
          </AdminRote>
        }></Route>

        <Route path="/admin/home" element={
          <AdminRote>
            <HomeAdmin />
          </AdminRote>
        }> </Route>

        {/* role == user */}
        <Route path="/home/user" element={
          <UserRoute>
            <HomeUser />
          </UserRoute>
        }> </Route>

      </Routes>
    </div>
  );
}

export default App;
