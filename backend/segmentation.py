
import os
from flask import Response, json, jsonify
from mmsegmentation.mmseg.apis.inference import init_model, inference_model
from operations import color_mapper
import numpy as np

from config import MODEL_LIST, MMSEGMENTATION_DIR, RESOURCE_DIR, RESULT_DIR

segmentation_progress = {}

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
        return jsonify({'error': 'Resource not found'}), 404
    os.makedirs(save_path, exist_ok=True)
    
    
    
    # load model
    config_path = os.path.join(MMSEGMENTATION_DIR, 'configs', MODEL_LIST[modelId]["model"], MODEL_LIST[modelId]["config"])
    checkpoint_path = os.path.join(MMSEGMENTATION_DIR, 'checkpoints', MODEL_LIST[modelId]["model"], MODEL_LIST[modelId]["checkpoint"])
    model = init_model(config_path, checkpoint_path, device='cuda:0')
    
    
    
    # start segmentation
    images = [img for img in os.listdir(resource_path) if img.lower().endswith(('.jpg', '.jpeg'))]
    segmentation_progress[resourceId] = {"index": 0, "total": len(images)}

    for i, image_name in enumerate(images):
        image_path = os.path.join(resource_path, image_name)
        
        # perform segmentation
        raw_result = inference_model(model, image_path)
        result = raw_result.pred_sem_seg.data.cpu()[0]
        mask = color_mapper(result)
        save_name = save_path+"/"+image_name.split(".")[0]+'.npz'
        np.savez_compressed(save_name, tensor=mask)

        # update progress
        segmentation_progress[resourceId]["index"] = i + 1

    segmentation_progress[resourceId]["status"] = "done"

def segment_progress(resourceId):
    def generate():
        while True:
            progress = segmentation_progress.get(resourceId, {"error": "Not found"})
            yield f"data: {json.dumps(progress)}\n\n"
            if progress.get("status") == "done":
                break

    return Response(generate(), content_type="text/event-stream")