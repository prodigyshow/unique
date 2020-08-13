const scroll = (className) => {

    const anchors = document.getElementsByClassName(className);

    for (let value of anchors) {

        value.addEventListener('click', (e) => {
            e.preventDefault();
            const blockID = value.getAttribute('href');

            document.querySelector('' + blockID).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }
}

export default scroll;