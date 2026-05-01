
// 📍 Инициализация карты (Самарканд)
const map = L.map('map').setView([39.6600, 66.9700], 14);

// 🌍 Подложка OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);


// 🎨 Функция выбора цвета по уровню риска
function getColor(risk) {
  switch (risk) {
    case 3: return "red";     // высокий риск
    case 2: return "orange";  // средний риск
    case 1: return "green";   // низкий риск
    default: return "blue";
  }
}


// 📌 Отображение точек риска
function drawRiskPoints(data) {

  data.forEach(point => {

    const color = getColor(point.risk);

    L.circleMarker([point.lat, point.lng], {
      radius: 8,
      color: color,
      fillColor: color,
      fillOpacity: 0.7,
      weight: 2
    })
    .bindPopup(`
      <b>${point.name}</b><br/>
      Уровень риска: ${point.risk}
    `)
    .addTo(map);

  });

}


// 🔥 Загрузка данных (из data.js)
if (typeof DATA !== "undefined") {
  drawRiskPoints(DATA);
} else {
  console.error("DATA не найден. Проверь data.js");
}


enableRoutePicking(map);
