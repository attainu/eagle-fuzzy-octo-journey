$(document).ready(function () {
    // $(".column-center").hide();
    $(".bg-modal").hide();
    $(".bg-modal-arrived").hide();
    $(".bg-modal-reached").hide();
    $(".booking-card").hide();


    var map;
    var service;
    var infoWindow;
    var origin;
    var geocoder;
    var markers = [];
    var minDistance;
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var pathLine;
    var pathLineMain;
    var source;
    var destination;
    var latestMarker;
    var cabs = [
        {
            name: "Rupesh",
            contact: "8830547364"
        },
        {
            name: "Arvind",
            contact: "8830547364"
        },
        {
            name: "Sangmesh",
            contact: "8830547364"
        },
        {
            name: "Rahul",
            contact: "8830547364"
        },
        {
            name: "Ajim",
            contact: "8830547364"
        },
        {
            name: "Amol",
            contact: "8830547364"
        },
        {
            name: "Saif Ali",
            contact: "8830547364"
        },
        {
            name: "Tom Cruise",
            contact: "8830547364"
        },
        {
            name: "Naruto Uzumaki",
            contact: "8830547364"
        },
        {
            name: "Sasuke Uchiha",
            contact: "8830547364"
        },
        {
            name: "Goku",
            contact: "8830547364"
        },
        {
            name: "Vegeta",
            contact: "8830547364"
        },
        {
            name: "Captain America",
            contact: "8830547364"
        },
        {
            name: "Iron Man",
            contact: "8830547364"
        },
        {
            name: "Ichigo Kurasaki",
            contact: "8830547364"
        },
    ]


    function init() {
        //var delhi = new google.maps.LatLng(28.625671, 77.186626);

        // HTML5 geolocation.

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                origin = pos;
                console.log(origin);
                infoWindow = new google.maps.InfoWindow;
                var source = document.getElementById('destination');
                var destination = document.getElementById('destination2');
                autoCompleteInput(source, map, service);
                autoCompleteInput(destination, map, service);



                createRandomMarkers(map, origin);

                createLocationMarker(origin);

                infoWindow.setPosition(pos);


                map.setCenter(pos);

                //reverse geocoding
                geocoder = new google.maps.Geocoder;
                geocoder.geocode({ 'location': origin }, function (results, status) {
                    console.log("My result--> ", results[0].geometry.location.lat())
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
        //Loading Mao
        map = new google.maps.Map(
            document.getElementById('map'), {
            center: origin,
            zoom: 15,
            disableDefaultUI: true
        });
        // Rendering Path on map
        directionsRenderer.setMap(map);

        function handleLocationError(browserHasGeolocation, infoWindow, origin) {
            infoWindow.setPosition(origin);
            infoWindow.setContent(browserHasGeolocation ?
                'Error: The Geolocation service failed.' :
                'Error: Your browser doesn\'t support geolocation.');
            infoWindow.open(map);
        }

        service = new google.maps.places.PlacesService(map);

        //Handling When place is changed in input box by he user

        var onChangeHandler = function () {
            calculateAndDisplayRoute(directionsService, directionsRenderer , null);
        };
        document.getElementById('destination2').addEventListener('change', onChangeHandler);

        //Finding nearest cab to the source location

        var findNearestMarker = function () {
            var nearestMarker = markers[0];
            console.log(markers)
            minDistance = findDistance(origin, markers[0]);
            for (var i = 1; i < 15; i++) {
                if (minDistance > findDistance(origin, markers[i])) {
                    minDistance = findDistance(origin, markers[i]);
                    nearestMarker = markers[i];
                }


            }
            var markerCoords = {
                lat: nearestMarker.position.lat(),
                lng: nearestMarker.position.lng()
            }
            console.log(minDistance, nearestMarker);

            // Collect the markers which are not required on map
            var extraMarkers = markers.filter((marker) => {
                return marker != nearestMarker;
            });

            // Remove the collected markers

            setTimeout(function () {
                removeMarkers(extraMarkers);
                calculateAndDisplayRouteFromCab(directionsService, directionsRenderer, origin, markerCoords, nearestMarker);

            }, 1000);


            var cabbyNumber = Math.floor((Math.random() * 15));
            var cabby = cabs[cabbyNumber];

            // Pop out the modal after 1 second

            /* $(".bg-modal").fadeIn(1000);
            // $(".column-center").show();
         

         $('#sidebar').toggleClass('active');
         document.querySelectorAll('#sizeId').forEach(ele => {
             ele.classList.add('icon-size');
             $('#sidebarCollapse').hide()
         });
         $(".click-temp").hide(); */
            $('#sidebar').removeClass('active');
            $('#sidebarCollapse').show()
            $(".bg-modal").fadeOut(1000);
            $("#cabbyName").text("Name: " + cabby.name);
            $("#cabbyNumber").text("Contact: " + cabby.contact);
            $(".booking-card").removeClass("booking-card").addClass("booking-card-start").fadeIn(1500);
            setTimeout(function () {

                $(".booking-card-start").removeClass("booking-card-start").addClass("booking-card").fadeIn(1000);
            }, 3000);

            var onClickHandler = function () {
                $(".bg-modal-arrived").fadeOut(700);
                $(".btn-2").attr("disabled", true);
                calculateAndDisplayRoute(directionsService, directionsRenderer , latestMarker);
            };

            //On Clicks
            $(".btn-cancel").on("click", function () {
                location.reload();
            });
            $(".btn-ride").on("click", onClickHandler);
            $(".btn-reached").on("click" , function(){
                location.reload();
            })

        }

        //document.getElementById("searchCabs").addEventListener("click", findNearestMarker);
        document.getElementById("searchCabs").addEventListener("click", function () {
            if (document.getElementById("destination2").value == "") {
                return alert("Enter Destination");
            }

            source = document.getElementById("destination").value;
            destination=document.getElementById("destination2").value;
            
            $(".bg-modal").fadeIn(1000);
            // $(".column-center").show();


            $('#sidebar').toggleClass('active');
            document.querySelectorAll('#sizeId').forEach(ele => {
                ele.classList.add('icon-size');
                $('#sidebarCollapse').hide()
            });
            $(".click-temp").hide();

        });
        $(".btn-1").on("click", findNearestMarker)
        $(".btn-2").on("click", function () {
            location.reload();
        });

    }

    //Direction Source to destination

    function calculateAndDisplayRoute(directionsService, directionsRenderer , nearestMarker) {
        directionsService.route(
            {
                origin: { query: document.getElementById('destination').value },
                destination: { query: document.getElementById('destination2').value },
                //origin: {query : source},
                //destination: {query : destination},
                travelMode: 'DRIVING'
            },
            function (response, status) {
                if (status === 'OK') {

                    directionsRenderer.setDirections(response);
                    
                    if(nearestMarker!=null){
                    pathLineMain = response.routes[0].overview_path;
                    createDynamicMarkerOnRoute(nearestMarker);
                    
                    }
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
    }


    function calculateAndDisplayRouteFromCab(directionsService, directionsRenderer, origin, marker, nearestMarker) {
        console.log("myOrigin---->", origin)
        directionsService.route(
            {
                origin: { location: origin },
                destination: { location: marker },
                travelMode: 'DRIVING'
            },
            function (response, status) {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);
                    console.log("Checking response--->", response.routes[0].overview_path);
                    pathLine = response.routes[0].overview_path;
                    console.log("---------->>>>>>", pathLine, pathLine.length)
                    createDynamicMarker(nearestMarker);

                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
    }

    var autoCompleteInput = function (input, map, service) {
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function () {
            var dest = input.value;

            var request = {
                query: dest,
                fields: ['name', 'geometry'],
            };
            if (input == document.getElementById("destination")) {
                service.findPlaceFromQuery(request, function (results, status) {
                    console.log(results, status)
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            createMarker(results[i]);
                        }
                        var location = {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()

                        }

                        if (input == document.getElementById("destination")) {
                            console.log("firs6 search-->", origin);
                            origin = location;
                            console.log("2nd search-->", origin);

                            createRandomMarkers(map, location);
                        }

                        map.setCenter(results[0].geometry.location);

                    }
                });
            }

            var place = autocomplete.getPlace();
            // place variable will have all the information you are looking for.
            console.log(place)

        });
    }

    function createMarker(place) {
        console.log("ghvjgvjg-->", place.geometry.location)
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });


        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(place.name);
            infoWindow.open(map, this);
        });
    }

    function createLocationMarker(pos) {
        var marker = new google.maps.Marker({
            map: map,
            position: pos,
            draggable: true,
            icon: "images/mylocation.png",
            animation: google.maps.Animation.DROP,
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent("You're Here");
            infoWindow.open(map, this);
        });

        google.maps.event.addListener(marker, 'drag', function (event) {
            geocoder = new google.maps.Geocoder;
            geocoder.geocode({ 'location': event.latLng }, function (results, status) {

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

        });


    }

    function createRandomMarkers(map, origin) {


        console.log("sadsad", origin.lat, origin.lng)
        var southWest = new google.maps.LatLng(origin.lat + 0.02, origin.lng + 0.02);
        var northEast = new google.maps.LatLng(origin.lat - 0.020, origin.lng - 0.020);
        var lngSpan = northEast.lng() - southWest.lng();
        var latSpan = northEast.lat() - southWest.lat();





        // Create some markers
        for (var i = 0; i < 15; i++) {

            var location = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(), southWest.lng() + lngSpan * Math.random());

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                animation: google.maps.Animation.DROP,
                icon: "images/taxi.png"
            });



            markers.push(marker);
        }
        console.log("My markers---->", markers);




    }

    function createDynamicMarker(iniitialMarker) {
        var position = pathLine.length - 1;



        var timer = setInterval(function () {
            var newPosition = {
                lat: pathLine[position].lat(),
                lng: pathLine[position].lng()

            }
            iniitialMarker.setMap(null);
            iniitialMarker = new google.maps.Marker({
                position: newPosition,
                map: map,
                icon: "images/taxi.png"
            });
            position -= 1;
            if (position < 0) {
                latestMarker = iniitialMarker;
                $(".bg-modal-arrived").fadeIn(600);
                clearInterval(timer);
            }
        }, 1000);
    }
    function createDynamicMarkerOnRoute(nearestMarker){

        var position = 0;



        var timer = setInterval(function () {
            var newPosition = {
                lat: pathLineMain[position].lat(),
                lng: pathLineMain[position].lng()

            }
            nearestMarker.setMap(null);
            nearestMarker = new google.maps.Marker({
                position: newPosition,
                map: map,
                icon: "images/taxi.png"
            });
            position += 1;
            if (position >= pathLineMain.length) {
                
                $(".bg-modal-reached").fadeIn(600);
                $("#reached").html("You've Reached: " + destination);
                clearInterval(timer);
            }
        }, 500);

    }

    function findDistance(origin, marker) {
        // Obtain the distance in meters by the computeDistanceBetween method
        // From the Google Maps extension using plain coordinates
        var distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng({
                lat: origin.lat,
                lng: origin.lng
            }),
            new google.maps.LatLng({
                lat: marker.position.lat(),
                lng: marker.position.lng()
            })
        );
        return distanceInMeters;


    }

    //Reverse Gocoding

    function reverseGeocode(marker) {
        geocoder = new google.maps.Geocoder;
        geocoder.geocode({ 'location': marker }, function (results, status) {
            console.log("My result--> ", results[0].formatted_address)
            if (status === 'OK') {
                if (results[0]) {

                    return results[0].formatted_address;



                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });


    }

    function removeMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }


    //Load Map
    google.maps.event.addDomListener(window, "load", init);
});









