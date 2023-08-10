const poems = document.getElementById("poems")
let poemContent = "";

for (let i = 1 ; i <= 100; i++) {
    // assign proper id string for file retrieval
    if (i < 10) var idStr = `00${i}`;
    else if (i < 100) var idStr = `0${i}`;
    else var idStr = "100";
    
    poemContent += `
    <div class="poem">
        
        <p class="poemHeader">Poem ${i}</p>

        <img class="poemImage" id="poemImage${i}" src="yomifuda/jpoem${i}.jpg">
        
        <div class="poemSubheader">
            <span>
                <p class="normalText" align="center">Kami no Ku</p>
                <audio controls id="poemAudio${i}A" class="poemAudioA" src="poems/I-${idStr}A.ogg"></audio>
            </span>

            <span>
                <p class="normalText" align="center">Shimo no Ku</p>
                <audio controls id="poemAudio${i}B" class="poemAudioB" src="poems/I-${idStr}B.ogg"></audio>
            </span>
        </div>
    </div>
    `
}

console.log(poemContent);
poems.innerHTML = poemContent;