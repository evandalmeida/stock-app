from flask import Flask, request, jsonify, session
from flask_migrate import Migrate
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash
import yfinance as yf
from models import db, User, Notification, Watchlist

app = Flask(__name__)

# Configuration
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5555"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = 'f9cf27c663bc31db958e7e7d2a994daa'

GOOGLE_MAPS_API_KEY = "AIzaSyCTYs930QhE82JCgvnNEDiaCeJmHkjND1c"


migrate = Migrate(app, db)
db.init_app(app)


@app.route('/')
def index():
    return "Welcome to the Homepage!"

@app.get('/api/search-stock')
def search_stock():
    query = request.args.get('query')
    if not query:
        return jsonify({"error": "Query parameter is required"}), 400

    ticker = yf.Ticker(query)
    stock_info = ticker.info

    if not stock_info:
        return jsonify({"error": "Stock not found"}), 404

    return jsonify({
        "symbol": stock_info.get('symbol', ''),
        "name": stock_info.get('longName', ''),
        "price": stock_info.get('currentPrice', ''),
        "fiftyTwoWeekHigh": stock_info.get('fiftyTwoWeekHigh', None),
        "fiftyTwoWeekLow": stock_info.get('fiftyTwoWeekLow', None),
        "marketCap": stock_info.get('marketCap', None),
        "volume": stock_info.get('volume', None),
        "dividendRate": stock_info.get('dividendRate', None),
        "dividendYield": stock_info.get('dividendYield', None),
        "trailingPE": stock_info.get('trailingPE', None),
        "forwardPE": stock_info.get('forwardPE', None)
    })

@app.get('/api/maps/config')
def get_maps_config():
    return jsonify({
        "apiKey": GOOGLE_MAPS_API_KEY
    })

@app.post('/users')
def create_user():
    try:
        json = request.get_json()
        username = json.get('username')
        password = json.get('password')
        if username and password:
            hashed_password = generate_password_hash(password, method='sha256')
            new_user = User(username=username, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            return jsonify(new_user.to_dict()), 201
        else:
            return jsonify({'error': 'Username and Password are required'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 406

@app.post('/login')
def login():
    try:
        json = request.get_json()
        username = json.get('username')
        password = json.get('password')
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            return jsonify({'message': 'Logged in successfully'}), 200
        else:
            return jsonify({'error': 'Invalid Username or Password'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.get('/notes')
def get_notification():
    return jsonify([note.to_dict() for note in Notification.query.all()]), 200

@app.post('/notes')
def create_notification():
    try:
        data = request.get_json()
        new_note = Notification(**data)
        db.session.add(new_note)
        db.session.commit()
        return jsonify(new_note.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 406
    
@app.get('/api/watchlist')
def get_watchlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
    
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    watchlist = Watchlist.query.filter_by(user_id=user.id).first()
    stocks = [stock.to_dict() for stock in watchlist.stocks] if watchlist else []
    return jsonify(stocks)

@app.get('/api/check-session')
def check_session():
    user_id = session.get('user_id')
    is_authenticated = bool(user_id)
    return jsonify({"isAuthenticated": is_authenticated})

if __name__ == '__main__':
    app.run(debug=True)