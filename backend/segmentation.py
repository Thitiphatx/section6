
import os
from flask import jsonify
from mmsegmentation.mmseg.apis.inference import init_model, inference_model
from operations.data_preparation import color_mapper
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
        return jsonify({'error': 'Resource not found'}), 404
    os.makedirs(save_path, exist_ok=True)
    
    
    
    # load model
    config_path = os.path.join(MMSEGMENTATION_DIR, 'configs', MODEL_LIST[modelId]["model"], MODEL_LIST[modelId]["config"])
    checkpoint_path = os.path.join(MMSEGMENTATION_DIR, 'checkpoints', MODEL_LIST[modelId]["model"], MODEL_LIST[modelId]["checkpoint"])
    model = init_model(config_path, checkpoint_path, device='cuda:0')
    
    
    
    # start segmentation
    for image_name in os.listdir(resource_path):
        image_path = os.path.join(resource_path, image_name)
        if not image_name.lower().endswith(('.jpg', '.jpeg')):
            continue
        raw_result = inference_model(model, image_path)
        result = raw_result.pred_sem_seg.data.cpu()[0]
        mask = color_mapper(result)
        save_name = save_path+"/"+image_name.split(".")[0]+'.npz'
        np.savez_compressed(save_name, tensor=mask)



    # return result
    return jsonify({'status': 200}), 200

def 