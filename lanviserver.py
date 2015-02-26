from flask import Flask,jsonify,request
import json
import os
import pymongo
from pymongo import MongoClient
client = MongoClient('mongodb://copelandky:1llkillyou@ds045511.mongolab.com:45511/ambilite')
db = client.ambilite

app = Flask(__name__, static_folder='www')

@app.route("/")
def index():
    return app.send_static_file('index.html')

# Populate all lights
@app.route("/api/getAllLights/<roomID>")
def getAllLights(roomID):
    lightSet = []
    lights = db.lights.find({"roomID": int(roomID)})
    for L in lights:
        L.pop("_id")
        lightSet.append(L)
    return jsonify(lights=lightSet)

# Returns one light
@app.route("/api/getLight/<lightID>")
def getLight(lightID):
    light = db.lights.find_one({"id": int(lightID)})
    light.pop("_id")
    return jsonify(light=light)

# Populates all the moods
@app.route("/api/getAllMoods/")
def getAllMoods():
    moodSet = []
    moods = db.moods.find()
    for M in moods:
        M.pop("_id")
        moodSet.append(M)
    return jsonify(moods=moodSet)

# Returns one mood
@app.route("/api/getMood/<moodID>")
def getMood(moodID):
    mood = db.moods.find_one({"id": int(moodID)})
    mood.pop("_id")
    return jsonify(mood=mood)

# Populate all Rooms based on power
@app.route("/api/getRooms/")
def getAllRooms():
    roomSet = []
    rooms = db.rooms.find()      
    powerOn = db.lights.find({"power": True})
    for R in rooms:
        R['power'] = False
        for P in powerOn:
            if (R['id'] == P['roomID']):
                R['power'] = True
        R.pop("_id")
        roomSet.append(R)
    #print roomSet
    return jsonify(rooms=roomSet)

# Update ONE light's info
@app.route("/api/saveLight/<lightID>", methods = ['POST'])
def postLight(lightID):
    L = request.form['light']
    db.lights.update({'id': L['id']}, L, True)

# Update ONE mood's info
@app.route("/api/saveMood/<moodID>", methods = ['POST'])
def postMood(moodID):
    M = request.form['mood']
    db.moods.update({'id': M['id']}, M, True)

# Update ONE room's power
@app.route("/api/rooms/switchPower/<roomID>", methods = ['POST'])
def postPower(roomID):
    P = request.get_json().get('power')
    lightsInRoom = db.lights.find({"roomID": int(roomID)})
    for L in lightsInRoom:
        L['power'] = P
        db.lights.update({'id': L['id']}, L, True)
    return jsonify(status='202 Accepted')

if __name__ == "__main__":
    print("*  server start...........")
    print("*  client loaded..........")
    app.run()
