// Ho inserito POLITICI tre volte per farne spawnare "tanti" rispetto agli altri
const level2Types = ['MELONI', 'SALVINI', 'POLITICI', 'POLITICI', 'POLITICI', 'NUCLEARE', 'TASSE', 'BANCHE'];

function drawMeloni(ctx, x, y, r) {
    ctx.fillStyle = '#2980b9'; ctx.fillRect(x - r*0.5, y + r*0.2, r*1, r*0.8);
    ctx.fillStyle = '#f4d03f'; ctx.fillRect(x - r*0.45, y - r*0.2, r*0.9, r*0.6);
    ctx.fillStyle = '#fbc5b0'; ctx.beginPath(); ctx.arc(x, y, r*0.4, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f4d03f'; ctx.beginPath(); ctx.arc(x, y - r*0.15, r*0.42, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#3498db'; ctx.beginPath(); ctx.arc(x - 5, y - 2, 3, 0, Math.PI*2); ctx.arc(x + 5, y - 2, 3, 0, Math.PI*2); ctx.fill();
}

// Salvini 2.0 (Più somigliante: viso pieno, stempiatura, cravatta verde, barba folta)

function drawSalvini(ctx, x, y, r) {
    // Giacca scura
    ctx.fillStyle = '#1e272e'; 
    ctx.fillRect(x - r*0.6, y + r*0.1, r*1.2, r*0.9); 
    
    // Camicia bianca (triangolo allargato e allungato per far risaltare la mega-cravatta)
    ctx.fillStyle = '#ffffff'; 
    ctx.beginPath(); ctx.moveTo(x, y+r*0.85); ctx.lineTo(x-r*0.35, y+r*0.1); ctx.lineTo(x+r*0.35, y+r*0.1); ctx.fill();
    
    // CRAVATTA VERDE LEGA LOMBARDA (Formato Gigante)
    ctx.fillStyle = '#008f39'; // Verde acceso tipico
    // Nodo molto più largo e spesso
    ctx.fillRect(x - 7, y + r*0.1, 14, 10); 
    // Corpo della cravatta allargato e allungato fino alla base del busto
    ctx.beginPath();
    ctx.moveTo(x - 5, y + r*0.1 + 10);
    ctx.lineTo(x + 5, y + r*0.1 + 10);
    ctx.lineTo(x + 12, y + r*0.65); // Si allarga molto scendendo
    ctx.lineTo(x, y + r*0.85); // Punta che arriva quasi in fondo
    ctx.lineTo(x - 12, y + r*0.65);
    ctx.fill();
    
    // Viso
    ctx.fillStyle = '#fddba7'; 
    ctx.beginPath(); ctx.ellipse(x, y, r*0.48, r*0.42, 0, 0, Math.PI*2); ctx.fill();
    
    // Capelli e forte stempiatura
    ctx.fillStyle = '#4b4b4b'; 
    ctx.beginPath(); ctx.arc(x, y - r*0.1, r*0.42, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#fddba7'; 
    ctx.beginPath(); ctx.arc(x - r*0.25, y - r*0.15, r*0.2, 0, Math.PI*2); ctx.fill(); 
    ctx.beginPath(); ctx.arc(x + r*0.25, y - r*0.15, r*0.2, 0, Math.PI*2); ctx.fill();
    
    // Barba brizzolata folta
    ctx.fillStyle = '#555555';
    ctx.beginPath(); ctx.arc(x, y + r*0.15, r*0.4, 0.1, Math.PI - 0.1); ctx.fill();
    ctx.beginPath(); ctx.arc(x, y + r*0.25, r*0.25, 0, Math.PI); ctx.fill(); // Pizzetto
    
    // Occhi
    ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x - 12, y - 3); ctx.lineTo(x - 5, y - 3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x + 12, y - 3); ctx.lineTo(x + 5, y - 3); ctx.stroke();
}

// Omini Politici Generici (Sostituiscono Vannacci)
function drawPolitici(ctx, x, y, r) {
    let pr = r * 0.8; // Leggermente più piccoli dei leader
    // Giacca grigia da burocrate
    ctx.fillStyle = '#7f8c8d'; ctx.fillRect(x - pr*0.5, y + pr*0.2, pr, pr*0.8);
    // Camicia bianca
    ctx.fillStyle = '#fff'; ctx.fillRect(x - pr*0.15, y + pr*0.2, pr*0.3, pr*0.3);
    // Cravatta (cambia colore in base alla posizione per dare varietà)
    ctx.fillStyle = (Math.round(x) % 2 === 0) ? '#c0392b' : '#2980b9'; 
    ctx.fillRect(x - 2, y + pr*0.2, 4, pr*0.4);
    
    // Viso anonimo
    ctx.fillStyle = '#f5cba7'; ctx.beginPath(); ctx.arc(x, y, pr*0.4, 0, Math.PI*2); ctx.fill();
    // Capelli finti (grigi)
    ctx.fillStyle = '#95a5a6'; ctx.beginPath(); ctx.arc(x, y - pr*0.1, pr*0.4, Math.PI, 0); ctx.fill();
    
    // Occhialetti
    ctx.strokeStyle = '#2c3e50'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x - 4, y - 2, 3, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(x + 4, y - 2, 3, 0, Math.PI*2); ctx.stroke();
    
    // Valigetta
    ctx.fillStyle = '#34495e'; ctx.fillRect(x + pr*0.2, y + pr*0.4, pr*0.4, pr*0.4);
}

function drawNucleare(ctx, x, y, r) {
    ctx.fillStyle = '#f1c40f'; ctx.fillRect(x - r*0.5, y - r*0.7, r, r*1.4);
    ctx.strokeStyle = '#d4ac0d'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x - r*0.5, y - r*0.2); ctx.lineTo(x + r*0.5, y - r*0.2); ctx.moveTo(x - r*0.5, y + r*0.2); ctx.lineTo(x + r*0.5, y + r*0.2); ctx.stroke();
    ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(x, y, r*0.12, 0, Math.PI*2); ctx.fill();
    ctx.save(); ctx.translate(x, y);
    for(let i=0; i<3; i++) { ctx.rotate((Math.PI * 2) / 3); ctx.beginPath(); ctx.moveTo(0,0); ctx.arc(0, 0, r*0.35, -Math.PI/6, Math.PI/6); ctx.closePath(); ctx.fill(); }
    ctx.restore();
}

