from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/list_images', methods=['GET'])
def list_images():
    return "<div>test</div>"

@app.route('/')
def home():
    return "<div>test</div>"

if __name__ == '__main__':
    app.run(debug=True)
