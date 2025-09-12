'use client';

import React from 'react';

const ErrorPage = () => {
  const handleGoToLogin = () => {
    window.location.href = '/api/auth/logout';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '20px',
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          background: 'white',
          borderRadius: '8px',
          padding: '40px 30px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '16px',
          }}
        >
          Application Error
        </h1>
        
        <p
          style={{
            color: '#666',
            marginBottom: '32px',
            lineHeight: 1.5,
          }}
        >
          Something went wrong with the application. Please try logging in again.
        </p>
        
        <button
          onClick={handleGoToLogin}
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
