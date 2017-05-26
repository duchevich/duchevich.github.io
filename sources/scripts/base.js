$(document).ready(function() {
	$('.page-loader').hide('400');
	$("#menu").click(function () {
    //$(".left-back").css('transform', 'translate(500px, 0)');
    $(".back-menu").toggleClass("back-menu-active");
    $(".menu-list").toggleClass("menu-list-active");
    //$(".left-back").animate({width: 'toggle'});
    //$(".circle").animate({width: 'toggle'});
    //$(".circle1").animate({width: 'toggle'});
    $("#menu-list").animate({width: 'toggle'});
    $(".gamburger").toggleClass("gamburger_active");
    $(".close").toggleClass("close_active");
});
})