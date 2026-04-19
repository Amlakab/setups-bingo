"use client";
import React from 'react';

type DownloadButtonProps = {
  os: 'windows' | 'linux' | 'android';
  variant?: 'default' | 'white';
};

const DownloadButton: React.FC<DownloadButtonProps> = ({ os, variant = 'default' }) => {
  const getDownloadLink = () => {
    switch (os) {
      case 'windows':
        return '/downloads/beta_online_work_for_windows';
      case 'linux':
        return '/downloads/beta_online_work_for_linux';
      case 'android':
        return '/downloads/android-extension.apk';
      default:
        return '#';
    }
  };

  const getButtonText = () => {
    switch (os) {
      case 'windows':
        return 'Download for Windows';
      case 'linux':
        return 'Download for Linux';
      case 'android':
        return 'Download for Android';
      default:
        return 'Download';
    }
  };

  const buttonClasses = variant === 'white' 
    ? 'bg-white text-blue-800 hover:bg-gray-100'
    : 'bg-blue-600 text-white hover:bg-blue-700';

  return (
    <a
      href={getDownloadLink()}
      download
      className={`px-8 py-4 rounded-lg font-bold text-lg transition-colors ${buttonClasses}`}
    >
      {getButtonText()}
    </a>
  );
};

export default DownloadButton;