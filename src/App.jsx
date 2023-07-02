import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import Loading from './components/Loading';
import HeaderBar from './components/HeaderBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import NewThreadPage from './pages/NewThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';

function App() {
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const logOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }

  return (
    <>
      <Loading />
      <HeaderBar authUser={authUser} logOut={logOut} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage authUser={authUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/threads/:id" element={<DetailPage />} />
        <Route path="/new" element={<NewThreadPage authUser={authUser} />} />
        <Route path="/leaderboards" element={<LeaderboardsPage />} />
      </Routes>
    </>
  );
}

export default App;
