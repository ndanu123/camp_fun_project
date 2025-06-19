# seed.py
from app import app
from models import db, Camper, Activity, Signup

with app.app_context():
    print(" Clearing existing data...")
    db.drop_all()
    db.create_all()

    

    # Create Campers
    campers = [
        Camper(name="Lily", age=10),
        Camper(name="Chris", age=12),
        Camper(name="Noella", age=11)
    ]

    # Create Activities
    activities = [
        Activity(name="Canoeing", difficulty=2),
        Activity(name="Rock Climbing", difficulty=4),
        Activity(name="Archery", difficulty=3)
    ]

    # Add to session
    db.session.add_all(campers + activities)
    db.session.commit()

    # Create Signups
    signups = [
        Signup(time="10 AM", camper_id=campers[0].id, activity_id=activities[0].id),
        Signup(time="11 AM", camper_id=campers[1].id, activity_id=activities[2].id),
        Signup(time="2 PM", camper_id=campers[2].id, activity_id=activities[1].id)
    ]

    db.session.add_all(signups)
    db.session.commit()

    
