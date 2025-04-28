// Weather API Integration for Travel Planning
document.addEventListener('DOMContentLoaded', function() {
    const weatherInput = document.getElementById('destination-input');
    const checkWeatherBtn = document.getElementById('check-weather');
    const weatherResults = document.getElementById('weather-results');
    
    // Replace with your actual API key from OpenWeatherMap or similar service
    const apiKey = 'YOUR_API_KEY';
    
    if (checkWeatherBtn && weatherInput) {
        checkWeatherBtn.addEventListener('click', function() {
            const destination = weatherInput.value.trim();
            
            if (destination === '') {
                showError('Please enter a destination');
                return;
            }
            
            // Show loading state
            weatherResults.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading weather data...</div>';
            
            // Fetch weather data
            getWeatherData(destination);
        });
        
        // Also trigger on Enter key
        weatherInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkWeatherBtn.click();
            }
        });
    }
    
    function getWeatherData(destination) {
        // In a real implementation, you would call a weather API
        // For demo purposes, we'll simulate the API response
        
        // Simulated API call
        setTimeout(() => {
            // Generate random weather data for demonstration
            const cities = {
                'paris': {
                    name: 'Paris, France',
                    temp: Math.floor(Math.random() * 15) + 10, // 10-25°C
                    condition: 'Partly Cloudy',
                    bestTime: 'April to June'
                },
                'tokyo': {
                    name: 'Tokyo, Japan',
                    temp: Math.floor(Math.random() * 10) + 15, // 15-25°C
                    condition: 'Clear Sky',
                    bestTime: 'March to May'
                },
                'new york': {
                    name: 'New York, USA',
                    temp: Math.floor(Math.random() * 15) + 5, // 5-20°C
                    condition: 'Light Rain',
                    bestTime: 'September to November'
                },
                'sydney': {
                    name: 'Sydney, Australia',
                    temp: Math.floor(Math.random() * 10) + 20, // 20-30°C
                    condition: 'Sunny',
                    bestTime: 'September to November'
                },
                'bali': {
                    name: 'Bali, Indonesia',
                    temp: Math.floor(Math.random() * 5) + 25, // 25-30°C
                    condition: 'Tropical Showers',
                    bestTime: 'April to October'
                }
            };
            
            const destinationLower = destination.toLowerCase();
            
            // Check if we have the city in our demo database
            if (cities[destinationLower]) {
                const data = cities[destinationLower];
                displayWeatherData(data);
            } else {
                // Generate random data for any other city
                const randomData = {
                    name: destination,
                    temp: Math.floor(Math.random() * 25) + 5, // 5-30°C
                    condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
                    bestTime: ['Spring', 'Summer', 'Fall', 'Winter'][Math.floor(Math.random() * 4)]
                };
                
                displayWeatherData(randomData);
            }
        }, 1500); // Simulate network delay
    }
    
    function displayWeatherData(data) {
        weatherResults.innerHTML = `
            <div class="weather-card">
                <h4>${data.name}</h4>
                <div class="temp">${data.temp}°C</div>
                <div class="condition">${data.condition}</div>
                <div class="best-time">Best time to visit: ${data.bestTime}</div>
            </div>
        `;
        
        // Add animation
        const weatherCard = weatherResults.querySelector('.weather-card');
        weatherCard.style.animation = 'fadeInUp 0.5s ease forwards';
    }
    
    function showError(message) {
        weatherResults.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i> ${message}
            </div>
        `;
    }
});