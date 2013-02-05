//Namespace
if (!this.fe || typeof this.fe !== 'object') {
	this.fe = {};
} 

/* Map Model */
fe.BasemapModel = Backbone.Model.extend({
	//An individual basemap object
    initialize: function (args) {
		var id = args.id;
		var title = args.title;
		var params = args.params;
		
		//Build the appropriate basemap type
		var basemap;
		switch (args.bmType) {
			case "bing":
				//Decide on the bing maps style
				switch(params.mapStyle){
					case "ROAD":
						mapStyle = esri.virtualearth.VETiledLayer.MAP_STYLE_ROAD
						break;
					case "AERIAL":						
						mapStyle = esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL;
						break;
					default:
						mapStyle = esri.virtualearth.VETiledLayer.MAP_STYLE_AERIAL_WITH_LABELS;
						break;
				}
	
				basemap = new esri.virtualearth.VETiledLayer({
			        bingMapsKey: params.bingKey,
			        mapStyle: params.mapStyle,
			        visible: true,
			        id: id	
			    });	
				
				break;
			case "osm":
				basemap = new esri.layers.OpenStreetMapLayer({
					id: id,
					visible: true,
					copyright: params.copyright
				});
				break;
			case "esri":
				//TODO: add the Esri basemap
				break;
			default:
				alert("invalid basemap type");
				return null;
		}
    }
});

fe.BasemapCollection = Backbone.Collection.extend({
	model: fe.BasemapModel,
	initialize: function () {
		console.log("initialising the basemap collection");
	},
	add:  function(basemap) {
		if(basemap.id) {
			console.log("adding basemap to collection: ", basemap);
		}
	},
	onSelectBasemap: function () {
		alert("basemap selected");
	
	} 
});

fe.BasemapsView = Backbone.View.extend({


});


fe.BasemapItemView = Backbone.View.extend({
	//The button to select an individual basemap
	model: fe.BasemapModel,
	el: "#baseContainer",
    initialize: function(){
    	this.collection = fe.BasemapCollection;
        this.render();
    },
    render: function(){
    	//Add a new basemap item to the basemap dropdown
	    var html = '<div id="' + this.options.id + '" title="Switch to the ' + this.options.title + ' Basemap" class="baseMap ' + this.options.bmSelected + ' ' + this.options.extraClass + '">'
	    html += '<div class="baseImage"><img width="100" height="67" class="BG" src="' + this.options.thumbnail + '" /></div><div class="baseTitle">' + this.options.title + '</div></div>'
        jQuery(this.el).append(html);
    },
    events: {
        "click div .baseMap": "changeBasemap"  
    },
    changeBasemap: function () {
    	alert("change basemap " + this.id);    
    }
});
