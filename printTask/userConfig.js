userConfig.application = {

	"printServer": "http://services.azuron.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
	"printTemplates": [
		{
		    "label": "Map",
		    "format": "PDF",
		    "layout": "MAP_ONLY",
		    "exportOptions": {
		      "width": 500,
		      "height": 400,
		      "dpi": 96
		    }
		}, {
		    "label": "Layout",
		    "format": "PDF",
		    "layout": "A4 Portrait",
		    "layoutOptions": {
		      "titleText": "My Print",
		      "authorText": "esri",
		      "copyrightText": "My Company",
		      "scalebarUnit": "Miles",
		    }
		}]
	}
