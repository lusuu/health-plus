; jQuery(document).ready(function(){
	$('.cbalink').hide()/*bug-fix zzz.com.ua. to delete*/
	menuOpener();
	sliderStart();
	downScroll();
	upScroll();
	jQuery(".visible-map").length>0 ? googleMap() : false;
	formTest();
	inputFocus();
	jQuery("select").length>0 ? $('select').material_select(): false;
	doctorTabs();
	serviceAccordion();
	ourSocialSlider();
});

$(window).load(function () {
	sameHeight(".oursocial .border-holder");
});

$( window ).resize(function() {
	doctorTabs();
	serviceAccordion();
	jQuery(".oursocial .border-holder").height('auto');
	sameHeight(".oursocial .border-holder");
});

function menuOpener(){
	jQuery(".opener").click(function(){
		jQuery(this).closest("#header").toggleClass("active");
		if (jQuery('#header').hasClass('active')){
			jQuery('body').css('overflow','hidden');
		} else {
			jQuery('body').css('overflow','auto');
		}
	});
}

function sliderStart(){
	jQuery(".slider-visible").slick({
		infinite: true,
		dots: true,
	})
}
function ourSocialSlider(){
	jQuery(".oursocial").slick({
		infinite: true,
		dots: false,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			}
		},
		{
			breakpoint: 600,
			settings: {
				dots: false,
				slidesToShow: 2,
				slidesToScroll: 2
			}
		},
		{
			breakpoint: 480,
			settings: {
				dots: false,
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1
			}
		}
		]
	})
	$('.oursocial').on('setPosition', function(slick){
		$(".oursocial .border-holder").height('auto')
		sameHeight(".oursocial .border-holder");
	});
}

function sameHeight(selector){
	var maxheight = 0;
	$(selector).each(function() {
		if($(this).height() > maxheight) { maxheight = $(this).height(); }
	});

	$(selector).height(maxheight);
}
function downScroll(){
	$('.scroll').click(function () {
		var delta_scroll_anchor = 0;
		var elementClick = $(this).attr("href")
		var destination = ($(elementClick).offset().top)-delta_scroll_anchor;
		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
		return false;
	});
}


