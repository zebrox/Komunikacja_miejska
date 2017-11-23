function initMap() {
    var uluru = {lat: 52.230481, lng: 20.986805};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: uluru,
      zoomControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT,
          
      },
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
    });
    var marker = new google.maps.Marker({
      
      position: uluru,
      map: map
    });
  }