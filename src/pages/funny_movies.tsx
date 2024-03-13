import React, { useEffect, useState } from 'react';
import './styles.scss';
import VideoViewer from '../components/VideoViewer';
import userApi from '../api/userApi';
const FunnyMovie: React.FC = () => {
  const [movie, setMovie]: any[] = useState([]);
  useEffect(() => {
    userApi.listMovies().then((data) => {
      setMovie(data)
    });
  }, [])
  return (
    <div>
      {movie.map((v: any) => {
        return (
          <VideoViewer key={v.id} video={v} />
        );
      })}
    </div>
  );
};

export default FunnyMovie;