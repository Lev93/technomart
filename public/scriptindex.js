var linkbuy = document.querySelector(".buy");
var popup3 = document.querySelector(".modal-cart");
var close3 = popup3.querySelector(".modal-cart-close");

linkbuy.addEventListener("click", function (evt3) {
	popup3.classList.add("modal-show");
});
close3.addEventListener("click", function (evt3) {
	popup3.classList.remove("modal-show");
});

var buttons = document.querySelectorAll(".buy");

for (var i = 0; i < buttons.length; i++) {
	var button = buttons[i];
	button.addEventListener("click", function (e) {
		e.preventDefault();
		console.log(e.target.innerHTML);
		popup3.classList.add("modal-show");
	});
}
var openCart = document.querySelectorAll(".buy");
var tobookmark = document.querySelectorAll(".product-bookmark");
var popupCart = document.querySelector(".modal-cart");
var closeCart = document.querySelector(".modal-cart-close-btn");
var submitCart = popupCart.querySelector(".modal-cart-btn");
var countBtn = document.querySelector(".basket");
var countbookmark = document.querySelector(".bookmark")
var counter = countBtn.querySelector(".count");
var counterbookmark = countbookmark.querySelector(".bookmarkspan");

for (var i = 0; i < openCart.length; i++) {
	openCart[i].addEventListener("click", function (event) {
		event.preventDefault();
		popupCart.classList.add("modal-show");
		countBtn.classList.add("active");
		var count = Number(counter.innerHTML);
		counter.innerHTML = count += 1;
	});
}
submitCart.addEventListener("click", function (event) {
	event.preventDefault();
	popupCart.classList.remove("modal-show");
});
closeCart.addEventListener("click", function (event) {
	event.preventDefault();
	popupCart.classList.remove("modal-show");
});

for (var j = 0; j < tobookmark.length; j++) {
	tobookmark[j].addEventListener("click", function (e) {
		e.preventDefault();
		countbookmark.classList.add("active");
		var countb = Number(counterbookmark.innerHTML);
		counterbookmark.innerHTML = countb += 1;
	});
}
var link = document.querySelector(".redbutton-2");
var popup = document.querySelector(".window-message");
var close = popup.querySelector(".window-message-close");
var login = popup.querySelector("[name=name]");
var form = popup.querySelector(".contact-form");
var email = popup.querySelector("[name=email]");

try {
	storage = localStorage.getItem("login");
} catch (err) {
	isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.add("modal-show");
	setTimeout(function () {
		login.focus();
	}, 400);
});
close.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.remove("modal-show");
	popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
	if (!login.value || !email.value) {
		evt.preventDefault();
		popup.classList.remove("modal-error");
		popup.offsetWidth = popup.offsetWidth;
		popup.classList.add("modal-error");
	} else {
		if (isStorageSupport) {
			localStorage.setItem("login", login.value);
		}
	}
});
window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (popup.classList.contains("modal-show")) {
			popup.classList.remove("modal-show");
			popup.classList.remove("modal-error");
		}
	}
});
var mapLink = document.querySelector(".map");

var mapPopup = document.querySelector(".map-big");
var mapClose = mapPopup.querySelector(".window-message-close");
mapLink.addEventListener("click", function (evt2) {
	evt2.preventDefault();
	mapPopup.classList.add("modal-show");
});

mapClose.addEventListener("click", function (evt2) {
	evt2.preventDefault();
	mapPopup.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt2) {
	if (evt2.keyCode === 27) {
		if (mapPopup.classList.contains("modal-show")) {
			evt2.preventDefault();
			mapPopup.classList.remove("modal-show");
		}
	}
});
var slides = document.querySelectorAll('.slider-item'),
	nextBtn = document.querySelector('.slider-control-button.is-next'),
	backBtn = document.querySelector('.slider-control-button.is-back'),
	bulits = document.querySelector('.slider-bulits');

var currentSlide = 0,
	slideCount = slides.length;

var sliderAction = function (currentSlide, nextSlide) {
	slides[currentSlide].classList.remove('is-active');
	slides[nextSlide].classList.add('is-active');
	bulitButtons[currentSlide].classList.remove('is-active');
	bulitButtons[nextSlide].classList.add('is-active');
};

var bulit = '';
for (var i = 0; i < slideCount; i++) {
	bulit += '<li class="slider-bulit"><button class="slider-bulit-button ' + (i === currentSlide ? 'is-active' : '') + '" type="button" data-index="' + i + '"><span class="visually-hidden">' + i + '</span></button></li>';
}
bulits.innerHTML = bulit;

var bulitButtons = bulits.querySelectorAll('.slider-bulit-button');
for (var i = 0; i < slideCount; i++) {
	bulitButtons[i].addEventListener('click', function (e) {
		var nextSlide = Number(e.target.getAttribute('data-index'));
		sliderAction(currentSlide, nextSlide);
		currentSlide = nextSlide;
	});
}

nextBtn.addEventListener('click', function () {
	var nextSlide = currentSlide + 1;
	if (nextSlide >= slideCount) {
		nextSlide = 0;
	}
	sliderAction(currentSlide, nextSlide);
	currentSlide = nextSlide;
});
backBtn.addEventListener('click', function () {
	var backSlide = currentSlide - 1;
	if (backSlide < 0) {
		backSlide = slideCount - 1;
	}
	sliderAction(currentSlide, backSlide);
	currentSlide = backSlide;
});

//const openCart = document.querySelectorAll(".buy");