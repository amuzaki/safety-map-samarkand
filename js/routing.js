
let pointA = null;
let pointB = null;
let routeLine = null;


// 📌 обработка клика по карте
function enableRoutePicking(map) {

  map.on("click", function (e) {

    if (!pointA) {
      pointA = e.latlng;
      L.marker(pointA).addTo(map).bindPopup("A").openPopup();
      return;
    }

    if (!pointB) {
      pointB = e.latlng;
      L.marker(pointB).addTo(map).bindPopup("B").openPopup();

      buildRiskRoute(map);
      return;
    }

  });

}


// 📌 расчет риска точки (упрощенно)
function getRisk(lat, lng, data) {

  let risk = 1;

  data.forEach(p => {

    const d = Math.sqrt(
      Math.pow(p.lat - lat, 2) +
      Math.pow(p.lng - lng, 2)
    );

    // если близко к опасной точке — повышаем риск
    if (d < 0.01) {
      risk += p.risk;
    }

  });

  return risk;
}


// 📌 построение маршрута A → B с учетом риска
function buildRiskRoute(map) {

  if (routeLine) {
    map.removeLayer(routeLine);
  }

  // 🔥 упрощенный "обход риска"
  const midPoint = {
    lat: (pointA.lat + pointB.lat) / 2,
    lng: (pointA.lng + pointB.lng) / 2
  };

  // сдвиг в сторону "безопасности"
  const safeMid = {
    lat: midPoint.lat + 0.01,
    lng: midPoint.lng + 0.01
  };

  const coords = [
    [pointA.lat, pointA.lng],
    [safeMid.lat, safeMid.lng],
    [pointB.lat, pointB.lng]
  ];

  routeLine = L.polyline(coords, {
    color: "blue",
    weight: 5,
    opacity: 0.8
  }).addTo(map);

}