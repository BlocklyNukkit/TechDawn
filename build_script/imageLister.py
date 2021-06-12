# -*- coding: UTF-8 -*-
import json
import os

images = []
for root, dirs, files in os.walk("./image"):
    for each in files:
        images.append(each)

print("[")
for each in images:
    print("    '"+each+"',")
print("]")