var kmlProcessor = {
	"status": null,
	"attempts": 0,
	"prefix": "http://utility.arcgis.com/sharing/kml?url=",
	"suffix": "&refresh=true"
}

function KmlLayer(newLayer) {
	this.id = newLayer.id;
	//console.log("defining layer ",this.id);
	var url = kmlProcessor.prefix + newLayer.url + kmlProcessor.suffix;

	this.checkStatus = function checkStatus() {
		//Check that there is no other KML operation currently in progress
		if(kmlProcessor.status == null) {
			kmlProcessor.status = "processing";
			kmlProcessor.attempts = 0;
    		//console.log("loading KML for layer ", this.id);
    		loadData();
	    } else {
	    	//If there is another KML operation in progress, pause before trying again, until we've tried 20 times
	    	kmlProcessor.attempts += 1;
	    	if(kmlProcessor.attempts < 20) {
		    	//console.log("kml processing is already in operation. Pausing");
		    	setTimeout(function(){
		    		checkStatus();
		    	},500);
		    } else {
		    	console.log("tried 20 times to load the KML without success. Aborting");
		    	kmlProcessor.status = "aborted";
		    	kmlProcessor.attempts = 0;
		    	return null;
		    }
	    }
    }
    
    function loadData() {
    	var xx = esri.request({
    		 layerConfig: newLayer,
    		 featureList: [],
    	     url: url,
    	     content: {
    	       f:  "json"
    	     },
    	     handleAs: "json",
    	     callbackParamName: "callback",
    	     load: function() {
    	     	//If the esri.request worked, we'll have access to the KML layer's features in this loop
    	     	//console.log("inside success function for ",this.id);  
    	     	kmlProcessor.status = null; 
    	     	if(arguments.length == 2) {
    	     		var layers = arguments[0].featureCollection.layers;
    	     		var layerId = this.layerConfig.id;
    	     		
    	     		//If the desired geometry type has been specified, look for that layer. Otherwise, take the first
    	     		//layer containing features
    	     		var featureType = this.layerConfig.featureType || null;
    	     		for (var x = 0; x < layers.length; x++) {
    	     			var layer = layers[x];
    	     			var geomType = layer.featureSet.geometryType;
    	     			var features = layer.featureSet.features;
    	     			if(features.length > 0) {
    	     				console.log(layerId,geomType,features.length);
    	     				//TODO: how to return these features to the layer?
    	     			}
    	     		}
    	     	} else {
    	     		alert("Error in build KML function");
    	     	}	 	     
    	     },
    	     error: function (error) {
    	     	console.log("Error with layer ",this.id, error.message);
    	     	kmlProcessor.status = null;
    	     }
    	});
    }
    
    //Call the LoadKML function
    this.checkStatus();
}