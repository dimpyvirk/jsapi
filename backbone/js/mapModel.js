//Namespace
if (!this.fe || typeof this.fe !== 'object') {
	this.fe = {};
}

//Load the required DOJO libraries
dojo.require('esri.map');
dojo.require("esri.dijit.Popup");
dojo.require("esri.layers.osm");
dojo.require("esri.virtualearth.VETiledLayer");

/* Map Model */
fe.MapModel = Backbone.Model.extend({
    initialize: function (args) {
    	var userConfig = args.userConfig;
    	
    	//Retrieve any parameters specified in the URL (eg extent, basemap, layers, etc)
    	var sXmin = parseFloat(this.URLLookup("xmin"));
    	var sYmin = parseFloat(this.URLLookup("ymin"));
    	var sXmax = parseFloat(this.URLLookup("xmax"));
    	var sYmax = parseFloat(this.URLLookup("ymax"));
    	var sLat = parseFloat(this.URLLookup("lat"));
    	var sLong = parseFloat(this.URLLookup("long"));
    	var sBuffer = parseFloat(this.URLLookup("buffer"));
    	var spatRef = userConfig.application.extent.spatialRef || 102113;
    	
    	// If the start extent has been provided in the URL, as the bounding box in Web Mercator
    	var startExtent;
    	if(sXmin && sYmin && sXmax && sYmax) {
    		startExtent = new esri.geometry.Extent({
    			xmin: sXmin,
    			ymin: sYmin,
    			xmax: sXmax,
    			ymax: sYmax,
    			spatialReference: { 'wkid': spatRef}
    		});
    	// The lat/long and (optionally) the buffer amount
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
    			spatialReference: { 'wkid': spatRef}
    		});
    		
    	} else {
    	    //Start extent was not provided in the URL, so use the values in the userConfig	
	        startExtent = new esri.geometry.Extent({
	        	xmin: userConfig.application.extent.xMin,
	        	ymin: userConfig.application.extent.yMin,
	        	xmax: userConfig.application.extent.xMax,
	        	ymax :userConfig.application.extent.yMax,
	        	spatialReference: { 'wkid': spatRef}
	        });
	    }
	    
	    //Create a customised map popup
	    var popup = this.createPopup();
        
        //Build the map object
        var sliderStyle = args.sliderStyle || "default";
        var isZoomSlider = true;
        if (args.isZoomSlider != undefined) {
        	isZoomSlider = args.isZoomSlider;
        	if(!isZoomSlider) {
        		//Needed due to a bug at v3.3 whereby the slider is still shown unless the large option is chosen
        		sliderStyle = "large";
        	} 
        }
        
        this.map = new esri.Map(args.div, {
        	extent: startExtent,
        	popup: popup,
        	sliderStyle: sliderStyle,
        	isZoomSlider: isZoomSlider,
        	wrapAround180: true
        });
        
        //TODO: replace this with the proper basemaps
        this.loadBasemaps(userConfig.basemaps);
        var tiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer');
        this.map.addLayer(tiledMapServiceLayer);
        
        //Set listeners for various map events
        if(args.feZoomSlider) {
        	//Override the default zoom slider with a custom slider
	        dojo.connect(this.map, 'onLoad', dojo.hitch(this, this.createCustomSlider, args.feZoomSlider));
	    }
        dojo.connect(this.map, 'onExtentChange', dojo.hitch(this, this.extentChanged));
        
    },
    createCustomSlider: function (zoomSliderDiv) {
    	jQuery('#' + zoomSliderDiv).html('<div id="zoomSliderPlus' + this.cid + '" title="Zoom in"></div><div id="zoomSliderCustom" title="Drag to zoom"></div><div id="zoomSliderMinus" title="Zoom out"></div>');
    	this.map.customMapSlider = jQuery("#zoomSliderCustom").slider({
    		min: 0,
    		max: this.map._params.lods.length - 1,
    		value: this.map.getLevel(),
    		orientation: "vertical",
    		range: "min",
    		change: function(event, ui) {
    			if (this.map.getLevel() !== ui.value) {
    				this.map.setLevel(ui.value);
    			}
    		}
    	});
    
    	/*------------------------------------*/
    	// ZOOM SLIDER BUTTONS
    	/*------------------------------------*/
    	jQuery(document).on('click','#zoomSliderMinus',function(event) {
    		var currentValue = this.map.customMapSlider.slider("option", "value");
    		this.map.customMapSlider.slider("option", "value", currentValue - 1);
        });
    	jQuery(document).on('click','#zoomSliderPlus',function(event) {
    		var currentValue = this.map.customMapSlider.slider("option", "value");
    		this.map.customMapSlider.slider("option", "value", currentValue + 1);
        });
    	// SHOW ZOOM SLIDER
    	jQuery('#zoomSliderDiv').show();
    },
    createPopup: function() {
	    var mapPopup = new esri.dijit.Popup({
	    	fillSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255,0,0]), 2), new dojo.Color([255,255,0,0.25])),
	    	lineSymbol: new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH,
	    	  new dojo.Color([255,0,0]), 3),
	    	markerSymbol: new esri.symbol.SimpleMarkerSymbol('circle', 32, null, new dojo.Color([0, 0, 0, 0.25])),
	    	//marginLeft: 10,
	    	//marginTop: 10,
	    	//offsetX:3,
	    	//offsetY:3,
	    	zoomFactor:4
	    }, dojo.create("div"));
	    return mapPopup;
    },
    extentChanged: function () {
        var extent = {
            xmin: this.map.extent.xmin.toFixed(0),
            xmax: this.map.extent.xmax.toFixed(0),
            ymin: this.map.extent.ymin.toFixed(0),
            ymax: this.map.extent.ymax.toFixed(0)
        };
        this.set(extent);
        
    },
    loadBasemaps: function (basemaps) {
    	//Create a collection of basemaps
    	var basemapCollection = new fe.BasemapCollection({
	    	//iniitialisaton options?
	    });
	     
	    var html = '';  
    	for(var i = 0; i < basemaps.length; i++) {
    		var bmConfig = basemaps[i];
    		var basemap = new fe.BasemapModel({
    			id: bmConfig.id,
    			title: bmConfig.title,
    			bmType: bmConfig.bmType,
    			params: bmConfig.params    		
    		});
    		basemapCollection.add(basemap);
    		
    		var extraClass = '';
    		var clearDiv = false;
    		if((i + 1) % 2 === 0){
    			extraClass = 'MB ML';
    			clearDiv = true;
    			if((i + 1) === basemaps.length){
    				extraClass = 'ML';
    			}
    		}
    		var bmSelected = '';
    		if(i === 0){
    			bmSelected = 'basemapSelected';
    		}
    		
    		//html += '<div id="basemap' + i + '" title="Switch to the ' + bmConfig.title + ' Basemap" class="baseMap ' + bmSelected + ' ' + extraClass + '"><div class="baseImage"><img width="100" height="67" class="BG" src="' + bmConfig.options.thumbnail + '" /></div><div class="baseTitle">' + bmConfig.title + '</div></div>';
    		   		
    		//var basemapView = new fe.BasemapView({ el: jQuery("#basemap" + i) });
    		var basemapView = new fe.BasemapView({
    			id: bmConfig.id,
    			title: bmConfig.title,
    			thumbnail: bmConfig.thumbnail,
    			params: bmConfig.params
    		});
    	}
    	
    	//jQuery('#baseContainer').html(html); 
    	
    },
    setValuesFromURL: function (){
    	//TODO: interpret these URL-derived values and do something with them
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