import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/common';
import { authAsyncActions } from '../features/auth/authSlice';
import { useNavigate } from "react-router-dom";


const ShareYoutubeMovie = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
    const [url, setUrl] = useState('');
    const share = async () => {
        const result = await dispatch(
            authAsyncActions.share({
              url,
            })
          )
          console.log(result.meta.requestStatus);
          if (result.meta.requestStatus === 'fulfilled') {
            navigate("/");
          }
        }

  return (
    <div className="container-share">
      <div className="box">
        <p className="title">Share a Youtube movie</p>
        <div className="input-container">
          <label htmlFor="youtubeUrl">Youtube URL:</label>
          <input type="text" id="youtubeUrl" className="input" onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className='button-container'>
          <button onClick={share} className="button">Share</button>
        </div>
      </div>
    </div>
  );
};

export default ShareYoutubeMovie;
