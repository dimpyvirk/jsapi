dojo.require('esri.map');

//Namespace
if (!this.fe || typeof this.fe !== 'object') {
	this.fe = {};
} 

/* Map Model */
fe.MapModel = Backbone.Model.extend({
    initialize: function () {
    	var userConfig = this.attributes.userConfig;
    	
        var startExtent = new esri.geometry.Extent({
        	xmin: userConfig.application.extent.xMin,
        	ymin: userConfig.application.extent.yMin,
        	xmax: userConfig.application.extent.xMax,
        	ymax :userConfig.application.extent.yMax,
        	spatialReference: { 'wkid': userConfig.application.extent.spatialRef} });
        
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
    updateMouseCoords: function (evt) {
        if ((evt.type) === 'mouseout') {
            this.unset('x', { silent: true });
            this.unset('y');
        } else if (evt.mapPoint) {
            this.set({ x: evt.mapPoint.x, y: evt.mapPoint.y });
        }
    }
});