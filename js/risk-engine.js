
// 🧠 Risk Engine — логика оценки и обработки зон безопасности

// 📌 Базовые веса (можно объяснить в дипломе как "экспертные коэффициенты")
const WEIGHTS = {
  traffic: 1.0,
  intersection: 1.0,
  school: 1.2,
  main_road: 0.7,
  safe_zone: 0.3
};


// 📊 Функция расчёта итогового риска для точки
function calculateRisk(point) {
  const base = WEIGHTS[point.type] || 1;

  // можно усложнить позже (добавить плотность, время суток и т.д.)
  const riskScore = base * point.risk;

  return normalizeRisk(riskScore);
}


// 📉 Нормализация риска в 1–3 (для визуализации)
function normalizeRisk(score) {
  if (score >= 3) return 3;   // высокий риск
  if (score >= 2) return 2;   // средний
  return 1;                   // низкий
}


// 🔄 Обработка всех данных (создаём "умную" версию DATA)
function processRiskData(data) {
  return data.map(point => ({
    ...point,
    calculatedRisk: calculateRisk(point)
  }));
}


// 🗺️ Генерация зон риска (для расширения — круги, heatmap и т.д.)
function generateRiskZones(map, data) {

  data.forEach(point => {

    const risk = calculateRisk(point);

    let color = "green";
    let radius = 80;

    if (risk === 3) {
      color = "red";
      radius = 200;
    } else if (risk === 2) {
      color = "orange";
      radius = 130;
    }

    L.circle([point.lat, point.lng], {
      radius: radius,
      color: color,
      fillColor: color,
      fillOpacity: 0.2,
      weight: 1
    }).addTo(map);

  });
}