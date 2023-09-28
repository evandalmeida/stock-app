from datetime import datetime
from sqlalchemy import MetaData
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

 
db = SQLAlchemy(metadata=metadata)



# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    # Additional User fields go here

    # Relationships
    # Many-to-One: A user can have multiple notifications
    notifications = db.relationship('Notification', backref='user', lazy=True)

    # Many-to-One: A user can have multiple watchlists
    watchlists = db.relationship('Watchlist', backref='user', lazy=True)


# Notification Model
class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Many-to-One: Each notification is associated with one user
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)


# Watchlist Model
class Watchlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    # Many-to-One: Each watchlist is associated with one user
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # Many-to-Many: A watchlist can contain multiple stocks and a stock can be part of multiple watchlists
    stocks = db.relationship('Stock', secondary='watchlist_stock', backref='watchlists', lazy=True)


# Stock Model
class Stock(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)


# Watchlist_Stock Join Table
# Facilitates the Many-to-Many relationship between Watchlist and Stock
watchlist_stock = db.Table('watchlist_stock',
    db.Column('watchlist_id', db.Integer, db.ForeignKey('watchlist.id'), primary_key=True),
    db.Column('stock_id', db.Integer, db.ForeignKey('stock.id'), primary_key=True)
)