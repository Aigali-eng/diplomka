from flask import Flask
from .routes import main

def create_app():
    app = Flask(__name__)
    app.secret_key = 'your-secret-key'  # Можешь заменить на любой
    app.register_blueprint(main)
    return app
