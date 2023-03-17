from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import datetime

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)
security = HTTPBearer()
app.secret_key = 'your-secret-key'

@app.post('/login')
def login(username: str, password: str):
    # Check if the credentials are valid (this is just an example, you should use your own authentication mechanism)
    if username == 'admin' and password == 'password':
        # Create a JWT token that expires in 1 day
        token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)}, app.secret_key)

        # Return the token
        return {'token': token}

    # If the credentials are invalid, raise an HTTPException
    raise HTTPException(status_code=401, detail='Invalid credentials')

@app.get('/protected')
def protected(credentials: HTTPAuthorizationCredentials = security):
    # Get the token from the request headers
    token = credentials.credentials

    try:
        # Decode the token and get the username
        payload = jwt.decode(token, app.secret_key, algorithms=['HS256'])
        username = payload['username']

        # Return a message indicating that the user is logged in
        return {'message': f'Welcome {username}!'}

    except jwt.ExpiredSignatureError:
        # If the token has expired, raise an HTTPException
        raise HTTPException(status_code=401, detail='Token has expired')

    except jwt.InvalidTokenError:
        # If the token is invalid, raise an HTTPException
        raise HTTPException(status_code=401, detail='Invalid token')
