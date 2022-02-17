import * as THREE from 'three';
import gsap from "gsap";

import sceneManager from "../scene";
import renderer from "../renderer";
import Camera from '../Camera';
import experienceManager from "../experienceManager";

const bridgeScene = {
    init()
    {
        let clone1, clone2;

        experienceManager.directionalLight.intensity = 1;
        sceneManager.addObject(experienceManager.directionalLight);

        this.bridgeGroup1 = new THREE.Group();
        this.bridgeGroup1.add(experienceManager.objects.bridge);

        clone1 = experienceManager.objects.bridge.clone();
        clone1.position.z = -3.350;
        clone2 = experienceManager.objects.bridge.clone();
        clone2.position.z = -5.335;

        this.bridgeGroup1.add(clone1);
        this.bridgeGroup1.add(clone2);

        sceneManager.addObject(this.bridgeGroup1)

        this.bridgeGroup1.position.y = 0;

        this.bridgeGroup2 = this.bridgeGroup1.clone()
        this.bridgeGroup2.position.z = -5.955;
        sceneManager.addObject(this.bridgeGroup2)


    },

    startAnimation()
    {

        // gsap.to(this.rectangle1.material,
        //     {
        //         opacity: 1
        //     })
        // gsap.to(this.rectangle2.material,
        //     {
        //         opacity: 1
        //     })
    },
    addActBridgeObject()
    {

    },
    bridgeLoop()
    {
        console.log('s\'arrete t elle vraiment ?')
        this.bridgeGroup1.position.z = this.bridgeGroup1.position.z + 0.002
        this.bridgeGroup2.position.z = this.bridgeGroup2.position.z + 0.002

        if(this.bridgeGroup1.position.z > 5.520)
        {
            this.bridgeGroup1.position.z = -6.375
        }
        if (this.bridgeGroup2.position.z > 5.520)
        {
            this.bridgeGroup2.position.z = -6.390
        }
    }
}

export default bridgeScene;