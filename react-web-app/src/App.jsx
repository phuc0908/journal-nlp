import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import JournalEntry from './components/JournalEntry';
import Insights from './components/Insights';
import Overview from './components/Overview';
import Trends from './components/Trends';
import Vault from './components/Vault';
import Settings from './components/Settings';
import Login from './components/Login';
import { translations } from './translations';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [activeView, setActiveView] = useState('journal');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'vi');

  const t = translations[language];

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login t={t.auth} setIsLoggedIn={setIsLoggedIn} />;
  }

  const renderContent = () => {
    switch (activeView) {
      case 'journal':
        return <JournalEntry t={t.journal} />;
      case 'overview':
        return <Overview t={t.overview} />;
      case 'trends':
        return <Trends t={t.trends} />;
      case 'vault':
        return <Vault t={t.vault} />;
      case 'settings':
        return (
          <Settings
            theme={theme}
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
            t={t.settings}
            onLogout={handleLogout}
          />
        );
      default:
        return <JournalEntry t={t.journal} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark">
      <Sidebar activeView={activeView} setActiveView={setActiveView} t={t.sidebar} />
      <main className="flex-1 flex flex-col relative overflow-y-auto">
        <Header activeView={activeView} t={t.header} />
        {renderContent()}
      </main>
      <Insights t={t.insights} />
    </div>
  );
}

export default App;
