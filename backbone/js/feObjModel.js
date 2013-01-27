//Namespace
if (!this.fe || typeof this.fe !== 'object') {
	this.fe = {};
} 

/* Map Model */
fe.feObjModel = Backbone.Model.extend({
    initialize: function () {
    	var userConfig = this.attributes.userConfig;
    	
    	//Set up global variables, hitched to the map object, to keep track of layers, etc
    	this.set("activeLayers", []);
    	this.set("layerArray",[]);
    	this.set("basemapArray",[]);
    	this.set("places",[]);
    	this.set("clusterLayers",[]);
    	this.set("tileLayers", []);
    	this.set("legendLayers",[]);
    	this.set("identifyLayers",[]);
    	this.set("mapLayers",[]);
    	this.set("currentMap",null);
    	this.set("visLyrs",[]);
    	
    	
    	
    },
    updateExtent: function () {
        var extent = {
            xmin: this.map.extent.xmin.toFixed(0),
            xmax: this.map.extent.xmax.toFixed(0),
            ymin: this.map.extent.ymin.toFixed(0),
            ymax: this.map.extent.ymax.toFixed(0)
        };
        this.set(extent);
    }
});