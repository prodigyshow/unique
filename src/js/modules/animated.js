const dots = () => {

    function showSliderByTime(selector, time) {

        setTimeout(function() {
            document.querySelector(selector).style['margin-left'] = '-20%';
        }, time);
    }

    showSliderByTime('.header__slider s1', 3000);
 
}

export default dots;