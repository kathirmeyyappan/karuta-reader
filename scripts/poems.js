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
        
        <p class="poemSubHeader">Kami no Ku</p>
        <audio controls id="poemAudio${i}" class="poemAudio" src="poems/I-${idStr}A.ogg"></audio>
        
        <p class="poemSubHeader">Shimo no Ku</p>
        <audio controls id="poemAudio${i}" class="poemAudio" src="poems/I-${idStr}B.ogg"></audio>

        <div>
            <img id="poemImage${i}" class="poemImage" src="torifuda/fuda${i}.jpg">
        </div>

    </div>
    `
}

console.log(poemContent);
poems.innerHTML = poemContent;