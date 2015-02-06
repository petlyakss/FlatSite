function changeBg(img, id, color)
{
	var buf = document.getElementById(id);
	var buf2 = document.getElementById(id+"_l");
	buf.style.background = 'url(\'/images/'+img+'.jpg\')';
	buf.style.backgroundRepeat = "repeat-x";
	buf.style.backgroundPosition = "top";
	buf2.style.color = "#"+color;
}
/* function createContentFlow(){		
			var script=document.createElement('script');
			script.src='/js/contentflow/contentflow.js';
			script.type = 'text/javascript';
			script.innerHTML = "alert('HAI.. !!!');";
			alert('ok');
		} */
		
/* window.onload=function(){
   var sc=document.createElement("SCRIPT");
   sc.src='/js/contentflow/contentflow.js';
   sc.type = 'text/javascript';
   document.head.appendChild(sc);
 
}
 */

 jQuery(document).ready(function(){
	var carousel = $("#gallery").featureCarousel({
		  largeFeatureHeight: 346,
		  largeFeatureWidth: 626,
		  smallFeatureHeight: 286,
		  autoPlay: 0,
		  trackerSummation: false,
		  trackerIndividual: false,
		  sidePadding: 1,
		  smallFeatureOffset: 30,
		  carouselSpeed: 600,
		  animationEasing: 'linear'
        });
	$("#gallery").css('display', 'block');
 });