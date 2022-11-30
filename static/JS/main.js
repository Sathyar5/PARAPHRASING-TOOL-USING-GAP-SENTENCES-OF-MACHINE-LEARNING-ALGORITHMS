var inpText = document.querySelector('.input-text')
var submitInpBtn = document.querySelector('.paraphrase_btn')
var outputText = document.querySelector('.output-text')
var noOfSentence = document.querySelector('.no-of-sentence')
var words = document.querySelector(".words")
var sentence = document.querySelector('.sentence')
var wordsOut = document.querySelector('.words-out')
var copyBtn = document.querySelector('.copyBtn')


copyBtn.addEventListener('click',(e1)=>{
    var copyText =  outputText.innerHTML;
    try{
        document.addEventListener('copy', (e) => {
          e.clipboardData.setData('text/plain', copyText);
          e.preventDefault();
        }, true);
        
        if(!document.execCommand('copy')){
            alert("Text Copy Unsuccessful")
        }else{
            alert("Text Copied Successfully")
        }
    }catch(err){
        alert(err.message)
    }
})

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

inpText.addEventListener('keyup',(e) => {
    var inp = e.target.value.split(" ")
    words.innerHTML = inp.length-1
})
submitInpBtn.addEventListener('click',async(e)=>{
    e.preventDefault()
    if(!inpText.value || noOfSentence.value === "null"){
        alert("Check the inputs")
    }else{
        if (inpText.value.includes(".") && inpText.value[(inpText.value.indexOf("."))+5]){
            const res = await fetch("loki1/",{
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body : JSON.stringify({"text":inpText.value,"noOfSentence":noOfSentence.value})
            })
            const r = await res.json()
            console.log(r)
            outputText.innerHTML = ""
            r["res"].forEach((e,i) => {
                outputText.innerHTML += i+1 + "." + "&nbsp" + "&nbsp" + e + "<br>";
                // outputText.innerHTML += "LLO"
            })
        }else{
            const res = await fetch("loki/",{
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body : JSON.stringify({"text":inpText.value,"noOfSentence":noOfSentence.value})
            })
            const r = await res.json()
            outputText.innerHTML = ""
            console.log(r)
            r["res"].forEach((e,i) => {
                outputText.innerHTML += i+1 + "." + "&nbsp" + "&nbsp" + e + "<br>";
                // outputText.innerHTML += "LLO"
            })
        }
        if(outputText.innerHTML){
            wordsOut.innerHTML = outputText.innerHTML.split(" ").length-1
        }
    }

})