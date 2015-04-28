/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
 
var latLng;
var map;

$( document ).on( "pagecreate", "#findParkingSpot", function() {
    var defaultLatLng = new google.maps.LatLng(34.018747, -118.282960);  // Default to Los Angeles, CA when no geolocation support
    if ( navigator.geolocation ) {
		
		function success(pos) {
            // Location found, show map with these coordinates
			latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            drawMap(latLng);
        }
		function fail(error) {
			window.console.log("in fail");
			drawMap(defaultLatLng);  // Failed to find location, show default map
		}
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 5000});
    } else {
		window.console.log("in else");
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }
	
	setTimeout(function () {
		if(!latLng){
			window.console.log("No confirmation from user, using fallback");
			drawMap(defaultLatLng);
		}else{
			window.console.log("Location was set");
		}
	}, 6000); // Wait extra second

	
    function drawMap(latlng) {
        var myOptions = {
            zoom: 15,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
		
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "You are here!",
			icon: {
				path: google.maps.SymbolPath.CIRCLE,
				scale: 10
			}
        });
	
		var latlng1 = new google.maps.LatLng(34.018612, -118.294484);
		var marker1 = new google.maps.Marker({
			position: latlng1,
			map: map,
			title: "Spot A12DF"
		});
		
		google.maps.event.addListener(marker1, 'click', function(){
			$("#dialogHeader").html("Spot A12DF");
			$("#availabilityPar").html("Available for the next 3 hours");
			$("#slider-fill").prop({max:180});
			$("#locationPar").html("3769 S Catalina St<br>Los Angeles, CA 90007");
			$("#descriptionPar").html("Park on street in front of house");
			$("#pricePar").html("$4.00");
			$("#dialogBoxOpen").click();
		});
		
		var latlng2 = new google.maps.LatLng(34.021339, -118.292644);
		var marker2 = new google.maps.Marker({
			position: latlng2,
			map: map,
			title: "Spot 495EF"
		});
		
		google.maps.event.addListener(marker2, 'click', function(){
			$("#dialogHeader").html("Spot 495EF");
			$("#availabilityPar").html("Available for the next 5 hours");
			$("#slider-fill").prop({max:300});
			$("#locationPar").html("1129 W 37th St<br>Los Angeles, CA 90007");
			$("#descriptionPar").html("Follow driveway behind house, park in spot marked guest");
			$("#pricePar").html("$6.00");
			$("#dialogBoxOpen").click();
		});
		
		var latlng3 = new google.maps.LatLng(34.019297, -118.288371);
		var marker3 = new google.maps.Marker({
			position: latlng3,
			map: map,
			title: "Spot 853FC"
		});
		
		google.maps.event.addListener(marker3, 'click', function(){
			$("#dialogHeader").html("Spot 853FC");
			$("#availabilityPar").html("Available now for 1 hour");
			$("#slider-fill").prop({max:60});
			$("#locationPar").html("Watt Hall<br>Los Angeles, CA 90089");
			$("#descriptionPar").html("Park in front of Watt Hall, in space that says 'Reserved for President'");
			$("#pricePar").html("$20.00");
			$("#dialogBoxOpen").click();
		});

    }
});

$( document ).on( "pagecreate", "#bookingPage", function() {
	$("#submitButton").click(function(){
		$("creditCardForm").submit();
	});
	
	$('#creditCardForm').submit(function() {
		alert("Success! You can now park in your spot.\nDetails and a receipt will be emailed to you.");
		return false;
	});
});

$( document ).on( "pageshow", "#bookingPage", function() {
	if (typeof($("#slider-fill")) != 'undefined') {
		window.console.log("Refreshing slider");
		$("#slider-fill").slider("refresh");
	}
});

$( document ).on( "pageshow", "#findParkingSpot", function() {
	if (typeof(map) != 'undefined'){
		window.console.log("Checking resize");
		google.maps.event.trigger(map, "resize");
	}
});


