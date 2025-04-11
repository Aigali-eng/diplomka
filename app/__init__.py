from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

db = SQLAlchemy()
login_manager = LoginManager()
# указываем, куда будет перенаправляться пользователь, если он не аутентифицирован
login_manager.login_view = 'main.login'  

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'supersecretkey'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

    db.init_app(app)
    login_manager.init_app(app)
    Migrate(app, db)

    # импортируем модель User, чтобы использовать её в user_loader
    from .models import User

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    from .routes import main
    app.register_blueprint(main)

    # Если ещё нет таблиц, можно создать их автоматически (не рекомендуется для production)
    with app.app_context():
        db.create_all()

    return app
