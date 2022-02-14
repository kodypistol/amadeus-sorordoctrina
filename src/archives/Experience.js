const startExperience = (THREE, camera, scene, objects, renderer, gsap) =>
{


    const fog = new THREE.Fog('#000000', 1, 8)
    scene.fog = fog

    gsap.to(objects.cube.position, {
        x: 5
    })

    gsap.to(camera.position, {
        x: 0.028,
        y: 2.915,
        z: -5.481
    })

    gsap.to(camera.rotation, {
        x: -2.698,
        y: -0.008,
        z: -3.138
    })


}

export default startExperience;
