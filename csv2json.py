import csv
import json

def convert (input):
    f      = open(input, 'r')
    reader = csv.DictReader(f)
    output = json.dumps([row for row in reader], indent = 4)
    f      = open('data.json', 'w')
    f.write(output)

file = 'CTA_-_System_Information_-_List_of__L__Stops.csv'
convert(file)
print 'JSON saved.'