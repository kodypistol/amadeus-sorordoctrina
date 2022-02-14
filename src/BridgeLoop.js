const bridgeLoop = (THREE, camera, scene, objects, renderer, gsap, deltaTime) =>
{

    // gsap.to(objects.rectangle.position, {
    //     x: objects.rectangle.position + 0.0000001
    // })
    objects.rectangle1.position.z = objects.rectangle1.position.z - 0.01
    objects.rectangle2.position.z = objects.rectangle2.position.z - 0.01

    if(objects.rectangle1.position.z < -3.5)
    {
        objects.rectangle1.position.z = 10
    }
    if (objects.rectangle2.position.z < -3.5)
    {
        objects.rectangle2.position.z = 10
    }

}


export default bridgeLoop;