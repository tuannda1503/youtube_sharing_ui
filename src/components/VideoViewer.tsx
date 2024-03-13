import * as React from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const VideoViewer = ({ video }: any) => {
  const getYoutubeVideoId = (url: string) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  }
  return (
    <div className='video-viewer'>
      <div className="video-wrapper">
        <iframe
          title="video-player"
          width="400"
          height="200"
          src={`https://www.youtube.com/embed/${getYoutubeVideoId(video.url)}`}
          allowFullScreen
        ></iframe>
      </div>
      <div className='video-detail'>
        <h6>{video.title}</h6>
        <p className='share'>Shared by: {video.email}</p>
        <div className='icon'>
            <div className='like'>10<FontAwesomeIcon icon={faThumbsUp} /></div>
            <div className='like'>20<FontAwesomeIcon icon={faThumbsDown} /></div>
        </div>
        <p>Description: </p>
        {/* <p>{video.description}</p> */}
      </div>
    </div>
  );
};

export default VideoViewer;
