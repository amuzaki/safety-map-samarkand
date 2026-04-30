// ===============================
// 1. ИНИЦИАЛИЗАЦИЯ КАРТЫ
// ===============================
const map = L.map('map').setView([39.6542, 66.9597], 13);

// Базовый слой карты
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// ===============================
// 2. СИМУЛЯЦИЯ ДАННЫХ РИСКА
// ===============================
const riskData = [
  {
    coords: [39.6600, 66.9700],
    risk: 90,
    name: "Перекрёсток с высоким трафиком"
  },
  {
    coords: [39.6500, 66.9500],
    risk: 55,
    name: "Средняя загруженность"
  },
  {
    coords: [39.6450, 66.9600],
    risk: 20,
    name: "Низкий риск (жилой район)"
  }
];

// ===============================
// 3. ФУНКЦИЯ ЦВЕТА ПО РИСКУ
// ===============================
function getColor(risk) {
  if (risk > 70) return "red";
  if (risk > 40) return "orange";
  return "green";
}

// ===============================
// 4. СОЗДАНИЕ СЛОЯ РИСКА
// ===============================
const riskLayer = L.layerGroup();

riskData.forEach(point => {
  const marker = L.circleMarker(point.coords, {
    radius: 10,
    color: getColor(point.risk),
    fillOpacity: 0.7
  });

  marker.bindPopup(`
    <b>${point.name}</b><br>
    Уровень риска: ${point.risk}
  `);

  riskLayer.addLayer(marker);
});

// ===============================
// 5. ПЕРЕКЛЮЧЕНИЕ СЛОЯ
// ===============================
let riskVisible = false;

function toggleRisk() {
  if (riskVisible) {
    map.removeLayer(riskLayer);
  } else {
    riskLayer.addTo(map);
  }
  riskVisible = !riskVisible;
}