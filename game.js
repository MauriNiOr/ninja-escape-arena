// ============================================================
// NINJA ESCAPE ARENA v2 - Mejorado
// ============================================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const menuScreen = document.getElementById('menu-screen');
const levelSelect = document.getElementById('level-select');
const hud = document.getElementById('hud');
const endScreen = document.getElementById('end-screen');
const healthFill = document.getElementById('health-fill');
const currentLevelSpan = document.getElementById('current-level');
const keysCountSpan = document.getElementById('keys-count');
const enemiesCountSpan = document.getElementById('enemies-count');

// Sprite sheet (ahora PNG transparente)
const spriteSheet = new Image();
spriteSheet.src = 'player_sprites.png';

// Coordenadas mejoradas del spritesheet (1024x559)
const SPRITE = {
  frameW: 120,
  frameH: 100,
  run:   { y: 37,  frames: 8, xs: [18, 146, 265, 389, 513, 635, 758, 880] },
  swing: { y: 295, frames: 6, xs: [16, 150, 290, 430, 560, 700] },
  thrust:{ y: 455, frames: 4, xs: [51, 298, 540, 768] }
};

let gameState = 'menu';
let currentLevel = 1;
let keys = {};
let lastTime = 0;
let menuParticles = [];

// Player
const player = {
  x: 100, y: 300, w: 42, h: 52,
  speed: 2.9, hp: 100, maxHp: 100,
  facing: 1, anim: 'idle', frame: 0, frameTimer: 0,
  attacking: false, attackTimer: 0, invincible: 0,
  keysCollected: 0
};

const levels = {
  1: {
    name: "Entrada del Templo",
    walls: [
      {x:0,y:0,w:800,h:36}, {x:0,y:564,w:800,h:36},
      {x:0,y:0,w:36,h:600}, {x:764,y:0,w:36,h:600},
      {x:220,y:160,w:140,h:28}, {x:480,y:360,w:160,h:28}
    ],
    enemies: [ {x:520,y:220,type:'slime'}, {x:620,y:420,type:'slime'} ],
    keys: [{x:320,y:110}],
    door: {x:710,y:270,w:36,h:90},
    spawn: {x:70,y:290}
  },
  2: {
    name: "Pasillo de las Sombras",
    walls: [
      {x:0,y:0,w:800,h:36}, {x:0,y:564,w:800,h:36},
      {x:0,y:0,w:36,h:600}, {x:764,y:0,w:36,h:600},
      {x:160,y:90,w:28,h:210}, {x:160,y:360,w:28,h:180},
      {x:400,y:70,w:28,h:190}, {x:400,y:330,w:28,h:200},
      {x:600,y:140,w:28,h:310}
    ],
    enemies: [
      {x:260,y:210,type:'slime'}, {x:520,y:260,type:'warrior'},
      {x:680,y:450,type:'slime'}
    ],
    keys: [{x:90,y:460}, {x:560,y:100}],
    door: {x:710,y:240,w:36,h:100},
    spawn: {x:60,y:280}
  },
  3: {
    name: "Sala de Entrenamiento",
    walls: [
      {x:0,y:0,w:800,h:36}, {x:0,y:564,w:800,h:36},
      {x:0,y:0,w:36,h:600}, {x:764,y:0,w:36,h:600},
      {x:300,y:200,w:200,h:26}, {x:300,y:380,w:200,h:26},
      {x:200,y:200,w:26,h:206}, {x:574,y:200,w:26,h:206}
    ],
    enemies: [
      {x:140,y:150,type:'warrior'}, {x:650,y:150,type:'warrior'},
      {x:400,y:460,type:'slime'}, {x:400,y:90,type:'slime'}
    ],
    keys: [{x:400,y:290}],
    door: {x:710,y:250,w:36,h:90},
    spawn: {x:70,y:290}
  },
  4: {
    name: "Cripta del Guardián",
    walls: [
      {x:0,y:0,w:800,h:36}, {x:0,y:564,w:800,h:36},
      {x:0,y:0,w:36,h:600}, {x:764,y:0,w:36,h:600},
      {x:100,y:120,w:260,h:24}, {x:450,y:120,w:260,h:24},
      {x:100,y:460,w:260,h:24}, {x:450,y:460,w:260,h:24},
      {x:380,y:200,w:40,h:200}
    ],
    enemies: [
      {x:200,y:260,type:'warrior'}, {x:600,y:260,type:'warrior'},
      {x:200,y:400,type:'slime'}, {x:600,y:400,type:'slime'},
      {x:400,y:90,type:'warrior'}
    ],
    keys: [{x:140,y:200}, {x:660,y:200}, {x:400,y:510}],
    door: {x:710,y:260,w:36,h:90},
    spawn: {x:70,y:290}
  },
  5: {
    name: "Trono del Señor Oscuro",
    walls: [
      {x:0,y:0,w:800,h:36}, {x:0,y:564,w:800,h:36},
      {x:0,y:0,w:36,h:600}, {x:764,y:0,w:36,h:600},
      {x:150,y:100,w:500,h:24}, {x:150,y:480,w:500,h:24},
      {x:150,y:100,w:24,h:160}, {x:150,y:360,w:24,h:144},
      {x:626,y:100,w:24,h:160}, {x:626,y:360,w:24,h:144}
    ],
    enemies: [
      {x:400,y:280,type:'boss'},
      {x:240,y:200,type:'warrior'}, {x:560,y:200,type:'warrior'},
      {x:240,y:400,type:'slime'}, {x:560,y:400,type:'slime'}
    ],
    keys: [{x:200,y:150}, {x:600,y:150}, {x:200,y:420}, {x:600,y:420}],
    door: {x:710,y:250,w:36,h:100},
    spawn: {x:70,y:290}
  }
};

