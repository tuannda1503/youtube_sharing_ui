import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../hooks/common';
import { authActions, authAsyncActions } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthen, setIsAuthen] = useState(user ? true : false);
  const dispatch = useAppDispatch();

  const login = async () => {
    const result = await dispatch(
      authAsyncActions.login({
        email,
        password
      })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      setIsAuthen(true)
    } else {
      setIsAuthen(false)
    }
  };

  const shareMovie = async () => {
    navigate("/share");
  }

  const logout = async () => {
    dispatch(authActions.logout());
    setIsAuthen(false);
    navigate("/");
  };

  return (
    <header className='header'>
      <div className='logo' onClick={() => {navigate("/")}}>
        <h1><FontAwesomeIcon icon={faHome} /> Funny Movies</h1>
      </div>
      {user ? (
        <div className='login-container'>
          <p>{user.email}</p>
          <button onClick={shareMovie}>Share a movie</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className='login-container'>
          <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Login</button>
        </div>
      )}
    </header>
  );
};

export default Header;
