selectTag = document.querySelectorAll("select") ; 
translateButton = document.querySelector('button') ;
fromText = document.querySelector('.from-text') ; 
toText = document.querySelector('.to-text') ; 
icons = document.querySelectorAll('.icon i') ; 
exchangeButton = document.querySelector('.exchange') ; 
hindispeaker = document.querySelector('.fa-volume-high') ; 

selectTag.forEach((tag, id) => {
    console.log(tag, id);
    for(let language in languages) {
        let selected = id == 0 ? language == "en-GB" ? "selected" : "" : language == "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${language}">${languages[language]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
})

translateButton.addEventListener("click" , ()=>{
    fromLanguage = selectTag[0].value ; 
    toLanguage = selectTag[1].value ; 
    console.log(fromLanguage , toLanguage) ; 
    let text = fromText.value ; 
    if(!text){
        toText.value ; 
        toText.setAttribute("placeholder","");
        return ; 
    }
    toText.setAttribute("placeholder","Translating...") ; 
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLanguage}|${toLanguage}`; // to translate from 'fromLanguage' to 'toLanguage' 
    fetch(url).then(res => res.json()).then(data=>{
        console.log(data.responceData) ; 
        toText.value = data.responseData.translatedText ; 
    });
})

exchangeButton.addEventListener("click",()=>{
    let tempValue = fromText.value ; 
    fromText.value = toText.value ; 
    toText.value = tempValue ; 

    let tempLang = selectTag[0].value ; 
    selectTag[0].value = selectTag[1].value ;
    selectTag[1].value = tempLang ; 
});

const copyContent = (text) => {
    navigator.clipboard.writeText(text) ; 
}

const utterText = (text,language)=>{
    const synth = window.speechSynthesis ;
    console.log(text,language) ; 
    const utterance = new SpeechSynthesisUtterance(text) ; 
    utterance.lang = language ; 
    synth.speak(utterance) ; 
}

icons.forEach(icon => {
    icon.addEventListener("click" , ({target})=>{
        if(!fromText.value || !toText.value) return ;
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                copyContent(fromText.value) ; 
            }
            else{
                copyContent(toText.value) ; 
            }
        }
        else{
            if(target.id == "from"){
                utterText(fromText.value , selectTag[0].value) ; 
            }
            else{
                utterText(toText.value , selectTag[1].value) ; 
            }
        }
    })
})
