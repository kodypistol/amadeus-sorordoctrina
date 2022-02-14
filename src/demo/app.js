import gsap from 'gsap';

import experience from "./experience";
import ui from "./ui";
import FloatingObject from "./FloatingObject";

// app.js
const app = {
    name: "Mozart",
    init() {
        this.clavecin = new FloatingObject('Clavecin');
        this.piano = new FloatingObject('Piano');

        document.querySelector('#start-experience').addEventListener('click', () => {
            signal.emit('goto', 2);
        })
    },
    onLoadComplete() {
        experience.init();
        ui.init();
        gsap.to(this.dom, {
            duration: 1,
            opacity: 1
        });
    }

};


// // soundManager.js --> Howler.js
// const soundManager = {

// }





