import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

username = os.getenv('DB_USERNAME')
password = os.getenv('DB_PASSWORD')
host = os.getenv('DB_HOST')
dbname = os.getenv('DB_NAME')

# Log environment variable values
logging.debug(f'DB_USERNAME: {username}')
logging.debug(f'DB_PASSWORD: {password}')
logging.debug(f'DB_HOST: {host}')
logging.debug(f'DB_NAME: {dbname}')

if not all([username, password, host, dbname]):
    logging.error('One or more database configuration variables are missing.')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{username}:{password}@{host}/{dbname}'
db = SQLAlchemy(app)

class Temperature(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    temperature = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(80), nullable=False)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

@app.route('/api/temperature', methods=['POST'])
def add_temperature():
    data = request.json
    new_temp = Temperature(
        temperature=data['temperature'],
        location=data['location']
    )
    db.session.add(new_temp)
    db.session.commit()
    return jsonify({"message": "Data added successfully!"}), 201

@app.route('/api/temperature', methods=['GET'])
def get_temperatures():
    temps = Temperature.query.all()
    return jsonify([{
        'id': t.id,
        'temperature': t.temperature,
        'location': t.location,
        'timestamp': t.timestamp
    } for t in temps])

@app.route('/api/temperature/<int:id>', methods=['PUT'])
def update_temperature(id):
    data = request.json
    temp = Temperature.query.get(id)
    if not temp:
        return jsonify({"message": "Record not found"}), 404

    temp.location = data['location']
    db.session.commit()
    return jsonify({"message": "Data updated successfully!"})

@app.route('/api/temperature/<int:id>', methods=['DELETE'])
def delete_temperature(id):
    temp = Temperature.query.get(id)
    if not temp:
        return jsonify({"message": "Record not found"}), 404

    db.session.delete(temp)
    db.session.commit()
    return jsonify({"message": "Data deleted successfully!"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
