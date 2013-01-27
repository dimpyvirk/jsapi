testConfig = {
  "application":{
    "appName":"Full Extent map viewer",
    "initialMap":"administrative",
    "defaultMenu":"layer",
    "aboutTitle":"About this map",
    "baseMap":"grey",
    "extent":{
      "xMin":10375763,
      "yMin":-4700876,
      "xMax":21822973,
      "yMax":-787301,
      "spatialRef":102113
    },
    "showScalebar":false,
    "locateString":"",
    "searchBoxPlaceholder":"Find a place",
    "printServer":"http://services.azuron.com/arcgis/rest/services/printing/ExportWebMap/GPServer/Export%20Web%20Map",
    "printTemplates":[
      {
        "layout":"FE A4 landscape",
        "label":"A4 landscape"
      },
      {
        "layout":"FE A3 landscape",
        "label":"A3 landscape"
      },
      {
        "layout":"FE A4 portrait",
        "label":"A4 portrait"
      },
      {
        "layout":"FE A3 portrait",
        "label":"A3 portrait"
      }
    ],
    "socialMediaShareDesc":"I found this map by Full Extent",
    "identifyTolerance":"5",
    "offsetTolerance":"3",
    "gazetteer":{
      "URL":"http://services.azuron.com/arcgis/rest/services/OEH/Gazetteer/MapServer/0",
      "nameField":"name",
      "latField":"lat",
      "longField":"long",
      "wkid":4283,
      "buffer":5000
    },
    "semanticService":"http://services.azuron.com/fe-rss/KML?url=",
    "geometryService":"http://services.azuron.com/arcgis/rest/services/Utilities/Geometry/GeometryServer",
    "keys":{
      "bing":"AqsBhjBtCIFp8uW5KMQ6j_heuOU9ORNS1ZdiGseSv0P44o2f13_RRijRh1HlFbTm",
      "google":"",
      "fullExtent":""
    },
    "development":false,
    "hoverPoly":[
      {
        "fillStyle":"esriSFSNull",
        "lineStyle":"esriSLSSolid",
        "lineWeight":20,
        "lineColor":[
          255,
          144,
          0
        ],
        "fillColor":[
          255,
          144,
          0,
          0.8
        ]
      }
    ],
    "selectPoly":"",
    "selectPoint":"",
    "selectLine":"",
    "hoverPoint":"",
    "hoverLine":"",
    "clusterImage":"http://fullextent.com.au/images/thumbnails/cluster72x72.png",
    "pointSymbol":"http://fullextent.com.au/images/thumbnails/bluepoint-21x29.png",
    "clusterTolerance":25,
    "proxyURL":"./resources/proxy.ashx",
    "alwaysUseProxy":false,
    "bitly":{
      "login":"stephenlead",
      "key":"R_1e843270dd6ed672769ec49f5d55577d",
      "APIURL":"http://api.bit.ly/v3/shorten"
    },
    "embedSizes":{
      "small":{
        "width":480,
        "height":360
      },
      "medium":{
        "width":700,
        "height":525
      },
      "large":{
        "width":940,
        "height":705
      },
      "maximum":{
        "width":1900,
        "height":1200
      },
      "minimum":{
        "width":350,
        "height":250
      }
    },
    "maxLevel":"17",
    "lods":[
      {
        "level":1,
        "resolution":78271.5169639999,
        "scale":295828763.795777
      },
      {
        "level":2,
        "resolution":39135.7584820001,
        "scale":147914381.897889
      },
      {
        "level":3,
        "resolution":19567.8792409999,
        "scale":73957190.948944
      },
      {
        "level":4,
        "resolution":9783.93962049996,
        "scale":36978595.474472
      },
      {
        "level":5,
        "resolution":4891.96981024998,
        "scale":18489297.737236
      },
      {
        "level":6,
        "resolution":2445.98490512499,
        "scale":9244648.868618
      },
      {
        "level":7,
        "resolution":1222.99245256249,
        "scale":4622324.434309
      },
      {
        "level":8,
        "resolution":611.49622628138,
        "scale":2311162.217155
      },
      {
        "level":9,
        "resolution":305.748113140558,
        "scale":1155581.108577
      },
      {
        "level":10,
        "resolution":152.874056570411,
        "scale":577790.554289
      },
      {
        "level":11,
        "resolution":76.4370282850732,
        "scale":288895.277144
      },
      {
        "level":12,
        "resolution":38.2185141425366,
        "scale":144447.638572
      },
      {
        "level":13,
        "resolution":19.1092570712683,
        "scale":72223.819286
      },
      {
        "level":14,
        "resolution":9.55462853563415,
        "scale":36111.909643
      },
      {
        "level":15,
        "resolution":4.77731426794937,
        "scale":18055.954822
      },
      {
        "level":16,
        "resolution":2.38865713397468,
        "scale":9027.977411
      },
      {
        "level":17,
        "resolution":1.19432856685505,
        "scale":4513.988705
      }
    ],
    "locatorURL":"",
    "gazetteerURL":""
  },
  "basemaps":[
    {
      "id":"BingRoads",
      "title":"Bing - Road",
      "thumbnail":"http://fullextent.com.au/images/thumbnails/BingRoad_thumb.png",
      "bing":true,
      "mapStyle":"ROAD"
    },
    {
      "id":"BingAerial",
      "title":"Bing - Aerial",
      "bing":true,
      "thumbnail":"http://fullextent.com.au/images/thumbnails/BingAerial_thumb.png",
      "mapStyle":"AERIAL_WITH_LABELS"
    },
    {
      "id":"osm",
      "title":"OpenStreetmap",
      "thumbnail":"http://fullextent.com.au/images/thumbnails/osm.jpg",
      "osm":true,
      "copyrightText":"© <a href='http://www.openstreetmap.org/' target='_blank'>OpenStreetMap</a> contributors, <a href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'>CC-BY-SA</a>"
    },
    {
      "id":"grey",
      "title":"grey",
      "thumbnail":"http://fullextent.com.au/images/thumbnails/Grey_thumb.png",
      "services":[
        {
          "url":"http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer"
        },
        {
          "url":"http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer"
        }
      ]
    }
  ],
  "layers":[
    {
      "url":"http://ga.gov.au/gis/rest/services/topography/Topo_WM/MapServer",
      "layerType":"tiled",
      "id":"ga2",
      "layerInfo":{
        "title":"Topo2",
        "description":"The Topo Plus map service is seamless national dataset coverage for the whole of Australia. The map portrays detailed graphic representation of features that appear on the Earth's surface. These features include cultural, hydrography and relief themes. SS and MS refer to Small Scale and Medium Scale datasets.",
        "visible":true,
        "transparency":"0.99",
        "transparencySlider":true,
        "showLegend":false
      },
      "attributes":[
        
      ]
    },
    {
      "url":"http://ga.gov.au/gis/rest/services/topography/Topo_WM/MapServer",
      "layerType":"dynamic",
      "visibleLayers":[
        "0",
        "1",
        "2",
        "3",
        "28"
      ],
      "id":"ga-dyn",
      "layerInfo":{
        "title":"Dynamic version of GA data",
        "description":"The Topo Plus map service is seamless national dataset coverage for the whole of Australia. The map portrays detailed graphic representation of features that appear on the Earth's surface. These features include cultural, hydrography and relief themes. SS and MS refer to Small Scale and Medium Scale datasets.",
        "visible":true,
        "transparencySlider":true,
        "showLegend":false
      },
      "attributes":[
        
      ]
    },
    {
      "id":"geology-rock-units",
      "layerType":"tiled",
      "url":"http://services.azuron.com/arcgis/rest/services/GeoScience/Geology_RockUnit/MapServer",
      "layerInfo":{
        "title":"Rock units",
        "description":"lorem ipsum",
        "transparencySlider":true,
        "transparency":0.5,
        "visible":true,
        "icon":"http://findicons.com/files/icons/1208/spooky_stickers/16/zombie.png"
      },
      "identifyProps":[
        {
          "layerId":1,
          "mapServiceName":"Rock Unit colours",
          "attributes":[
            "MAX_GEOAGE",
            "MIN_GEOAGE",
            "DESCRIPTN"
          ],
          "aliases":[
            "Maximum Age",
            "Minimum Age",
            "Description"
          ]
        }
      ]
    },
    {
      "url":"http://services.azuron.com/arcgis/rest/services/ABS/BasicCommunityProfile_2011/MapServer",
      "layerType":"dynamic",
      "visibleLayers":[
        "3"
      ],
      "id":"sa4",
      "layerInfo":{
        "title":"sa4",
        "description":"census polygons",
        "visible":false,
        "transparencySlider":true,
        "transparency": 0.8,
        "showLegend":false,
        "minScale":"0",
        "maxScale":"0",
        "visible": true
      },
      "attributes":[
        
      ]
    }
  ],
  "maps":{
    "categories":[
      {
        "category":"Geoscience",
        "maps":[
          {
            "id":"ga-all",
            "title":"ga-all",
            "description":"Geoscience Australia",
            "layers":[
              "ga2",
              "geology-rock-units"
            ],
            "about":"",
            "category":"Geoscience",
            "aboutContent":""
          }
        ]
      },
      {
        "category":"census",
        "maps":[
          {
            "id":"census1",
            "title":"census1",
            "description":"",
            "layers":[
              "sa4"
            ],
            "about":""
          }
        ]
      }
    ]
  }
}