dojo.provide("modules.SelectionLayer");
dojo.addOnLoad(function() {
	dojo.declare("modules.SelectionLayer", null, {
		// Doc: http://docs.dojocampus.org/dojo/declare#chaining
		"-chains-": {
			constructor: "manual"
		},
		// constructor
		constructor: function(options) {
		
			this.id = options.id;
			this.fields = options.fields;
		
			//Build a table for the results
			this.resultsTable = {};
			this.resultsTable.id = "tblSearchResults_" + this.id;
			var table = "<table id='" + this.resultsTable.id + "' class='table table-striped table-bordered table-condensed sortable selectionTable'>";
			table += "<thead class='noSelect'>";
			
			//Add the remaining attributes to the header
			var numFields = this.fields.length;
			for (var i = 0; i < numFields; i++) {
				var field = this.fields[i];
				table += "<td>" + field + "</td>"
			}
			table += "</thead><tbody></tbody>";
			
			//Create a new tab to hold the resultsTable, and add it to the results panel
			$("#searchResultsTabs ul").append('<li id="tab_' + this.id + '"><a href="#' + this.id + '"><span>' + this.id + '</span></a></li>');
			var HTML = $("#searchResultsTabs").html();
			HTML += "<div id='" + this.id + "'>" + table + "</div";
			$("#searchResultsTabs").html(HTML);
			
			//Allow table sorting.
			this.resultsTable.oTable = $('#' + this.resultsTable.id).dataTable({
			
				"aaSorting": [ ],
				"bLengthChange": false,
				"bFilter": false
				//"bDestroy": true	
			});
						
		},
		addFeatures: function(features) {
			
			//Add new features to the table
			var numFeatures = features.length;
			for (var j=0; j < numFeatures; j++) {
				var feature = features[j];

				//Append the row to this layer's attribute table
				var row = [];
				var attrs = this.fields;
				var numAttr = attrs.length;
				for (var i = 0; i < numAttr; i++) {
					var attr = attrs[i];
					var value = feature.attributes[attr];
					row.push(value);
				}				
				this.resultsTable.oTable.fnAddData(row);
			}			
			
			//Reload the table
			this.resultsTable.oTable.fnDraw();
			
			//Switch to this table's tab
			var index = $('#searchResultsTabs a[href="#' + this.id + '"]').parent().index();
			$("#searchResultsTabs" ).tabs( "refresh" );
			$("#searchResultsTabs" ).tabs( "option", "active", index );
			
		}	
	}); // end of class declaration
  
}); // end of addOnLoad