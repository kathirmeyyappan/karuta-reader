const audioPlayer = document.getElementById("poem");
const torifudaReference = document.getElementById("torifuda");
const yomifudaReference = document.getElementById("yomifuda");
const startButton = document.getElementById("startButton");
const playStatusButton = document.getElementById("playStatusButton");
const progress = document.getElementById("progress");

/**
 * Begins a new reading/game
 * @param {number[]} order - the order in which the poems are to be read
 */
export function start() {
    endReading()
    playStatusButton.hidden = false;
    playStatusButton.innerText = "⏸"
    progress.innerText = "Current: Joka (Opening Poem) - 0 of 100"
    const order = getRandomOrder();
    beginReadings(order);
}


/**
 * Starts reading of intro poem and adds a listener for the audio audioPlayer ending
 *  such that images are displayed and audio files are played in succession
 *  in accordance with the specified order.
 * @param {number[]} order - the order in which the poems are to be read
 */
function beginReadings(order) {    
    var i = 0;
    var section = 'A';
    audioPlayer.onended = () => {
        if (audioPlayer.src.endsWith("poems/I-000A.ogg")) {
            playPoem(0, 'B');
        }
        else if (audioPlayer.src.endsWith("poems/I-000B.ogg")) {
            var id = order[i];
            progress.innerText = `Random Poem - 1 of 100`
            playPoem(id, section);
        }
        else {
            if (i < 100) {    
                // play next poem or section
                if (section == 'A') {
                    section = 'B';
                } else if (section == 'B' && i < 99) {
                    section = 'A';
                    i++;
                }
                else {
                    endReading()
                }
                id = order[i];
                progress.innerText = `Random Poem - ${i + 1} of 100`
                playPoem(id, section);
            }
        }
    }
    // play initial poem to begin
    audioPlayer.src = `poems/I-000A.ogg`;
    audioPlayer.load();
    audioPlayer.play();
}


/**
 * Ends read by resetting all relevant elements
 */
function endReading() {
    playStatusButton.hidden = true;
    torifudaReference.src = "";
    yomifudaReference.src = "";
    audioPlayer.src = "";
    progress.innerText = "";
}


/**
 * Plays the relevant poem and shows the right image based on input parameters
 * @param {int} id - poem id (1-100)
 * @param {string} section - 'A' or 'B'; section of the poem for audio file
 */
function playPoem(id, section) {
    // assign proper id string for file retrieval
    if (id < 10) var idStr = `00${id}${section}`;
    else if (id < 100) var idStr = `0${id}${section}`;
    else var idStr = `100${section}`;
    
    // get correct file
    const poem = `poems/I-${idStr}.ogg`;
    const torifuda = `torifuda/fuda${id}.jpg`;
    const yomifuda = `yomifuda/jpoem${id}.jpg`;

    // adding image and audio to respective elements
    if (id > 0) {
        torifudaReference.src = torifuda;
        yomifudaReference.src = yomifuda;
    }
    audioPlayer.src = poem;

    // play audio
    audioPlayer.load();
    audioPlayer.play();
}


/**
 * Pauses reading for card replacement (press spacebar)
 */
export function pause() {
    if (torifudaReference.src == "") {
        return;
    }
    if (audioPlayer.paused) {
        audioPlayer.play();
        playStatusButton.innerText = "⏸";
        progress.innerText = progress.innerText.slice(0, -9)
    } else {
        audioPlayer.pause();
        playStatusButton.innerText = "⏵";
        progress.innerText = progress.innerText + " (paused)"
    }
}


/**
 * Randomizes order to read poems 1-100 used Fisher-Yates shuffle
 * @returns {number[]} array (1-100) of randomized order
 */
function getRandomOrder() {
    // create 1-100 array
    const order = Array.from({length : 100}, (val, key) => key + 1);

    // Fisher-Yates shuffle
    for (let i = 0; i < 100; i++) {
        const j = (i + Math.floor(Math.random() * (100 - i)));
        [order[i], order[j]] = [order[j], order[i]];
    }
    
    console.log(order)
    return order
}
