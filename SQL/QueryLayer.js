dojo.provide("modules.QueryLayer");
dojo.addOnLoad(function() {
	dojo.declare("modules.QueryLayer", null, {
		// Doc: http://docs.dojocampus.org/dojo/declare#chaining
		"-chains-": {
			constructor: "manual"
		},
		// constructor
		constructor: function(data, options) {
	
			var featureSet = new esri.tasks.FeatureSet({
				geometryType: results.geometryType,
				features: results.features
			});
			
			var layerDefinition = {
			  "geometryType": results.geometryType,
			  "fields": results.fields,
			   "extent": {
			    "spatialReference": results.spatialReference
			   }
			}
			
			var featureCollection = {
			  layerDefinition: layerDefinition,
			  featureSet: featureSet
			};
							
			var this.featureLayer = new esri.layers.FeatureLayer(featureCollection, {
				id: "queryLayer",
				mode: esri.layers.FeatureLayer.MODE_ONDEMAND
			})
			
			var renderer = new esri.renderer.SimpleRenderer(
			    new esri.symbol.SimpleFillSymbol("solid", null, new dojo.Color([255, 0, 255, 0.75])
			));
			this.featureLayer.setRenderer(renderer);
			
		},	
		setVisibility: function(val){
			this.graphics.setVisibility(val);
		}
	}); // end of class declaration
  
}); // end of addOnLoad