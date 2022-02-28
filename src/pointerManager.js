import experienceManager from "./experienceManager";
import router from "./router";

const pointerManager = {
    init(){
        let startX = 1.257
        let startY = 0;

        window.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX / (e.touches[0].clientX - 0.5)
            startY = e.touches[0].clientY / (e.touches[0].clientY - 0.5)
        });

        window.addEventListener('touchmove',(e) => {

            console.log(experienceManager.objects.statue)

            let distanceX = e.touches[0].clientX - startX;
            let distanceY = e.touches[0].clientY - startY;

            switch (router.getCurrentScene()){
                case 1:
                    console.log('statue')
                    experienceManager.objects.statue.rotation.y =  (distanceX * (Math.PI * 0.0002)) + 1;
                    experienceManager.objects.statue.rotation.z =  distanceY * (Math.PI * 0.0002);
                    break;
                case 4:
                    console.log('statue')
                    experienceManager.objects.statue.rotation.y =  (distanceX * (Math.PI * 0.0002)) + 1;
                    experienceManager.objects.statue.rotation.z =  distanceY * (Math.PI * 0.0002);
                    break;
                case 5:
                    console.log('clavecin')
                    experienceManager.objects.harpsichord.rotation.y =  (distanceX * (Math.PI * 0.0002)) + 1;
                    experienceManager.objects.harpsichord.rotation.z =  distanceY * (Math.PI * 0.0002);
                    break;
                case 6:
                    console.log('parchemin')
                    experienceManager.objects.parchemin.rotation.y =  (distanceX * (Math.PI * 0.0002)) + 1;
                    experienceManager.objects.parchemin.rotation.z =  distanceY * (Math.PI * 0.0002);
                    break;
                case 7:
                    console.log('bouteille')
                    experienceManager.objects.flask.rotation.y =  (distanceX * (Math.PI * 0.0002)) + 1;
                    experienceManager.objects.flask.rotation.z =  distanceY * (Math.PI * 0.0002);
                    break;
                default:
                    console.log('marche pas')
                    console.log(router.getCurrentScene())
                    break;
            }
        });
    }
}

export default pointerManager;