let currentWalls = [], currentEnemies = [], currentKeys = [], currentDoor = null;
let particles = [];
let floorPattern = null;

// Pre-render floor pattern for performance
function createFloorPattern() {
  const off = document.createElement('canvas');
  off.width = 64; off.height = 64;
  const octx = off.getContext('2d');
  // Base
  octx.fillStyle = '#12122a';
  octx.fillRect(0, 0, 64, 64);
  // Stone tiles
  octx.strokeStyle = 'rgba(40,45,80,0.5)';
  octx.lineWidth = 1;
  octx.strokeRect(0.5, 0.5, 31, 31);
  octx.strokeRect(32.5, 0.5, 31, 31);
  octx.strokeRect(0.5, 32.5, 31, 31);
  octx.strokeRect(32.5, 32.5, 31, 31);
  // Subtle variation
  octx.fillStyle = 'rgba(30,35,70,0.3)';
  octx.fillRect(2, 2, 12, 8);
  octx.fillRect(36, 36, 10, 10);
  octx.fillStyle = 'rgba(20,25,50,0.25)';
  octx.fillRect(18, 40, 8, 14);
  return ctx.createPattern(off, 'repeat');
}

// Input
window.addEventListener('keydown', e => {
  keys[e.key.toLowerCase()] = true;
  if (e.key === ' ' || e.code === 'Space') e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

// Buttons
document.getElementById('btn-start').onclick = () => startLevel(1);
document.getElementById('btn-levels').onclick = () => levelSelect.classList.remove('hidden');
document.getElementById('btn-back').onclick = () => levelSelect.classList.add('hidden');
document.querySelectorAll('.level-btn').forEach(btn => {
  btn.onclick = () => startLevel(parseInt(btn.dataset.level));
});
document.getElementById('btn-next').onclick = () => {
  if (currentLevel < 5) startLevel(currentLevel + 1);
  else showMenu();
};
document.getElementById('btn-menu').onclick = showMenu;

function showMenu() {
  gameState = 'menu';
  menuScreen.classList.remove('hidden');
  levelSelect.classList.add('hidden');
  hud.classList.add('hidden');
  endScreen.classList.add('hidden');
  initMenuParticles();
}

function startLevel(level) {
  currentLevel = level;
  const data = levels[level];
  player.x = data.spawn.x;
  player.y = data.spawn.y;
  player.hp = player.maxHp;
  player.keysCollected = 0;
  player.attacking = false;
  player.invincible = 0;
  player.anim = 'idle';
  player.frame = 0;
  player.facing = 1;

  currentWalls = data.walls.map(w => ({...w}));
  currentEnemies = data.enemies.map(e => createEnemy(e.x, e.y, e.type));
  currentKeys = data.keys.map(k => ({x: k.x, y: k.y, collected: false, size: 18, bob: Math.random()*Math.PI*2}));
  currentDoor = {...data.door, open: false};
  particles = [];

  menuScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  hud.classList.remove('hidden');
  currentLevelSpan.textContent = level;
  updateHUD();
  gameState = 'playing';
}

function createEnemy(x, y, type) {
  const e = {
    x, y, w: 38, h: 38, hp: 30, maxHp: 30, speed: 1.15,
    type, timer: 0, attackCooldown: 0, alive: true, color: '#3dff9a',
    hitFlash: 0
  };
  if (type === 'warrior') {
    e.hp = e.maxHp = 55; e.speed = 1.55; e.w = 42; e.h = 46; e.color = '#ff6b4a';
  }
  if (type === 'boss') {
    e.hp = e.maxHp = 180; e.speed = 0.95; e.w = 68; e.h = 68; e.color = '#b44aff';
  }
  return e;
}

function updateHUD() {
  const pct = Math.max(0, player.hp / player.maxHp * 100);
  healthFill.style.width = pct + '%';
  if (pct < 30) healthFill.style.background = 'linear-gradient(90deg, #ff1030, #ff4060)';
  else if (pct < 60) healthFill.style.background = 'linear-gradient(90deg, #ff6030, #ff9040)';
  else healthFill.style.background = 'linear-gradient(90deg, #20c060, #40e080)';
  keysCountSpan.textContent = player.keysCollected;
  enemiesCountSpan.textContent = currentEnemies.filter(e => e.alive).length;
}

function rectCollide(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function moveWithCollision(obj, dx, dy) {
  obj.x += dx;
  for (const wall of currentWalls) {
    if (rectCollide(obj, wall)) {
      if (dx > 0) obj.x = wall.x - obj.w;
      else if (dx < 0) obj.x = wall.x + wall.w;
    }
  }
  obj.y += dy;
  for (const wall of currentWalls) {
    if (rectCollide(obj, wall)) {
      if (dy > 0) obj.y = wall.y - obj.h;
      else if (dy < 0) obj.y = wall.y + wall.h;
    }
  }
  obj.x = Math.max(36, Math.min(canvas.width - 36 - obj.w, obj.x));
  obj.y = Math.max(36, Math.min(canvas.height - 36 - obj.h, obj.y));
}

function updatePlayer(dt) {
  if (player.invincible > 0) player.invincible -= dt;

  let dx = 0, dy = 0;
  if (keys['w'] || keys['arrowup']) dy = -player.speed;
  if (keys['s'] || keys['arrowdown']) dy = player.speed;
  if (keys['a'] || keys['arrowleft']) { dx = -player.speed; player.facing = -1; }
  if (keys['d'] || keys['arrowright']) { dx = player.speed; player.facing = 1; }

  if (dx && dy) { dx *= 0.7071; dy *= 0.7071; }

  if (!player.attacking) {
    moveWithCollision(player, dx, dy);
    player.anim = (dx || dy) ? 'run' : 'idle';
  }

  // Attack
  if ((keys[' '] || keys['space']) && !player.attacking) {
    player.attacking = true;
    player.attackTimer = 0.32;
    player.anim = Math.random() > 0.45 ? 'swing' : 'thrust';
    player.frame = 0;
  }

  if (player.attacking) {
    player.attackTimer -= dt;
    if (player.attackTimer <= 0) {
      player.attacking = false;
      player.anim = 'idle';
    } else {
      const atk = {
        x: player.facing === 1 ? player.x + player.w - 8 : player.x - 42,
        y: player.y + 8, w: 48, h: 38
      };
      currentEnemies.forEach(e => {
        if (e.alive && rectCollide(atk, e) && e.hitFlash <= 0) {
          e.hp -= 20;
          e.hitFlash = 0.15;
          spawnParticles(e.x + e.w/2, e.y + e.h/2, e.color, 8);
          if (e.hp <= 0) {
            e.alive = false;
            spawnParticles(e.x + e.w/2, e.y + e.h/2, '#ffffff', 16);
            spawnParticles(e.x + e.w/2, e.y + e.h/2, e.color, 10);
          }
        }
      });
    }
  }

  // Keys
  currentKeys.forEach(k => {
    if (!k.collected) {
      k.bob += dt * 3;
      if (rectCollide(player, {x:k.x, y:k.y, w:k.size, h:k.size})) {
        k.collected = true;
        player.keysCollected++;
        spawnParticles(k.x + 8, k.y + 8, '#ffdd44', 12);
      }
    }
  });

  // Door
  if (keys['e'] && currentDoor && !currentDoor.open) {
    const dist = Math.hypot(
      player.x + player.w/2 - (currentDoor.x + currentDoor.w/2),
      player.y + player.h/2 - (currentDoor.y + currentDoor.h/2)
    );
    if (dist < 85 && player.keysCollected >= levels[currentLevel].keys.length) {
      currentDoor.open = true;
      spawnParticles(currentDoor.x + 18, currentDoor.y + 45, '#00ffcc', 20);
    }
  }

  if (currentDoor && currentDoor.open && rectCollide(player, currentDoor)) {
    winLevel();
  }

  // Anim
  player.frameTimer += dt;
  const animSpeed = player.anim === 'run' ? 0.09 : 0.12;
  if (player.frameTimer > animSpeed) {
    player.frameTimer = 0;
    player.frame++;
  }
}

function updateEnemies(dt) {
  currentEnemies.forEach(e => {
    if (!e.alive) return;
    e.timer += dt;
    e.attackCooldown = Math.max(0, e.attackCooldown - dt);
    e.hitFlash = Math.max(0, e.hitFlash - dt);

    const dx = player.x - e.x, dy = player.y - e.y;
    const dist = Math.hypot(dx, dy) || 1;

    if (dist > 25 && dist < 380) {
      moveWithCollision(e, (dx/dist)*e.speed, (dy/dist)*e.speed);
    }

    if (dist < 52 && e.attackCooldown <= 0 && player.invincible <= 0) {
      const dmg = e.type === 'boss' ? 14 : e.type === 'warrior' ? 9 : 5;
      player.hp -= dmg;
      player.invincible = 0.7;
      e.attackCooldown = e.type === 'boss' ? 1.0 : 1.15;
      spawnParticles(player.x + player.w/2, player.y + player.h/2, '#ff3355', 8);
      if (player.hp <= 0) { player.hp = 0; loseLevel(); }
    }
  });
  updateHUD();
}

function spawnParticles(x, y, color, count = 6) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 4;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.35 + Math.random() * 0.4,
      maxLife: 0.5,
      color, size: 2.5 + Math.random() * 3.5
    });
  }
}

