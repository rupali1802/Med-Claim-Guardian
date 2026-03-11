# OAuth Setup Guide - Med-Claim Guardian

This guide explains how to set up Google and GitHub OAuth authentication for the Med-Claim Guardian platform.

## Overview

The application now supports OAuth-based social login for both Google and GitHub. When users click the social login buttons, they are redirected to the respective OAuth provider to authenticate, then redirected back to your app with an authorization code that is exchanged for user information.

## Architecture

```
1. User clicks "Sign in with Google/GitHub"
   ↓
2. Frontend redirects to OAuth provider's authorization endpoint
   ↓
3. User authenticates with OAuth provider
   ↓
4. OAuth provider redirects back to app with authorization code
   ↓
5. App calls backend to exchange code for access token
   ↓
6. Backend fetches user profile from OAuth provider
   ↓
7. Backend returns user data and app token
   ↓
8. User logged in and dashboard loads
```

## Google OAuth Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "Med-Claim Guardian")
3. Enable the **Google+ API**:
   - Click "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click it and press "Enable"

### Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Choose "Web application"
4. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback/google` (development)
   - `https://yourdomain.com/auth/callback/google` (production)
5. Copy the **Client ID** and **Client Secret**

### Step 3: Configure Environment Variables

Add to your `.env` file:
```env
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
```

## GitHub OAuth Setup

### Step 1: Register OAuth Application

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the form:
   - **Application name**: Med-Claim Guardian
   - **Homepage URL**: `http://localhost:3000` (or production URL)
   - **Authorization callback URL**: `http://localhost:3000/auth/callback/github`

### Step 2: Copy Credentials

1. After registration, you'll see:
   - **Client ID**
   - **Client Secret** (click "Generate a new client secret")

### Step 3: Configure Environment Variables

Add to your `.env` file:
```env
REACT_APP_GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
```

## Files Involved

### Frontend
- `src/components/Login.js` - Handles login page with social buttons
- `src/components/Register.js` - Handles registration with social buttons
- `src/components/OAuthCallback.js` - Processes OAuth callback and exchanges code for token
- `src/App.js` - Routes to OAuthCallback when URL matches `/auth/callback/*`

### Backend
- `oauth_routes.py` - Contains OAuth callback endpoints:
  - `POST /auth/oauth/callback/google` - Exchanges Google code for token
  - `POST /auth/oauth/callback/github` - Exchanges GitHub code for token
- `claim_denial_api.py` - Includes oauth_routes router

## Testing OAuth Flow

### Development Testing

1. Start both frontend and backend:
   ```bash
   # Terminal 1 - Backend
   cd d:\TEAM_HEIST
   python -m uvicorn claim_denial_api:app --reload
   
   # Terminal 2 - Frontend
   cd d:\TEAM_HEIST\rcm_dashboard
   npm start
   ```

2. Navigate to http://localhost:3000

3. Click "Sign in with Google" or "Sign in with GitHub"

4. You should be redirected to the OAuth provider's login page

5. After authentication, you'll be redirected back to `http://localhost:3000/auth/callback/google` or `/auth/callback/github`

6. The app exchanges the code and logs you in automatically

### Testing Redirect URLs

If you get "Redirect URI mismatch" error:
- **Google**: Verify the URL in Google Cloud Console matches exactly
- **GitHub**: Verify the URL in GitHub OAuth settings matches exactly
- Make sure both use `http` (not `https`) for localhost testing

## Production Deployment

When deploying to production:

1. Update OAuth provider settings with production redirect URIs:
   - **Google**: `https://yourdomain.com/auth/callback/google`
   - **GitHub**: `https://yourdomain.com/auth/callback/github`

2. Update environment variables:
   ```env
   REACT_APP_API_URL=https://api.yourdomain.com
   ENVIRONMENT=production
   REACT_APP_GOOGLE_CLIENT_ID=production_google_id
   GOOGLE_CLIENT_SECRET=production_google_secret
   REACT_APP_GITHUB_CLIENT_ID=production_github_id
   GITHUB_CLIENT_SECRET=production_github_secret
   ```

3. Ensure HTTPS is enabled on your domain

4. Update CORS settings in `claim_denial_api.py` to allow production domain

## Troubleshooting

### "Redirect URI mismatch" Error
- Check that the redirect URI in OAuth provider settings matches exactly
- Ensure no trailing slashes or protocol mismatches
- For Google: Use `%2F` encoded slashes if encountering issues

### "No authorization code received"
- User may have cancelled the OAuth flow
- Check browser console for JavaScript errors
- Verify OAuth app credentials are correct

### Backend fails to exchange code
- Check `GOOGLE_CLIENT_SECRET` and `GITHUB_CLIENT_SECRET` are correct
- Verify the code hasn't expired (typically 10 minutes)
- Check backend logs for detailed error messages

### User profile not fetching
- Ensure user's OAuth profile has public email access
- For GitHub: User may need to make email public in profile settings
- For Google: Account must have email associated

## Security Considerations

1. **Never commit secrets**: Use `.env` file (add to `.gitignore`)
2. **Use HTTPS in production**: OAuth credentials should only transmit over HTTPS
3. **Validate tokens**: Backend should verify OAuth token signatures
4. **Limit scopes**: Request only necessary permissions from OAuth providers
5. **Secure storage**: Consider using httpOnly cookies for tokens instead of localStorage

## Future Enhancements

Potential improvements to the OAuth implementation:

1. **Token refresh**: Implement refresh token flow for long-lived sessions
2. **Account linking**: Allow users to link multiple OAuth providers to one account
3. **Consent screen customization**: Customize what user data is displayed
4. **Rate limiting**: Add rate limiting to OAuth endpoints
5. **Audit logging**: Log all OAuth authentication events
6. **Multi-factor authentication**: Add MFA on top of OAuth

## References

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [RFC 6749 - OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
