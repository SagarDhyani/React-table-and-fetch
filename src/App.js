import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./myRedux/userSlice";
import { Navbar } from "./Components/Navbar";
import { Footer } from "./Components/Footer";
import { UsersTable } from "./Components/UsersTable";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, []);

  const data = useSelector((store) => store.users);

  // console.log(data);

  return (
    <div className="App">
      <Navbar />
      <UsersTable />

      <Footer />
    </div>
  );
}

export default App;