function updateParticles(dt) {
  particles = particles.filter(p => {
    p.x += p.vx; p.y += p.vy;
    p.vy += 8 * dt; // gravity
    p.life -= dt;
    return p.life > 0;
  });
}

function initMenuParticles() {
  menuParticles = [];
  for (let i = 0; i < 40; i++) {
    menuParticles.push({
      x: Math.random() * 800,
      y: Math.random() * 600,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -0.2 - Math.random() * 0.5,
      size: 1 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.5
    });
  }
}

function winLevel() {
  gameState = 'victory';
  endScreen.classList.remove('hidden');
  endScreen.classList.add('victory');
  endScreen.classList.remove('defeat');
  document.getElementById('end-title').textContent = '¡NIVEL COMPLETADO!';
  document.getElementById('end-message').textContent =
    currentLevel < 5
      ? `Has escapado del nivel ${currentLevel}. ¡Continúa tu misión!`
      : '¡Has derrotado al Señor Oscuro y liberado el templo! ¡Victoria final!';
  document.getElementById('btn-next').style.display = currentLevel < 5 ? 'inline-block' : 'none';
}

function loseLevel() {
  gameState = 'defeat';
  endScreen.classList.remove('hidden');
  endScreen.classList.add('defeat');
  endScreen.classList.remove('victory');
  document.getElementById('end-title').textContent = 'DERROTA';
  document.getElementById('end-message').textContent = 'Has caído en combate. ¡Levántate y vuelve a intentarlo!';
  document.getElementById('btn-next').style.display = 'none';
}