function drawTasse(ctx, x, y, r) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(0.1);
    ctx.fillStyle = '#f5f6fa'; ctx.strokeStyle = '#7f8c8d'; ctx.lineWidth = 2;
    ctx.fillRect(-r*0.6, -r*0.8, r*1.2, r*1.6); ctx.strokeRect(-r*0.6, -r*0.8, r*1.2, r*1.6);
    ctx.fillStyle = '#c0392b'; ctx.font = `900 ${r*0.45}px Arial`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("TAX", 0, 0); 
    ctx.restore();
}

function drawBanche(ctx, x, y, r) {
    ctx.save(); ctx.translate(x, y);
    ctx.fillStyle = '#b2bec3'; ctx.fillRect(-r*0.8, r*0.5, r*1.6, r*0.2);
    ctx.beginPath(); ctx.moveTo(-r*0.8, -r*0.4); ctx.lineTo(r*0.8, -r*0.4); ctx.lineTo(0, -r*0.8); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#dfe6e9';
    ctx.fillRect(-r*0.6, -r*0.4, r*0.15, r*0.9); ctx.fillRect(-r*0.2, -r*0.4, r*0.15, r*0.9);
    ctx.fillRect(r*0.05, -r*0.4, r*0.15, r*0.9); ctx.fillRect(r*0.45, -r*0.4, r*0.15, r*0.9);
    ctx.fillStyle = '#2c3e50'; ctx.font = `900 ${r*0.35}px Arial`; ctx.textAlign = "center"; 
    ctx.fillText("BANK", 0, -r*0.45); 
    ctx.restore();
}