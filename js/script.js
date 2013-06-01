(function () {
    var map  = {},
        node = $('#mapNode'), chiMap,
        styleArr = [
            {
                "stylers": [
                    { "visibility": "simplified" },
                    { "saturation": 1 },
                    { "lightness": 50 }
                ]
            }
        ],
        mapOptions = {
            center: new google.maps.LatLng(41.89,-87.65),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: styleArr
        };
        

    $(node).css('height', '100%');
    $('html').css('height', '100%');
    $('body').css({'height' : '100%', 'margin' : 0});


    map.init = function (data) {
        chiMap = new google.maps.Map(node[0], mapOptions);
        map.createMarkers(data);
    }

    map.createMarkers = function (data) {
        var len = data.length, list = {};
        for (var i = 0; i < len; i++) {
            var loc    = data[i].Location;
                latlng = {};

            loc = loc.replace(/[\(|\)|' ']/g, '');
            latlng['lat']  = Number(loc.split(',')[0]);
            latlng['long'] = Number(loc.split(',')[1]);
            latLng = new google.maps.LatLng(latlng.lat, latlng.long);
            color = getColor(data[i]);
            list[loc] = i;

            var marker = new google.maps.Marker({
                position: latLng,
                map: chiMap,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,    
                    fillColor: color,
                    strokeColor: color,
                    scale: 1,
                    fillOpacity: 1
                }
            });
        }
    }

    function getColor (data) {
        var color;

        if (data.BLUE) {
            color = '#01a1df';
        } else if (data.BRN) {
            color = '#62361b';
        } else if (data.G) {
            color = 'lime';
        } else if (data.O) {
            color = '#FF4719';
        } else if (data.P) {
            color = '#FF00FF';
        } else if (data.Pnk) {
            color = '#e27da5';
        } else if (data.RED) {
            color = '#FF0000';
        } else if (data.Y) {
            color = '#f9e401';
        }

        return color;
    }

    showError = function () {
        $('body').prepend('<p> There has been an error.</p>')
    }

    $.ajax({
        url : "data/data.json",
        dataType : 'json',
        success : map.init,
        error : showError
    });

})();