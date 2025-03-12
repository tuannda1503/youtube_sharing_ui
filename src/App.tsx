import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routers from './routers/routers';
import './pages/styles.scss';
import { Provider } from 'react-redux';
import store from './store';
import io from 'socket.io-client';
import Header from './components/Header';
import Swal from 'sweetalert2'
import { authActions } from './features/auth/authSlice';

const socket = io(process.env.REACT_APP_API_URL, {
  transports: ['websocket'],
});


const NotFound = () => <div>Not Found</div>;

function App() {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const email = localStorage.getItem('email');
    if (token && email) {
      store.dispatch(authActions.setToken(token));
      store.dispatch(authActions.setProfile({ email }));
    }
  }, []);
  useEffect(() => {
    socket.on('onMessage', (data: any) => {
      console.log(data.body.title);
      console.log(data.body.email);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: `${data.body.email} has sent video: ${data.body.title}`
      });
    });
  }, [])
  return (
    <Provider store={store}>
    <div className="main-container">
      <Router>
      <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routers.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
    </Provider>
  );
}

export default App;
