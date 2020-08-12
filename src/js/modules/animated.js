const dots = () => { 

    function showSliderByTime(selector, time) {

        let elements = document.querySelectorAll("label");
        const sliderArray = selector.map(item => document.getElementById(item));
        const tempArray = [];
        const tepmDot = [];

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
                            },4999);
                        }
                }, i * delay);
            };
        };

        const delayLoopDot = (delay) => {
            return (x, i) => {
                setTimeout( () => {
                        if (x.classList.contains('active')) {
                            x.classList.remove('active');
                        } else {
                            x.classList.add('active');
                            setTimeout( () => {
                                x.classList.remove('active');
                            },4999);
                        }
                }, i * delay);
            };
        };

        const dots = generator(elements);
        const slider = generator(sliderArray);

        for (let i = 0; i < 10; i++) {
            tempArray.push(slider.next());
            tepmDot.push(dots.next());
        }

        const slide = tempArray.map(item => (item.value));
        const dt = tepmDot.map(item => (item.value));

        slide.forEach(delayLoop(time));
        dt.forEach(delayLoopDot(time));
        
    }

    showSliderByTime(['r1', 'r2', 'r3'], 5000);
 
}

export default dots;