import * as THREE from 'three';
import "./styles/styles.scss";

// Point d'entrée
router.init();
window.addEventListener("load", () => 
{
    ui.init();
    //experience.init();

    router.showScreen(0);
});

// import './styles/styles.scss'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import startExperience from './Experience.js'
// import gsap from 'gsap'
// import bridgeLoop from "./BridgeLoop";

// /**
//  * Base
//  */
// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// // Scene
// const scene = new THREE.Scene()

// // texture loader
// const textureLoader = new THREE.TextureLoader();
// const brickTexture = textureLoader.load('./textures/color.jpg')
// const brickNormalTexture = textureLoader.load('./textures/normal.jpg')



// /**
//  * Sizes
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// const element = document.querySelector("button");

// element.addEventListener('click', () =>
// {
//     element.style.backgroundColor = 'white'
//     element.style.color = 'black'
//     element.style.opacity = 0

//     startExperience(THREE, camera, scene, {cube}, renderer, gsap, started)

//     started = true;

//     rectangle1.material.opacity = 1
//     rectangle2.material.opacity = 1

// })
// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 1
// camera.position.z = -3
// scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Cube
//  */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// scene.add(cube)

// /**
//  * Rectangle
//  */
// let started = false;

// const rectangle1 = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(2, 4, 10, 20, 20),
//     new THREE.MeshBasicMaterial({
//         map: brickTexture,
//         normalMap: brickNormalTexture,
//         transparent: true,
//         opacity: 0,
//         name: 'Bridge'
//     })
// )
// rectangle1.position.x = 0
// rectangle1.position.y = 0
// rectangle1.position.z = 0


// scene.add(rectangle1)

// Object.defineProperties(rectangle1, {
//     position: {
//         writable: true
//     }
// })

// const rectangle2 = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(2, 4, 10, 20, 20),
//     new THREE.MeshBasicMaterial({
//         map: brickTexture,
//         normalMap: brickNormalTexture,
//         transparent: true,
//         opacity: 0,
//         name: 'Bridge2'
//     })
// )
// rectangle2.position.x = 0
// rectangle2.position.y = 0
// rectangle2.position.z = 10


// scene.add(rectangle2)

// Object.defineProperties(rectangle2, {
//     position: {
//         writable: true
//     }
// })

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     antialias: true,
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// /**
//  * Animate
//  */
// const clock = new THREE.Clock()
// let lastElapsedTime = 0

// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//     const deltaTime = elapsedTime - lastElapsedTime
//     lastElapsedTime = elapsedTime

//     // Update controls
//     controls.update()

//     // Render
//     renderer.render(scene, camera)

//     if (started)
//     {
//         bridgeLoop(THREE, camera, scene, {rectangle1, rectangle2}, renderer, gsap, deltaTime)
//     }

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()
