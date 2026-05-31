const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pointer = { x: canvas.width / 2, y: canvas.height / 2 };
let currentScreen = 1; // Impostato a 2 per i tuoi test sull'Italia
let isLevelChanging = false;
let itemsCleaned = 0; 
const winTarget = 100; 

// AGGIUNTA: Il gioco parte fermo finché non si accetta il disclaimer
let gameStarted = false; 

let broom = { x: canvas.width / 2, y: canvas.height / 2, angle: 0, width: 95, height: 24 };

let dirtParticles = [];
let fxParticles = []; 

function spawnSingleItem(type = null, forceX = null, forceY = null, customGen = 1) {
    let currentPool = (currentScreen === 1) ? level1Types : level2Types;
    let randomType = type || currentPool[Math.floor(Math.random() * currentPool.length)];
    
    // Riconoscimento dei Leader
    let isLeader = ['PUTIN', 'NETANYAHU', 'KIM', 'TRUMP', 'MELONI', 'SALVINI'].includes(randomType);
    
    // RAGGIO AUMENTATO: I leader ora sono giganteschi (42) rispetto ai minion (24)
    let radius = isLeader ? 42 : 24; 
    
    let speedMultiplier = 1 + (currentScreen * 0.35);
    let canMove = ['INSECT', 'SOLDIER', 'PUTIN', 'TRUMP', 'MELONI', 'SALVINI', 'POLITICI'].includes(randomType);

    dirtParticles.push({
        type: randomType,
        x: forceX || Math.random() * (canvas.width - 120) + 60,
        y: forceY || Math.random() * (canvas.height - 220) + 110,
        radius: radius,
        durability: 100,
        generation: customGen,
        active: true,
        vx: canMove ? (Math.random() - 0.5) * 4 * speedMultiplier : 0,
        vy: canMove ? (Math.random() - 0.5) * 4 * speedMultiplier : 0
    });
}

function initScreen(screen) {
    dirtParticles = [];
    fxParticles = [];
    itemsCleaned = 0;
    isLevelChanging = false;
    document.getElementById('victory-screen').style.display = 'none';
    document.getElementById('screen-number').innerText = screen;

    document.body.className = "level-" + screen;
    
    if (screen === 1) document.getElementById('victory-title').innerText = "Mappa Mondiale Pulita!";
    if (screen === 2) document.getElementById('victory-title').innerText = "Italia Bonificata!";

    // SPAWN GARANTITO: Obblighiamo il gioco a inserire i Leader principali subito
    if (screen === 1) {
        spawnSingleItem('TRUMP');
        spawnSingleItem('PUTIN');
        spawnSingleItem('KIM');
        spawnSingleItem('NETANYAHU');
        for (let i = 0; i < 12; i++) spawnSingleItem(); // Genera i restanti a caso
    } else if (screen === 2) {
        spawnSingleItem('MELONI');
        spawnSingleItem('SALVINI');
        for (let i = 0; i < 14; i++) spawnSingleItem(); // Genera i restanti a caso
    }
}

function triggerVictory() {
    isLevelChanging = true;
    document.getElementById('victory-screen').style.display = 'flex';
    
    setTimeout(() => {
        currentScreen++;
        if(currentScreen > 2) currentScreen = 1; 
        initScreen(currentScreen);
    }, 3500);
}

function createExplosion(x, y, color) {
    let count = Math.floor(Math.random() * 5) + 3;
    for(let i=0; i<count; i++) {
        fxParticles.push({
            x: x, y: y, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6,
            radius: Math.random() * 4 + 1, alpha: 1, color: color
        });
    }
}

initScreen(currentScreen);

