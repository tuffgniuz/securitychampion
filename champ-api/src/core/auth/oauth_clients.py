from decouple import os

from httpx_oauth.clients.google import GoogleOAuth2
from httpx_oauth.clients.github import GitHubOAuth2
from httpx_oauth.clients.linkedin import LinkedInOAuth2


google_oauth_client = GoogleOAuth2(
    os.getenv('GOOGLE_OAUTH_CLIENT_ID', ''),
    os.getenv('GOOGLE_OAUTH_CLIENT_SECRET', '')
)

github_oauth_client = GitHubOAuth2(
    os.getenv('GITHUB_OAUTH_CLIENT_ID', ''),
    os.getenv('GITHUB_OAUTH_CLIENT_SECRET', '')
)

linkedin_oauth_client = LinkedInOAuth2(
    os.getenv('LINKEDIN_OAUTH_CLIENT_ID', ''),
    os.getenv('LINKEDIN_OAUTH_CLIENT_SECRET', '')
)
