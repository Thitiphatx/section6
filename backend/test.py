from flask import Flask, request, jsonify, send_file
from mmseg.apis import init_model, inference_model
from flask_cors import CORS
from io import BytesIO
import os
from PIL import Image
import numpy as np
import torch
from operations.data_preparation import color_mapper
import sys
IMAGE_DIR = '../resources'


# Load model once at startup
config_path = 'mmsegmentation/configs/pspnet/pspnet_r50-d8_4xb2-40k_cityscapes-512x1024.py'
checkpoint_path = 'mmsegmentation/checkpoints/pspnet/pspnet_r50-d8_512x1024_40k_cityscapes_20200605_003338-2966598c.pth'


model = init_model(config_path, checkpoint_path, device='cuda:0')
img = IMAGE_DIR+"/56a90a36-3e73-4e7e-b09a-3b213fdf7fce/img_000000.jpg"
result = inference_model(model, img)
print(result.seg_logits)