import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class World {

    constructor() {
    }

}

export default World;

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(cube)
/**
 * Rectangle
 */
let started = false;

const rectangle1 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(2, 4, 10, 20, 20),
    new THREE.MeshBasicMaterial({
        map: brickTexture,
        transparent: true,
        opacity: 0,
        name: 'Bridge'
    })
)
rectangle1.position.x = 0
rectangle1.position.y = 0
rectangle1.position.z = 0


scene.add(rectangle1)

Object.defineProperties(rectangle1, {
    position: {
        writable: true
    }
})

const rectangle2 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(2, 4, 10, 20, 20),
    new THREE.MeshBasicMaterial({
        map: brickTexture,
        transparent: true,
        opacity: 0,
        name: 'Bridge2'
    })
)
rectangle2.position.x = 0
rectangle2.position.y = 0
rectangle2.position.z = 10


scene.add(rectangle2)

Object.defineProperties(rectangle2, {
    position: {
        writable: true
    }
})