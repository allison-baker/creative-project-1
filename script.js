document.getElementById("submit").addEventListener("click", event => {
  event.preventDefault();

  let lat = 0;
  let long = 0;
  let zip = document.getElementById("location").value;
  let location_url = "https://api.opencagedata.com/geocode/v1/json?q="
    + zip + "&key=4de98fe993d040cb929866cc9a836e86";
  let cuisine = document.getElementById("food").value;
  let options = {
    method: "GET",
    headers: {
      "X-Zomato-API-Key": "a95c92cac4c055f20c8906b7e6660e3d"
    }
  }
  let results = "";

  fetch(location_url)
    .then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      lat = json.results[0].geometry.lat;
      long = json.results[0].geometry.lng;

      let search_url = "https://developers.zomato.com/api/v2.1/search?q="
        + cuisine + "&lat=" + lat + "&lon=" + long;

      return fetch(search_url, options);
    }).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);

      results += "<h3>Search Results</h3>";
      results += "<ul>"
      for (let j=0; j < json.restaurants.length; j++) {
        results += "<li>";
        results += json.restaurants[j].restaurant.name + ", ";
        results += json.restaurants[j].restaurant.location.address + "</li>";
      }
      results += "</ul>";
      document.getElementById("results").innerHTML = results;
    });
})
