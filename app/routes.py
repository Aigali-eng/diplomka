from flask import Blueprint, render_template

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/login')
def login():
    return render_template('login.html')

@main.route('/register')
def register():
    return render_template('register.html')

@main.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@main.route('/project.html')
def project():
    return render_template('project.html')

@main.route('/profile')
def profile():
    return render_template('profile.html')

@main.route('/analytics')
def analytics():
    return render_template('analytics.html')

@main.route('/team')
def team():
    return render_template('team.html')


