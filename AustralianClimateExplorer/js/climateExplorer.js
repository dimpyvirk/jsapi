var map, dialog, selSym, hc, charts = [
	{
		"source": "pt",
		"chartType":"column",
		"renderTo": "rainfall",
		"labels": {"title": "Average monthly rainfall"},
		"fields": [
			{"flds": ["rainJan","rainFeb","rainMar","rainApr","rainMay","rainJun","rainJul","rainAug","rainSep","rainOct","rainNov","rainDec"]}
		],
		"yAxis": {"title": {"text": "millimetres"}},
		"xAxis": [
			{"categories": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}
		],
		"tooltip": {"suffix": " mm/month"}
	},
	{
		"source": "pt",
		"chartType":"line",
		"renderTo": "tempRange",
		"labels": {"title": "Average temperature range"},
		"fields": [
			{"flds": ["minJan","minFeb","minMar","minApr","minMay","minJun","minJul","minAug","minSep","minOct","minNov","minDec"]},
			{"flds": ["maxJan","maxFeb","maxMar","maxApr","maxMay","maxJun","maxJul","maxAug","maxSep","maxOct","maxNov","maxDec"]}
		],
		"yAxis": {
			"title": {"text": "deg Celsius"}
		},
		"xAxis": [
			{"categories": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}
		],
		"tooltip": {"suffix": " deg C"}
	},{
		"source": "query",
		"chartType":"line",
		"renderTo": "maxTemp",
		"tooltip": {"suffix": " deg C"},
		"labels": {"title": "Average maximum temperature"},
		"yAxis": {"title": {"text": "deg C"}}
		//xAxis is supplied by the results of a query at run-time
	}];
var base = "http://www.bom.gov.au/jsp/ncc/cdio/weatherData/av?p_nccObsCode=136&p_display_type=dailyDataFile&p_startYear=&p_c=&p_stn_num=";

require(["dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dijit/TooltipDialog","dijit/Popup",
"dojo/ready", "esri/map", "esri/tasks/query", "esri/dijit/Geocoder", "esri/layers/FeatureLayer"], function() {
	
	map = new esri.Map("map", {center: [133.9, -25.8],zoom: 5,basemap: "gray",maxZoom: 10});
	selSym = new esri.symbol.SimpleMarkerSymbol().setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE).setColor(new dojo.Color([255,255,0,1]));
	var weatherStations = new esri.layers.FeatureLayer("http://54.252.134.128:6080/arcgis/rest/services/climate/WeatherStations/MapServer/0",
		{mode: esri.layers.FeatureLayer.MODE_ONDEMAND,outFields: ["*"], opacity: 0.75}
	);
	dojo.connect(map, "onLoad", function() {
		map.addLayer(weatherStations);
	});
	dojo.connect(weatherStations, "onClick", function(evt) {
		buildCharts(evt.graphic);
	});
	dojo.connect(weatherStations, "onMouseOver", function(evt) {
		map.setMapCursor("pointer");
		dialog.setContent(evt.graphic.attributes["Site_name"]);
		dijit.popup.open({popup: dialog, x:evt.pageX,y:evt.pageY});
	});
	dojo.connect(weatherStations, "onMouseOut", function(evt) {
		map.setMapCursor("default");
		dijit.popup.close();
	});
	dojo.connect(weatherStations,"onLoad", function() {
		setTimeout(function(){
		    var query = new esri.tasks.Query(); //prime the charts with a random station
		    query.objectIds = [Math.floor(Math.random()*1417)]; //there are 1418 stations
		    query.outFields = ["*"];
		    weatherStations.queryFeatures(query, function(featureSet) {
		    	buildCharts(featureSet.features[0]);
		    });
	    }, 1000);
	    //Initialise the tooltip dialog, which display the station name on hover
	    dialog = new dijit.TooltipDialog({id: "tooltipDialog"});
	    dialog.startup();
	});
	
	//Initialise the geocoder, to allow address finding
	var geocoder = new esri.dijit.Geocoder({
		map: map, autoComplete: true,
		arcgisGeocoder: {placeholder: "Find a place", sourceCountry: "AUS"}
	},"search");
    geocoder.startup();
});

//Once the user has found a weather station, build a series of charts from it
function buildCharts(graphic) {
	//Report the station's name (truncated if necessary) and its URL on the BOM site
	var name = graphic.attributes["Site_name"];
	if(name.length > 25) {name = name.substring(name, 23) + "...";}
	$("#name").html(name);
	$("#source a").attr("href", base + graphic.attributes["Site"]);
	
	//Highlight this station
	map.graphics.clear();
	var highlight = new esri.Graphic(graphic.geometry, selSym);
	map.graphics.add(highlight);
	
	//Build the charts
//	for (var i = 0; i < charts.length; i++) {
//		hc = charts[i];
	$(charts).each(function(idx, hc){
		hc.series = new Array();
		if (hc.source == "pt") {
			var attr = graphic.attributes;
			for (var y = 0; y < hc.fields.length; y++) {
				var flds = hc.fields[y].flds;
			    var field = flds[0];
			    var data = new Array();
			    data[0] = attr[field];
			    var numFields = flds.length;
			    for (var x = 1; x < numFields; x++) {data[x] = attr[flds[x]];}
			    hc.series[y] = new Object();
			    hc.series[y].data = data;
			}
			drawChart(hc);
		} else {
			var qt = new esri.tasks.QueryTask("http://54.252.134.128:6080/arcgis/rest/services/climate/WeatherStations/MapServer/1");
			var query = new esri.tasks.Query();
			query.outFields = ["*"];
			query.where = "Site = " + graphic.attributes["Site"];
			qt.execute(query, function(results) {
				var data = [], cats = [];
				for (var j = 0; j < results.features.length; j++) {
					data.push(results.features[j].attributes.maxAvg);
					cats.push(results.features[j].attributes.year.toString());					
				}
				hc.xAxis = {"categories": cats, labels: {step: Math.round(cats.length/5)}};
				hc.series[0] = new Object();
				hc.series[0].data = data;
				drawChart(hc);
			});
		}
	});
}
function drawChart(hc) {
	var chart = new Highcharts.Chart({
	    chart: {
	    	renderTo: hc.renderTo,
	    	defaultSeriesType: hc.chartType,
	    	marginBottom: 50
	    },
	    legend: {enabled: false},
	    title: {text: hc.labels.title},
	    xAxis: hc.xAxis,
	    yAxis: hc.yAxis,
	    credits: {enabled: false},
	    colors: [
	    	'#4572A7', 
	    	'#AA4643'
	    ],
	    tooltip: {
	    	formatter: function () {return this.point.category+": "+this.point.y+hc.tooltip.suffix;}
	    },
	    series: hc.series}
	);}
function toggleWelcomeDialog() {
	$("#wd").is(':visible') ? $("#wd").hide() : $("#wd").show();
}
$(document).on("click", "#information", function() {
	toggleWelcomeDialog()}
);