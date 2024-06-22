import subprocess
import requests
import time
import configparser

config = configparser.ConfigParser()
config.read('/home/pi/temperature_monitor/config.ini')
API_URL = config['DEFAULT']['API_URL']

def get_cpu_temperature():
    result = subprocess.run(['/usr/bin/vcgencmd', 'measure_temp'], capture_output=True, text=True)
    temp_str = result.stdout.strip()
    temperature = float(temp_str.split('=')[1].split('\'')[0])
    return temperature

while True:
    temperature = get_cpu_temperature()
    data = {
        'temperature': temperature,
        'location': 'Home'
    }
    try:
        response = requests.post(API_URL, json=data)
        print(response.status_code, response.json())
    except Exception as e:
        print(f"Error sending data: {e}")
    time.sleep(600)  # every 10 minutes
