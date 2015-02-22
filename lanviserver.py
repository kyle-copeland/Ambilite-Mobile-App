from flask import Flask,jsonify,request
import json
import os
app = Flask(__name__,static_url_path='')

@app.route("/")
def index():
	return app.send_static_file('index.html')

@app.route("/api/getLights")
def getLights():
	return jsonify(lights={})
	
@app.route('/api/postLights', methods = ['POST'])
def postLights():
    # Get the parsed contents of the form data
    data = request.form['lights']
    # Render template
    return jsonify(lights=data)

if __name__ == "__main__":
    print("server start")
    app.run()