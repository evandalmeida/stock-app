#!/usr/bin/env python3

from flask import Flask, request, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import requests

from models import db, User, Notification, Watchlist, Stock, watchlist_stock

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

IEX_API_KEY = "pk_8f8ee267b6704587821b2411cfc46021"
IEX_ENDPOINT = f"https://cloud.iexapis.com/stable/stock/market/list/mostactive?token={IEX_API_KEY}"
GOOGLE_MAPS_API_KEY = "PUT_IN_YOUR_OWN_KEY"

migrate = Migrate(app, db)
db.init_app(app)

@app.route('/')
def index():
    response = requests.get(IEX_ENDPOINT)
    if response.status_code == 200:
        stocks = response.json()
        stocks_list = [f"{stock['symbol']} ({stock['companyName']}): ${stock['latestPrice']}" for stock in stocks]
        return '<br>'.join(stocks_list)
    else:
        return "Failed to fetch data from IEX Cloud", 500

@app.route('/api/most-active-stocks', methods=['GET'])
def most_active_stocks():
    response = requests.get(IEX_ENDPOINT)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch data from IEX Cloud"}), 500

@app.route('/api/maps/config', methods=['GET'])
def get_maps_config():
    return jsonify({
        "apiKey": GOOGLE_MAPS_API_KEY
    })

if __name__ == '__main__':
    app.run(debug=True)
