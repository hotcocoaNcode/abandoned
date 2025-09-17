file = input("Dialogue file to parse > ")
fileobj = open(file, "r")
actor = ""
finalstring = "["
for line in fileobj.readlines():
    if (line[len(line)-1] == "\n"):
        line = line[:len(line)-1]
    ctr=0
    for character in line:
        if character == " ":
            ctr += 1
        else:
            break
    line = line[ctr:]
    if (ctr == 0):
        if (line[0] == "_"):
            finalstring += "[\""+ line[1:] +"\"], "
        else:
            actor = line
    else:
        if (line[:12] == "JS_VARIABLE "):
            finalstring += "[\""+ actor +"\", "+ line[12:] +"], "
        else:
            finalstring += "[\""+ actor +"\", \""+ line +"\"], "
print(finalstring + "]")