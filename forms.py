from django import forms

class paraphraseForm(forms.Form):
    paraphraseText = forms.CharField(label="Input text goes here ",widget=forms.Textarea(attrs={"class":"form-control pt-4 ps-2 input-container input-text shadow-none","id":"floatingTextarea2","style":"height: 100px"}),initial='')
