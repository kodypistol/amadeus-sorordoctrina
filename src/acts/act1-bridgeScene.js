import * as THREE from 'three';
import gsap from "gsap";

import sceneManager from "../scene";
import renderer from "../renderer";
import Camera from '../Camera';
import experienceManager from "../experienceManager";

const bridgeScene = {
    init()
    {
        const brickTexture = experienceManager.textures[0]
        const brickNormalTexture = experienceManager.textures[1]

        // Placing objects
        this.rectangle1 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(2, 4, 10, 20, 20),
            new THREE.MeshBasicMaterial({
                color: 'blue',
                // map: brickTexture,
                transparent: true,
                opacity: 0,
                name: 'Bridge'
            })
        );
        this.rectangle1.position.x = 0
        this.rectangle1.position.y = -3
        this.rectangle1.position.z = -6

        // this.rectangle1.rotation.y = - Math.PI / 5.25


        sceneManager.addObject(this.rectangle1);
        console.log('rectangel1')

        this.rectangle2 = new THREE.Mesh(
            new THREE.BoxBufferGeometry(2, 4, 10, 20, 20),
            new THREE.MeshBasicMaterial({
                color: 'yellow',
                // map: brickTexture,
                transparent: true,
                opacity: 0,
                name: 'Bridge2'
            })
        );
        this.rectangle2.position.x = 0
        this.rectangle2.position.y = -3
        this.rectangle2.position.z = -16

        // this.rectangle2.rotation.y = - Math.PI / 5.25

        sceneManager.addObject(this.rectangle2);
    },

    startAnimation()
    {

        gsap.to(this.rectangle1.material,
            {
                opacity: 1
            })
        gsap.to(this.rectangle2.material,
            {
                opacity: 1
            })
    },
    addAct1Object()
    {
        this.act1Object = new THREE.Mesh(
            new THREE.BoxBufferGeometry(1, 1, 1, 5, 5),
            new THREE.MeshStandardMaterial({
                color: 'green',
                name: 'Act1Object'
            })
        )
        this.act1Object.position.set(0, 0, -4)
        this.act1Object.rotation.set(0, Math.PI / 8 , 0)
        console.log(this.act1Object)
        sceneManager.addObject(this.act1Object)
    },
    bridgeLoop()
    {
        this.rectangle1.position.z = this.rectangle1.position.z + 0.1
        this.rectangle2.position.z = this.rectangle2.position.z + 0.1

        if(this.rectangle1.position.z > 4)
        {
            this.rectangle1.position.z = -16
        }
        if (this.rectangle2.position.z > 4)
        {
            this.rectangle2.position.z = -16
        }
    }
}

export default bridgeScene;