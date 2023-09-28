from flask import Flask, request, jsonify, session
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin 
from flask_bcrypt import Bcrypt
import yfinance as yf
from models import db, User, Notification, Watchlist

app = Flask(__name__)

# Configuration
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000", "http://localhost:5555",], 
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = 'api key'

GOOGLE_MAPS_API_KEY = 'api key'

bcrypt = Bcrypt(app)

migrate = Migrate(app, db)
db.init_app(app)

URL_PREFIX = '/api/v1'

def logged_in_user():
    return User.query.filter(User.id == session.get('user_id')).first()

def authorize():
    if not logged_in_user():
        return {'message': "No logged in user"}, 401

@app.route(URL_PREFIX +'/')
def index():
    return "Welcome to the Homepage!"

@app.get(URL_PREFIX +'/api/search-stock')
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

@app.get(URL_PREFIX +'/api/maps/config')
def get_maps_config():
    return jsonify({
        "apiKey": GOOGLE_MAPS_API_KEY
    })


@app.post(URL_PREFIX + '/login')
def login():
    data = request.json
    user = User.query.filter(User.username == data['username']).first()
    data['password']

    if user and bcrypt.check_password_hash(user.password_hash, data["password"]):
        session['user_id'] = user.id
        return user.to_dict(), 202

    else:
        return { "error": "Invalid username or password" }, 401
    

@app.delete(URL_PREFIX + '/logout')
def logout():
    session.pop('user_id')
    return {}, 204

@app.get(URL_PREFIX + '/check_session')
def check_session():
    print("---------SESSION----------------")
    print(session)
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter(User.id == user_id).first()
        return user.to_dict(), 200
    else:
        return {}, 401

@app.get(URL_PREFIX +'/notes')
def get_notification():
    return jsonify([note.to_dict() for note in Notification.query.all()]), 200

@app.post(URL_PREFIX +'/notes')
def create_notification():
    try:
        data = request.get_json()
        new_note = Notification(**data)
        db.session.add(new_note)
        db.session.commit()
        return jsonify(new_note.to_dict()), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 406
    
@app.get(URL_PREFIX +'/api/watchlist')
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


if __name__ == '__main__':
    app.run(port=5555, debug=True)