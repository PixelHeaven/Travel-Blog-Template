// Interactive World Map for Travel Blog
document.addEventListener('DOMContentLoaded', function() {
    const worldMap = document.getElementById('world-map');
    
    if (worldMap) {
        // Initialize the world map
        $(worldMap).vectorMap({
            map: 'world_mill',
            backgroundColor: 'transparent',
            zoomOnScroll: true,
            regionStyle: {
                initial: {
                    fill: '#e4e4e4',
                    "fill-opacity": 0.9,
                    stroke: 'none',
                    "stroke-width": 0,
                    "stroke-opacity": 0
                },
                hover: {
                    "fill-opacity": 0.8,
                    cursor: 'pointer'
                },
                selected: {
                    fill: '#3a7bd5'
                },
                selectedHover: {}
            },
            markerStyle: {
                initial: {
                    fill: '#ff7e5f',
                    stroke: '#ff7e5f',
                    "fill-opacity": 1,
                    "stroke-width": 8,
                    "stroke-opacity": 0.3,
                    r: 5
                },
                hover: {
                    stroke: '#ff7e5f',
                    "stroke-width": 10,
                    "stroke-opacity": 0.5,
                    cursor: 'pointer'
                },
                selected: {
                    fill: '#ff7e5f'
                }
            },
            series: {
                regions: [{
                    values: getVisitedCountries(),
                    scale: ['#a8dcff', '#3a7bd5'],
                    normalizeFunction: 'polynomial'
                }]
            },
            onRegionTipShow: function(e, el, code) {
                const countryData = getCountryInfo(code);
                if (countryData) {
                    el.html(el.html() + '<br>Status: ' + (countryData.visited ? 'Visited' : 'Want to visit') +
                        '<br>Best time to visit: ' + countryData.bestTime);
                }
            },
            onMarkerTipShow: function(e, el, code) {
                const markerData = getMarkerInfo(code);
                el.html('<div class="map-tooltip">' +
                    '<strong>' + markerData.name + '</strong><br>' +
                    markerData.description +
                    '</div>');
            },
            onMarkerClick: function(e, code) {
                const markerData = getMarkerInfo(code);
                if (markerData.blogUrl) {
                    window.location.href = markerData.blogUrl;
                }
            }
        });
        
        // Add markers for visited locations
        addMarkers();
        
        // Update counters
        updateTravelStats();
    }
    
    // Function to return data about visited countries
    function getVisitedCountries() {
        // In a real implementation, this would come from a database or API
        // Sample data for demonstration
        const visitedCountriesData = {
            "us": 75, // USA - visited multiple locations
            "fr": 60, // France
            "it": 70, // Italy
            "es": 65, // Spain
            "jp": 80, // Japan
            "th": 50, // Thailand
            "au": 40, // Australia
            "nz": 30, // New Zealand
            "za": 45, // South Africa
            "pe": 35, // Peru
            "mx": 55, // Mexico
            "ca": 60, // Canada
            "gb": 75, // United Kingdom
            "de": 50, // Germany
            "gr": 40  // Greece
        };
        
        return visitedCountriesData;
    }
    
    // Function to add markers to the map
    function addMarkers() {
        if (!$('#world-map').vectorMap) return;
        
        // Get map instance
        const mapInstance = $('#world-map').vectorMap('get', 'mapObject');
        
        // Add markers
        const markers = getFavoriteLocations();
        mapInstance.addMarkers(markers);
    }
    
    // Function to get favorite locations for markers
    function getFavoriteLocations() {
        // In a real implementation, this would come from a database or API
        // Sample data for demonstration
        return [
            { name: 'Paris', latLng: [48.8566, 2.3522], style: { fill: '#ff7e5f' } },
            { name: 'Tokyo', latLng: [35.6762, 139.6503], style: { fill: '#ff7e5f' } },
            { name: 'New York', latLng: [40.7128, -74.0060], style: { fill: '#ff7e5f' } },
            { name: 'Bali', latLng: [-8.3405, 115.0920], style: { fill: '#ff7e5f' } },
            { name: 'Cape Town', latLng: [-33.9249, 18.4241], style: { fill: '#ff7e5f' } },
            { name: 'Rome', latLng: [41.9028, 12.4964], style: { fill: '#ff7e5f' } },
            { name: 'Kyoto', latLng: [35.0116, 135.7681], style: { fill: '#ff7e5f' } },
            { name: 'Santorini', latLng: [36.3932, 25.4615], style: { fill: '#ff7e5f' } }
        ];
    }
    
    // Function to get country information
    function getCountryInfo(code) {
        // In a real implementation, this would come from a database or API
        // Sample data for demonstration
        const countryInfo = {
            "us": { visited: true, bestTime: "May to September" },
            "fr": { visited: true, bestTime: "April to June or September to October" },
            "it": { visited: true, bestTime: "April to June or September to October" },
            "es": { visited: true, bestTime: "April to June or September to October" },
            "jp": { visited: true, bestTime: "March to May or October to November" },
            "th": { visited: true, bestTime: "November to March" },
            "au": { visited: true, bestTime: "September to November or March to May" },
            "nz": { visited: true, bestTime: "December to March" },
            "za": { visited: true, bestTime: "May to September" },
            "pe": { visited: true, bestTime: "May to September" },
            "mx": { visited: true, bestTime: "November to April" },
            "ca": { visited: true, bestTime: "June to September" },
            "gb": { visited: true, bestTime: "May to September" },
            "de": { visited: true, bestTime: "May to September" },
            "gr": { visited: true, bestTime: "April to June or September to October" }
        };
        
        return countryInfo[code];
    }
    
    // Function to get marker information
    function getMarkerInfo(code) {
        // In a real implementation, this would come from a database or API
        // Sample data for demonstration
        const markerInfo = {
            "Paris": {
                name: "Paris, France",
                description: "The city of lights and love, known for the Eiffel Tower and exquisite cuisine.",
                blogUrl: "pages/post-paris.html"
            },
            "Tokyo": {
                name: "Tokyo, Japan",
                description: "A bustling metropolis blending ultramodern and traditional.",
                blogUrl: "pages/post-tokyo.html"
            },
            "New York": {
                name: "New York, USA",
                description: "The Big Apple, a global center for art, fashion, and finance.",
                blogUrl: "pages/post-newyork.html"
            },
            "Bali": {
                name: "Bali, Indonesia",
                description: "Island paradise with beautiful beaches and rich cultural heritage.",
                blogUrl: "pages/post-bali.html"
            },
            "Cape Town": {
                name: "Cape Town, South Africa",
                description: "Stunning coastal city at the foot of Table Mountain.",
                blogUrl: "pages/post-capetown.html"
            },
            "Rome": {
                name: "Rome, Italy",
                description: "The Eternal City with ancient ruins and Renaissance masterpieces.",
                blogUrl: "pages/post-rome.html"
            },
            "Kyoto": {
                name: "Kyoto, Japan",
                description: "Japan's cultural heart with thousands of classical temples.",
                blogUrl: "pages/post-kyoto.html"
            },
            "Santorini": {
                name: "Santorini, Greece",
                description: "Iconic whitewashed buildings with blue domes overlooking the sea.",
                blogUrl: "pages/post-santorini.html"
            }
        };
        
        return markerInfo[code] || { name: code, description: "Beautiful destination to explore" };
    }
    
    // Function to update travel statistics
    function updateTravelStats() {
        const visitedCountries = Object.keys(getVisitedCountries()).length;
        const totalCities = getFavoriteLocations().length;
        
        const continents = new Set();
        Object.keys(getVisitedCountries()).forEach(country => {
            const continent = getCountryContinent(country);
            if (continent) continents.add(continent);
        });
        
        // Update DOM counters with animation
        animateCounter('countries-visited', visitedCountries);
        animateCounter('cities-explored', totalCities);
        animateCounter('continents-traveled', continents.size);
        animateCounter('travel-distance', 127350); // Example mileage (would be calculated in real app)
    }
    
    // Function to animate counter from 0 to target value
    function animateCounter(elementId, targetValue) {
        const counterElement = document.getElementById(elementId);
        if (!counterElement) return;
        
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const framesPerSecond = 60;
        const totalFrames = duration / 1000 * framesPerSecond;
        const valueIncrement = targetValue / totalFrames;
        
        const counterAnimation = setInterval(() => {
            currentValue += valueIncrement;
            if (currentValue >= targetValue) {
                counterElement.textContent = targetValue.toLocaleString();
                clearInterval(counterAnimation);
            } else {
                counterElement.textContent = Math.floor(currentValue).toLocaleString();
            }
        }, 1000/framesPerSecond);
    }
    
    // Helper function to get continent for a country
    function getCountryContinent(countryCode) {
        // Simplified mapping
        const continentMap = {
            "us": "North America", "ca": "North America", "mx": "North America",
            "gb": "Europe", "fr": "Europe", "it": "Europe", "es": "Europe", "de": "Europe", "gr": "Europe",
            "jp": "Asia", "th": "Asia", 
            "au": "Oceania", "nz": "Oceania",
            "za": "Africa",
            "pe": "South America"
        };
        
        return continentMap[countryCode];
    }
});
