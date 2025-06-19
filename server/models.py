from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Camper(db.Model):
    __tablename__ = 'campers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    signups = db.relationship('Signup', backref='camper', cascade='all, delete')

class Activity(db.Model):
    __tablename__ = 'activities'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    difficulty = db.Column(db.Integer)
    signups = db.relationship('Signup', backref='activity', cascade='all, delete')

class Signup(db.Model):
    __tablename__ = 'signups'
    
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String, nullable=False)
    camper_id = db.Column(db.Integer, db.ForeignKey('campers.id'), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey('activities.id'), nullable=False)