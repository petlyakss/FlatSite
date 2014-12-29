$(document).ready(function(){
	$("#submit_search").click(function(){
		$(this).parents('form').trigger('submit');
	});
	
	$(".inactive").hover(function(){
		$(this).addClass('hovered');
	}, function(){
		$(this).removeClass('hovered');
	});
	
	$(".info_price").hover(function(){
		$(this).find('.allprices').show();
	}, function(){
		$(this).find('.allprices').hide();
	});
	
});
