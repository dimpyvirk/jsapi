/* -----------------------------------------------

iTunes Smart Playlist (functions)
an experiment by Weszt @ Hanami Design 
weszt@hanamidesign.com

 -----------------------------------------------*/
jQuery(function() {
	var counter = 0;
	checkChildCount()
	jQuery('.rule').live( 'click', function(e){		
		switch(jQuery(e.target).attr("class")){
			case 'plus':
				counter++;						
				var newItem = jQuery(this).clone();			
				newItem.insertAfter(this).attr('id', 'rule' + counter);
				jQuery(':input','#rule' + counter)
				 .not(':button, :submit, :reset, :hidden')
				 .val('')
				 .removeAttr('checked')
				 .removeAttr('selected');
				break;
			case 'minus':
				jQuery(this).remove();	
				break;	
			case 'minus disabled':
				break;
		}
			checkChildCount();
		}
		
	);
	
	function checkChildCount(){
		if(jQuery("#rule-group").children().size() >= 2){
			jQuery("#rule-group .rule .minus").removeClass("disabled");
		} else {
			jQuery("#rule-group .rule .minus").addClass("disabled");
		}
	}
});
