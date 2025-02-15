from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from io import BytesIO
import os
from PIL import Image
import numpy as np
from segmentation import segment_start, segment_model_list, segment_progress

from config import RESOURCE_DIR


app = Flask(__name__)
CORS(app)

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://admin:admin@localhost:5432/section6")
DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+pg8000://")

app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


@app.route('/api/segmentation/list', methods=['GET'])
def list_model():
    return segment_model_list()

@app.route('/api/segmentation/start', methods=['POST'])
def segmentation_start():
    body_json = request.get_json()
    resourceId = body_json["resourceId"]
    modelId = body_json["modelId"]
    segment_start(resourceId, modelId)

    return jsonify({'result': "started", "resourceId": resourceId})

@app.route('/api/segmentation/progress/<resourceId>', methods=['GET'])
def process(resourceId):
    return segment_progress(resourceId)

@app.route('/test', methods=['GET'])
def test():
    print(db.engine.connect())

# @app.route('/get_segment', methods=['GET'])
# def get_segment():
#     loaded_data = np.load('predictions/np-test-save.npz')
        
#     # # Convert the mask to an image
#     mask_image = Image.fromarray(loaded_data['tensor'])
    
#     # mask_image = Image.open(image_path)
#     resolutions = {
#         720: (1440, 720),
#         1080: (2160, 1080)
#     }
#     mask_image = mask_image.resize(resolutions[720])
    
#     # Send the image back as a response
#     buffer = BytesIO()
#     mask_image.save(buffer, format="JPEG")
#     buffer.seek(0)

#     return send_file(buffer, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)
