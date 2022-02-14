import gsap from 'gsap';
import ui from './ui';

const experience = {
    init() {
        signal.on('goto', this.goto);
    },
    goto (chapterIndex) {
        this.camera.position.x = 10 * chapterIndex;
    }
}

export default experience;