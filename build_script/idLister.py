# -*- coding: UTF-8 -*-

idFile = open("./src/items/TechDawn_item.js", "r",encoding="utf-8")
content = idFile.read()
idFile.close()

idFile2 = open("./src/items/TechDawn_tool.js", "r", encoding="utf-8")
content += idFile2.read()
idFile2.close()

idFile3 = open("./src/items/TechDawn_machine.js", "r", encoding="utf-8")
content += idFile3.read()
idFile3.close()

ant = 0

for x in content.split("\n"):
    if x.startswith("new ItemInfo"):
        tokens = x.replace("new ItemInfo(","").replace('"',"").split(", ")
        ant+=1
        print("|"+tokens[0]+"|"+tokens[2]+"|"+tokens[3]+"|")

print(ant)