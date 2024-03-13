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
  const userLocal = localStorage.getItem('accessToken')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthen, setIsAuthen] = useState(user ? true : false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(user || userLocal) {
      setIsAuthen(true)
    }
  }, [user, userLocal]);

  const login = async () => {
    dispatch( authActions.setProfile({ email, password }))
    const result = await dispatch(
      authAsyncActions.login({
        email,
        password
      })
    )
    if (result.meta.requestStatus === 'fulfilled') {
      setIsAuthen(true)
    } else setIsAuthen(false)
  }

  const shareMovie = async () => {
    navigate("/share");
  }

  const logout = async () => {
    setIsAuthen(false);
    localStorage.removeItem('accessToken');
  }

  return (
    <header className='header'>
      <div className='logo' onClick={() => {navigate("/")}}>
        <h1><FontAwesomeIcon icon={faHome} /> Funny Movies</h1>
      </div>
      {isAuthen ? (
        <div className='login-container'>
          <p>tuan@gmail.com</p>
          <button onClick={shareMovie}>Share a movie</button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className='login-container'>
          <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Login // Register</button>
        </div>
      )}
    </header>
  );
};

export default Header;
