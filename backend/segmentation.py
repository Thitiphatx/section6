
import os
from flask import Response, json, jsonify
import cv2
from mmsegmentation.mmseg.apis.inference import init_model, inference_model
from operations import color_mapper
import numpy as np

from config import MODEL_LIST, MMSEGMENTATION_DIR, RESOURCE_DIR, RESULT_DIR

def segment_model_list():
    return jsonify({
        'models': list(MODEL_LIST.keys())
    })

def segment_start(resourceId, modelId):

    # re-check again is all image available
    
    
    
    # load images
    resource_path = os.path.join(RESOURCE_DIR, resourceId).replace("\\", "/")
    save_path = os.path.join(RESULT_DIR, resourceId).replace("\\", "/")
    if not os.path.exists(resource_path):
        return jsonify({'error': "resource not found"}), 404
    os.makedirs(save_path, exist_ok=True)
    
    
    
    # load model
    config_path = os.path.join(MMSEGMENTATION_DIR, 'configs', MODEL_LIST[modelId]["model"], MODEL_LIST[modelId]["config"])
    checkpoint_path = os.path.join(MMSEGMENTATION_DIR, 'checkpoints', MODEL_LIST[modelId]["model"], MODEL_LIST[modelId]["checkpoint"])
    try:
        model = init_model(config_path, checkpoint_path, device='cuda:0')
    except:
        return jsonify({'error': 'Model not found'}), 404
    
    
    
    # start segmentation
    images = [img for img in os.listdir(resource_path) if img.lower().endswith(('.jpg', '.jpeg'))]
    
    all_unique_classes = set()

    # Generator to stream progress
    def start_segmentation():
        for i, image_name in enumerate(images):
            image_path = os.path.join(resource_path, image_name)
            
            # Perform segmentation
            raw_result = inference_model(model, image_path)
            result = raw_result.pred_sem_seg.data.cpu()[0]
            unique_class = np.unique(result.flatten())
            all_unique_classes.update(unique_class)
            mask = color_mapper(result)
            save_name = os.path.join(save_path, image_name.split(".")[0] + '.npz')
            np.savez_compressed(save_name, tensor=mask)
            print(unique_class)
            # Stream progress as SSE
            yield f"data: {{\"current_image\": \"{image_name}\", \"progress\": {round((i + 1) / len(images) * 100)}, \"unique_class\": {list(unique_class)}}}\n\n"
        
        # Final message indicating completion (optional)
        print(all_unique_classes)
        yield f"data: {{\"current_image\": \"Done\", \"progress\": 100, \"unique_class\": {list(all_unique_classes)}}}\n\n"

    # Return the SSE stream response
    return Response(start_segmentation(), content_type="text/event-stream")


def read_result(folderPath):
    save_path = os.path.join(RESULT_DIR, folderPath)
    npz_files = [f for f in os.listdir(save_path) if f.endswith('.npz')]
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter('output_video.mp4', fourcc, 30.0, (1920, 960))

    for npz_file in npz_files:
        # Load the current frame
        data = np.load(os.path.join(save_path, npz_file))
        frame = data['tensor']
        
        # Resize the frame to 1920x960 (or calculate dynamically)
        resized_frame = cv2.resize(frame, (1920, 960))

        # # Write the frame to the video
        out.write(resized_frame)

    # # Release video writer
    out.release()
    
    # Return the success response
    return jsonify({'error': 'success'})
