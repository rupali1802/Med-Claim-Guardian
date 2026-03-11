"""
OAuth callback handlers for Google and GitHub authentication
Configure the following environment variables:
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GITHUB_CLIENT_ID
- GITHUB_CLIENT_SECRET
"""

import os
import json
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# OAuth Configuration
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET', 'YOUR_GOOGLE_CLIENT_SECRET')
GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET', 'YOUR_GITHUB_CLIENT_SECRET')
GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token'
GOOGLE_USER_INFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'
GITHUB_USER_INFO_URL = 'https://api.github.com/user'


class OAuthCallbackRequest(BaseModel):
    code: str


@router.post('/auth/oauth/callback/google')
async def google_oauth_callback(request: OAuthCallbackRequest):
    """
    Handle Google OAuth callback
    Exchange authorization code for access token and fetch user info
    """
    try:
        google_client_id = os.getenv('REACT_APP_GOOGLE_CLIENT_ID', 'YOUR_GOOGLE_CLIENT_ID')
        
        # Exchange code for token
        token_response = requests.post(GOOGLE_TOKEN_URL, data={
            'code': request.code,
            'client_id': google_client_id,
            'client_secret': GOOGLE_CLIENT_SECRET,
            'redirect_uri': 'http://localhost:3000/auth/callback/google',
            'grant_type': 'authorization_code'
        })

        if token_response.status_code != 200:
            raise HTTPException(status_code=401, detail='Failed to exchange code for token')

        token_data = token_response.json()
        access_token = token_data.get('access_token')

        # Fetch user info
        user_response = requests.get(
            GOOGLE_USER_INFO_URL,
            headers={'Authorization': f'Bearer {access_token}'}
        )

        if user_response.status_code != 200:
            raise HTTPException(status_code=401, detail='Failed to fetch user info')

        user_data = user_response.json()

        # Return user data and auth token
        # In production, create/update user in database here
        import base64
        auth_token = base64.b64encode(f"{user_data['email']}:{'google_oauth'}".encode()).decode()

        return {
            'token': auth_token,
            'email': user_data.get('email'),
            'name': user_data.get('name'),
            'organization': '',
            'provider': 'Google'
        }

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f'OAuth error: {str(e)}')


@router.post('/auth/oauth/callback/github')
async def github_oauth_callback(request: OAuthCallbackRequest):
    """
    Handle GitHub OAuth callback
    Exchange authorization code for access token and fetch user info
    """
    try:
        github_client_id = os.getenv('REACT_APP_GITHUB_CLIENT_ID', 'YOUR_GITHUB_CLIENT_ID')
        
        # Exchange code for token
        token_response = requests.post(
            GITHUB_TOKEN_URL,
            headers={'Accept': 'application/json'},
            data={
                'code': request.code,
                'client_id': github_client_id,
                'client_secret': GITHUB_CLIENT_SECRET,
                'redirect_uri': 'http://localhost:3000/auth/callback/github'
            }
        )

        if token_response.status_code != 200:
            raise HTTPException(status_code=401, detail='Failed to exchange code for token')

        token_data = token_response.json()
        access_token = token_data.get('access_token')

        # Fetch user info
        user_response = requests.get(
            GITHUB_USER_INFO_URL,
            headers={'Authorization': f'token {access_token}'}
        )

        if user_response.status_code != 200:
            raise HTTPException(status_code=401, detail='Failed to fetch user info')

        user_data = user_response.json()

        # Fetch user email if not in profile
        email = user_data.get('email')
        if not email:
            emails_response = requests.get(
                f'{GITHUB_USER_INFO_URL}/emails',
                headers={'Authorization': f'token {access_token}'}
            )
            if emails_response.status_code == 200:
                emails = emails_response.json()
                email = next((e['email'] for e in emails if e['primary']), emails[0]['email'] if emails else 'user@github.com')

        # Return user data and auth token
        # In production, create/update user in database here
        import base64
        auth_token = base64.b64encode(f"{email}:{'github_oauth'}".encode()).decode()

        return {
            'token': auth_token,
            'email': email,
            'name': user_data.get('name') or user_data.get('login'),
            'organization': user_data.get('company', ''),
            'provider': 'GitHub'
        }

    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f'OAuth error: {str(e)}')
