color1 = {"color":{"red":0,"blue":20,"green":30},"brightness":20,"power":True}
color2 = {"color":{"red":2,"blue":20,"green":30},"brightness":20,"power":True}


def calcChanges(old,new):
	changes = ['color','brightness','power']
	for change in ['color','brightness','power']:
		if old[change] == new[change]:
			print change
			changes.remove(change)
	print changes
	return changes
	
calcChanges(color1,color2)