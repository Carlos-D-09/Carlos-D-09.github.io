document.addEventListener('DOMContentLoaded', () => {
    navbar_link();
    navbar_toogle();
    initialize_carousels();
    footer_form();
});

//Navbar toggle button functions
function navbar_toogle(){
    const toggleButton = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-menu');

    // Event listener to toggle button
    toggleButton.addEventListener('click', () => {
        //Click animation
        toggleButton.classList.toggle('active');
        
        //Disabled toggle button, to avoid multiple clicks
        toggleButton.classList.add('disabled'); 
        
        //Determine if the menus is ready to hide or to show
        if(menu.classList.contains('active')){
            menu.classList.add('hide');
            setTimeout(() => {
                menu.classList.remove('active');
                menu.classList.remove('hide');
            }, 1000)
        }else{
            menu.classList.add('active');
        }

        //Re-able toggle button
        setTimeout(()=>{
            toggleButton.classList.remove('disabled');
        }, 1500)
    });
}

//Navbar functions 
function navbar_link(){
    // Event listener to each nav-link class 
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            //Avoid default behavior due to it doesn't consider the navbar height
            event.preventDefault();

            let target = document.querySelector(event.target.closest("a").getAttribute('href'));
            let navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            // Move to the corresponden section taking the navbar height into account.  
            window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        });
    });
}

//Iterate through all the carousels and start animations
function initialize_carousels(){
    let i = 1;
    while(true){
        const carousel  = document.getElementById('portfolio-'+i+'-carousel');
        const toggle = document.getElementById('portfolio-'+i+'-toggle');
        const footer = document.getElementById('portfolio-'+i+'-footer');
        if(carousel && toggle && footer){
            //If carousel index is odd, left is false, otherwises is true 
            let left = (i%2 == 0 ? true : false);
            start_carousel(carousel, left);
            carousel_toggle(toggle, footer);
            i++;
        }else{
            break;
        }
    }
}

//Start carousel animations. If left is true, the images are going from n to 1, otherwise, it's going from 1 to n
function start_carousel(carousel, left){
    setInterval(()=>{
        if (left){
            let first_image = carousel.children[0];
            let third_image = carousel.children[2];
    
            //Remove the last child and insert in first position: 1, 2, 3, 4 -> 2, 3, 4, 1. The CSS classes are implemented to apply styles to the first three elements
            carousel.appendChild(first_image);
            first_image = carousel.children[0];
            
            //Add animations
            first_image.classList.add('focus-left-out');
            third_image.classList.add('focus-left-in');
            
            //Pop-out animations
            setTimeout(() => {
                first_image.classList.remove('focus-left-out');
                third_image.classList.remove('focus-left-in');
            }, 2000);
        }else{
            let last_child = carousel.lastElementChild;

            //Remove the last child and insert in first position: 1, 2, 3, 4 -> 4, 1, 2, 3. The CSS classes are implemented to apply styles to the first three elements
            carousel.removeChild(last_child);
            carousel.insertBefore(last_child, carousel.children[0]);
            
            let second_image = carousel.children[1];
            let third_image = carousel.children[2];

            //Add animations
            third_image.classList.add('focus-right-out');
            second_image.classList.add('focus-right-in');

            //Pop-out animations
            setTimeout(() => {
                second_image.classList.remove('focus-right-in');
                third_image.classList.remove('focus-right-out');
            }, 2000);
        }
    }, 7000);
}

//Carousel toggle button
function carousel_toggle(toggle, footer){
    toggle.addEventListener('click',()=>{
        toggle.style.pointerEvents = 'none';
        footer.classList.toggle('active');
        toggle.classList.toggle('active');
        setTimeout(()=>{
            toggle.style.pointerEvents = 'auto';
        }, 1800);
    });
}

function footer_form(){
    let footer_button = document.getElementById('footer-button');
    footer_button.addEventListener('click', () => {
        let subject = document.getElementById('footer-subject');
        let message = document.getElementById('footer-message');
        let mailto = "mailto:" + encodeURIComponent('cdanielmedinas@outlook.com') + "?"; 
        
        if (subject.value !== 'undefined' && subject.value != ''){
            mailto += 'subject=' + encodeURIComponent(subject.value);
        }
        
        if (message.value !== 'undefined' && message.value != ''){
            mailto += '&body=' + encodeURIComponent(message.value);
        }
        window.location.href = mailto;

        return false;
    });
}