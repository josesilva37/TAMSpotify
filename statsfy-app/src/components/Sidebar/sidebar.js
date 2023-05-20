import './sidebar.css'
import React from 'react';

function Sidebar(props) {
  return (
    <div className={'sidebar-container'}>
        <p className={props.component == 0 ? 'menu-item active' : 'menu-item'} onClick={() => props.setComponent(0)}>Homepage</p>
        <p className={props.component == 1 ? 'menu-item active' : 'menu-item'} onClick={() => props.setComponent(1)}>Albuns</p>
        <p className={props.component == 2 ? 'menu-item active' : 'menu-item'} onClick={() => props.setComponent(2)}>Liked Songs</p>
        <p className={props.component == 3 ? 'menu-item active' : 'menu-item'} onClick={() => props.setComponent(3)}>User Profile</p>
        <p className={props.component == 4 ? 'menu-item active' : 'menu-item'} onClick={() => props.setComponent(4)}>Collaborative playlists</p>
    </div>
  );
}

export default Sidebar;
