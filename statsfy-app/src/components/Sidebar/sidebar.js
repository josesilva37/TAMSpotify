import './sidebar.css'
import React from 'react';

function Sidebar(props) {
  return (
    <div className={'sidebar-container'}>
        <p className='menu-item' onClick={() => props.setComponent(0)}>Homepage</p>
        <p className='menu-item' onClick={() => props.setComponent(1)}>Albuns</p>
        <p className='menu-item' onClick={() => props.setComponent(2)}>Liked Songs</p>
    </div>
  );
}

export default Sidebar;
