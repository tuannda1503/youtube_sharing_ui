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
  const dispatch = useAppDispatch();

  const login = async () => {
    const result = await dispatch(
      authAsyncActions.login({
        email,
        password
      })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      // Đăng nhập thành công
    } else {
      // Xử lý lỗi nếu cần
    }
  };

  const logout = async () => {
    dispatch(authActions.logout());
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
