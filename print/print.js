dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.form.Button");
dojo.require("esri.map");
dojo.require("esri.dijit.Print");
      
function init() {
//esri.config.defaults.io.proxyUrl = "/arcgisserver/apis/javascript/proxy/proxy.ashx";

	var map = new esri.Map("map", {
	  center: [-90.733, 30.541],
	  zoom: 8
	});
	
	// print dijit
	var printer = new esri.dijit.Print({
	  map: map,
	  url: "http://services.azuron.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
	}, dojo.byId("printButton"));
	printer.startup();
	
	var url = "http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer";
	var tiledLayer = new esri.layers.ArcGISTiledMapServiceLayer(url, { "id": "Ocean" });
	map.addLayer(tiledLayer);
	
	// add census boundary dyn map svc
	var dynUrl = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer";
	var dynLayer = new esri.layers.ArcGISDynamicMapServiceLayer(dynUrl, { "id": "Boundaries" });
	map.addLayer(dynLayer);

}

dojo.ready(init);