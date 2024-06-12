#converts a text file to a series of <p> tags

file_name = input("Enter file name: ")
if not ".txt" in file_name:
    file_name += ".txt"
with open(file_name, "r") as f:
    text = f.readlines()
for x in text:
    if x == "\n":
        print("<br>")
    else:
        print(f"<p>{x}</p>")