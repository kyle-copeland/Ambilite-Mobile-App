###########################################################################################
#Sample File for Deanna communication
#This file does the following:
#	1. connect to database
#	2. grab random light from database
#	3. send information for Deanna to use
import serial
import time
        
#Write data to the Arduino
def write(data,arduino):
		print data
		data = chr(data)
		print data
		arduino.write(data)

def writeNumberOfLights(num, arduino):
    write(num, arduino)

def sendRoomInfo(room, arduino):
    print "length: " + str(len(room))
    writeNumberOfLights(len(room), arduino)
    for light in room:
        print arduino
        sendLightInfo(light['light'], light['changes'], arduino)
#!!!!!!!!!Deanna this is the function you would be implementing for the server!!!!!!!!!#
#Feel free to change this parameters and all. I thought this would be the most helpful way
#to give you the data. Please let me know if you think of something that gives you less
#of a headache.
#Params
#light -> light dictionary with all information about a light 
#changes -> array of strings of which fields to change i.e ['color','power']
def sendLightInfo(light,changes,arduino):
        print 'id: ' + str(light['id'])
        write(light['id'],arduino)
        if 'color' in changes: # if its a color field there are three nested fields in that field
                write(1,arduino)
                for color in ['red','green','blue']:
                        write(light['color'][color],arduino)
                        print 'field[color]['+color+']: ' +str(light['color'][color])
        else:
                write(0,arduino)
                
        if 'brightness' in changes:
                write(1,arduino)
                write(light['brightness'],arduino)
                print 'field[brightness]: ' +str(light['brightness'])
        else:
                write(0,arduino)
                
        if 'power' in changes: #convert power from boolean to 1(True) - On 0(False) - Off
                write(1, arduino)
                if light['power'] :
                        light['power'] = 1
                else:
                        light['power'] = 0
                write(light['power'],arduino)
                print 'field[power]: '+ str(light['power'])
        else:
                write(0, arduino)

def arduinoInit():
        # Open connection to the serial port connected to the Arduino
        arduino = serial.Serial('COM5', 9600)
        arduino1 = serial.Serial('COM6',9600)
        # Give time for the Arduino to reset
        time.sleep(2)
        return [arduino, arduino1]
