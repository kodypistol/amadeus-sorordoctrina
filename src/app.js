import * as THREE from 'three';
import "./styles/styles.scss";

import router from './router';
import ui from './uiManager';
import scene from './scene';
import renderer from './renderer';
import experienceManager from "./experienceManager";


// Point d'entrée
router.init();
window.addEventListener("load", () => 
{
    ui.init();
    experienceManager.init();

    router.showScreen(1);

    setTimeout(() => {
        router.showScreen(2);
    }, 2000)

});

