
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv('DATABASE_URL')


def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn


@app.route('/get-items', methods=['GET'])
def get_items():
    return 'GET items', 200


@app.route('/update-items', methods=['POST'])
def update_items():
    return 'POST update items', 200


@app.route('/delete-item', methods=['DELETE'])
def delete_item():
    return 'DELETE item', 200


@app.before_request
def log_api_hit():
    conn = get_db_connection()
    cursor = conn.cursor()
    request_id = request.path.strip('/')
    request_type = request.method
    request_time = request.date
    payload = request.get_json() or {}
    content_type = request.headers.get('Content-Type', 'N/A')
    ip_address = request.remote_addr
    os = request.headers.get('Sec-CH-UA-Platform', 'Unknown')
    user_agent = request.headers.get('User-Agent', 'Unknown')

    cursor.execute(
        '''
        INSERT INTO api_hits (request_id, request_type, request_time, payload, content_type, ip_address, os, user_agent)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        ''',
        (request_id, request_type, request_time, payload,
         content_type, ip_address, os, user_agent)
    )
    conn.commit()
    cursor.close()
    conn.close()


@app.route('/api/hits', methods=['GET'])
def get_hits():
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('SELECT * FROM api_hits')
    hits = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(hits), 200


if __name__ == '__main__':
    app.run(port=3000)
