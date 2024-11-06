/* Las animaciones dependen de javascript, esta funcion evita que en caso de tener el js deshabilitado, la página pueda ser vista sin problemas(elementos con opacidad 0 o valores de translate) al no tener el js habilitado. Tambien deshabilita la carga de los estilos en caso
de que la posicion inicial del scroll esté mucho más abajo del inicio(esto por mejorsr la experiencia del usuario al recarga la pagina y no tenr que ver
todas las animaciones en caso de un scroll fuera de la posicion inicial)*/

const enabler = () =>{
    if(!(window.scrollY > window.outerHeight*0.25)){
        const head = document.getElementsByTagName('head')[0];
        const fragment = document.createDocumentFragment();
        const link = document.createElement('link');
        link.rel="stylesheet";
        link.href="blanca.css";
        fragment.appendChild(link);
        head.appendChild(fragment);

        return 1;
    }
}

const checker = () =>{
    const animateElements = document.querySelectorAll('[data-animate]');

   if(animateElements.length){

        for(animateElement of animateElements){
            
            if(animateElement.getAttribute("data-animate").length){
                animateElement.classList.add(`${animateElement.getAttribute("data-animate")}`);
                
            }else{
                console.log("El elemento:"+animateElement+" no indica ninguna animacion a aplicar en su atributo data-animate");
            }

        }

        return 1;

   }else{

        console.log("No hay ningun elemento con el atributo data-animation");

        return 0;

   }

}

const options = {
    threshold: 0.25
}

const controllingObservers = () =>{
    const animateElements = document.querySelectorAll('[data-animate]');

    for(animateElement of animateElements){
        const observer = new IntersectionObserver(animationTrigger,options);
        observer.observe(animateElement);
        console.log(animateElement);
    }

}

const animationTrigger = (entrys,observer) =>{
    if(entrys[0].isIntersecting){
        const animateElement = entrys[0].target;
        animateElement.classList.remove(`${animateElement.getAttribute("data-animate")}`);
        observer.unobserve(animateElement);
    }
}

const play = () =>{

    if(enabler()){

        if(checker()){
            controllingObservers();
        }

    }

    document.removeEventListener('DOMContentLoaded',play);
}

document.addEventListener('DOMContentLoaded',play);