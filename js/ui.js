
// 🎛 UI Layer — управление элементами интерфейса карты

// 📌 Легенда (можно генерировать динамически или оставить HTML)
function initLegend() {
  const legend = document.querySelector(".legend");

  if (!legend) {
    console.warn("Legend element not found");
    return;
  }

  legend.innerHTML = `
    <h3>Уровень риска БПТС</h3>

    <p><span class="red"></span> Высокий риск (3)</p>
    <p><span class="orange"></span> Средний риск (2)</p>
    <p><span class="green"></span> Низкий риск (1)</p>

    <hr/>

    <p><b>Объекты:</b></p>
    <p>🚦 Трафик</p>
    <p>✖ Перекрёстки</p>
    <p>🏫 Школы</p>
    <p>🛣 Дороги</p>
    <p>🌿 Безопасные зоны</p>
  `;
}


// 📌 Фильтр отображения точек (основа для расширения)
function filterPoints(map, markers, typeFilter) {
  markers.forEach(m => {
    const type = m.options?.type;

    if (!typeFilter || typeFilter.includes(type)) {
      map.addLayer(m);
    } else {
      map.removeLayer(m);
    }
  });
}


// 📌 Панель управления (можно расширить кнопками)
function initControlPanel(map) {

  const control = L.control({ position: "topright" });

  control.onAdd = function () {
    const div = L.DomUtil.create("div", "control-panel");

    div.innerHTML = `
      <button id="showAll">Показать всё</button>
      <button id="showSafe">Только безопасные</button>
    `;

    return div;
  };

  control.addTo(map);

  // обработчики кнопок (пока заглушка)
  setTimeout(() => {
    const showAll = document.getElementById("showAll");
    const showSafe = document.getElementById("showSafe");

    if (showAll) {
      showAll.onclick = () => location.reload();
    }

    if (showSafe) {
      showSafe.onclick = () => {
        alert("Фильтр безопасных зон (можно доработать)");
      };
    }
  }, 300);
}