function upScroll(){
	var toTop = jQuery("#toTop");
	document.addEventListener("scroll", 
		function() {
			var scrolled = window.pageYOffset || document.documentElement.scrollTop;
			if (scrolled > 10) {
				toTop.addClass("active");
			} else {
				toTop.removeClass("active");
			}
		});
	toTop.click(function(){
		jQuery("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	})
}

function googleMap(){
	google.maps.event.addDomListener(window, 'load', initialize);
	function initialize() {
		var styles = [ { "featureType": "water", "elementType": "all", "stylers": [ { "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "on" } ] }, { "featureType": "water", "elementType": "labels", "stylers": [ { "hue": "#7fc8ed" }, { "saturation": 55 }, { "lightness": -6 }, { "visibility": "off" } ] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "hue": "#83cead" }, { "saturation": 1 }, { "lightness": -15 }, { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "hue": "#f3f4f4" }, { "saturation": -84 }, { "lightness": 59 }, { "visibility": "on" } ] }, { "featureType": "landscape", "elementType": "labels", "stylers": [ { "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "on" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "hue": "#bbbbbb" }, { "saturation": -100 }, { "lightness": 26 }, { "visibility": "on" } ] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [ { "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -35 }, { "visibility": "simplified" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "hue": "#ffcc00" }, { "saturation": 100 }, { "lightness": -22 }, { "visibility": "on" } ] }, { "featureType": "poi.school", "elementType": "all", "stylers": [ { "hue": "#d7e4e4" }, { "saturation": -60 }, { "lightness": 23 }, { "visibility": "on" } ] } ];
		var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
		var myLatlng = new google.maps.LatLng(52.536153, 13.377951);
		var myOptions = {
			zoom: 15,
			center: myLatlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		var image = {
			url: 'images/icons/google-pin.svg',// full path
			/*size: new google.maps.Size(20, 32),*/
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(0, 32)
		};
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image
		});
		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
	}
}

function formTest(){
	jQuery(".wpcf7-form input[type=submit]").click(function(e){
		e.preventDefault();
		jQuery(".wpcf7-validation-errors").show();
	})
}

function inputFocus(){

	jQuery("input[type=checkbox]").addClass("filled-in");

	jQuery(".wpcf7-list-item-label").click(function(){
		var checkbox = jQuery(this).closest(".wpcf7-list-item").find("input[type=checkbox]");
		if(checkbox[0].checked == false){
			checkbox[0].checked=true;
		} else {
			checkbox[0].checked=false;
		}
	});

	var input = jQuery("input[type=text],input[type=email],input[type=number]")
	input.click(function(){
		jQuery(this).closest(".input-field").find("label").addClass('active');
	});
	input.focusin(function(){
		jQuery(this).closest(".input-field").find("label").addClass('active');
	});
	input.blur(function(){
		if(jQuery(this).val() == ''){
			jQuery(this).closest(".input-field").find("label").removeClass('active');
		}
	})
}

function doctorTabs(){
	if (!window.matchMedia('(max-width: 479px)').matches){
		jQuery('.global .holder').show();
		jQuery('.global').find('.doctor-info').hide();
		jQuery(".doctor-content .doctor:first").addClass('active');
		var docId = jQuery(".doctor-content .doctor.active").attr('data-doctor');
		jQuery('.global').find('.doctor-info[data-doc-info = '+ docId +']').fadeIn(300);
		jQuery(".doctor-content").slick({
			slidesToShow: 6,
			slidesToScroll: 1,
			dots: false,
			draggable:false,
			responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 3,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
			]
		})
		jQuery(".doctor-content .doctor").off().click(function(e){
			e.preventDefault();
			jQuery(".doctor-content .doctor").removeClass('active');
			jQuery(this).addClass('active');
			var docId = jQuery(this).attr('data-doctor');
			console.log(docId);
		/*jQuery('.global').find('.doctor-info').fadeOut(300);
		jQuery('.global').find('.doctor-info[data-doc-info = '+ docId +']').fadeIn(300);*/
		$.when( jQuery('.global').find('.doctor-info').fadeOut(300) ).then(function(){ 
			jQuery('.global').find('.doctor-info[data-doc-info = '+ docId +']').fadeIn(300);
		});
	})
	} else {
		jQuery('.global .holder').hide();
		jQuery('.global').find('.doctor-info').show();
		jQuery('.global .accordion-area').off().click(function(){
			if(jQuery(this).closest('.doctor-info').hasClass('open')){
				jQuery(this).closest('.doctor-info').removeClass('open').find('.holder').slideUp(300)
			} else{
				jQuery(this).closest('.global').find('.doctor-info').removeClass('open').find('.holder').slideUp(300);
				jQuery(this).closest('.doctor-info').addClass("open").find('.holder').slideDown(300);
			}
		})
	}
}

function serviceAccordion(){
	if (!window.matchMedia('(max-width: 767px)').matches){ /* > 479*/
		$('.service-content h2').off();
		$('.service-content .description').slideDown();
		$('.service-content .list-holder').slideDown();
	} else {/* < 479*/

		$('.service-content .description').slideUp();
		$('.service-content .list-holder').slideUp();
		$('.service-content h2').off().click(function(){
			var row = $(this).closest('article.row');
			if(!row.hasClass('open')){
				$('.service-content .description').slideUp();
				$('.service-content .list-holder').slideUp();
				$('.service-content .row').removeClass('open');
				
				row.addClass('open').find(".description").slideDown();
				row.find(".list-holder").slideDown();
			} else {
				row.removeClass('open').find(".description").slideUp();
				row.find(".list-holder").slideUp();
			}
		});
	} 
}