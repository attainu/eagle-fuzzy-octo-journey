var map;
var service;
var infoWindow;
var origin;
var geocoder;


function initMap() {
    //var delhi = new google.maps.LatLng(28.625671, 77.186626);
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            origin = pos;
            console.log(origin);
            infoWindow = new google.maps.InfoWindow;
            var clickHandler = new ClickEventHandler(map, origin);

            infoWindow.setPosition(pos);
            infoWindow.setContent("You're Here");
            infoWindow.open(map);
            map.setCenter(pos);

            //reverse geocoding
            geocoder = new google.maps.Geocoder;
            geocoder.geocode({ 'location': origin }, function (results, status) {
                console.log("My result--> ", results)
                if (status === 'OK') {
                    if (results[0]) {

                        document.getElementById("destination").value = results[0].formatted_address;



                    } else {
                        window.alert('No results found');
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    map = new google.maps.Map(
        document.getElementById('map'), {
        center: origin,
        zoom: 18,
        disableDefaultUI: true
    });

    function handleLocationError(browserHasGeolocation, infoWindow, origin) {
        infoWindow.setPosition(origin);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    service = new google.maps.places.PlacesService(map);

    var source = document.getElementById('destination');
    var destination = document.getElementById('destination2');
    autoCompleteInput(source, map, service);
    autoCompleteInput(destination, map, service);
}

var autoCompleteInput = function (input, map, service) {
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
        var dest = input.value;

        var request = {
            query: dest,
            fields: ['name', 'geometry'],
        };
        service.findPlaceFromQuery(request, function (results, status) {
            console.log(results, status)
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
                console.log(results)
                map.setCenter(results[0].geometry.location);
            }
        });

        var place = autocomplete.getPlace();
        // place variable will have all the information you are looking for.
        console.log(place)

    });
}

var ClickEventHandler = function (map, origin) {
    this.origin = origin;
    this.map = map;
    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    this.directionsRenderer.setMap(map);
    this.placesService = new google.maps.places.PlacesService(map);
    this.infowindow = new google.maps.InfoWindow;


    // Listen for clicks on the map.
    this.map.addListener('click', this.handleClick.bind(this));
};

ClickEventHandler.prototype.handleClick = function (event) {
    console.log('You clicked on: ' + typeof (event.latLng));
    geocoder.geocode({ 'location': event.latLng }, function (results, status) {
        console.log("My result--> ", results)
        if (status === 'OK') {
            if (results[0]) {

                document.getElementById("destination2").value = results[0].formatted_address;



            } else {
                window.alert('No results found');
            }
        } else {
            window.alert('Geocoder failed due to: ' + status);
        }
    });
    // If the event has a placeId, use it.
    if (event.placeId) {
        console.log('You clicked on place:' + event.placeId);

        // Calling e.stop() on the event prevents the default info window from
        // showing.
        // If you call stop here when there is no placeId you will prevent some
        // other map click event handlers from receiving the event.

        event.stop();
        this.calculateAndDisplayRoute(event.placeId);

    }
};

ClickEventHandler.prototype.calculateAndDisplayRoute = function (placeId) {
    var me = this;
    console.log(this.origin)
    this.directionsService.route({
        origin: this.origin,
        destination: { placeId: placeId },
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            me.directionsRenderer.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
};


function createMarker(place) {
    console.log("ghvjgvjg-->", place)
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
    });
}
``