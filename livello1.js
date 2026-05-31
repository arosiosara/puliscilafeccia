const level1Types = ['INSECT', 'TANK', 'MISSILE', 'SOLDIER', 'PUTIN', 'NETANYAHU', 'KIM', 'TRUMP'];

function drawInsect(ctx, x, y, r) {
    ctx.fillStyle = '#1e272e'; ctx.beginPath(); ctx.arc(x, y, r * 0.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + r * 0.4, y, r * 0.25, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1e272e'; ctx.lineWidth = 2; ctx.beginPath();
    for(let i = -1; i <= 1; i++) { ctx.moveTo(x + (i * r * 0.2), y); ctx.lineTo(x + (i * r * 0.2), y + r); ctx.moveTo(x + (i * r * 0.2), y); ctx.lineTo(x + (i * r * 0.2), y - r); }
    ctx.stroke();
}
function drawTank(ctx, x, y, r) {
    ctx.fillStyle = '#27ae60'; ctx.fillRect(x - r, y - r*0.6, r*2, r*1.2);
    ctx.fillStyle = '#1e7e34'; ctx.beginPath(); ctx.arc(x, y, r*0.5, 0, Math.PI*2); ctx.fill(); ctx.fillRect(x, y - 3, r*1.3, 6);
}
function drawMissile(ctx, x, y, r) {
    ctx.save(); ctx.translate(x, y); ctx.rotate(-Math.PI / 4); ctx.fillStyle = '#95a5a6'; ctx.fillRect(-r*0.8, -r*0.25, r*1.6, r*0.5);
    ctx.fillStyle = '#e74c3c'; ctx.beginPath(); ctx.moveTo(r*0.8, -r*0.25); ctx.lineTo(r*1.3, 0); ctx.lineTo(r*0.8, r*0.25); ctx.closePath(); ctx.fill(); ctx.restore();
}
function drawSoldier(ctx, x, y, r) {
    ctx.fillStyle = '#2d372c'; ctx.beginPath(); ctx.arc(x, y - r*0.3, r*0.4, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#ffdbac'; ctx.beginPath(); ctx.arc(x, y, r*0.3, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#556b2f'; ctx.fillRect(x - r*0.3, y + r*0.3, r*0.6, r*0.7);
}
function drawPutin(ctx, x, y, r) {
    ctx.fillStyle = '#1c2833'; ctx.fillRect(x - r*0.55, y + r*0.2, r*1.1, r*0.8);
    ctx.fillStyle = '#fdebd0'; ctx.beginPath(); ctx.arc(x, y, r*0.45, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#d5dbdb'; ctx.beginPath(); ctx.arc(x - r*0.3, y - r*0.2, r*0.2, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(x + r*0.3, y - r*0.2, r*0.2, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fdebd0'; ctx.beginPath(); ctx.arc(x, y - r*0.1, r*0.4, 0, Math.PI*2); ctx.fill();
}
function drawNetanyahu(ctx, x, y, r) {
    ctx.fillStyle = '#2c3e50'; ctx.fillRect(x - r*0.55, y + r*0.2, r*1.1, r*0.8);
    ctx.fillStyle = '#5dade2'; ctx.fillRect(x - 3, y + r*0.2, 6, r*0.5);
    ctx.fillStyle = '#fddba7'; ctx.beginPath(); ctx.arc(x, y, r*0.48, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#ecf0f1'; ctx.beginPath(); ctx.arc(x, y - r*0.2, r*0.45, Math.PI, 0); ctx.fill();
}
function drawKim(ctx, x, y, r) {
    ctx.fillStyle = '#212f3d'; ctx.fillRect(x - r*0.6, y + r*0.15, r*1.2, r*0.8);
    ctx.fillStyle = '#fcdbb0'; ctx.beginPath(); ctx.arc(x, y + r*0.05, r*0.55, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#111111'; ctx.fillRect(x - r*0.5, y - r*0.65, r * 1, r*0.4);
}
function drawTrump(ctx, x, y, r) {
    ctx.fillStyle = '#130f40'; ctx.fillRect(x - r*0.55, y + r*0.2, r*1.1, r*0.8);
    ctx.fillStyle = '#ff3838'; ctx.fillRect(x - 3, y + r*0.2, 6, r*0.5);
    ctx.fillStyle = '#f3a683'; ctx.beginPath(); ctx.arc(x, y, r*0.45, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#f1c40f'; ctx.beginPath(); ctx.moveTo(x - r*0.5, y - r*0.2); ctx.quadraticCurveTo(x - r*0.6, y - r*0.7, x, y - r*0.7); ctx.quadraticCurveTo(x + r*0.7, y - r*0.6, x + r*0.6, y - r*0.1); ctx.lineTo(x + r*0.2, y - r*0.2); ctx.closePath(); ctx.fill();
}