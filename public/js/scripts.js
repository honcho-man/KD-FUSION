
function scroll_to(clicked_link, nav_height) {
	var element_class = clicked_link.attr('href').replace('#', '.');
	var scroll_to = 0;
	if(element_class != '.top-content') {
		element_class += '-container';
		scroll_to = $(element_class).offset().top - nav_height;
	}
	if($(window).scrollTop() != scroll_to) {
		$('html, body').stop().animate({scrollTop: scroll_to}, 1000);
	}
}


jQuery(document).ready(function() {
	
	/*
	    Sidebar
	*/
	$('.sidebar li').on('click', function(e) {
		$('.sidebar').removeClass('active');
        $('.overlay').removeClass('active');
	})

	$('.dismiss, .overlay').on('click', function() {
        $('.sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('.open-menu').on('click', function(e) {
    	e.preventDefault();
        $('.sidebar').addClass('active');
        $('.overlay').addClass('active');
        // close opened sub-menus
        $('.collapse.show').toggleClass('show');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
    /* change sidebar style */
	$('a.btn-customized-dark').on('click', function(e) {
		e.preventDefault();
		$('.sidebar').removeClass('light');
	});
	$('a.btn-customized-light').on('click', function(e) {
		e.preventDefault();
		$('.sidebar').addClass('light');
	});
	/* replace the default browser scrollbar in the sidebar, in case the sidebar menu has a height that is bigger than the viewport */
	$('.sidebar').mCustomScrollbar({
		theme: "minimal-dark"
	});
	
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		scroll_to($(this), 0);
	});
	
	$('.to-top a').on('click', function(e) {
		$('.sidebar').removeClass('active');
        $('.overlay').removeClass('active');
		e.preventDefault();
		if($(window).scrollTop() != 0) {
			$('html, body').stop().animate({scrollTop: 0}, 1000);
		}
	});
	/* make the active menu item change color as the page scrolls up and down */
	/* we add 2 waypoints for each direction "up/down" with different offsets, because the "up" direction doesn't work with only one waypoint */
	$('.section-container').waypoint(function(direction) {
		if (direction === 'down') {
			$('.menu-elements li').removeClass('active');
			$('.menu-elements a[href="#' + this.element.id + '"]').parents('li').addClass('active');
			//console.log(this.element.id + ' hit, direction ' + direction);
		}
	},
	{
		offset: '0'
	});
	$('.section-container').waypoint(function(direction) {
		if (direction === 'up') {
			$('.menu-elements li').removeClass('active');
			$('.menu-elements a[href="#' + this.element.id + '"]').parents('li').addClass('active');
			//console.log(this.element.id + ' hit, direction ' + direction);
		}
	},
	{
		offset: '-5'
	});

    /*
        Background slideshow
    */
	$('.top-content').backstretch("/img/backgrounds/Ways-in-Which-Web-Application-Development-is-Changing.jpg");
    $('.section-4-container').backstretch("/img/backgrounds/photo-1529465230221-a0d10e46fcbb.jpeg");
    //$('.section-6-container').backstretch("/img/backgrounds/how-to-become-a-programmer-in-india.jpeg");
    
    /*
	    Wow
	*/
	new WOW().init();
	
	/*
	    Contact form
	*/
	$('.section-6-form form input[type="text"], .section-6-form form textarea').on('focus', function() {
		$('.section-6-form form input[type="text"], .section-6-form form textarea').removeClass('input-error');
	});
	$('#contact_form').submit(function(e) {
		e.preventDefault();
		var alert = $('.alert')
	    $('.section-6-form form input[type="text"], .section-6-form form textarea').removeClass('input-error');
	    var postdata = $('.section-6-form form').serialize();
		$('#form_button').addClass('pending').html('<div class="loading"></div>').attr('disabled', true)
		$('.section-6-form form').find('input').attr('disabled', true)
		$('.section-6-form form').find('textarea').attr('disabled', true)
	    setTimeout(() => {
			$.ajax({
				method: 'POST',
				url: '/contact',
				data: {
					name: $('#name_input').val(),
					email: $('#email_input').val(),
					phone: $('#telephone_input').val(),
					subject: $('#subject_input').val(),
					message: $('#message_input').val()
				},
				//dataType: 'json',
				success: function(json) {
					console.log('success:'+json)
					alert.addClass('green-box').removeClass('hide').fadeIn('fast').html(json)
					$('#form_button').html('<span style="color:white !important">sent<i class="green fa fa-check pl-2"></i></span>')
					setTimeout(() => {
						alert.fadeOut('fast').removeClass('green-box');
					}, 2500);
				},
				error: function(res) {
					alert.removeClass('hide').addClass('fail-box').fadeIn('fast').html(res.responseText)
					console.log('error:'+res.responseText)
					$('#form_button').html('<span style="color:white !important">failed<i class="fail fa fa-times pl-2"></i></span>')
					setTimeout(() => {
						$('#form_button').removeClass('pending').html('send message').removeAttr('disabled')
						alert.fadeOut('fast').removeClass('fail-box');
					}, 1500);
				}
			});
		}, 1500);
	});
	
});
