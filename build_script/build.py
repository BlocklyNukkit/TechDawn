# -*- coding: UTF-8 -*-
import json
import os
import gzip
import sys
from shutil import copyfile

buildFile = open("./src/build.json", "r",encoding="utf-8")
buildConfig = json.load(buildFile)
buildFile.close()

out = "bnp"
for fileName in buildConfig["plugins"]:
    pluginFile = open(fileName,"r",encoding="utf-8")
    pluginContent = pluginFile.read()
    pluginFile.close()
    out += "-->$newPlugin@"
    out += os.path.split(fileName)[1]
    out += "#->:"
    out += pluginContent

if not os.path.exists("./out"):
    os.mkdir("./out")

if buildConfig["compress"]:
    outputFile = gzip.open("./out/"+buildConfig["name"]+".bnpx","wb")
    outputFile.write(out.encode(encoding="utf-8"))
    outputFile.close()
else:
    outputFile = open("./out/"+buildConfig["name"]+".bnp","w",encoding="utf-8")
    outputFile.write(out)
    outputFile.close()

if(len(sys.argv) >= 2):
    if(sys.argv[1].startswith("--copy:")):
        copyfile("./out/"+buildConfig["name"]+".bnpx", sys.argv[1].replace("--copy:","",1)+buildConfig["name"]+".bnpx")
