        // This requires the Places library. Include the libraries=places
        // parameter when you first load the API. For example:
        // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">



        function initMap() {
            var geocoder = new google.maps.Geocoder;
             map = new google.maps.Map(document.getElementById('map'), {
                // center: { lat: -33.8688, lng: 151.2195 },
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            var image = {
                url: '/assets/img/user.png',
                // This marker is 20 pixels wide by 32 pixels high.
                size: new google.maps.Size(50, 46),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
              };

              var shape = {
                coords: [1, 1, 1, 20, 18, 20, 18, 1],
                type: 'poly'
              };

            var marker = new google.maps.Marker({
                map: map,
                animation: google.maps.Animation.DROP,
                anchorPoint: new google.maps.Point(0, -29),
                icon: image,
                shape: shape
            });

            var locationInput = document.getElementById("locationInput");
            infoWindow = new google.maps.InfoWindow;

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    window.pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    // infoWindow.setPosition(pos);
                    // infoWindow.setContent('You are here');
                    // infoWindow.open(map);
                   
                            infowindow.close();
                            marker.setPosition(pos);
                            map.setCenter(pos);

                    showNearbyDonations();
                    
                }, function () {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
                addYourLocationButton(map,marker);
            } else {
                // Browser doesn't support Geolocation
                pos = {lat:-34.6037389 , lng:-58.3837591 }
                //use default position since location is not available
                infoWindow.setPosition(pos);
                infoWindow.open(map);
                map.setCenter(pos);

                handleLocationError(false, infoWindow, map.getCenter());
                
            }


            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.');
                infoWindow.open(map);
            }   

            
            var input = document.getElementById('pac-input');
            //var strictBounds = document.getElementById('strict-bounds-selector');

            // map.controls[google.maps.ControlPosition.TOP_CENTER].push(card);
            // map.controls[google.maps.ControlPosition.TOP_LEFT].push(newDonation);

            var autocomplete = new google.maps.places.Autocomplete(input);

            // Bind the map's bounds (viewport) property to the autocomplete object,
            // so that the autocomplete requests use the current map bounds for the
            // bounds option in the request.
            autocomplete.bindTo('bounds', map);

            // Set the data fields to return when the user selects a place.
            autocomplete.setFields(['address_components', 'geometry', 'icon', 'name']);

            var infowindow = new google.maps.InfoWindow();
            
            var infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);

            autocomplete.addListener('place_changed', function () {
    
                let marker = new google.maps.Marker({
                    map: map,
                    animation: google.maps.Animation.DROP,
                    anchorPoint: new google.maps.Point(0, -29),
                });

                infowindow.close();
                marker.setVisible(false);
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    // User entered the name of a Place that was not suggested and
                    // pressed the Enter key, or the Place Details request failed.
                    window.alert("No details available for input: '" + place.name + "'");
                    return;
                }

                let elmnt = document.getElementById("map");
                elmnt.scrollIntoView();

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(15); 
                }
                 marker.setPosition(place.geometry.location);
                 marker.setVisible(true);
                
                var address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }

                infowindowContent.children['place-icon'].src = place.icon;
                infowindowContent.children['place-name'].textContent = place.name;
                infowindowContent.children['place-address'].textContent = address;
                infowindow.open(map, marker);

                locationInput.value =  JSON.stringify(place.geometry.location);
                //agregar confirmacion de lugar   

            });

           
           
            function addYourLocationButton(map,marker) 
            {
               
                var controlDiv = document.createElement('div');            
                var firstChild = document.createElement('button');
                firstChild.style.backgroundColor = '#fff';
                firstChild.style.border = 'none';
                firstChild.style.outline = 'none';
                firstChild.style.width = '28px';
                firstChild.style.height = '28px';
                firstChild.style.borderRadius = '2px';
                firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
                firstChild.style.cursor = 'pointer';
                firstChild.style.marginRight = '10px';
                firstChild.style.padding = '0px';
                firstChild.title = 'Your Location';
                controlDiv.appendChild(firstChild);
                
                var secondChild = document.createElement('div');
                secondChild.style.margin = '5px';
                secondChild.style.width = '18px';
                secondChild.style.height = '18px';
                secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)';
                secondChild.style.backgroundSize = '180px 18px';
                secondChild.style.backgroundPosition = '0px 0px';
                secondChild.style.backgroundRepeat = 'no-repeat';
                secondChild.id = 'you_location_img';
                firstChild.appendChild(secondChild);

                
                
                google.maps.event.addListener(map, 'dragend', function() {
                    $('#you_location_img').css('background-position', '0px 0px');
                });

                google.maps.event.addListener(map, 'zoom_changed', function() {
                    showNearbyDonations();
                });
            
                firstChild.addEventListener('click', function() {
                    var imgX = '0';
                    var animationInterval = setInterval(function(){
                        if(imgX == '-18') imgX = '0';
                        else imgX = '-18';
                        $('#you_location_img').css('background-position', imgX+'px 0px');
                    }, 500);
                    if(navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function(position) {
                            latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                            //convertir geo a direccion, y reemplazar en address input
                            infowindow.close();
                            marker.setPosition(latlng);
                            map.setCenter(latlng);
                            clearInterval(animationInterval);
                            $('#you_location_img').css('background-position', '-144px 0px');
                            

                        //decode input coordinates into a text address
                        geocoder.geocode({'location': latlng}, function(results, status) {
                            if (status === 'OK') {
                              if (results[0]) {

                                //fullfill address input when location button is clicked

                                //AGREGAR CHEQUEO . QUE PASA SI NO HAY RESULTADOS?
                                if (results[0]){
                                    input.value = results[0].formatted_address;
                                } else {
                                    input.value = '';
                                }
                                locationInput.value =  JSON.stringify(latlng);
                                input.scrollIntoView();

                              } else {
                                window.alert('No results found');
                              }
                            } else {
                              window.alert('Geocoder failed due to: ' + status);
                            }
                          });
                        });
                    }
                    else{
                        clearInterval(animationInterval);
                        $('#you_location_img').css('background-position', '0px 0px');
                    }
                });
                
                controlDiv.index = 1;
                map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
            }

            function createUserMarker(){

            }

        
    }

       
