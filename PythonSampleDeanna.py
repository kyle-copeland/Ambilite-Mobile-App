###########################################################################################
#Sample File for Deanna communication
#This file does the following:
#	1. connect to database
#	2. grab random light from database
#	3. send information for Deanna to use
import pymongo
from pymongo import MongoClient
#1. connect to database
client = MongoClient('mongodb://copelandky:1llkillyou@ds045511.mongolab.com:45511/ambilite')
db = client.ambilite

#test function to get data from the database to send to a light
def execute():
	#	2. grab random light from database

	#id 0 - Purple, Full Brightness
	#id 1 - Red, Half Brightness
	#id 2 - Green, .7 Brightness
	#id 3 - Yellow, .3 Brightness
	# you may select an id between 0 - 3
	id = 2
	# get light
	light = db.lights.find_one({"id":id})
	print light['name']
	#	3. send information for Deanna to use
	sendLightInfo(light,['color','power','brightness'])

#!!!!!!!!!Deanna this is the function you would be implementing for the server!!!!!!!!!#
#Feel free to change this parameters and all. I thought this would be the most helpful way
#to give you the data. Please let me know if you think of something that gives you less
#of a headache.
#Params
#light -> light dictionary with all information about a light 
#changes -> array of strings of which fields to change i.e ['color','power']
def sendLightInfo(light,changes):
	print light['id']
	for field in changes: #so for each field we want to send do something 
		if field == 'color': # if its a color field there are three nested fields in that field
			for color in {'red','green','blue'}:
				print 'field[color]['+color+']: ' +str(light[field][color])
		elif field == 'power': #convert power from boolean to 1(True) - On 0(False) - Off
			if light[field]:
				light[field] = 1
			else:
				light[field] = 0
	
		print 'field['+field+']: '+ str(light[field])
if __name__ == "__main__":
	execute()
