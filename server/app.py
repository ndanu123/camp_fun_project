# app.py
from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from models import db, Camper, Activity, Signup

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
migrate=Migrate(app, db)
CORS(app)

# Routes
# GET /campers
@app.route('/campers', methods=['GET'])
def get_campers():
    campers = Camper.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'age': c.age} for c in campers])

# POST /campers
@app.route('/campers', methods=['POST'])
def add_camper():
    data = request.json
    camper = Camper(name=data['name'], age=data['age'])
    db.session.add(camper)
    db.session.commit()
    return jsonify({'id': camper.id, 'name': camper.name, 'age': camper.age}), 201

# GET /activities
@app.route('/activities', methods=['GET'])
def get_activities():
    activities = Activity.query.all()
    return jsonify([{'id': a.id, 'name': a.name, 'difficulty': a.difficulty} for a in activities])

# POST /signups
@app.route('/signups', methods=['POST'])
def add_signup():
    data = request.json
    signup = Signup(camper_id=data['camper_id'], activity_id=data['activity_id'], time=data['time'])
    db.session.add(signup)
    db.session.commit()
    return jsonify({'id': signup.id}), 201

# DELETE /activities/<id>
@app.route('/activities/<int:id>', methods=['DELETE'])
def delete_activity(id):
    activity = Activity.query.get_or_404(id)
    db.session.delete(activity)
    db.session.commit()
    return jsonify({'message': 'Activity has been deleted'}), 204

if __name__ == '__main__':
    app.run(port=5555, debug=True)
