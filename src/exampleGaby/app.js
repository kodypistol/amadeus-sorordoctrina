import * as THREE from 'three';
import "../styles/styles.scss";

import scene from './Scene';
import renderer from './renderer';

// Scene
scene.create("canvas.webgl");

// Texture loader
const textureLoader = new THREE.TextureLoader();
const brickTexture = textureLoader.load('./textures/color.jpg')
const brickNormalTexture = textureLoader.load('./textures/normal.jpg')

// Fill scene with objects
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)

scene.addObject(cube);

const rectangle1 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(2, 4, 10, 20, 20),
    new THREE.MeshBasicMaterial({
        map: brickTexture,
        normalMap: brickNormalTexture,
        transparent: true,
        opacity: 0,
        name: 'Bridge'
    })
);
rectangle1.position.x = 0
rectangle1.position.y = 0
rectangle1.position.z = 0

scene.addObject(rectangle1);

const rectangle2 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(2, 4, 10, 20, 20),
    new THREE.MeshBasicMaterial({
        map: brickTexture,
        normalMap: brickNormalTexture,
        transparent: true,
        opacity: 0,
        name: 'Bridge2'
    })
);
scene.addObject(rectangle2);

// Renderer
renderer.init(scene.getCanvas());

const clock = new THREE.Clock();
let lastElapsedTime = 0;

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    scene.getCamera().update();

    // Render
    renderer.draw(scene.getThreeScene(), 
    scene.getCamera().getThreeCamera());

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();