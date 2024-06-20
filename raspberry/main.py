import subprocess
import requests
import time

API_URL = ''

def get_cpu_temperature():
    result = subprocess.run(['/usr/bin/vcgencmd', 'measure_temp'], capture_output=True, text=True)
    temp_str = result.stdout.strip()
    temperature = float(temp_str.split('=')[1].split('\'')[0])
    return temperature

while True:
    temperature = get_cpu_temperature()
    data = {
        'temperatura': temperature,
        'lokalizacja': 'Wroclaw'
    }
    response = requests.post(API_URL, json=data)
    print(response.status_code, response.json())