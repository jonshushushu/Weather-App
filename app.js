window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span')

    var map = new Map()
        .set('Clouds', Skycons.CLOUDY)
        .set('Clear', Skycons.CLEAR_DAY)
        .set('Thunderstorm', Skycons.THUNDER)
        .set('Drizzle', Skycons.RAIN)
        .set('Rain', Skycons.RAIN)
        .set('Snow', Skycons.SNOW)
        .set('Mist', Skycons.FOG);

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude
            lat = position.coords.latitude

            const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=8ba28e65f455b912160f9e950ce10bc4`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const temp = data.main.temp
                    const des = data.weather[0].main
                    const timeZone = data.name
                    //set HTML elements
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = des;
                    locationTimezone.textContent = timeZone
                    //formula for celsius
                    let celsius = (temp - 32) * (5 / 9);
                    // set icon
                    setIcon(des, document.querySelector('.icon'));
                    //change temp to celsius/farenheit
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === 'F'){
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius)
                        }
                        else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = temp
                        }
                    });
                });
        });

        
    }


    else{
        h1.textContent = "Turn on your location dummy"
    }
    
    function setIcon(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = map.get(icon);
        skycons.play()
        return skycons.set(iconID, currentIcon);
    }
});
