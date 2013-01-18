dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.form.Button");
dojo.require("esri.map");
dojo.require("esri.dijit.Print");

var printer;
      
function init() {

	var map = new esri.Map("map", {
	  center: [-90.733, 30.541],
	  zoom: 8
	});
	
	// print dijit
	
	var printTemplates = [
		{
		    label: "Map",
		    format: "PDF",
		    layout: "MAP_ONLY",
		    exportOptions: {
		      width: 500,
		      height: 400,
		      dpi: 96
		    }
		}, {
		    label: "Layout",
		    format: "PDF",
		    layout: "A4 Portrait",
		    layoutOptions: {
		      titleText: "My Print",
		      authorText: "esri",
		      copyrightText: "My Company",
		      scalebarUnit: "Miles",
		    }
		}];
		
	printer = new esri.dijit.Print({
	  map: map,
	  templates: printTemplates,
	  url: "http://services.azuron.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
	}, dojo.byId("printButton"));
	
	printer.startup();
	dojo.connect(printer,'onError',function(error){
	    alert('Print error : ' + error);
	  });
	
	var url = "http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer";
	var tiledLayer = new esri.layers.ArcGISTiledMapServiceLayer(url, { "id": "Ocean" });
	map.addLayer(tiledLayer);
	
	// add census boundary dyn map svc
	var dynUrl = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer";
	var dynLayer = new esri.layers.ArcGISDynamicMapServiceLayer(dynUrl, { "id": "Boundaries" });
	map.addLayer(dynLayer);

}

dojo.ready(init);