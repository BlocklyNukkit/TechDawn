#coding=utf-8
import json
import os
import base64
import codecs

itemContent = ''
toolContent = ''
output = []

idFile = open("./src/items/TechDawn_item.js", "r", encoding="utf-8")
itemContent += idFile.read()
idFile.close()

idFile2 = open("./src/items/TechDawn_tool.js", "r", encoding="utf-8")
toolContent += idFile2.read()
idFile2.close()

idFile3 = open("./src/items/TechDawn_machine.js", "r", encoding="utf-8")
itemContent += idFile3.read()
idFile3.close()

ant = 0

for x in itemContent.split("\n"):
    if x.startswith("new ItemInfo"):
        tokens = x.replace("new ItemInfo(","").replace('"',"").replace(")", "").split(", ")
        print(tokens)
        ant+=1

        picName = os.path.basename(tokens[4])
        smIcon = ''
        lgIcon = ''
        with open("./32x/"+picName, "rb") as tf:
            smIcon = base64.b64encode(tf.read())
        with open("./128x/"+picName, "rb") as tf:
            lgIcon = base64.b64encode(tf.read())

        tmp = {
            'name': tokens[3],
            'englishName': tokens[2],
            'registerName': 'blocklynukkit:'+tokens[1],
            'CreativeTabName': '自然',
            "type": "Item",
            "maxDurability": 1,
            'maxStackSize': int(tokens[5]),
            'smallIcon': str(smIcon).replace('b\'', '').replace("'", ''),
            'largeIcon': str(lgIcon).replace('b\'', '').replace("'", '')
        }
        output.append(tmp)

for x in toolContent.split("\n"):
    if x.startswith("new ToolInfo"):
        tokens = x.replace("new ToolInfo(","").replace('"',"").replace(")", "").split(", ")
        print(tokens)
        ant+=1

        picName = os.path.basename(tokens[4])
        smIcon = ''
        lgIcon = ''
        with open("./32x/"+picName, "rb") as tf:
            smIcon = base64.b64encode(tf.read())
        with open("./128x/"+picName, "rb") as tf:
            lgIcon = base64.b64encode(tf.read())

        tmp = {
            'name': tokens[3],
            'englishName': tokens[2],
            'registerName': 'blocklynukkit:'+tokens[1],
            'CreativeTabName': '工具',
            "type": "Item",
            "maxDurability": int(tokens[7]),
            'maxStackSize': 1,
            'smallIcon': str(smIcon).replace('b\'', '').replace("'", ''),
            'largeIcon': str(lgIcon).replace('b\'', '').replace("'", '')
        }
        output.append(tmp)


with open('./out/techdawn_items.json', 'w+', encoding="utf-8") as tf:
    itemsjson = ''
    for each in output:
        itemsjson += (json.dumps(each, ensure_ascii=False) + '\n')
    tf.write(itemsjson)
print(ant, "finished")