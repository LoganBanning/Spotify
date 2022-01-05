import React from 'react';
import './SideBar.css';
import Logo from '../../images/Spotify_Logo_RGB_White.png';
import { Link } from 'react-router-dom';
import SideBarPlaylist from './SideBarPlaylist';

const SideBarComponent = (props) => {

  return (
    <div className='side-bar'>
      <div className='home-search-library-container'>
      <Link to='/homepage'>
      <img src={Logo} className='logo-side-bar' alt='Logo' />
      </Link>
      <Link to='/homepage'>
      <button className='home-btn side-bar-btn'>Home</button>
      </Link>
      <Link to='/search'>
      <button className='search-btn side-bar-btn'>Search</button>
      </Link>
      <Link to='/playlists'>
      <button className='your-library-btn side-bar-btn'>Your Library</button>
      </Link>
      <Link to='/merch'>
        <button className='side-bar-btn'>Merch</button>
      </Link>
      </div>
      <div className='playlist-liked-songs'>
      <Link to='/create-playlist'>
        <button className='create-playlist-btn side-bar-btn'>Create Playlist</button>
      </Link>
      <Link to='/liked-songs'>
        <button className='liked-songs-btn side-bar-btn'>Liked Songs</button>
      </Link>
      </div>
      <SideBarPlaylist />
    </div>
  )
}

export default SideBarComponent;
