const dots = () => { 

    function showSliderByTime(selector, time) {

        const sliderArray = selector.map(item => document.getElementById(item));
        const tempArray = [];

        const generator = function* (array) {
            let i = 0;
            let length = array.length;
            while(true) {
                yield array[i];
                i++;
                if (i === length) i = 0;
            }
        }

        const delayLoop = (delay) => {
            return (x, i) => {
                setTimeout( () => {
                        if (x.hasAttribute('checked')) {
                            x.removeAttribute('checked');
                        } else {
                            x.setAttribute('checked', '');
                            setTimeout( () => {
                                x.removeAttribute('checked');
                            },2999);
                        }
                }, i * delay);
            };
        };

        const slider = generator(sliderArray);
        for (let i = 0; i < 10; i++) {
            tempArray.push(slider.next());
        }

        const slide = tempArray.map(item => (item.value));

        slide.forEach(delayLoop(time));
        console.log(slide);
        
    }

    showSliderByTime(['r1', 'r2', 'r3'], 5000);
 
}

export default dots;