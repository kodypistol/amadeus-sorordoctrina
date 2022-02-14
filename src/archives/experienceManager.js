import signal from "signal-js";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import bridgeLoop from "../BridgeLoop";
import Loader from '../Loader'

const experienceManager = {
    init(){



        Loader.createTextureLoader()



        const element = document.querySelector("button");

        element.addEventListener('click', () =>
        {
            element.style.backgroundColor = 'white'
            element.style.color = 'black'
            element.style.opacity = 0


            started = true;

            rectangle1.material.opacity = 1
            rectangle2.material.opacity = 1

        })


    }
};

export default experienceManager;