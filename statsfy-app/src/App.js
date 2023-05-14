import logo from "./logo.svg";
import "./App.css";
import Navig from "./components/Navigation/nav";
import Sidebar from "./components/Sidebar/sidebar";
import { useState } from "react";
import Homepage from "./pages/Homepage";
import Albuns from "./pages/Albuns";
import LikedSongs from "./pages/LikedSongs";
import UserProfile from "./pages/UserProfile";

function App() {
  const [component, setComponent] = useState(0);

  return (
    <div>
      <Navig />
      <div className="contentWrapper">
        <Sidebar setComponent={setComponent} />
        {component == 0 ? (
          <Homepage />
        ) : component == 1 ? (
          <Albuns />
        ) : component == 2 ? (
          <LikedSongs />
        ) : (
          <UserProfile />
        )}
      </div>
    </div>
  );
}

export default App;
