'use client';

import React, { useEffect, useRef, useState } from 'react';

const FetaBingoPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: true,
    about: false,
    download: false,
    howToInstall: false,
  });

  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    download: useRef<HTMLElement>(null),
    howToInstall: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id as keyof typeof isVisible;
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [id]: true }));
            setActiveSection(id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleDownload = (fileType: 'apk' | 'exe' | 'bingo-apk' | 'pdf') => {
    if (fileType === 'apk') {
      const link = document.createElement('a');
      link.href = '/downloads/app-debug.apk';
      link.download = 'app-debug.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (fileType === 'exe') {
      const link = document.createElement('a');
      link.href = '/downloads/Feta Bingo Setup 0.1.0.exe';
      link.download = 'Feta Bingo Setup 0.1.0.exe';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (fileType === 'bingo-apk') {
      const link = document.createElement('a');
      link.href = '/downloads/bingo-card.apk';
      link.download = 'bingo-card.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (fileType === 'pdf') {
      const link = document.createElement('a');
      link.href = '/downloads/bingo-cartela.pdf';
      link.download = 'bingo-cartela.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="feta-bingo-page">
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .feta-bingo-page {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          overflow-x: hidden;
          background: white;
          position: relative;
        }

        /* Fixed Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: white;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          padding: 1rem 2rem;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: bold;
          color: #0d9488;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .nav-link {
          background: none;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
          color: #374151;
          font-weight: 500;
        }

        .nav-link:hover {
          color: #0d9488;
          transform: translateY(-2px);
        }

        .nav-link.active {
          color: #0d9488;
          border-bottom: 2px solid #0d9488;
        }

        .download-nav-btn {
          background: #0d9488;
          color: white;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 2rem;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .download-nav-btn:hover {
          transform: scale(1.05);
          background: #0f766e;
        }

        .menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #0d9488;
        }

        /* Sections */
        .section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5rem 2rem;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          background: white;
        }

        .hero {
          padding-top: 6rem;
        }

        /* Hero Layout */
        .hero-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          width: 100%;
          gap: 3rem;
        }

        .hero-text {
          flex: 1;
          min-width: 280px;
        }

        .hero-image {
          flex: 1;
          min-width: 280px;
          display: flex;
          justify-content: center;
          position: relative;
        }

        /* About Layout */
        .about-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          width: 100%;
          gap: 3rem;
        }

        .about-text {
          flex: 1;
          min-width: 280px;
        }

        .about-stats {
          flex: 1;
          min-width: 280px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }

        /* Download Layout */
        .download-content {
          max-width: 1200px;
          width: 100%;
          text-align: center;
        }

        .download-cards {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
          margin-top: 3rem;
        }

        .download-card {
          flex: 1;
          min-width: 250px;
          max-width: 350px;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          border-radius: 2rem;
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .download-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(13, 148, 136, 0.15);
          border-color: #0d9488;
        }

        /* How to Install Layout */
        .how-to-content {
          max-width: 1200px;
          width: 100%;
        }

        .install-platforms {
          display: flex;
          flex-wrap: wrap;
          gap: 3rem;
          margin-top: 3rem;
        }

        .platform-install {
          flex: 1;
          min-width: 300px;
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          border-radius: 2rem;
          padding: 2rem;
        }

        .platform-title {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #ccfbf1;
          color: #0d9488;
          font-weight: bold;
        }

        .steps-list {
          list-style: none;
          padding: 0;
        }

        .steps-list li {
          padding: 0.8rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
          border-bottom: 1px solid #ccfbf1;
          color: #374151;
        }

        .step-number-small {
          width: 30px;
          height: 30px;
          background: #0d9488;
          color: white;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .file-name {
          background: #e6f7f5;
          padding: 0.3rem 0.8rem;
          border-radius: 0.5rem;
          font-family: monospace;
          font-size: 0.8rem;
          margin-top: 1rem;
          display: inline-block;
          color: #0d9488;
          border: 1px solid #ccfbf1;
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .opacity-0 {
          opacity: 0;
        }

        .floating-cheese {
          font-size: 6rem;
          animation: float 3s ease-in-out infinite;
          position: absolute;
          top: -30px;
          right: -30px;
        }

        .bingo-card-preview {
          background: #f0fdfa;
          border-radius: 1rem;
          padding: 1rem;
          display: flex;
          flex-wrap: wrap;
          width: 280px;
          gap: 0.5rem;
          justify-content: center;
          border: 1px solid #ccfbf1;
        }

        .bingo-cell {
          width: 70px;
          height: 70px;
          background: white;
          border: 1px solid #ccfbf1;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #0d9488;
          transition: all 0.3s ease;
        }

        .bingo-cell:hover {
          background: #0d9488;
          color: white;
          transform: scale(1.05);
        }

        .stat-card {
          background: #f0fdfa;
          border: 1px solid #ccfbf1;
          border-radius: 1rem;
          padding: 1.5rem;
          text-align: center;
          min-width: 140px;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: bold;
          display: block;
          color: #0d9488;
        }

        .stat-card span:last-child {
          color: #374151;
        }

        .badge {
          display: inline-block;
          background: #e6f7f5;
          padding: 0.3rem 1rem;
          border-radius: 2rem;
          font-size: 0.8rem;
          margin-bottom: 1rem;
          color: #0d9488;
          font-weight: 500;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .feta-brand {
          color: #0d9488;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
          color: #4b5563;
        }

        .btn-primary, .btn-outline {
          padding: 0.8rem 2rem;
          border-radius: 3rem;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-right: 1rem;
        }

        .btn-primary {
          background: #0d9488;
          color: white;
          border: none;
        }

        .btn-primary:hover {
          background: #0f766e;
          transform: scale(1.05);
          box-shadow: 0 10px 20px rgba(13, 148, 136, 0.2);
        }

        .btn-outline {
          background: transparent;
          border: 2px solid #0d9488;
          color: #0d9488;
        }

        .btn-outline:hover {
          background: #0d9488;
          color: white;
          transform: scale(1.05);
        }

        .download-icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: #111827;
        }

        .download-card p {
          color: #6b7280;
          font-size: 0.85rem;
        }

        .file-size {
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }

        .version {
          font-size: 0.7rem;
          color: #9ca3af;
          margin-top: 0.3rem;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 1rem;
          }

          .menu-btn {
            display: block;
          }

          .nav-links {
            display: none;
            width: 100%;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
          }

          .nav-links.open {
            display: flex;
          }

          .section {
            padding: 5rem 1rem 2rem 1rem;
          }

          h1 {
            font-size: 2rem;
          }

          h2 {
            font-size: 1.8rem;
          }

          .hero-buttons {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .btn-primary, .btn-outline {
            width: 100%;
            margin-right: 0;
          }

          .bingo-cell {
            width: 50px;
            height: 50px;
            font-size: 1rem;
          }

          .stat-number {
            font-size: 1.8rem;
          }

          .platform-title {
            font-size: 1.2rem;
          }
          
          .download-card {
            min-width: 220px;
          }
          
          .download-icon {
            font-size: 2.5rem;
          }
          
          h3 {
            font-size: 1.1rem;
          }
        }
      `}</style>

      {/* Fixed Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo" onClick={() => scrollToSection('hero')}>
            🧀 Feta Bingo
          </div>
          <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <button
              className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => scrollToSection('hero')}
            >
              Home
            </button>
            <button
              className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
              onClick={() => scrollToSection('about')}
            >
              About
            </button>
            <button
              className={`nav-link ${activeSection === 'download' ? 'active' : ''}`}
              onClick={() => scrollToSection('download')}
            >
              Download
            </button>
            <button
              className={`nav-link ${activeSection === 'howToInstall' ? 'active' : ''}`}
              onClick={() => scrollToSection('howToInstall')}
            >
              How to Install
            </button>
            <button className="download-nav-btn" onClick={() => scrollToSection('download')}>
              Get App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={sectionRefs.hero}
        className={`section hero ${isVisible.hero ? 'animate-fade-in-up' : 'opacity-0'}`}
      >
        <div className="hero-content">
          <div className="hero-text">
            <span className="badge">🎲 New Game Alert</span>
            <h1>
              <span className="feta-brand">Feta Bingo</span>
              <br />
              Where Cheese Meets Luck!
            </h1>
            <p>
              The creamiest, tangiest bingo experience on the blockchain.
              Play daily, win big, and collect rare feta tokens. Join over 100,000
              players worldwide!
            </p>
            <div className="hero-buttons">
              <button
                onClick={() => scrollToSection('download')}
                className="btn-primary"
              >
                Download Now 🎮
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="btn-outline"
              >
                Learn More 🧀
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-cheese">🧀</div>
            <div className="bingo-card-preview">
              <div className="bingo-cell">B</div>
              <div className="bingo-cell">I</div>
              <div className="bingo-cell">N</div>
              <div className="bingo-cell">G</div>
              <div className="bingo-cell">O</div>
              <div className="bingo-cell">🎯</div>
              <div className="bingo-cell">🧀</div>
              <div className="bingo-cell">✨</div>
              <div className="bingo-cell">🎲</div>
              <div className="bingo-cell">🏆</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={sectionRefs.about}
        className={`section about ${isVisible.about ? 'animate-fade-in-up' : 'opacity-0'}`}
      >
        <div className="about-content">
          <div className="about-text">
            <span className="badge">🧀 About Us</span>
            <h2>What is Feta Bingo?</h2>
            <p>
              Feta Bingo is the world's first cheese-themed bingo game that combines
              traditional bingo excitement with modern crypto rewards. Every number
              called brings you closer to winning delicious prizes and rare NFT cheeses.
            </p>
            <p>
              With over 100,000 active players worldwide, Feta Bingo has become the
              go-to destination for casual gamers and crypto enthusiasts alike. Our
              unique blend of entertainment and rewards keeps players coming back
              for more.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <span className="stat-number">100K+</span>
              <span>Active Players</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">50M+</span>
              <span>Games Played</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">$2.5M</span>
              <span>Prizes Won</span>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section
        id="download"
        ref={sectionRefs.download}
        className={`section download ${isVisible.download ? 'animate-fade-in-up' : 'opacity-0'}`}
      >
        <div className="download-content">
          <span className="badge">⬇️ Download</span>
          <h2>Get Feta Bingo Today!</h2>
          <p>Choose your platform and start playing in minutes</p>
          <div className="download-cards">
            {/* Android Main App Download */}
            <div
              className="download-card"
              onClick={() => handleDownload('apk')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleDownload('apk')}
            >
              <div className="download-icon">📱</div>
              <h3>Feta Bingo App</h3>
              <p>Main Android application</p>
              <div className="file-name">app-debug.apk</div>
              <div className="file-size">~30 MB</div>
              <div className="version">Version 0.1.0</div>
            </div>

            {/* Windows Download */}
            <div
              className="download-card"
              onClick={() => handleDownload('exe')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleDownload('exe')}
            >
              <div className="download-icon">💻</div>
              <h3>Feta Bingo for Windows</h3>
              <p>Desktop application for PC</p>
              <div className="file-name">Feta Bingo Setup 0.1.0.exe</div>
              <div className="file-size">~154 MB</div>
              <div className="version">Version 0.1.0</div>
            </div>

            {/* Bingo Card App Download */}
            <div
              className="download-card"
              onClick={() => handleDownload('bingo-apk')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleDownload('bingo-apk')}
            >
              <div className="download-icon">🎴</div>
              <h3>Bingo Card App</h3>
              <p>Standalone bingo card generator</p>
              <div className="file-name">bingo-card.apk</div>
              <div className="file-size">~25 MB</div>
              <div className="version">Version 1.0.0</div>
            </div>

            {/* PDF Bingo Cartela Download */}
            <div
              className="download-card"
              onClick={() => handleDownload('pdf')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleDownload('pdf')}
            >
              <div className="download-icon">📄</div>
              <h3>Bingo Cartela PDF</h3>
              <p>Printable bingo cards in PDF format</p>
              <div className="file-name">bingo-cartela.pdf</div>
              <div className="file-size">~2 MB</div>
              <div className="version">Version 1.0.0</div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Install Section */}
      <section
        id="howToInstall"
        ref={sectionRefs.howToInstall}
        className={`section how-to-install ${isVisible.howToInstall ? 'animate-fade-in-up' : 'opacity-0'}`}
      >
        <div className="how-to-content">
          <span className="badge">📖 Installation Guide</span>
          <h2>How to Install Feta Bingo</h2>
          <p>Follow the platform-specific guide below to get started</p>

          <div className="install-platforms">
            {/* Mobile Installation Guide */}
            <div className="platform-install">
              <div className="platform-title">
                <span>📱</span>
                <span>Mobile Installation (Android)</span>
              </div>
              <ul className="steps-list">
                <li>
                  <span className="step-number-small">1</span>
                  <span>Download <strong>app-debug.apk</strong> (30 MB) from the Download section</span>
                </li>
                <li>
                  <span className="step-number-small">2</span>
                  <span>Open the downloaded APK file</span>
                </li>
                <li>
                  <span className="step-number-small">3</span>
                  <span>If prompted, enable "Install from unknown sources" in Settings → Security</span>
                </li>
                <li>
                  <span className="step-number-small">4</span>
                  <span>Tap "Install" and wait for the installation to complete</span>
                </li>
                <li>
                  <span className="step-number-small">5</span>
                  <span>Tap "Open" to launch Feta Bingo and start playing!</span>
                </li>
              </ul>
              <div className="file-name">File: app-debug.apk (30 MB)</div>
            </div>

            {/* Desktop Installation Guide */}
            <div className="platform-install">
              <div className="platform-title">
                <span>💻</span>
                <span>Desktop Installation (Windows)</span>
              </div>
              <ul className="steps-list">
                <li>
                  <span className="step-number-small">1</span>
                  <span>Download <strong>Feta Bingo Setup 0.1.0.exe</strong> (154 MB) from the Download section</span>
                </li>
                <li>
                  <span className="step-number-small">2</span>
                  <span>Locate the downloaded file in your Downloads folder</span>
                </li>
                <li>
                  <span className="step-number-small">3</span>
                  <span>Double-click the EXE file to run the installer</span>
                </li>
                <li>
                  <span className="step-number-small">4</span>
                  <span>If Windows SmartScreen appears, click "More info" then "Run anyway"</span>
                </li>
                <li>
                  <span className="step-number-small">5</span>
                  <span>Follow the installation wizard prompts (choose install location, create desktop shortcut)</span>
                </li>
                <li>
                  <span className="step-number-small">6</span>
                  <span>Click "Finish" and launch Feta Bingo from your desktop or Start Menu</span>
                </li>
              </ul>
              <div className="file-name">File: Feta Bingo Setup 0.1.0.exe (154 MB)</div>
            </div>
          </div>

          {/* Additional Downloads Info */}
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <div className="badge">🎁 Additional Downloads</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem' }}>
              <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '1rem', padding: '1rem', minWidth: '200px' }}>
                <div style={{ fontSize: '2rem' }}>🎴</div>
                <div style={{ fontWeight: 'bold', marginTop: '0.5rem', color: '#0d9488' }}>Bingo Card App</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>bingo-card.apk (25 MB)</div>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.3rem' }}>Standalone card generator</div>
              </div>
              <div style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', borderRadius: '1rem', padding: '1rem', minWidth: '200px' }}>
                <div style={{ fontSize: '2rem' }}>📄</div>
                <div style={{ fontWeight: 'bold', marginTop: '0.5rem', color: '#0d9488' }}>Bingo Cartela PDF</div>
                <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>bingo-cartela.pdf (2 MB)</div>
                <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.3rem' }}>Printable cards</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FetaBingoPage;