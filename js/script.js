$(document).ready(function() {
	var isMoving = false;
	var nowSection = -1;
	var sections = $('section');
    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });
	$(window).scroll(function() {
		if ($(document).scrollTop() > $('#info').offset().top - $('#nav').height()) {
			$('#nav').addClass('fixed');
		} else {
			$('#nav').removeClass('fixed');
		}
	})
	$(document).on('mousewheel DOMMouseScroll', function(event) {
		var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
		if (!isMoving) {
			if (delta < 0) {
				nextSection(event);
			} else {
				preSection(event);
			}
			console.log(nowSection);
		}
		else{
			event.preventDefault();
		}
	});

	$('#nav > ul > li > a').on('click',function(){
		nowSection = parseInt($(this).attr('data-idx'));
		var y=sections.eq(nowSection).offset().top - $('#nav').height();
		isMoving = true;
		$('html,body').animate({
			scrollTop: y
		},function(){
			isMoving = false;
		});
	});

	function nextSection(event){
		if(nowSection < sections.length){
			isMoving = true;
			event.preventDefault();
			nowSection++;
			var y = $('#footer').offset().top;
			if(nowSection < sections.length){
				y=sections.eq(nowSection).offset().top - $('#nav').height();
			}
			$('html,body').animate({
				scrollTop: y
			},function(){
				isMoving = false;
			});
		}
	}

	function preSection(event){
		if(nowSection >= 0){
			isMoving = true;
			event.preventDefault();
			nowSection--;
			var y = 0;
			if(nowSection >= 0){
				y=sections.eq(nowSection).offset().top - $('#nav').height();
			}
			$('html,body').animate({
				scrollTop: y
			},function(){
				isMoving = false;
			});
		}
	}
});
