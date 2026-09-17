export function render(state) {
    const r = state.resultados || { fspl: 0, atMaterial: 0, potenciaRx: 0, enlace: false };

   
    const fsplEl = document.getElementById("fspl");
    const atEl = document.getElementById("at-material");
    const prxEl = document.getElementById("potencia-rx");
    if (fsplEl) fsplEl.textContent = isFinite(r.fspl) ? r.fspl.toFixed(2) : "--";
    if (atEl) atEl.textContent = isFinite(r.atMaterial) ? r.atMaterial.toFixed(2) : "--";
    if (prxEl) prxEl.textContent = isFinite(r.potenciaRx) ? r.potenciaRx.toFixed(2) : "--";

 
    const indicador = document.getElementById("indicador");
    if (indicador) indicador.style.backgroundColor = r.enlace ? "green" : "red";

  
    const canvas = document.getElementById("canvas-plano");
    const receptorEl = document.getElementById("receptor");
    const emisorEl = document.getElementById("emisor");
    const scaleContainer = document.getElementById("scale-marks");

    if (!canvas || !receptorEl || !emisorEl) return;

  
    const minDistance = 1; // m
    const maxDistance = 100; // m (ajusta si cambias el max del slider)
    const paddingLeft = 60; // px (espacio para el emisor)
    const paddingRight = 20; // px

    const usableWidth = canvas.clientWidth - paddingLeft - paddingRight;
    const clampedDistance = Math.max(minDistance, Math.min(maxDistance, state.distancia));

 
    const xPx = paddingLeft + ((clampedDistance - minDistance) / (maxDistance - minDistance)) * usableWidth;

    
    receptorEl.style.left = `${xPx}px`;
    receptorEl.style.top = `50%`;
    receptorEl.style.transform = `translate(-50%, -50%)`;

   
    canvas.style.borderWidth = `${5 + state.espesor * 20}px`;

  
    const step = 10; // metros por marca
    // limpiar marcas previas
    while (scaleContainer.firstChild) scaleContainer.removeChild(scaleContainer.firstChild);

    for (let m = 0; m <= maxDistance; m += step) {
        const rel = (m - minDistance) / (maxDistance - minDistance);
        const pos = paddingLeft + rel * usableWidth;
        
        if (pos < paddingLeft - 2 || pos > canvas.clientWidth - paddingRight + 2) continue;

        const mark = document.createElement("div");
        mark.className = "scale-mark";
        mark.style.left = `${pos}px`;
        scaleContainer.appendChild(mark);

        const label = document.createElement("div");
        label.className = "scale-label";
        label.style.left = `${pos}px`;
        label.textContent = `${m} m`;
        scaleContainer.appendChild(label);
    }
}
