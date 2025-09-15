'use client';
import React, { useEffect } from 'react';

const Unauthorized = () => {
  useEffect(() => {
    // Hide any existing sidebar or header elements
    const hideElements = () => {
      const sidebar = document.querySelector('[class*="sideBar"]') ||
                     document.querySelector('[class*="sidebar"]') ||
                     document.querySelector('.sidebar');
      
      const header = document.querySelector('[data-testid="header"]') ||
                    document.querySelector('.header') ||
                    document.querySelector('[class*="header"]');
      
      if (sidebar) {
        (sidebar as HTMLElement).style.display = 'none';
      }
      if (header) {
        (header as HTMLElement).style.display = 'none';
      }
    };

    // Set body styles to prevent scrolling
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Add global CSS to hide sidebar
    const style = document.createElement('style');
    style.textContent = `
      [class*="sideBar"], [class*="sidebar"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Hide elements immediately
    hideElements();
    
    // Hide elements after a short delay to catch dynamically loaded elements
    const hideTimer = setTimeout(hideElements, 100);

    return () => {
      clearTimeout(hideTimer);
      // Restore body styles when component unmounts
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // Remove the injected style
      const injectedStyle = document.querySelector('style');
      if (injectedStyle && injectedStyle.textContent?.includes('sideBar')) {
        injectedStyle.remove();
      }
    };
  }, []);

  const handleGoToLogin = () => {
    window.location.href = '/api/auth/logout';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 99999,
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
          background: 'white',
          borderRadius: '12px',
          padding: '40px 30px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Warning Icon */}
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#fff3cd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            border: '2px solid #ffc107',
          }}
        >
          <span style={{ fontSize: '30px' }}>⚠️</span>
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#856404',
            marginBottom: '16px',
          }}
        >
          Access Restricted
        </h1>

        <p
          style={{
            color: '#856404',
            marginBottom: '32px',
            lineHeight: 1.5,
            fontSize: '16px',
          }}
        >
          You don&apos;t have access to this resource. Please login with a different account.
        </p>

        <button
          onClick={handleGoToLogin}
          style={{
            background: '#0057b7',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0, 87, 183, 0.3)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#004494';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#0057b7';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;