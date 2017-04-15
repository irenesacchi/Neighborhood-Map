// Create a styles array to use with the map.
	var styles = [
    {
      featureType: 'water',
      stylers: [
        { color: '#98CACE' }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [
        { lightness: 100 }
      ]
    },{
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        { lightness: -100 }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.stroke',
      stylers: [
        { color: '#ffffff' },
        { weight: 6 }
      ]
    },{
      featureType: 'administrative',
      elementType: 'labels.text.fill',
      stylers: [
        { color: '#103b49' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -40 }
      ]
    },{
      featureType: 'transit.station',
      stylers: [
        { weight: 9 },
        { hue: '#e85113' }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'poi.park',
      elementType: 'all',
      stylers: [
          { color: '#B5DEB0' },
          { visibility: 'on'}
        ]
    },{
      featureType: 'landscape.natural',
      stylers: [
          { color: '#B5DEB0'}
      ]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { color: '#efe9e4' },
        { lightness: -25 }
      ]
    },
    {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#103b49'}]
    },
    ]