window.addEventListener('mousemove', (e) => { pointer.x = e.clientX; pointer.y = e.clientY; });
window.addEventListener('touchmove', (e) => { pointer.x = e.touches[0].clientX; pointer.y = e.touches[0].clientY; });

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    document.getElementById('percentage').innerText = itemsCleaned;
    document.getElementById('progress-bar').style.width = Math.min(100, itemsCleaned) + '%';

    // AGGIUNTA: Blocchiamo la logica di vittoria se il gioco non è iniziato
    if (gameStarted && itemsCleaned >= winTarget && !isLevelChanging) triggerVictory();

    let activeCount = 0;
    dirtParticles.forEach(d => { if(d.active) activeCount++; });
    
    // AGGIUNTA: Blocchiamo lo spawn di nuovi nemici se il gioco non è iniziato
    if (gameStarted && activeCount < 6 && itemsCleaned < winTarget && !isLevelChanging) spawnSingleItem();

    dirtParticles.forEach(item => {
        if (!item.active) return;

        // MODIFICA: I nemici si muovono solo se il gioco è iniziato (gameStarted è true)
        if (!isLevelChanging && gameStarted) {
            item.x += item.vx; item.y += item.vy;
            if (item.x < 50 || item.x > canvas.width - 50) item.vx *= -1;
            if (item.y < 120 || item.y > canvas.height - 120) item.vy *= -1;
        }

        ctx.save();
        ctx.globalAlpha = item.durability / 100;
        
        if (item.type === 'INSECT') drawInsect(ctx, item.x, item.y, item.radius);
        if (item.type === 'TANK') drawTank(ctx, item.x, item.y, item.radius);
        if (item.type === 'MISSILE') drawMissile(ctx, item.x, item.y, item.radius);
        if (item.type === 'SOLDIER') drawSoldier(ctx, item.x, item.y, item.radius);
        if (item.type === 'PUTIN') drawPutin(ctx, item.x, item.y, item.radius);
        if (item.type === 'NETANYAHU') drawNetanyahu(ctx, item.x, item.y, item.radius);
        if (item.type === 'KIM') drawKim(ctx, item.x, item.y, item.radius);
        if (item.type === 'TRUMP') drawTrump(ctx, item.x, item.y, item.radius);
        
        if (item.type === 'MELONI') drawMeloni(ctx, item.x, item.y, item.radius);
        if (item.type === 'SALVINI') drawSalvini(ctx, item.x, item.y, item.radius);
        if (item.type === 'POLITICI') drawPolitici(ctx, item.x, item.y, item.radius); 
        if (item.type === 'NUCLEARE') drawNucleare(ctx, item.x, item.y, item.radius);
        if (item.type === 'TASSE') drawTasse(ctx, item.x, item.y, item.radius);
        if (item.type === 'BANCHE') drawBanche(ctx, item.x, item.y, item.radius);
        
        ctx.restore();
    });

    fxParticles.forEach((p, index) => {
        p.x += p.vx; p.y += p.vy; p.alpha -= 0.03;
        if (p.alpha <= 0) fxParticles.splice(index, 1);
        else {
            ctx.save(); ctx.globalAlpha = p.alpha; ctx.fillStyle = p.color;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        }
    });

    let dx = pointer.x - broom.x; let dy = pointer.y - broom.y;
    broom.x += dx * 0.16; broom.y += dy * 0.16;
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) broom.angle = Math.atan2(dy, dx) + Math.PI / 2;

    ctx.save();
    ctx.translate(broom.x, broom.y); ctx.rotate(broom.angle);
    ctx.fillStyle = '#cd853f'; ctx.fillRect(-4, -100, 8, 100); 
    ctx.fillStyle = '#2c3e50'; ctx.fillRect(-broom.width / 2, 0, broom.width, broom.height); 
    ctx.fillStyle = '#e67e22'; ctx.fillRect(-broom.width / 2, broom.height, broom.width, 16); 
    ctx.restore();

    // MODIFICA: La scopa pulisce solo se il gioco è iniziato (gameStarted è true)
    if (!isLevelChanging && gameStarted) {
        dirtParticles.forEach(item => {
            if (!item.active) return;
            let distDx = broom.x - item.x; let distDy = broom.y - item.y;
            let dist = Math.sqrt(distDx * distDx + distDy * distDy);

            if (dist < (broom.width / 2) + item.radius) {
                item.durability -= 4; 
                let fxColor = '#7f8c8d';
                if (item.type === 'MISSILE') fxColor = '#e74c3c';
                if (item.type === 'MELONI') fxColor = '#f4d03f';
                if (item.type === 'TASSE') fxColor = '#ff7675'; 
                if (item.type === 'POLITICI') fxColor = '#95a5a6'; 

                createExplosion(item.x, item.y, fxColor);

                if (item.durability <= 0) {
                    item.active = false; itemsCleaned++; 
                    if (item.generation === 1) {
                        if (item.type === 'MELONI' || item.type === 'SALVINI') {
                            spawnSingleItem('POLITICI', item.x - 30, item.y - 15, 2);
                            spawnSingleItem('POLITICI', item.x + 30, item.y - 15, 2);
                            spawnSingleItem('POLITICI', item.x, item.y + 30, 2);
                        }
                    }
                }
            }
        });
    }
    requestAnimationFrame(update);
}

update();

// AGGIUNTA FINALE: Gestione del pulsante per chiudere il disclaimer e avviare la logica di gioco
document.getElementById('btn-accetta').addEventListener('click', () => {
    document.getElementById('disclaimer-overlay').style.display = 'none';
    gameStarted = true; // Sblocca il movimento e le collisioni
});