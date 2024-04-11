'use strict';




/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const itemsList = [
    {
        id: 1,
        name: 'Burger',
        desc: 'test',
        price: 70,
        image: '',
    },
    {
        id: 2,
        name: 'croissant',
        desc: 'test',
        price: 80,
        image: '',
    },
    {
      id:3,
      name:'Spring roles',
      desc:'test',
      price:60,
      image:'',
    },
    {
        id:4,
        name: 'Chicken Biryani',
        desc:'test',
        price: 300,
        image:'',
    },
    {
        id:5,
        name:'Chicken puff',
        desc:"test",
        price:50,
        image:'',
    },
    {
        id:6,
        name:'Fish',
        desc:"test",
        price:400,
        image:'',
    }
]

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function() {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listcart = document.querySelector('.listcart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');


openShopping.addEventListener('click',()=>{
    
    body.classList.add('active');
})
closeShopping.addEventListener('click',()=>{
    
    body.classList.remove('active');
    
})


/**
 * add event listener on multiple elements
 */

const addEventOnElements = function(elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function() {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if (isScrollBottom) {
        header.classList.add("hide");
    } else {
        header.classList.remove("hide");
    }

    lastScrollPos = window.scrollY;
};

// window.addEventListener("scroll", function() {
//     if (window.scrollY >= 50) {
//         header.classList.add("active");
//         backTopBtn.classList.add("active");
//         hideHeader();
//     } else {
//         header.classList.remove("active");
//         backTopBtn.classList.remove("active");
//     }
// });



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function() {
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function() {
    if (currentSlidePos >= heroSliderItems.length - 1) {
        currentSlidePos = 0;
    } else {
        currentSlidePos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function() {
    if (currentSlidePos <= 0) {
        currentSlidePos = heroSliderItems.length - 1;
    } else {
        currentSlidePos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function() {
    autoSlideInterval = setInterval(function() {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function() {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function(event) {

    x = (event.clientX / window.innerWidth * 10) - 5;
    y = (event.clientY / window.innerHeight * 10) - 5;

    // reverse the number eg. 20 -> -20, -5 -> 5
    x = x - (x * 2);
    y = y - (y * 2);

    for (let i = 0, len = parallaxItems.length; i < len; i++) {
        x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
        y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
        parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }

});

const addToCart = (item, buttonKey) => {
    //  cart = {
    //      count: '',
    //      items: {
    //          count: '',
    //          list: '',
    //      }
    //  }
    window.cart = {
        count: (window.cart && window.cart.count + 1) || 1,
        items: [...((window.cart && window.cart.items && window.cart.items) || []), itemsList[item]]
    }
    document.getElementById('cart-count').innerHTML = window.cart.count;
     
    const listIndex = window.cart.items.length - 1;
    let list = document.getElementById("listcart");
    let li = document.createElement('li');
    const cartItemId = 'cart-item-' + item;
    console.log('cartItem======', cartItemId);
    li.setAttribute('id', cartItemId);
    li.setAttribute('class', 'cart-item');
    let title = document.createElement('span');
    title.setAttribute('class', 'cart-item-title');
    title.innerHTML = window.cart.items[listIndex].name;
    li.appendChild(title)
    let price = document.createElement('span');
    price.innerHTML = window.cart.items[listIndex].price;
    li.appendChild(title)
    li.appendChild(price)
    list.appendChild(li);
    let totalPrice = 0;
    window.cart.items.forEach(item => {
        totalPrice += item.price;
    })
    document.getElementById('total-amt').innerHTML = totalPrice;
    document.getElementById(buttonKey).setAttribute('disabled', true);
    document.getElementById(buttonKey).setAttribute('title', 'You can add only once');

};

const removeFromCart = (index) => {
    const updatedCartList = [...window.cart.items];
    updatedCartList.splice(index, 1);
    window.cart = {
        count: (window.cart && window.cart.count - 1),
        items: [...(updatedCartList || [])]
    }
    document.getElementById('cart-count').innerHTML = window.cart.count;
    const selectedItem = document.getElementById('cart-item-' + index);
    if (selectedItem) selectedItem.remove();
    else alert('Item not found in cart');
    let totalPrice = 0;
    window.cart.items.forEach(item => {
        totalPrice += item.price;
    })
    document.getElementById('total-amt').innerHTML = totalPrice;
}


