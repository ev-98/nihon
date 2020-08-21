//Selections
let controller;
let slideScene;
let pageScene;
const mouse = document.querySelector('.cursor');
const burger = document.querySelector('.burger');

//Event listeners
burger.addEventListener('click', navToggle);
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor);
//Functions

function animateSlides(){
    //scrollmagic controller
    controller = new ScrollMagic.Controller();
    //make selections
    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');
    //loop over each slide
    sliders.forEach((slide,index,slides) =>{
        const revealImg = slide.querySelector('.reveal-img');
        const img = slide.querySelector('img');
        const revealText = slide.querySelector('.reveal-text');
        //gsap event chain
        const slideTl = gsap.timeline({defaults: {duration: 1, ease: 'power2.inOut'}});
        slideTl.fromTo(revealImg, {x: '0%'}, {x: '100%'});
        slideTl.fromTo(img, {scale: 2}, {scale: 1}, '-=1');
        slideTl.fromTo(revealText, {x: '0%'}, {x: '100%'}, '-=0.75');
        slideTl.fromTo(nav, {y: '-100%'}, {y: '0%'}, '-=1');
        //create scene
        slideScene = new ScrollMagic.Scene({
            triggerElement: slide,
            triggerHook: 0.25,
            reverse:false
        })
        // .addIndicators({
        // colorStart: 'white',
        // colorTrigger:'white',
        // name: 'slide'})
        .setTween(slideTl)
        .addTo(controller);

        //new animation
        const pageTl = gsap.timeline();
        let nextSlide = slides.length - 1 === index ? 'end' : slides[index+1];
        pageTl.fromTo(nextSlide, {y: '0%'}, {y: '50%'});
        pageTl.fromTo(slide, {opacity: 1, scale:1}, {opacity: 0, scale: 0.5});
        pageTl.fromTo(nextSlide, {y: '50%'}, {y: '0%'}, '-=0.5');
        //create scene
        pageScene = new ScrollMagic.Scene({
            triggerElement: slide,
            duration: '100%',
            triggerHook: 0
        })
        // .addIndicators({
        //     colorStart: 'white',
        //     colorTrigger:'white',
        //     name: 'slide',
        //     indent: 200})
        .setPin(slide, {pushFollowers: false})
        .setTween(pageTl)
        .addTo(controller);
    });
}

function cursor(e){
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px';
}

function activeCursor(e) {
    const item = e.target;
    if (item.id === "logo" || item.classList.contains("burger") || item.classList.contains("link-text")) {
      mouse.classList.add("hover-active");
    } else {
      mouse.classList.remove("hover-active");
    }
    if (item.classList.contains("explore")) {
      mouse.classList.add("explore-active");
      gsap.to(".title-swipe", 1, { y: "0%" });
    } else {
      mouse.classList.remove("explore-active");
      gsap.to(".title-swipe", 1, { y: "100%" });
    }
  }

function navToggle(e){
    if (!e.target.classList.contains("active")) {
        e.target.classList.add("active");
        gsap.to(".line1", 0.5, { rotate: "45", y: 5, background: "black" });
        gsap.to(".line2", 0.5, { rotate: "-45", y: -5, background: "black" });
        gsap.to("#logo", 1, { color: "black" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(2500px at 100% -10%)" });
        document.body.classList.add("hide");
      } else {
        e.target.classList.remove("active");
        gsap.to(".line1", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to(".line2", 0.5, { rotate: "0", y: 0, background: "white" });
        gsap.to("#logo", 1, { color: "white" });
        gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%)" });
        document.body.classList.remove("hide");
      }
}

//page transitions
const logo =document.querySelector('#logo');
barba.init({
  views: [{
    namespace: 'home',
    beforeEnter(){
      animateSlides();
      logo.href = './index.html'
    },
    beforeLeave(){
      slideScene.destroy();
      pageScene.destroy();
      controller.destroy();
    }
  },{
    namespace: 'mountain',
    beforeEnter(){
      logo.href = '../index.html';
      detailAnimation();
    },
    beforeLeave(){
      controller.destroy();
      detailScene.destroy();
    }
  },{
    namespace: 'festival',
    beforeEnter(){
      logo.href = '../index.html';
      detailAnimation();
    },
    beforeLeave(){
      controller.destroy();
      detailScene.destroy();
    }
  },{
    namespace:'fashion',
    beforeEnter(){
      logo.href = '../index.html';
      detailAnimation();
    },
    beforeLeave(){
      controller.destroy();
      detailScene.destroy();
    }
  }],
  transitions: [{
    leave({current,next}){
      let done = this.async();
      const tl = gsap.timeline({defaults: {ease:'power2.inOut'}});
      tl.fromTo(current.container, 1 ,{opacity:1}, {opacity:0});
      tl.fromTo('.swipe', 0.75, {x:'-100%'}, {x:'0%', onComplete:done}, '-=0.5');
    },
    enter({current,next}){
      let done = this.async();
      window.scrollTo(0,0);
      const tl = gsap.timeline({defaults: {ease:'power2.inOut'}});
      tl.fromTo('.swipe', 1, {x:'0%'}, {x:'100%',stagger: 0.2, onComplete:done}, '-=0.5');
      tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
        tl.fromTo(".nav-header",1,{ y: "-100%" },{ y: "0%", ease: "power2.inOut" },"-=1.5");
    }
  }]
});

function detailAnimation() {
  controller = new ScrollMagic.Controller();
  const slides = document.querySelectorAll(".detail-slide");
  slides.forEach((slide, index, slides) => {
    const slideTl = gsap.timeline({ defaults: { duration: 1 } });
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    const nextImg = nextSlide.querySelector("img");
    slideTl.fromTo(slide, { opacity: 1 }, { opacity: 0 });
    slideTl.fromTo(nextSlide, { opacity: 0 }, { opacity: 1 }, "-=1");
    slideTl.fromTo(nextImg, { x: "50%" }, { x: "0%" });
    //Scene
    detailScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0
    })
      .setPin(slide, { pushFollowers: false })
      .setTween(slideTl)
      // .addIndicators({
      //   colorStart: "white",
      //   colorTrigger: "white",
      //   name: "detailScene"
      // })
      .addTo(controller);
  });
}

// animateSlides();