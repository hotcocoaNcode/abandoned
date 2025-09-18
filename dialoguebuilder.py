file = input("Dialogue file to parse > ")
fileobj = open(file, "r")
actor = ""
finalstring = "["
for line in fileobj.readlines():
    if (line[len(line)-1] == "\n"):
        line = line[:len(line)-1]
    ctr=0
    for character in line:
        if character == " " and ctr < 4:
            ctr += 1
        else:
            break
    line = line[ctr:]
    if (ctr == 0):
        if (line[0] == "_"):
            if (line[:5] == "_wait"):
                finalstring += "[\"wait\"," + line[5:] +"], "
            elif (line[:9] == "_chartime"):
                finalstring += "[\"chartime\"," + line[9:] +"], "
            else:
                finalstring += "[\""+ line[1:] +"\"], "
        else:
            actor = line
    else:
        if (line[:12] == "JS_VARIABLE "):
            finalstring += "[\""+ actor +"\", "+ line[12:] +"], "
        else:
            finalstring += "[\""+ actor +"\", \""+ line +"\"], "
print("\n\n" + finalstring + "]")