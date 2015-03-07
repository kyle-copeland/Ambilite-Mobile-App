###########################################################################################
#Sample File for Deanna communication
#This file does the following:
#	1. connect to database
#	2. grab random light from database
#	3. send information for Deanna to use
import serial
import time
import pymongo
from pymongo import MongoClient
#1. connect to database
client = MongoClient('mongodb://copelandky:1llkillyou@ds045511.mongolab.com:45511/ambilite')
db = client.ambilite

#test function to get data from the database to send to a light
def execute():
        #2. grab random light from database

        #id 0 - Purple, Full Brightness
        #id 1 - Red, Half Brightness
        #id 2 - Green, .7 Brightness
        #id 3 - Yellow, .3 Brightness
        # you may select an id between 0 - 3
        id = 0
        # get light
        light = db.lights.find_one({"id":id})
        print light['name']
        #	3. send information for Deanna to use
        sendLightInfo(light,['color','brightness','power'])
        
#Write data to the Arduino
def write(data):
        data = chr(data)
        arduino.write(data)

#!!!!!!!!!Deanna this is the function you would be implementing for the server!!!!!!!!!#
#Feel free to change this parameters and all. I thought this would be the most helpful way
#to give you the data. Please let me know if you think of something that gives you less
#of a headache.
#Params
#light -> light dictionary with all information about a light 
#changes -> array of strings of which fields to change i.e ['color','power']
def writeNumberOfLights(num):
	write(num,)
def sendLightInfo(light,changes):
        print light['id']
        write(light['id'])
        
        if 'color' in changes: # if its a color field there are three nested fields in that field
                write(1)
                for color in {'red','green','blue'}:
                        write(light['color'][color])
                        print 'field[color]['+color+']: ' +str(light['color'][color])
        else:
                write(0)
                
        if 'brightness' in changes:
                write(1)
                write(light['brightness'])
                print 'field[brightness]: ' +str(light['brightness'])
        else:
                write(0)
                
        if 'power' in changes: #convert power from boolean to 1(True) - On 0(False) - Off
                if light['power'] :
                        light['power'] = 1
                else:
                        light['power'] = 0
                write(light['power'])
                print 'field[power]: '+ str(light['power'])

if __name__ == "__main__":
        # Open connection to the serial port connected to the Arduino
        arduino = serial.Serial('COM7', 9600)

        # Give time for the Arduino to reset
        time.sleep(2)

        #send data to the controller
        execute()
