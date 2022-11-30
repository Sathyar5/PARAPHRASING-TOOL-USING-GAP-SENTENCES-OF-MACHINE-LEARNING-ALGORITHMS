from django.http import HttpResponse,JsonResponse
import json
from django.shortcuts import redirect,render
from . import paraphraserTest as pt

def loki(req):
    return render(req,"index.html")


def loki2(req):
    data = json.load(req)
    text = data["text"]
    # text = "Justin Timberlake and Jessica Biel, welcome to parenthood."
    noOfSentence = int(data["noOfSentence"])
    print(data["text"])

    paraphrase = pt.get_response(text, noOfSentence, noOfSentence+1)

    return JsonResponse({"res":paraphrase})

def loki3(req):
    data = json.load(req)
    text = data["text"]
    # text = """Justin Timberlake and Jessica Biel, welcome to parenthood.The celebrity couple announced the arrival of their son, Silas Randall Timberlake,in statements to People. "Silas was the middle name of Timberlake's maternal grandfather Bill Bomar, who died in 2012,while Randall is the musician's own middle name, as well as his father's first,"People reports.The couple announced the pregnancy in January, with an Instagram post.It is the first baby for both."""
    noOfSentence = int(data["noOfSentence"])
    # print(data["text"])
    paraphrase = pt.paragraph(text, noOfSentence)
    
    return JsonResponse({"res":paraphrase})