//(function () {
    //function initMap() {
    //    if (GBrowserIsCompatible()) {
    //        map = new GMap2(document.getElementById("map"));
    //        map.setCenter(new GLatLng(37.4419, -122.1419), 1);
    //        map.setUIToDefault();
    //        geocoder = new GClientGeocoder();
    //    }
        //var uluru = { lat: -25.363, lng: 131.044 };
        //var map = new google.maps.Map(document.getElementById('map'), {
        //    zoom: 4,
        //    center: uluru
        //});
        //var marker = new google.maps.Marker({
        //    position: uluru,
        //    map: map
        //});
    //}
//});

//$(window).unload(function () {
//    GUnload();
//});


//function initMap() {
//    var map = new google.maps.Map(document.getElementById('map'), {
//        center: { lat: -33.866, lng: 151.196 },
//        zoom: 15
//    });

//    var infowindow = new google.maps.InfoWindow();
//    var service = new google.maps.places.PlacesService(map);

//    service.getDetails({
//        placeId: 'ChIJN1t_tDeuEmsRUsoyG83frY4'
//    }, function (place, status) {
//        if (status === google.maps.places.PlacesServiceStatus.OK) {
//            var marker = new google.maps.Marker({
//                map: map,
//                position: place.geometry.location
//            });
//            google.maps.event.addListener(marker, 'click', function () {
//                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
//                    'Place ID: ' + place.place_id + '<br>' +
//                    place.formatted_address + '</div>');
//                infowindow.open(map, this);
//            });
//        }
//    });
//}


(function () {
    // resize the canvas to fill browser window dynamically
    window.addEventListener('resize', resizeMap, false);

    function resizeMap() {
        $('#map').width($('#sendBtn').width() + 25);
//        canvas.height = window.innerHeight;
    }
    resizeMap();
})();



var map = null;
var geocoder = null;
var marker = null;
//var infowindow = null;

//function initMap() {
//    if (GBrowserIsCompatible()) {
//       map = new GMap2(document.getElementById("map"));
//       //map.setCenter(new GLatLng(37.4419, -122.1419), 1);
//       //map.setUIToDefault();
//       geocoder = new GClientGeocoder();
//       showAddress($('#address').val());
//    }
//}

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), { mapTypeControl: false, streetViewControl: false, fullscreenControl: false });
    geocoder = new google.maps.Geocoder();
    showAddress($('#address').val());
}

function showAddress(address) {
    if (geocoder) {
        geocoder.geocode({ 'address': address },
            function (result, status) {
                if (status != google.maps.GeocoderStatus.OK) {
                    alert(address + " not found");
                } else {
                    map.fitBounds(result[0].geometry.viewport);
                    //var marker_title = result[0].formatted_address;
                    $('#fullAddress').text(result[0].formatted_address);
                    $('#hdnFullAddress').val(result[0].formatted_address);
                    if (marker != null) {
                        marker.setPosition(result[0].geometry.location);
                       // marker.setTitle(marker_title);
                       // infowindow.setContent(marker_title);
                    } else {
                        marker = new google.maps.Marker({
                            position: result[0].geometry.location,
                           // title: marker_title,
                            map: map
                        });

                        //infowindow = new google.maps.InfoWindow({
                        //    content: marker_title
                        //});

                        //infowindow.open(map, marker);
                    }
                }
            }
        );
    }
}

//function showAddress(address) {
//    if (geocoder) {
//        //geocoder.getLatLng(
//        geocoder.LatLng(
//            address,
//            function (point) {
//                if (!point) {
//                    alert(address + " not found");
//                } else {
//                    map.setCenter(point, 15);
//                    marker = new GMarker(point, { draggable: true });
//                    map.clearOverlays();
//                    map.addOverlay(marker);
//                    geocoder.getLocations(address, getFormattedAddress);
//                    //var elem = geocoder.getFromLocation(point.lat(), point.lng(), 1);
//                    //GEvent.addListener(marker, "dragend", function () {
//                    //    marker.openInfoWindowHtml(marker.getLatLng().toUrlValue(6));
//                    //});
//                    //GEvent.addListener(marker, "click", function () {
//                    //    marker.openInfoWindowHtml(marker.getLatLng().toUrlValue(6));
//                    //});
//                    //GEvent.trigger(marker, "click");
//                }
//            }
//        );
//    }
//}

//function getFormattedAddress(response) {
//    console.log(response)
//    if (!response || response.Status.code != 200) {
//        alert("\"" + address + "\" not found");
//    } else {
//        correctAddress = response.Placemark[0].address;
//        marker.openInfoWindowHtml(correctAddress);
//    }
//}
