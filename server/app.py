from flask import Flask, request, jsonify, session
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin 
from flask_bcrypt import Bcrypt
import yfinance as yf
from models import db, User, Notification, Watchlist, Stock
from models import bcrypt 



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
app.secret_key = 'f9cf27c663bc31db958e7e7d2a994daa'

GOOGLE_MAPS_API_KEY = 'AIzaSyB0APrXR-YPQa-0BAj8YwFvPT8r0C-jzxE'


bcrypt = Bcrypt(app)

migrate = Migrate(app, db)
db.init_app(app)

def logged_in_user():
    return User.query.filter(User.id == session.get('user_id')).first()

def authorize():
    if not logged_in_user():
        return {'message': "No logged in user"}, 401

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

@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.json
        hashed_pw = bcrypt.generate_password_hash(data["password"].encode('utf-8'), 10)
        
        # Creating the new user
        new_user = User.create(username=data['username'], hashed_password=hashed_pw)
        
        # Committing the user to the database
        db.session.commit()

        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    except Exception as e:
        print(e)  # Log the error for debugging
        db.session.rollback()
        return {'error': str(e)}, 500

    
    


@app.route('/api/add-to-watchlist', methods=['POST'])
def add_to_watchlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.json
    stock_symbol = data.get('stock', {}).get('symbol')

    if not stock_symbol:
        return jsonify({'error': 'Stock symbol is required'}), 400

    # Fetch stock details using yfinance
    ticker = yf.Ticker(stock_symbol)
    stock_info = ticker.info

    if not stock_info:
        return jsonify({'error': 'Could not fetch stock details'}), 500

    # Check if the stock already exists in the database
    stock = Stock.query.filter_by(symbol=stock_symbol).first()
    if not stock:
        # If not, create a new stock entry with detailed information
        stock = Stock(
            symbol=stock_info.get('symbol', ''),
            name=stock_info.get('longName', ''),
            price=stock_info.get('currentPrice', ''),
            fiftyTwoWeekHigh=stock_info.get('fiftyTwoWeekHigh', None),
            fiftyTwoWeekLow=stock_info.get('fiftyTwoWeekLow', None),
            marketCap=stock_info.get('marketCap', None),
            volume=stock_info.get('volume', None),
            dividendRate=stock_info.get('dividendRate', None),
            dividendYield=stock_info.get('dividendYield', None),
            trailingPE=stock_info.get('trailingPE', None),
            forwardPE=stock_info.get('forwardPE', None)
        )
        db.session.add(stock)

    # Check if the user has a watchlist
    watchlist = Watchlist.query.filter_by(user_id=user_id).first()
    if not watchlist:
        watchlist = Watchlist(user_id=user_id, name="My Watchlist")
        db.session.add(watchlist)

    # Check if the stock is already in the user's watchlist
    if stock in watchlist.stocks:
        return jsonify({'message': 'Stock already in watchlist'}), 200

    # Add the stock to the user's watchlist
    watchlist.stocks.append(stock)
    db.session.commit()

    return jsonify({'message': 'Stock added to watchlist!'}), 201



@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()
    
    if user and bcrypt.check_password_hash(user.password_hash.encode('utf-8'), data["password"].encode('utf-8')):
        session['user_id'] = user.id
        return jsonify(user.to_dict())
    else:
        return jsonify(message="Invalid username or password"), 401





@app.delete('/logout')
def logout():
    session.pop('user_id')
    return {}, 204

@app.get('/check_session')
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter(User.id == user_id).first()
        return user.to_dict(), 200
    else:
        return {}, 401

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
    if not watchlist:
        return jsonify([])

    detailed_stocks = []
    for stock in watchlist.stocks:
        ticker = yf.Ticker(stock.symbol)
        stock_info = ticker.info
        detailed_stocks.append({
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

    return jsonify(detailed_stocks)


@app.route('/api/remove-from-watchlist', methods=['POST'])
def remove_from_watchlist():
    user_id = session.get('user_id')
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.json
    stock_symbol = data.get('stock', {}).get('symbol')

    if not stock_symbol:
        return jsonify({'error': 'Stock symbol is required'}), 400

    stock = Stock.query.filter_by(symbol=stock_symbol).first()
    if not stock:
        return jsonify({'message': 'Stock not found'}), 404

    watchlist = Watchlist.query.filter_by(user_id=user_id).first()
    if not watchlist:
        return jsonify({'message': 'Watchlist not found'}), 404

    if stock not in watchlist.stocks:
        return jsonify({'message': 'Stock not in watchlist'}), 200

    # Remove the stock from the watchlist
    watchlist.stocks.remove(stock)
    db.session.commit()

    return jsonify({'message': 'Stock removed from watchlist!'}), 201


if __name__ == '__main__':
    app.run(port=5555, debug=True)
    