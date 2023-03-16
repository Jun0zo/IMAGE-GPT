from flask import Flask, jsonify, request
from flask_cors import CORS
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
CORS(app)

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if the credentials are valid (this is just an example, you should use your own authentication mechanism)
    if username == 'admin' and password == 'password':
        # Create a JWT token that expires in 1 day
        token = jwt.encode({'username': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)}, app.config['SECRET_KEY'])

        # Return the token
        return jsonify({'token': token.decode('UTF-8')})

    # If the credentials are invalid, return an error message
    return jsonify({'error': 'Invalid credentials'})

@app.route('/protected', methods=['GET'])
def protected():
    # Get the token from the request headers
    token = request.headers.get('Authorization').split()[1]

    try:
        # Decode the token and get the username
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        username = payload['username']

        # Return a message indicating that the user is logged in
        return jsonify({'message': f'Welcome {username}!'})

    except jwt.ExpiredSignatureError:
        # If the token has expired, return an error message
        return jsonify({'error': 'Token has expired'})

    except jwt.InvalidTokenError:
        # If the token is invalid, return an error message
        return jsonify({'error': 'Invalid token'})

if __name__ == '__main__':
    app.run(debug=True)
