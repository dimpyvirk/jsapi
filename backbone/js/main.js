//Set some jQuery listeners
jQuery(document).on('click','#basemapButton',function(event) {
	if(jQuery(event.target).hasClass("toggleMenu")) {
		toggleMenus('#basemapMenu',this);
	}
});

function toggleMenus(menuObj, buttonObj){
	if(menuObj){
		//hidePopup();
	}
	var currentlyOpen = jQuery('.slideMenu').filter(':visible');
	var currentlyOpenID = '#'+currentlyOpen.attr('id');
	hideLayerInfo();
	jQuery('.mapButton').removeClass('buttonSelected');
	if(currentlyOpenID !== menuObj && menuObj){
		currentlyOpen.slideUp('fast',showMenu(menuObj, buttonObj));
	}
	else{
		currentlyOpen.slideUp('fast');
	}	
}

function showMenu(menuObj, buttonObj){
	jQuery(menuObj).slideDown('fast');
	if(buttonObj){
		jQuery(buttonObj).addClass('buttonSelected');
	}
}

function hideLayerInfo(){
	jQuery('.listMenu ul li .infoHidden').hide();
	jQuery('.listMenu ul li').removeClass('active');	
}
