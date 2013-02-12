dojo.provide("modules.QueryLayer");
dojo.addOnLoad(function() {
	dojo.declare("modules.QueryLayer", null, {
		// Doc: http://docs.dojocampus.org/dojo/declare#chaining
		"-chains-": {
			constructor: "manual"
		},
		// constructor
		constructor: function(data, options) {
	
			this.featureSet = new esri.tasks.FeatureSet();
			this.featureSet.features = data;
			
			this.geometryType = "esriGeometryPolygon"; //featureSet[0].geometry.declaredClass;
			this.fields = 	[
			 {
			   "name": "NAME",
			   "type": "esriFieldTypeString",
			   "alias": "Name"
			  },
			  {
			   "name": "PERENNIAL",
			   "type": "esriFieldTypeString",
			   "alias": "Perenniality"
			  },
			  {
			     "name": "OBJECTID",
			     "type": "esriFieldTypeOID",
			     "alias": "OBJECTID"
			   }
			]
			
			this.layerDefinition = {
			  "geometryType": "esriGeometryPolygon",
			  "fields": this.fields,
			  "objectIdField": "OBJECTID",
			}
			this.featureCollection = {
			  layerDefinition: this.layerDefinition,
			  featureSet: this.featureSet
			};
			
			var outline = new esri.symbol.SimpleLineSymbol()
	              .setColor(dojo.colorFromHex("#fff"));
	        var sym = new esri.symbol.SimpleFillSymbol()
	              .setColor(new dojo.Color([52, 67, 83, 0.4]))
	              .setOutline(outline);
	        var renderer = new esri.renderer.SimpleRenderer(sym);
			
			this.featureLayer = new esri.layers.FeatureLayer(this.featureCollection, {
			  mode: esri.layers.FeatureLayer.MODE_SNAPSHOT,
			  renderer: renderer,
			  id: "queryLayer"
			});
		},	
		setVisibility: function(val){
			this.graphics.setVisibility(val);
		}
	}); // end of class declaration
  
}); // end of addOnLoad