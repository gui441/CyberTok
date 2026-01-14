
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import VideoFeed from './components/VideoFeed';
import DiscoverPage from './components/DiscoverPage';
import CreatePage from './components/CreatePage';
import InboxPage from './components/InboxPage';
import ProfilePage from './components/ProfilePage';
import NavigationBar from './components/NavigationBar';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="app-container no-scrollbar text-white">
        <Routes>
          <Route path="/" element={<VideoFeed />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/inbox" element={<InboxPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <NavigationBar />
      </div>
    </HashRouter>
  );
};

export default App;
