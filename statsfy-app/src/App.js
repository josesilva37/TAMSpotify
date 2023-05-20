import logo from "./logo.svg";
import "./App.css";
import Navig from "./components/Navigation/nav";
import Sidebar from "./components/Sidebar/sidebar";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import Albuns from "./pages/Albuns";
import LikedSongs from "./pages/LikedSongs";
import UserProfile from "./pages/UserProfile";
import Collaborative from "./pages/Collaborative";


function App() {
  const [component, setComponent] = useState(0);
  const [user, setUser] = useState()

  return (
    <div>
      <Navig setComponent={setComponent} setUser={setUser} />
      <div className="contentWrapper">
        <Sidebar setComponent={setComponent} component={component} />
        {component == 0 ? (
          <Homepage />
        ) : component == 1 ? (
          <Albuns />
        ) : component == 2 ? (
          <LikedSongs />
        ) : component == 3 ? (
          <UserProfile user={user}/>
        ) : (
          <Collaborative />
        )}
      </div>
    </div>
  );
}

export default App;
