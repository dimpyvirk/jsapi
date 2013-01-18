function setupPrinter() {
	//Verify that the print server has been specified. Disable printing if not.
	if(!userConfig.application.printServer) {
		alert("no print server found");
		jQuery("#btnPrint").hide();
		return null;
	}
	
	//Configure the print task
	feMap.printTask = new esri.tasks.PrintTask("http://servicesbeta4.esri.com/arcgis/rest/services/Utilities/ExportWebMap/GPServer/Export%20Web%20Map%20Task");
}

function createPrint() {
	var template = new esri.tasks.PrintTemplate();
	template.exportOptions = {
		width: 500,
		height: 400,
		dpi: 96
	};
	template.format = "PDF";
	template.layout = "MAP_ONLY";
	template.preserveScale = false;
		
	var params = new esri.tasks.PrintParameters();
	params.map = map;
	params.template = template;
	
}

function printResult(result) {
	alert(result.url)
}

function printError(error) {
	alert(error);
}