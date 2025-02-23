from flask import Flask, request, jsonify, send_file
from flask_cors import CORS

from io import BytesIO
from PIL import Image
import numpy as np
from segmentation import segment_start, segment_model_list, read_result

from config import RESOURCE_DIR


app = Flask(__name__)
CORS(app)

@app.route("/")
def test2():
    return "<div>h2</div>"

@app.route('/api/segmentation/list', methods=['GET'])
def list_model():
    return segment_model_list()

@app.route('/api/segmentation/start', methods=['GET'])
def segmentation_start():
    modelId = request.args.get('modelId')
    resourceId = request.args.get('resourceId')
    return segment_start(resourceId, modelId)

@app.route('/api/segmentation/test', methods=['GET'])
def segmentation_test():
    resourceId = request.args.get('resourceId')
    return read_result(resourceId)

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
