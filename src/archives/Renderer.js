import * as THREE from "three";
import bridgeLoop from "./BridgeLoop";
import gsap from "gsap";
import SceneBase from "./SceneBase";

class Renderer extends SceneBase{

    constructor() {
        super();
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
        })

        this.renderer.setSize(this.sizes.width, this.sizes.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.clock = new THREE.Clock()
        this.lastElapsedTime = 0
    }
}

/**
 * Animate
 */

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    if (started)
    {
        bridgeLoop(THREE, camera, scene, {rectangle1, rectangle2}, renderer, gsap, deltaTime)
    }

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()