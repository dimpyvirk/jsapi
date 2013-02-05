/* -----------------------------------------------

iTunes Smart Playlist (functions)
an experiment by Weszt @ Hanami Design 
weszt@hanamidesign.com

 -----------------------------------------------*/

$(function() {
	
	var counter = 0;
			
	checkChildCount()
	
	$('.rule').live( 'click', function(e){		
		
		switch($(e.target).attr("class")){
			
			case 'plus':
			
				counter++;						
				
				var newItem = $(this).clone();			
				newItem.insertAfter(this).attr('id', 'rule' + counter);
				$(':input','#rule' + counter)
				 .not(':button, :submit, :reset, :hidden')
				 .val('')
				 .removeAttr('checked')
				 .removeAttr('selected');
			
				break;
			
			case 'minus':
			
				$(this).remove();	
				
				break;	
				
			case 'minus disabled':
			
				break;
				
		}
			checkChildCount();
		}
		
	);
	
	function checkChildCount(){
	
		if($("#rule-group").children().size() >= 2){
			$("#rule-group .rule .minus").removeClass("disabled");
		} else {
			$("#rule-group .rule .minus").addClass("disabled");
		}
	}
	
	
});
