//Namespace
if (!this.fe || typeof this.fe !== 'object') {
	this.fe = {};
} 

/* Map Model */
fe.basemapModel = Backbone.Model.extend({
    initialize: function () {
    	var userConfig = this.attributes.userConfig;
    	
    	
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