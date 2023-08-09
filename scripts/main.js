import {start} from "./karuta.js";
import {pause} from "./karuta.js";

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", start);
playStatusButton.addEventListener("click", pause);
document.addEventListener("keydown", (event) => {
    if (event.key == " ") pause();
});