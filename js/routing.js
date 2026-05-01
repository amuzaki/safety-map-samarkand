
let control = null;

window.enableRoutePicking = function(map) {

  let start = null;
  let end = null;

  map.on("click", function(e) {

    if (!start) {
      start = e.latlng;
      L.marker(start).addTo(map).bindPopup("A").openPopup();
      return;
    }

    if (!end) {
      end = e.latlng;
      L.marker(end).addTo(map).bindPopup("B").openPopup();

      buildRoute(map, start, end);
    }
  });

};


function buildRoute(map, start, end) {

  if (control) {
    map.removeControl(control);
  }

  control = L.Routing.control({
    waypoints: [
      L.latLng(start.lat, start.lng),
      L.latLng(end.lat, end.lng)
    ],
    routeWhileDragging: true,
    show: false
  }).addTo(map);

}
