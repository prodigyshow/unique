const color = () => {

    let elements = document.querySelectorAll("label");

        for (let i = 0; i < elements.length; i++) { 
            
            elements[i].addEventListener('click', function() {
        
                for (let i = 0; i < elements.length; i++) {
                    elements[i].classList.remove('active');
                }

                this.classList.add('active'); 
            });
        }
}

export default color;