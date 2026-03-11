import React, { useEffect, useState } from 'react';

export default function OAuthCallback({ onAuthSuccess }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const provider = window.location.pathname.includes('google') ? 'Google' : 'GitHub';

        if (!code) {
          setError('No authorization code received. Please try again.');
          setLoading(false);
          return;
        }

        // Exchange code for token via backend
        // In production, your backend would:
        // 1. Exchange the code for an access token with Google/GitHub
        // 2. Fetch user profile information
        // 3. Create/update user in your database
        // 4. Return JWT token for your app

        const response = await fetch(`http://localhost:8000/auth/oauth/callback/${provider.toLowerCase()}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        const data = await response.json();

        // Store auth data
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userName', data.name);
        localStorage.setItem('userOrganization', data.organization || '');
        localStorage.setItem('loginProvider', provider);

        // Trigger success callback
        onAuthSuccess();
      } catch (err) {
        setError(`OAuth authentication failed: ${err.message}`);
        setLoading(false);
      }
    };

    handleOAuthCallback();
  }, [onAuthSuccess]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block">
            <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="mt-4 text-white text-lg font-semibold">Completing authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
          <h2 className="text-xl font-bold text-red-800 mb-2">Authentication Error</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <a
            href="/"
            className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Return to Login
          </a>
        </div>
      </div>
    );
  }

  return null;
}
