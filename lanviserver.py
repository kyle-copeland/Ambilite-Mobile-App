from flask import Flask,jsonify,request
import pymongo
import os
import serverToArduino
import datetime
import threading
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
    lights = db.lights.find() if int(roomID) == -1 else db.lights.find({"roomID": int(roomID)})
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
    lightSet = []
    rooms = db.rooms.find()     

    powerOn = db.lights.find({"power": True})
    for L in powerOn:
            lightSet.append(L)
    for R in rooms:
            R['power'] = False
            for L in lightSet:
                    if (R['id'] == L['roomID']):
                            R['power'] = True
            R.pop("_id")
            roomSet.append(R)
    return jsonify(rooms=roomSet)

# Update ONE light's info
@app.route("/api/saveLight/", methods = ['POST'])
def postLight():
    L = request.get_json().get('light')
    oldL = db.lights.find_one({'id':L['id']})
    changes = calcChanges(L,oldL)
    print changes
    db.lights.update({'id': L['id']}, L, True)
    serverToArduino.sendRoomInfo([{"light":L,"changes":changes}],arduino[L['roomID']])
    return jsonify(status='202 Accepted')

# Update ONE mood's info
@app.route("/api/saveMood/", methods = ['POST'])
def postMood():
    M = request.get_json().get('mood')
    db.moods.update({'id': M['id']}, M, True)
    return jsonify(status='202 Accepted')
	
@app.route("/api/activateMood/<roomID>/<moodID>", methods = ['POST'])
def activateMood(roomID,moodID):
    lights = db.lights.find() if int(roomID) == -1 else db.lights.find({'roomID':int(roomID)})
    mood = db.moods.find_one({'id':int(moodID)})['lights']
    rooms = [[],[]]
    for l in range(0,lights.count()):
        moodLight = mood[l % len(mood)]
        moodLight['power'] = True
        moodLight['brightness'] = int(moodLight['brightness'])
        temp = lights[l]
        changes = calcChanges(moodLight,temp)
        print changes
        for change in changes:
                temp[change] = moodLight[change]
        db.lights.update({'id':temp['id']},temp,True)
        rooms[temp['roomID']].append({"light":temp,"changes":changes})
    print rooms
    for id in range(0, len(rooms)):
        serverToArduino.sendRoomInfo(rooms[id], arduino[id])
    return jsonify(status='202 Accepted')

@app.route("/api/removeMood/<moodID>", methods = ['POST'])
def deleteMood(moodID):
    db.moods.remove({'id':int(moodID)})
    return jsonify(status='202 Accepted')

# Update ONE room's power
@app.route("/api/rooms/switchPower/<roomID>", methods = ['POST'])
def postPower(roomID):
    P = request.get_json().get('power')

    print datetime.datetime.now()
    lightsInRoom = db.lights.find({"roomID": int(roomID)})
    rooms = [[],[]]
        
    for L in lightsInRoom:
        L['power'] = P
        db.lights.update({'id': L['id']}, L, True)
        rooms[L['roomID']].append({"light":L,"changes":['power']})
    for id in range(0,len(rooms)):
        serverToArduino.sendRoomInfo(rooms[id],arduino[id])
    return jsonify(status='202 Accepted')

	
def calcChanges(old,new):
    changes = ['color','brightness','power']
    for change in ['color','brightness','power']:
            if old[change] == new[change]:
                    changes.remove(change)
    return changes
	
def initLights():
    lights = db.lights.find()
    rooms = [[],[]]
    for L in lights:
        rooms[L['roomID']].append({"light":L,"changes":['color','brightness','power']})
    for id in range(0,len(rooms)):
        serverToArduino.sendRoomInfo(rooms[id], arduino[id])

def checkTime():
    now = datetime.datetime.now()
    
    moods = db.moods.find({"time.timeSet": True})
    for m in moods:
        hr = int(m['time']['hour'])
        mint = int(m['time']['minute'])     
        if hr == now.hour and mint == now.minute:
            roomID = m['time']['roomID']
            moodID = m['id']
            rooms = [[],[]]
            mood = db.moods.find_one({'id':int(moodID)})['lights']
            lights = db.lights.find() if int(roomID) == -1 else db.lights.find({'roomID':int(roomID)})
            for l in range(0,lights.count()):
                moodLight = mood[l % len(mood)]
                moodLight['power'] = True
                moodLight['brightness'] = int(moodLight['brightness'])
                temp = lights[l]
                changes = calcChanges(moodLight,temp)
                print changes
                for change in changes:
                        temp[change] = moodLight[change]
                db.lights.update({'id':temp['id']},temp,True)
                rooms[temp['roomID']].append({"light":temp,"changes":changes})
            print rooms
            for id in range(0, len(rooms)):
                serverToArduino.sendRoomInfo(rooms[id], arduino[id])
    threading.Timer(15.0, checkTime).start()


if __name__ == "__main__":
    print("*  server start...........")
    print("*  client loaded..........")
    port = int(os.environ.get("PORT", 5000))
    arduino = serverToArduino.arduinoInit()
    initLights()
    checkTime()
    app.run(host='0.0.0.0', port=port)
	

