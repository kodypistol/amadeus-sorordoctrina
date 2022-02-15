import * as THREE from 'three';

const renderer = {
    init(canvas){
        this.canvas = canvas;

        this.threeRenderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
        });
        this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
        this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        window.addEventListener('resize', () =>
        {
            this.threeRenderer.setSize(window.innerWidth, window.innerHeight);
            this.threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        });
    },

    draw(scene){
        this.threeRenderer.render(scene.getThreeScene(), scene.getThreeCamera());
    }
}

export default renderer;