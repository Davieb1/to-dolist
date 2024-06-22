from flask import Flask, render_template, request, jsonify
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/save', methods=['POST'])
def save_tasks():
    tasks = request.json
    filename = "todo_list.txt"
    
    with open(filename, 'a') as file:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        file.write(f"Tasks saved on {timestamp}:\n")
        for task in tasks:
            file.write(f"{task['task']} - {task['status']}\n")
        file.write("\n")
    
    return jsonify({"message": "Tasks have been saved."}), 200

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
