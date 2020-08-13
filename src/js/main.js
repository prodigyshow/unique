import dots from './modules/animated';
import color from './modules/color';
import scroll from './modules/scroll';

window.addEventListener('DOMContentLoaded', () => {
    dots();
    color('label');
    color('a');
    scroll('scroll');
});