// ==================== DRAW ====================
function draw() {
  // Floor
  if (!floorPattern) floorPattern = createFloorPattern();
  ctx.fillStyle = floorPattern;
  ctx.fillRect(0, 0, 800, 600);

  // Soft vignette overlay
  const grd = ctx.createRadialGradient(400, 300, 180, 400, 300, 520);
  grd.addColorStop(0, 'rgba(0,0,0,0)');
  grd.addColorStop(1, 'rgba(0,0,15,0.55)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 800, 600);

  if (gameState === 'menu') {
    // menu particles on canvas under UI
    menuParticles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -10) { p.y = 610; p.x = Math.random()*800; }
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = '#00d4ff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    return;
  }

  if (gameState !== 'playing' && gameState !== 'victory' && gameState !== 'defeat') return;

  // Walls with depth
  currentWalls.forEach(w => {
    // main
    ctx.fillStyle = '#1e2440';
    ctx.fillRect(w.x, w.y, w.w, w.h);
    // top highlight
    ctx.fillStyle = '#2e3a5a';
    ctx.fillRect(w.x, w.y, w.w, 4);
    // side shadow
    ctx.fillStyle = '#12162a';
    ctx.fillRect(w.x + w.w - 4, w.y, 4, w.h);
    // border
    ctx.strokeStyle = '#3a4a70';
    ctx.lineWidth = 1;
    ctx.strokeRect(w.x + 0.5, w.y + 0.5, w.w - 1, w.h - 1);
  });

  // Door
  if (currentDoor) {
    if (currentDoor.open) {
      ctx.fillStyle = 'rgba(0, 255, 180, 0.12)';
      ctx.fillRect(currentDoor.x - 4, currentDoor.y - 4, currentDoor.w + 8, currentDoor.h + 8);
      ctx.strokeStyle = '#00ffb0';
      ctx.lineWidth = 2;
      ctx.strokeRect(currentDoor.x, currentDoor.y, currentDoor.w, currentDoor.h);
      ctx.fillStyle = '#00ffb0';
      ctx.font = 'bold 11px Rajdhani, sans-serif';
      ctx.fillText('SALIDA', currentDoor.x - 2, currentDoor.y - 8);
    } else {
      // door body
      ctx.fillStyle = '#3a2a18';
      ctx.fillRect(currentDoor.x, currentDoor.y, currentDoor.w, currentDoor.h);
      ctx.fillStyle = '#5a4030';
      ctx.fillRect(currentDoor.x + 4, currentDoor.y + 6, currentDoor.w - 8, currentDoor.h - 12);
      // lock
      ctx.fillStyle = '#ffcc33';
      ctx.font = '22px serif';
      ctx.fillText('🔒', currentDoor.x + 6, currentDoor.y + 55);
      ctx.strokeStyle = '#8a6040';
      ctx.lineWidth = 2;
      ctx.strokeRect(currentDoor.x, currentDoor.y, currentDoor.w, currentDoor.h);
    }
  }

  // Keys (floating)
  currentKeys.forEach(k => {
    if (k.collected) return;
    const bobY = Math.sin(k.bob) * 4;
    // glow
    ctx.shadowColor = '#ffdd44';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#ffdd44';
    ctx.beginPath();
    ctx.arc(k.x + 9, k.y + 9 + bobY, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    // key shape
    ctx.fillStyle = '#cc9900';
    ctx.fillRect(k.x + 7, k.y + 15 + bobY, 4, 9);
    ctx.fillRect(k.x + 7, k.y + 22 + bobY, 7, 3);
  });

  // Enemies
  currentEnemies.forEach(e => {
    if (!e.alive) return;
    const flash = e.hitFlash > 0;

    if (e.type === 'boss') {
      ctx.fillStyle = flash ? '#fff' : e.color;
      ctx.beginPath();
      ctx.arc(e.x + e.w/2, e.y + e.h/2, e.w/2 - 2, 0, Math.PI * 2);
      ctx.fill();
      // eyes
      ctx.fillStyle = '#1a0030';
      ctx.beginPath();
      ctx.arc(e.x + e.w/2 - 14, e.y + e.h/2 - 8, 7, 0, Math.PI * 2);
      ctx.arc(e.x + e.w/2 + 14, e.y + e.h/2 - 8, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff44aa';
      ctx.beginPath();
      ctx.arc(e.x + e.w/2 - 14, e.y + e.h/2 - 8, 3, 0, Math.PI * 2);
      ctx.arc(e.x + e.w/2 + 14, e.y + e.h/2 - 8, 3, 0, Math.PI * 2);
      ctx.fill();
    } else if (e.type === 'warrior') {
      ctx.fillStyle = flash ? '#fff' : e.color;
      ctx.fillRect(e.x, e.y, e.w, e.h);
      // helmet
      ctx.fillStyle = '#2a1a10';
      ctx.fillRect(e.x + 6, e.y + 2, e.w - 12, 12);
      // sword
      ctx.fillStyle = '#ccddee';
      ctx.fillRect(e.x + e.w - 6, e.y + 8, 7, 28);
      ctx.fillStyle = '#8899aa';
      ctx.fillRect(e.x + e.w - 8, e.y + 6, 11, 5);
    } else {
      // slime
      ctx.fillStyle = flash ? '#fff' : e.color;
      ctx.beginPath();
      ctx.ellipse(e.x + e.w/2, e.y + e.h/2 + 4, e.w/2 - 1, e.h/2 - 4, 0, 0, Math.PI * 2);
      ctx.fill();
      // eyes
      ctx.fillStyle = '#003322';
      ctx.beginPath();
      ctx.arc(e.x + 12, e.y + 14, 4.5, 0, Math.PI * 2);
      ctx.arc(e.x + 26, e.y + 14, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(e.x + 13, e.y + 13, 1.5, 0, Math.PI * 2);
      ctx.arc(e.x + 27, e.y + 13, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // HP bar
    const hpPct = e.hp / e.maxHp;
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(e.x, e.y - 11, e.w, 5);
    ctx.fillStyle = hpPct > 0.5 ? '#44ee66' : hpPct > 0.25 ? '#ffaa22' : '#ff3344';
    ctx.fillRect(e.x, e.y - 11, e.w * hpPct, 5);
  });

  // Player
  drawPlayer();

  // Attack slash effect
  if (player.attacking) {
    ctx.save();
    ctx.globalAlpha = 0.55 * (player.attackTimer / 0.32);
    ctx.fillStyle = '#00e8ff';
    const ax = player.facing === 1 ? player.x + player.w - 4 : player.x - 44;
    ctx.beginPath();
    ctx.ellipse(ax + 24, player.y + 28, 28, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Particles
  particles.forEach(p => {
    ctx.globalAlpha = Math.max(0, p.life / 0.5);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * (p.life / 0.5), 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Level name bottom
  ctx.fillStyle = 'rgba(160,180,220,0.45)';
  ctx.font = '13px Rajdhani, sans-serif';
  ctx.fillText(levels[currentLevel].name, 18, 586);
}

function drawPlayer() {
  const px = player.x, py = player.y;

  if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
    let row = SPRITE.run;
    let frameIdx = 0;

    if (player.anim === 'swing') {
      row = SPRITE.swing;
      frameIdx = Math.min(player.frame, row.frames - 1);
    } else if (player.anim === 'thrust') {
      row = SPRITE.thrust;
      frameIdx = Math.min(player.frame, row.frames - 1);
    } else if (player.anim === 'run') {
      frameIdx = player.frame % row.frames;
    } else {
      frameIdx = 0; // idle = first run frame
    }

    const sx = row.xs ? row.xs[frameIdx] : (row.startX || 0) + frameIdx * SPRITE.frameW;
    const sy = row.y;
    const sw = SPRITE.frameW;
    const sh = SPRITE.frameH;

    ctx.save();
    if (player.facing === -1) {
      ctx.translate(px + player.w, py);
      ctx.scale(-1, 1);
      ctx.drawImage(spriteSheet, sx, sy, sw, sh, 0, 0, player.w, player.h);
    } else {
      ctx.drawImage(spriteSheet, sx, sy, sw, sh, px, py, player.w, player.h);
    }
    ctx.restore();

    // invincible blink
    if (player.invincible > 0 && Math.floor(player.invincible * 12) % 2 === 0) {
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = '#aaddff';
      ctx.fillRect(px, py, player.w, player.h);
      ctx.globalAlpha = 1;
    }
  } else {
    // fallback
    ctx.fillStyle = player.invincible > 0 ? '#88aaff' : '#2a6aff';
    ctx.fillRect(px, py, player.w, player.h);
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(px + player.w/2, py + 11, 9, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#00e5ff';
    const sx = player.facing === 1 ? px + player.w : px - 18;
    ctx.fillRect(sx, py + 18, 20, 5);
  }
}

// Main loop
function gameLoop(timestamp) {
  const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
  lastTime = timestamp;

  if (gameState === 'playing') {
    updatePlayer(dt);
    updateEnemies(dt);
    updateParticles(dt);
  } else if (gameState === 'menu') {
    // already updating particles in draw
  }

  draw();
  requestAnimationFrame(gameLoop);
}

spriteSheet.onload = () => console.log('Sprites transparentes cargados ✓');
floorPattern = null;
showMenu();
requestAnimationFrame(gameLoop);
