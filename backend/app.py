from flask import Flask, request, jsonify, send_file
from mmseg.apis import init_model, inference_model
from flask_cors import CORS
from io import BytesIO
import os
from PIL import Image
import numpy as np
import torch

from operations.data_preparation import color_mapper

app = Flask(__name__)
CORS(app)

# Load model once at startup
config_file = 'pspnet_r50-d8_4xb2-40k_cityscapes-512x1024.py'
checkpoint_file = 'pspnet_r50-d8_512x1024_40k_cityscapes_20200605_003338-2966598c.pth'
model = init_model(config_file, checkpoint_file, device='cuda:0')

IMAGE_DIR = 'resources/1_Data_Pic/IMAGE_OUTPUT'

@app.route('/list_images', methods=['GET'])
def list_images():
    try:
        images = os.listdir(IMAGE_DIR)
        return jsonify({'images': images})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/segment_image', methods=['GET'])
def segment_image():
    try:
        # # Get the image name and class ID from the request
        image_name = request.args.get('image_name')
        # Load the image from the server
        image_path = os.path.join(IMAGE_DIR, image_name).replace("\\", "/")
        if not os.path.exists(image_path):
            return jsonify({'error': 'Image not found'}), 404

        # # Perform segmentation
        raw_result = inference_model(model, image_path)
        result = raw_result.pred_sem_seg.data.cpu()[0]

        mask = color_mapper(result)


        npz_path = 'predictions/'+image_name.split(".")[0]+'.npz'
        np.savez_compressed(npz_path, tensor=mask)

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
