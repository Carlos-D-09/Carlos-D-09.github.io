document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-menu');

    toggleButton.addEventListener('click', () => {
        toggleButton.classList.toggle('active'); //Add class animation button toggle
        toggleButton.classList.add('disabled');
        if(menu.classList.contains('active')){
            menu.classList.add('hide');
            setTimeout(() => {
                menu.classList.remove('active');
                menu.classList.remove('hide');
            }, 1000)
        }else{
            menu.classList.add('active');
        }

        setTimeout(()=>{
            toggleButton.classList.remove('disabled');
        }, 1500)
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Event listener to each nav-link class
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            let target = document.querySelector(event.target.closest("a").getAttribute('href'));
            let navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            window.scrollTo({
                top: target.offsetTop - navbarHeight,
                behavior: 'smooth'
            });
        });
    });
});