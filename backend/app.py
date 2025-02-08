from flask import Flask, request, jsonify, send_file
from mmseg.apis import init_model, inference_model
from flask_cors import CORS
from io import BytesIO
import os
from PIL import Image
import numpy as np
from operations.data_preparation import color_mapper
from segmentation import segment_start, segment_model_list

from config import RESOURCE_DIR

app = Flask(__name__)
CORS(app)

@app.route('/api/segmentation/list', methods=['GET'])
def list_model():
    return segment_model_list()

@app.route('/api/segmentation/start', methods=['POST'])
def segmentation_start():
    body_json = request.get_json()
    resourceId = body_json["resourceId"]
    modelId = body_json["modelId"]

    segment_start(resourceId, modelId)
    return jsonify({
        'result': "success"
    })

@app.route('/api/backend/segment_image', methods=['GET'])
def segment_image():
    try:
        # # Get the image name and class ID from the request
        resource_id = request.args.get('resourceId')

        # Load the image from the server
        # resource_path = os.path.join(IMAGE_DIR, resource_id).replace("\\", "/")
        # save_path = os.path.join("..", "segmentation", resource_id, "compress").replace("\\", "/")

        # if not os.path.exists(resource_path):
        #     return jsonify({'error': 'Resource not found'}), 404

        # os.makedirs(save_path, exist_ok=True)
        results = {}

        for image_name in os.listdir(resource_path):
            image_path = os.path.join(resource_path, image_name)
            if not image_name.lower().endswith(('.jpg', '.jpeg')):
                continue
            raw_result = inference_model(model, image_path)
            result = raw_result.pred_sem_seg.data.cpu()[0]
            mask = color_mapper(result)


            save_name = save_path+"/"+image_name.split(".")[0]+'.npz'
            np.savez_compressed(save_name, tensor=mask)

        return jsonify({'status': 200}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/get_segment', methods=['GET'])
def get_segment():
    loaded_data = np.load('predictions/np-test-save.npz')
        
    # # Convert the mask to an image
    mask_image = Image.fromarray(loaded_data['tensor'])
    
    # mask_image = Image.open(image_path)
    resolutions = {
        720: (1440, 720),
        1080: (2160, 1080)
    }
    mask_image = mask_image.resize(resolutions[720])
    
    # Send the image back as a response
    buffer = BytesIO()
    mask_image.save(buffer, format="JPEG")
    buffer.seek(0)

    return send_file(buffer, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(debug=True)
