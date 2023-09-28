#!/usr/bin/env python3

from app import db, User, Notification, Watchlist, Stock
from datetime import datetime

# Create some users
user1 = User(username='user1')
user2 = User(username='user2')

# Create some stocks
stock1 = Stock(symbol='AAPL', name='Apple Inc.')
stock2 = Stock(symbol='GOOGL', name='Alphabet Inc.')
stock3 = Stock(symbol='AMZN', name='Amazon.com Inc.')

# Create some watchlists
watchlist1 = Watchlist(name='Tech Stocks', user=user1)
watchlist2 = Watchlist(name='E-commerce Stocks', user=user2)

# Add stocks to watchlists
watchlist1.stocks.append(stock1)
watchlist1.stocks.append(stock2)
watchlist2.stocks.append(stock3)

# Create some notifications
notification1 = Notification(content='AAPL has reached your target price!', user=user1)
notification2 = Notification(content='AMZN has reached your target price!', user=user2)

# Add objects to session
db.session.add(user1)
db.session.add(user2)
db.session.add(stock1)
db.session.add(stock2)
db.session.add(stock3)
db.session.add(watchlist1)
db.session.add(watchlist2)
db.session.add(notification1)
db.session.add(notification2)

# Commit the changes
db.session.commit()

print("Database seeded!")
