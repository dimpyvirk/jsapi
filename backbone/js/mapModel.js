dojo.require('esri.map');

//Namespace
if (!this.fe || typeof this.fe !== 'object') {
	this.fe = {};
} 

/* Map Model */
fe.MapModel = Backbone.Model.extend({
    initialize: function () {
    	var userConfig = this.attributes.userConfig;
    	
    	//Retrieve any parameters specified in the URL (eg extent, basemap, layers, etc)
    	var sXmin = parseFloat(this.URLLookup("xmin"));
    	var sYmin = parseFloat(this.URLLookup("ymin"));
    	var sXmax = parseFloat(this.URLLookup("xmax"));
    	var sYmax = parseFloat(this.URLLookup("ymax"));
    	var sLat = parseFloat(this.URLLookup("lat"));
    	var sLong = parseFloat(this.URLLookup("long"));
    	var sBuffer = parseFloat(this.URLLookup("buffer"));
    	
    	// If the start extent has been provided in the URL, as the bounding box in Web Mercator
    	var startExtent;
    	if(sXmin && sYmin && sXmax && sYmax) {
    		startExtent = new esri.geometry.Extent({
    			xmin: sXmin,
    			ymin: sYmin,
    			xmax: sXmax,
    			ymax: sYmax,
    			spatialReference: { 'wkid': userConfig.application.extent.spatialRef}
    		});
    	} else if (sLat && sLong) {
    		if(!sBuffer) {
    			//If scale is not provided in the URL, use the application default, or a hard default
    			sBuffer = userConfig.application.defaultZoomBuffer || 5000;
    		}
    		var llPoint = new esri.geometry.Point(sLong, sLat, new esri.SpatialReference({ wkid: 4326 }))
    		var wmPoint = esri.geometry.geographicToWebMercator(llPoint);
    		startExtent = new esri.geometry.Extent({
    			xmin: wmPoint.x - sBuffer,
    			ymin: wmPoint.y - sBuffer,
    			xmax: wmPoint.x + sBuffer,
    			ymax: wmPoint.y + sBuffer,
    			spatialReference: { 'wkid': wmPoint.spatialRef}
    		});
    		
    	} else {
    	    //Start extent was not provided in the URL, so use the values in the userConfig	
	        startExtent = new esri.geometry.Extent({
	        	xmin: userConfig.application.extent.xMin,
	        	ymin: userConfig.application.extent.yMin,
	        	xmax: userConfig.application.extent.xMax,
	        	ymax :userConfig.application.extent.yMax,
	        	spatialReference: { 'wkid': userConfig.application.extent.spatialRef}
	        });
	    }
        
        this.map = new esri.Map(this.attributes.div, { extent: startExtent });
        
        var tiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer');
        this.map.addLayer(tiledMapServiceLayer);

        dojo.connect(this.map, 'onExtentChange', dojo.hitch(this, this.updateExtent));
    },
    updateExtent: function () {
        var extent = {
            xmin: this.map.extent.xmin.toFixed(0),
            xmax: this.map.extent.xmax.toFixed(0),
            ymin: this.map.extent.ymin.toFixed(0),
            ymax: this.map.extent.ymax.toFixed(0)
        };
        this.set(extent);
    },
    setValuesFromURL: function (){
    	this.set("locateString",this.URLLookup("adr"));
    	this.set("baseMap", decodeURIComponent(this.URLLookup("bm")));
    	this.set("isEmbedded",this.URLLookup("embed"));
    	this.set("placesTmp",this.URLLookup("plcs"));
    	this.set("kmlURL",this.URLLookup("kml"));
    	this.set("visLyrs",this.URLLookup("lrs"));
    	// if visLyrs is set
    	//if(visLyrs){
    //		visLyrs = visLyrs.split(',');
    //	}
    	this.set("visMap",this.URLLookup("map"));
    	
    },
    URLLookup: function (name) {
    	var results = (new RegExp("[\\?&]"+name+"=([^&#]*)")).exec(window.location.href);
    	if ( results == null ) {return null}
    	else {return results[1]}
    }
});