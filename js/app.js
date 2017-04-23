//create the new map
var map;

//create the markers arrays
var markers = [];


// initialize the map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 51.9605582, lng: 7.617933},
    zoom: 10,
    styles: styles,
    mapTypeControl: false
	});
	var bikeLayer = new google.maps.BicyclingLayer();
	bikeLayer.setMap(map);

    //activating knockoutjs by binding viewmodel
    ko.applyBindings(new ViewModel());
}

//==================View Model=========================================================
var ViewModel = function() {
	
	var self = this;
	
	// Set limits for the map
    var bounds = new google.maps.LatLngBounds();
    
    //search location in input box
    self.searchbox = ko.observable('');
    self.objects = ko.observableArray(Places);
    
     //intialize infowindow
    var infoWindow = new google.maps.InfoWindow();
    
    // Style the markers
    var greenIcon = 'img/greenpin.png';
    var redIcon = 'img/redpin.png';
    
    self.searchimput = ko.computed(function() {
        //convert to lowercase the imput
        var searchbox = self.searchbox().toLowerCase();
        //search through all objects
        self.objects().forEach(function(object) {
            if (object.marker) {
                //the markers populate the map if the searchbox is empty
                object.marker.setVisible(true);
            }
        });
        if (!searchbox) {
            //when no imput in the searchbox, return all the obj
            return self.objects();
        } 
        else {
            //when imput is there, search throug the obj list
            return ko.utils.arrayFilter(self.objects(), function(object) {
	            var area = object.name.toLowerCase().indexOf(searchbox) !== -1;
	                if (object.marker) {
	                    //when serached obj is found show marker for that specific place
	                  object.marker.setVisible(area);
	                }
	                return area;
	           });
        }

    });

    //loop over all places
    self.searchpoints = ko.observableArray();

    //looping over objects and pushing into seachplaces array
    self.objects().forEach(function(area) {
        self.searchpoints.push(area);
    });
     //when clicked on location on the list
    self.listlocationclicked = function(area) {
	    populateInfoWindow(area.marker, infoWindow);
	    markers.forEach(function(marker) {
          marker.setIcon(greenIcon);
        });
        area.marker.setIcon(redIcon);
    };

    //loop over Places arrays
    for (i = 0; i < Places.length; i++) {
        var position = Places[i].location;
        var title = Places[i].name;
        var photo = Places[i].img;
        var city = Places[i].city;
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            photo: photo,
            city: city,
            icon: greenIcon,
            animation: google.maps.Animation.DROP,
            id: i
        });

        Places[i].marker = marker;
        //add marker to array
        markers.push(marker);
        //pop up infowindow on click
        Places[i].marker.addListener('click', function() {
	        populateInfoWindow(this, infoWindow);
			markers.forEach(function(marker) {
                      marker.setIcon(greenIcon);
                    });
                    this.setIcon(redIcon);
        });
        //adjust the boundaries to fit the AOI
        bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);


	//populate infowindow
    function populateInfoWindow(marker, infowindow) {
	    var articleUrl;
        var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.city ;
        var wikiTimeout = setTimeout(function () {
            alert("failed to load wikipedia page");
        }, 8000);
        $.ajax({
            url: wikiURL,
            dataType: "jsonp"
        }).done(function(response) {
            clearTimeout(wikiTimeout);
            articleUrl = response[3][0];
            contentInfo = '<div id="iw-container">' +
                                  '<header class="iw-title">' + '<h3>' + 'Spielplatz: ' + marker.title + '</h3>' + '</header>' +
                                  '<div id="iw-photo">' + marker.photo + '</div>' + '</div><br><a href ="' + articleUrl + '">' + articleUrl + '</a><hr>';
        });
        if (infowindow.marker != marker) {
	        infowindow.marker = marker;
	        function getWikiInfo(data) {  
            infowindow.setContent('contentInfo');
            //open infowindow on that marker
            infowindow.open(map, marker);
            // set icon to green when infowindow is closed
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
                marker.setIcon(greenIcon);
            });
          }
        }
    }

};

//alert when map is not loading
function googleError() {
    alert("Google map is not responding. Check your connection please.");
};
