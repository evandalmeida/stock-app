from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    # TABLE #
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password_hash = db.Column(db.String, nullable=False)

    # RELATIONSHIPS #
    notifications = db.relationship('Notification', backref='user', lazy=True)
    watchlists = db.relationship('Watchlist', backref='user', lazy=True)

    # SERIALIZATION RULES
    serialize_rules = ("-password_hash",)  # Exclude 'password_hash' field




class Notification(db.Model, SerializerMixin):
    __tablename__ = 'notifications'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='notifications')

    # SERIALIZATION RULES
    serialize_rules = ("-user",)  # Exclude 'user' relationship

class Watchlist(db.Model, SerializerMixin):
    __tablename__ = 'watchlists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    stocks = db.relationship('Stock', secondary='watchlist_stock', backref='watchlists', lazy=True)

    # SERIALIZATION RULES
    serialize_rules = ("-user",)  # Exclude 'user' relationship

class Stock(db.Model, SerializerMixin):
    __tablename__ = 'stocks'
    id = db.Column(db.Integer, primary_key=True)
    symbol = db.Column(db.String(10), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)


watchlist_stock = db.Table('watchlist_stock',
    db.Column('watchlist_id', db.Integer, db.ForeignKey('watchlist.id'), primary_key=True),
    db.Column('stock_id', db.Integer, db.ForeignKey('stock.id'), primary_key=True)
)
