// import '../sass/style'

  /*  ==  PRELOADER   ==  */

window.onload = function(){
  let id = setTimeout(function(){
    let preloader = document.querySelector('.preloader');
    preloader.classList.remove('preloader');
  },100)
}

document.addEventListener("DOMContentLoaded", function(){


      /*  ==  HAMBURGER MENU   ==  */

var hamburgerNav = document.getElementById('hamburger-menu');
var hamburgerButton = document.querySelector('.hamburger');
var buttonText = hamburgerButton.querySelector('.button-text');

hamburgerButton.addEventListener('click', openHamburgerMenu);

  function openHamburgerMenu(event){

      var elem = event.target.closest('.hamburger');

      if(elem){

          hamburgerNav.classList.toggle('hamburger-open');
          hamburgerButton.classList.toggle('close-nav');

          if (buttonText.textContent == 'menu'){

              buttonText.textContent = 'close';

          } else{

              buttonText.textContent = 'menu';

          }
      }
  }




            /*  ==  SLIDER  ==  */

  var slideIndex = 1;
  showSlides(slideIndex);


 var timerId = setTimeout(function tick(){
   slideIndex++
   showSlides(slideIndex);
   timerId = setTimeout(tick, 8000);
 },8000);



var dotCliker = document.getElementsByClassName('h-slider__nav')[0];
dotCliker.addEventListener("click", currentSlide);

  function currentSlide(event){
      var target = event.target;
      var elem = target.closest('span');

      if (elem.tagName !== 'SPAN')   return ;

      var n = elem.getAttribute('data-h-slide');
      slideIndex = +n;

      showSlides(slideIndex);
  };



  function showSlides(n){
    var i;
    var slides = document.getElementsByClassName("h__items");
    var dots = document.getElementsByClassName("dots");

    if(n > slides.length){
      slideIndex = 1;
    }

    if(n < 1){
      slideIndex = slides.length
    }

    for(i =0; i < slides.length; i++){
      slides[i].classList.remove('h_active');
    }

     for(i=0; i < dots.length; i++){
       dots[i].classList.remove('dot_active');
     }

    slides[slideIndex-1].classList.add('h_active');
    dots[slideIndex-1].classList.add('dot_active');
  }


  /* ==========   S - REASONS  =========== */

  var reasonBotton = document.getElementById('btn-reasons');
  var reasons = document.querySelectorAll('.reasons');
  reasonBotton.addEventListener("click", showReasons);

// open more box with quotes
  function showReasons(){

    for( let i = 0; i < reasons.length; i++){
      if(!reasons[i].classList.contains('r-active')){
        reasons[i].classList.add('r-active');
      }else if(i > 3){
        reasons[i].classList.remove('r-active');
      }
    }
  }


});
