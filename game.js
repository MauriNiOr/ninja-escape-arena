(() => {
  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // ../tmp/gh-src/content.ts
  var SKINS = [
    {
      id: "cyan",
      name: "Sombra Cian",
      blurb: "El filo del templo. Gratis para empezar.",
      price: 0,
      sheet: "/sprites/cyan.png",
      trail: "#3ee7ff"
    },
    {
      id: "crimson",
      name: "Ronin Carmes\xED",
      blurb: "Tela roja y katana encendida.",
      price: 480,
      sheet: "/sprites/crimson.png",
      trail: "#ff4d4d"
    },
    {
      id: "gold",
      name: "Fantasma \xC1ureo",
      blurb: "Armadura de oro viejo. M\xE1s presencia.",
      price: 980,
      sheet: "/sprites/gold.png",
      trail: "#e8c36a"
    },
    {
      id: "void",
      name: "Oni del Vac\xEDo",
      blurb: "Cuernos, visor violeta, hoja de sombra.",
      price: 1600,
      sheet: "/sprites/void.png",
      trail: "#b06bff"
    }
  ];
  var UPGRADES = [
    { id: "hp", name: "Vitalidad", blurb: "+22 de vida m\xE1xima", price: 320, max: 3 },
    { id: "speed", name: "Paso ligero", blurb: "+8% de velocidad", price: 360, max: 3 },
    { id: "edge", name: "Filo", blurb: "+12% de da\xF1o", price: 420, max: 3 }
  ];
  var border = (w, h, t = 48) => [
    { x: 0, y: 0, w, h: t },
    { x: 0, y: h - t, w, h: t },
    { x: 0, y: 0, w: t, h },
    { x: w - t, y: 0, w: t, h }
  ];
  var LEVELS = [
    {
      id: 1,
      name: "Umbral",
      brief: "Una llave. Dos limos. Aprende el templo.",
      w: 1280,
      h: 860,
      spawn: { x: 160, y: 430 },
      door: { x: 1160, y: 380, w: 56, h: 100 },
      walls: [
        ...border(1280, 860),
        { x: 420, y: 180, w: 180, h: 36 },
        { x: 720, y: 560, w: 220, h: 36 }
      ],
      keys: [{ x: 560, y: 220 }],
      enemies: [
        { x: 700, y: 300, kind: "slime" },
        { x: 900, y: 520, kind: "slime" }
      ],
      reward: 90
    },
    {
      id: 2,
      name: "Pasillo partido",
      brief: "Dos llaves y un guardia entre columnas.",
      w: 1560,
      h: 920,
      spawn: { x: 140, y: 460 },
      door: { x: 1440, y: 400, w: 56, h: 110 },
      walls: [
        ...border(1560, 920),
        { x: 360, y: 80, w: 36, h: 340 },
        { x: 360, y: 540, w: 36, h: 300 },
        { x: 780, y: 80, w: 36, h: 280 },
        { x: 780, y: 480, w: 36, h: 360 },
        { x: 1120, y: 220, w: 36, h: 480 }
      ],
      keys: [
        { x: 240, y: 760 },
        { x: 980, y: 160 }
      ],
      enemies: [
        { x: 520, y: 240, kind: "slime" },
        { x: 600, y: 680, kind: "slime" },
        { x: 960, y: 420, kind: "guard" }
      ],
      reward: 140
    },
    {
      id: 3,
      name: "Patio de ensayo",
      brief: "El anillo central esconde la llave.",
      w: 1400,
      h: 1e3,
      spawn: { x: 140, y: 500 },
      door: { x: 1280, y: 450, w: 56, h: 100 },
      walls: [
        ...border(1400, 1e3),
        { x: 420, y: 280, w: 520, h: 32 },
        { x: 420, y: 680, w: 520, h: 32 },
        { x: 420, y: 280, w: 32, h: 432 },
        { x: 908, y: 280, w: 32, h: 432 }
      ],
      keys: [{ x: 680, y: 490 }],
      enemies: [
        { x: 250, y: 200, kind: "guard" },
        { x: 1100, y: 200, kind: "guard" },
        { x: 250, y: 780, kind: "slime" },
        { x: 1100, y: 780, kind: "slime" }
      ],
      reward: 180
    },
    {
      id: 4,
      name: "Cripta",
      brief: "Tres llaves. El guardi\xE1n no duerme.",
      w: 1600,
      h: 1040,
      spawn: { x: 150, y: 520 },
      door: { x: 1480, y: 460, w: 56, h: 110 },
      walls: [
        ...border(1600, 1040),
        { x: 280, y: 180, w: 420, h: 28 },
        { x: 900, y: 180, w: 420, h: 28 },
        { x: 280, y: 820, w: 420, h: 28 },
        { x: 900, y: 820, w: 420, h: 28 },
        { x: 760, y: 360, w: 48, h: 320 }
      ],
      keys: [
        { x: 360, y: 280 },
        { x: 1200, y: 280 },
        { x: 780, y: 900 }
      ],
      enemies: [
        { x: 480, y: 480, kind: "guard" },
        { x: 1100, y: 480, kind: "guard" },
        { x: 480, y: 700, kind: "slime" },
        { x: 1100, y: 700, kind: "slime" },
        { x: 780, y: 240, kind: "guard" }
      ],
      reward: 240
    },
    {
      id: 5,
      name: "Trono oscuro",
      brief: "El alcaide. Cuatro llaves. Una salida.",
      w: 1680,
      h: 1100,
      spawn: { x: 160, y: 550 },
      door: { x: 1560, y: 490, w: 56, h: 120 },
      walls: [
        ...border(1680, 1100),
        { x: 300, y: 160, w: 1080, h: 28 },
        { x: 300, y: 900, w: 1080, h: 28 },
        { x: 300, y: 160, w: 28, h: 260 },
        { x: 300, y: 680, w: 28, h: 248 },
        { x: 1352, y: 160, w: 28, h: 260 },
        { x: 1352, y: 680, w: 28, h: 248 }
      ],
      keys: [
        { x: 420, y: 260 },
        { x: 1240, y: 260 },
        { x: 420, y: 820 },
        { x: 1240, y: 820 }
      ],
      enemies: [
        { x: 840, y: 500, kind: "boss" },
        { x: 560, y: 360, kind: "guard" },
        { x: 1120, y: 360, kind: "guard" },
        { x: 560, y: 740, kind: "slime" },
        { x: 1120, y: 740, kind: "slime" }
      ],
      reward: 420
    }
  ];
  var ENEMY = {
    slime: { hp: 36, speed: 78, dmg: 8, r: 22, coins: 28, sheet: "/sprites/slime.png", frames: 4, scale: 1 },
    guard: { hp: 78, speed: 96, dmg: 12, r: 26, coins: 48, sheet: "/sprites/guard.png", frames: 4, scale: 1.15 },
    boss: { hp: 280, speed: 70, dmg: 18, r: 40, coins: 140, sheet: "/sprites/boss.png", frames: 4, scale: 1.7 }
  };

  // ../tmp/gh-src/engine.ts
  var PLAYER_R = 18;
  function hit(a, b, ra, rb) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy < (ra + rb) * (ra + rb);
  }
  function block(x, y, r, walls) {
    for (const w of walls) {
      const nx = Math.max(w.x, Math.min(x, w.x + w.w));
      const ny = Math.max(w.y, Math.min(y, w.y + w.h));
      const dx = x - nx;
      const dy = y - ny;
      if (dx * dx + dy * dy < r * r) return true;
    }
    return false;
  }
  function slide(x, y, dx, dy, r, walls) {
    let nx = x + dx;
    if (block(nx, y, r, walls)) nx = x;
    let ny = y + dy;
    if (block(nx, ny, r, walls)) ny = y;
    return { x: nx, y: ny };
  }
  var Arena = class {
    constructor(canvas, save2, levelId, onHud, onEnd) {
      __publicField(this, "canvas");
      __publicField(this, "ctx");
      __publicField(this, "keys", /* @__PURE__ */ new Set());
      __publicField(this, "level");
      __publicField(this, "save");
      __publicField(this, "px", 0);
      __publicField(this, "py", 0);
      __publicField(this, "hp", 100);
      __publicField(this, "maxHp", 100);
      __publicField(this, "facing", 0);
      __publicField(this, "moving", false);
      __publicField(this, "frame", 0);
      __publicField(this, "anim", 0);
      __publicField(this, "attack", 0);
      __publicField(this, "attackCd", 0);
      __publicField(this, "iframes", 0);
      __publicField(this, "keysGot", 0);
      __publicField(this, "keyState", []);
      __publicField(this, "doorOpen", false);
      __publicField(this, "enemies", []);
      __publicField(this, "sparks", []);
      __publicField(this, "camX", 0);
      __publicField(this, "camY", 0);
      __publicField(this, "shake", 0);
      __publicField(this, "images", /* @__PURE__ */ new Map());
      __publicField(this, "running", false);
      __publicField(this, "raf", 0);
      __publicField(this, "last", 0);
      __publicField(this, "onHud");
      __publicField(this, "onEnd");
      __publicField(this, "ended", false);
      __publicField(this, "stick", { x: 0, y: 0 });
      __publicField(this, "dmgMul", 1);
      __publicField(this, "speedMul", 1);
      __publicField(this, "hudTick", 0);
      __publicField(this, "dpr", 1);
      __publicField(this, "viewW", 960);
      __publicField(this, "viewH", 540);
      __publicField(this, "sheet", "/sprites/cyan.png");
      __publicField(this, "trail", "#3ee7ff");
      this.canvas = canvas;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      this.ctx = ctx;
      this.save = save2;
      this.level = LEVELS[levelId - 1] ?? LEVELS[0];
      this.onHud = onHud;
      this.onEnd = onEnd;
      const skin = SKINS.find((s) => s.id === save2.equipped) ?? SKINS[0];
      this.sheet = skin.sheet;
      this.trail = skin.trail;
      this.maxHp = 100 + save2.upgrades.hp * 22;
      this.hp = this.maxHp;
      this.dmgMul = 1 + save2.upgrades.edge * 0.12;
      this.speedMul = 1 + save2.upgrades.speed * 0.08;
      this.px = this.level.spawn.x;
      this.py = this.level.spawn.y;
      this.keyState = this.level.keys.map(() => false);
      this.enemies = this.level.enemies.map((e) => {
        const st = ENEMY[e.kind];
        return {
          x: e.x,
          y: e.y,
          hp: st.hp,
          max: st.hp,
          kind: e.kind,
          cool: 0.4,
          frame: 0,
          hit: 0,
          alive: true
        };
      });
      this.load(this.sheet);
      this.load("/sprites/floor.jpg");
      this.load("/sprites/slime.png");
      this.load("/sprites/guard.png");
      this.load("/sprites/boss.png");
      this.load("/sprites/key.png");
      this.load("/sprites/slash.png");
    }
    load(src) {
      if (this.images.has(src)) return;
      const img = new Image();
      const map = globalThis.NEA_ASSETS;
      img.src = map?.[src] ?? src;
      this.images.set(src, img);
    }
    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = this.canvas.getBoundingClientRect();
      this.dpr = dpr;
      this.viewW = Math.max(2, rect.width);
      this.viewH = Math.max(2, rect.height);
      this.canvas.width = Math.floor(this.viewW * dpr);
      this.canvas.height = Math.floor(this.viewH * dpr);
    }
    start() {
      this.running = true;
      this.last = performance.now();
      const loop = (t) => {
        if (!this.running) return;
        const dt = Math.min(0.05, (t - this.last) / 1e3);
        this.last = t;
        this.step(dt);
        this.draw();
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);
      if (false) {
        window.__controlsTest = {
          getX: () => this.px,
          getY: () => this.py,
          setKeys: (codes) => {
            this.keys = new Set(codes);
          }
        };
      }
    }
    stop() {
      this.running = false;
      cancelAnimationFrame(this.raf);
      if (false) delete window.__controlsTest;
    }
    burst(x, y, color, n = 8) {
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 40 + Math.random() * 140;
        this.sparks.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0.35 + Math.random() * 0.3,
          color,
          s: 2 + Math.random() * 3
        });
      }
    }
    step(dt) {
      if (this.ended) return;
      let ix = this.stick.x;
      let iy = this.stick.y;
      if (this.keys.has("KeyA") || this.keys.has("ArrowLeft")) ix -= 1;
      if (this.keys.has("KeyD") || this.keys.has("ArrowRight")) ix += 1;
      if (this.keys.has("KeyW") || this.keys.has("ArrowUp")) iy -= 1;
      if (this.keys.has("KeyS") || this.keys.has("ArrowDown")) iy += 1;
      const len = Math.hypot(ix, iy) || 1;
      if (Math.hypot(ix, iy) > 1) {
        ix /= len;
        iy /= len;
      }
      const speed = 210 * this.speedMul;
      this.moving = Math.hypot(ix, iy) > 0.12 && this.attack <= 0.18;
      if (this.moving) {
        const next = slide(this.px, this.py, ix * speed * dt, iy * speed * dt, PLAYER_R, this.level.walls);
        this.px = next.x;
        this.py = next.y;
        if (Math.abs(ix) > Math.abs(iy)) this.facing = ix < 0 ? 1 : 2;
        else this.facing = iy < 0 ? 3 : 0;
        this.anim += dt;
      }
      this.frame = this.moving ? Math.floor(this.anim * 9) % 4 : 0;
      if ((this.keys.has("Space") || this.keys.has("KeyJ")) && this.attackCd <= 0) {
        this.attack = 0.28;
        this.attackCd = 0.38;
        this.shake = Math.max(this.shake, 4);
      }
      this.attack = Math.max(0, this.attack - dt);
      this.attackCd = Math.max(0, this.attackCd - dt);
      this.iframes = Math.max(0, this.iframes - dt);
      this.shake = Math.max(0, this.shake - dt * 18);
      if (this.attack > 0.12 && this.attack < 0.24) {
        const dir = [
          { x: 0, y: 1 },
          { x: -1, y: 0 },
          { x: 1, y: 0 },
          { x: 0, y: -1 }
        ][this.facing];
        const ax = this.px + dir.x * 36;
        const ay = this.py + dir.y * 28;
        for (const e of this.enemies) {
          if (!e.alive || e.hit > 0.12) continue;
          if (hit({ x: ax, y: ay }, e, 30, ENEMY[e.kind].r)) {
            e.hp -= 22 * this.dmgMul;
            e.hit = 0.16;
            this.burst(e.x, e.y, this.trail, 7);
            this.shake = Math.max(this.shake, 6);
            if (e.hp <= 0) {
              e.alive = false;
              this.burst(e.x, e.y, "#fff", 14);
            }
          }
        }
      }
      for (let i = 0; i < this.level.keys.length; i++) {
        if (this.keyState[i]) continue;
        const k = this.level.keys[i];
        if (hit({ x: this.px, y: this.py }, k, PLAYER_R, 16)) {
          this.keyState[i] = true;
          this.keysGot++;
          this.burst(k.x, k.y, "#e8c36a", 10);
        }
      }
      if (!this.doorOpen && this.keysGot >= this.level.keys.length) {
        const d = this.level.door;
        const cx = d.x + d.w / 2;
        const cy = d.y + d.h / 2;
        if (hit({ x: this.px, y: this.py }, { x: cx, y: cy }, PLAYER_R + 20, 36) || this.keys.has("KeyE")) {
          if (hit({ x: this.px, y: this.py }, { x: cx, y: cy }, 70, 40)) this.doorOpen = true;
        }
      }
      if (this.doorOpen) {
        const d = this.level.door;
        if (this.px > d.x - 8 && this.px < d.x + d.w + 8 && this.py > d.y && this.py < d.y + d.h) {
          this.finish("clear");
        }
      }
      for (const e of this.enemies) {
        if (!e.alive) continue;
        e.cool = Math.max(0, e.cool - dt);
        e.hit = Math.max(0, e.hit - dt);
        e.frame = (e.frame + dt * 6) % 4;
        const dx = this.px - e.x;
        const dy = this.py - e.y;
        const dist = Math.hypot(dx, dy) || 1;
        const st = ENEMY[e.kind];
        if (dist < 420 && dist > st.r + 8) {
          const next = slide(
            e.x,
            e.y,
            dx / dist * st.speed * dt,
            dy / dist * st.speed * dt,
            st.r * 0.7,
            this.level.walls
          );
          e.x = next.x;
          e.y = next.y;
        }
        if (dist < st.r + PLAYER_R + 6 && e.cool <= 0 && this.iframes <= 0) {
          this.hp -= st.dmg;
          this.iframes = 0.65;
          e.cool = 0.9;
          this.shake = 8;
          this.burst(this.px, this.py, "#ff6a3d", 8);
          if (this.hp <= 0) {
            this.hp = 0;
            this.finish("dead");
          }
        }
      }
      this.sparks = this.sparks.filter((p) => {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        return p.life > 0;
      });
      const vw = this.viewW;
      const vh = this.viewH;
      const targetX = this.px - vw / 2;
      const targetY = this.py - vh / 2;
      this.camX += (targetX - this.camX) * Math.min(1, dt * 8);
      this.camY += (targetY - this.camY) * Math.min(1, dt * 8);
      this.hudTick = (this.hudTick ?? 0) + dt;
      if (this.hudTick > 0.12) {
        this.hudTick = 0;
        const alive = this.enemies.filter((e) => e.alive).length;
        this.onHud({
          hp: this.hp,
          max: this.maxHp,
          keys: this.keysGot,
          need: this.level.keys.length,
          enemies: alive,
          levelName: this.level.name
        });
      }
    }
    finish(reason) {
      if (this.ended) return;
      this.ended = true;
      let coins = 0;
      if (reason === "clear") {
        coins = this.level.reward;
        for (const e of this.enemies) if (!e.alive) coins += ENEMY[e.kind].coins;
      } else {
        coins = this.enemies.filter((e) => !e.alive).reduce((s, e) => s + Math.floor(ENEMY[e.kind].coins * 0.4), 0);
      }
      this.onEnd(reason, coins);
    }
    draw() {
      const ctx = this.ctx;
      const w = this.viewW;
      const h = this.viewH;
      const sx = (Math.random() - 0.5) * this.shake;
      const sy = (Math.random() - 0.5) * this.shake;
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.fillStyle = "#07090f";
      ctx.fillRect(0, 0, w, h);
      ctx.setTransform(this.dpr, 0, 0, this.dpr, -this.camX * this.dpr + sx * this.dpr, -this.camY * this.dpr + sy * this.dpr);
      const floor = this.images.get("/sprites/floor.jpg");
      const tile = 160;
      if (floor && floor.complete && floor.naturalWidth) {
        const x0 = Math.floor(this.camX / tile) * tile - tile;
        const y0 = Math.floor(this.camY / tile) * tile - tile;
        for (let y = y0; y < this.camY + h + tile; y += tile) {
          for (let x = x0; x < this.camX + w + tile; x += tile) {
            ctx.drawImage(floor, x, y, tile + 1, tile + 1);
          }
        }
      }
      ctx.fillStyle = "rgba(4,6,14,0.28)";
      ctx.fillRect(this.camX - 40, this.camY - 40, w + 80, h + 80);
      for (const wall of this.level.walls) {
        ctx.fillStyle = "#141824";
        ctx.fillRect(wall.x, wall.y + 8, wall.w, wall.h);
        ctx.fillStyle = "#2a3144";
        ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
        ctx.fillStyle = "#3c465c";
        ctx.fillRect(wall.x, wall.y, wall.w, 6);
        ctx.strokeStyle = "rgba(62,231,255,0.12)";
        ctx.strokeRect(wall.x + 0.5, wall.y + 0.5, wall.w - 1, wall.h - 1);
      }
      const d = this.level.door;
      if (this.doorOpen) {
        ctx.fillStyle = "rgba(62,231,255,0.18)";
        ctx.fillRect(d.x - 6, d.y - 6, d.w + 12, d.h + 12);
        ctx.strokeStyle = "#3ee7ff";
        ctx.lineWidth = 3;
        ctx.strokeRect(d.x, d.y, d.w, d.h);
      } else {
        ctx.fillStyle = "#3a2a1c";
        ctx.fillRect(d.x, d.y, d.w, d.h);
        ctx.fillStyle = "#6a4a30";
        ctx.fillRect(d.x + 6, d.y + 8, d.w - 12, d.h - 16);
        ctx.fillStyle = "#e8c36a";
        ctx.font = "22px Outfit, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(this.keysGot >= this.level.keys.length ? "E" : "LOCK", d.x + d.w / 2, d.y + d.h / 2);
      }
      const keyImg = this.images.get("/sprites/key.png");
      this.level.keys.forEach((k, i) => {
        if (this.keyState[i]) return;
        const bob = Math.sin(performance.now() / 280 + i) * 4;
        if (keyImg && keyImg.complete) {
          ctx.drawImage(keyImg, k.x - 18, k.y - 18 + bob, 36, 36);
        } else {
          ctx.fillStyle = "#e8c36a";
          ctx.beginPath();
          ctx.arc(k.x, k.y + bob, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      const ordered = [...this.enemies.filter((e) => e.alive), { x: this.px, y: this.py, player: true }];
      ordered.sort((a, b) => a.y - b.y);
      for (const item of ordered) {
        if ("player" in item) this.drawPlayer(ctx);
        else this.drawEnemy(ctx, item);
      }
      if (this.attack > 0) {
        const slash = this.images.get("/sprites/slash.png");
        const dir = [
          { x: 0, y: 1, rot: Math.PI / 2 },
          { x: -1, y: 0, rot: Math.PI },
          { x: 1, y: 0, rot: 0 },
          { x: 0, y: -1, rot: -Math.PI / 2 }
        ][this.facing];
        const f = Math.min(3, Math.floor((0.28 - this.attack) / 0.07));
        ctx.save();
        ctx.translate(this.px + dir.x * 34, this.py + dir.y * 26);
        ctx.rotate(dir.rot);
        ctx.globalAlpha = 0.9;
        if (slash && slash.complete && slash.naturalWidth) {
          const cw = slash.naturalWidth / 2;
          const ch = slash.naturalHeight / 2;
          const col = f % 2;
          const row = Math.floor(f / 2);
          ctx.drawImage(slash, col * cw, row * ch, cw, ch, -36, -28, 72, 56);
        } else {
          ctx.fillStyle = this.trail;
          ctx.beginPath();
          ctx.ellipse(0, 0, 28, 16, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
        ctx.globalAlpha = 1;
      }
      for (const p of this.sparks) {
        ctx.globalAlpha = Math.max(0, p.life * 2);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      const g = ctx.createRadialGradient(w / 2, h / 2, h * 0.28, w / 2, h / 2, h * 0.75);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }
    drawPlayer(ctx) {
      const img = this.images.get(this.sheet);
      const blink = this.iframes > 0 && Math.floor(this.iframes * 14) % 2 === 0;
      ctx.globalAlpha = blink ? 0.45 : 1;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.beginPath();
      ctx.ellipse(this.px, this.py + 20, 16, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      if (img && img.complete && img.naturalWidth) {
        const cw = img.naturalWidth / 4;
        const ch = img.naturalHeight / 4;
        const col = this.frame;
        const row = this.facing;
        const dw = 64;
        const dh = 64;
        ctx.drawImage(img, col * cw, row * ch, cw, ch, this.px - dw / 2, this.py - dh / 2 - 6, dw, dh);
      } else {
        ctx.fillStyle = this.trail;
        ctx.beginPath();
        ctx.arc(this.px, this.py, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    drawEnemy(ctx, e) {
      const st = ENEMY[e.kind];
      const img = this.images.get(st.sheet);
      const s = 52 * st.scale;
      ctx.fillStyle = "rgba(0,0,0,0.35)";
      ctx.beginPath();
      ctx.ellipse(e.x, e.y + s * 0.32, s * 0.28, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      if (e.hit > 0) ctx.globalAlpha = 0.7;
      if (img && img.complete && img.naturalWidth) {
        const cw = img.naturalWidth / 2;
        const ch = img.naturalHeight / 2;
        const f = Math.floor(e.frame) % 4;
        ctx.drawImage(img, f % 2 * cw, Math.floor(f / 2) * ch, cw, ch, e.x - s / 2, e.y - s / 2, s, s);
      } else {
        ctx.fillStyle = e.kind === "boss" ? "#b06bff" : "#3dff9a";
        ctx.beginPath();
        ctx.arc(e.x, e.y, st.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      const pct = Math.max(0, e.hp / e.max);
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(e.x - 18, e.y - s / 2 - 8, 36, 4);
      ctx.fillStyle = pct > 0.45 ? "#5ddea0" : "#ff6a3d";
      ctx.fillRect(e.x - 18, e.y - s / 2 - 8, 36 * pct, 4);
    }
  };

  // ../tmp/gh-src/save.ts
  var KEY = "nea-save-v1";
  var fresh = () => ({
    version: 1,
    coins: 160,
    owned: ["cyan"],
    equipped: "cyan",
    upgrades: { hp: 0, speed: 0, edge: 0 },
    unlocked: 1,
    clears: 0
  });
  function loadSave() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return fresh();
      const parsed = JSON.parse(raw);
      if (parsed.version !== 1) return fresh();
      return { ...fresh(), ...parsed, upgrades: { ...fresh().upgrades, ...parsed.upgrades } };
    } catch {
      return fresh();
    }
  }
  function writeSave(save2) {
    localStorage.setItem(KEY, JSON.stringify(save2));
  }

  // ../tmp/gh-src/main.ts
  var app = document.getElementById("app");
  var save = loadSave();
  var screen = "menu";
  var level = 1;
  var hud = null;
  var end = null;
  var toast = "";
  var arena = null;
  var toastTimer = 0;
  function persist() {
    writeSave(save);
  }
  function setToast(msg) {
    toast = msg;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast = "";
      if (screen === "shop") render();
    }, 1600);
    render();
  }
  function startLevel(n) {
    level = n;
    screen = "play";
    render();
    const canvas = document.getElementById("game");
    arena = new Arena(canvas, save, level, (h) => {
      hud = h;
      const bar = document.getElementById("hpfill");
      const hp = document.getElementById("hptxt");
      const keys = document.getElementById("keys");
      const enemies = document.getElementById("enemies");
      const name = document.getElementById("lvname");
      if (bar) bar.style.width = `${Math.max(0, h.hp / h.max * 100)}%`;
      if (hp) hp.textContent = String(Math.ceil(h.hp));
      if (keys) keys.textContent = `Llaves ${h.keys}/${h.need}`;
      if (enemies) enemies.textContent = String(h.enemies);
      if (name) name.textContent = `Nv ${level} \xB7 ${h.levelName}`;
    }, (reason, coins) => {
      end = { reason, coins };
      save = {
        ...save,
        coins: save.coins + coins,
        clears: reason === "clear" ? save.clears + 1 : save.clears,
        unlocked: reason === "clear" ? Math.max(save.unlocked, Math.min(5, level + 1)) : save.unlocked
      };
      persist();
      screen = "end";
      arena?.stop();
      arena = null;
      render();
    });
    const fit = () => arena?.resize();
    fit();
    arena.start();
    window.addEventListener("resize", fit);
    const down = (e) => {
      arena?.keys.add(e.code);
      if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
    };
    const up = (e) => arena?.keys.delete(e.code);
    const blur = () => arena?.keys.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    canvas._off = () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }
  function leavePlay() {
    const canvas = document.getElementById("game");
    canvas?._off?.();
    arena?.stop();
    arena = null;
    screen = "menu";
    render();
  }
  function buySkin(id) {
    const skin = SKINS.find((s) => s.id === id);
    if (!skin) return;
    if (save.owned.includes(id)) {
      save = { ...save, equipped: id };
      persist();
      render();
      return;
    }
    if (save.coins < skin.price) {
      setToast("No tienes bastante oro.");
      return;
    }
    save = { ...save, coins: save.coins - skin.price, owned: [...save.owned, id], equipped: id };
    persist();
    setToast(`${skin.name} equipada.`);
  }
  function buyUpgrade(id) {
    const spec = UPGRADES.find((u) => u.id === id);
    if (!spec) return;
    const rank = save.upgrades[id];
    if (rank >= spec.max) return;
    const price = spec.price + rank * 80;
    if (save.coins < price) {
      setToast("No tienes bastante oro.");
      return;
    }
    save = { ...save, coins: save.coins - price, upgrades: { ...save.upgrades, [id]: rank + 1 } };
    persist();
    render();
  }
  function skinThumb(url) {
    const map = globalThis.NEA_ASSETS || {};
    const src = map[url] || url;
    return `<div class="thumb" style="background-image:url('${src}')"></div>`;
  }
  function render() {
    const skin = SKINS.find((s) => s.id === save.equipped) ?? SKINS[0];
    if (screen === "menu") {
      app.innerHTML = `
      <section class="center">
        <p class="kicker">Templo de las sombras</p>
        <h1>Ninja<span>Escape Arena</span></h1>
        <p class="lead">Escape room y combate cenital. Recoge llaves, abre la salida y gasta el oro en la armer\xEDa.</p>
        <div class="equip">${skinThumb(skin.sheet)}<div><p class="muted">Equipado</p><p class="name">${skin.name}</p><p class="gold">\u25C6 ${save.coins}</p></div></div>
        <div class="stack">
          <button class="primary" id="play">Jugar nivel ${save.unlocked}</button>
          <button class="ghost" id="shop">Armer\xEDa</button>
        </div>
        <div class="levels">${LEVELS.map((lv) => {
        const locked = lv.id > save.unlocked;
        return `<button class="lv" data-lv="${lv.id}" ${locked ? "disabled" : ""}>${locked ? "\u{1F512}" : lv.id}<small>${lv.name}</small></button>`;
      }).join("")}</div>
        <p class="hint">WASD mover \xB7 Espacio atacar \xB7 Junta las llaves y entra en la puerta</p>
      </section>`;
      document.getElementById("play").onclick = () => startLevel(save.unlocked);
      document.getElementById("shop").onclick = () => {
        screen = "shop";
        render();
      };
      app.querySelectorAll(".lv").forEach((b) => {
        b.onclick = () => startLevel(Number(b.dataset.lv));
      });
      return;
    }
    if (screen === "shop") {
      app.innerHTML = `
      <section class="shop">
        <header><div><p class="kicker">Armer\xEDa</p><h2>Skins y filo</h2></div>
        <div class="row"><span class="pill gold">\u25C6 ${save.coins}</span><button class="ghost" id="back">Volver</button></div></header>
        ${toast ? `<p class="toast">${toast}</p>` : ""}
        <div class="grid">${SKINS.map((s) => {
        const owned = save.owned.includes(s.id);
        const on = save.equipped === s.id;
        return `<article>${skinThumb(s.sheet)}<div><h3>${s.name}</h3><p>${s.blurb}</p>
            <button data-skin="${s.id}" ${on ? "disabled" : ""}>${on ? "Equipada" : owned ? "Equipar" : s.price + " oro"}</button></div></article>`;
      }).join("")}</div>
        <h3 class="sub">Mejoras permanentes</h3>
        <div class="grid3">${UPGRADES.map((u) => {
        const rank = save.upgrades[u.id];
        const price = u.price + rank * 80;
        return `<article><h3>${u.name}</h3><p>${u.blurb}</p><p class="gold">RANGO ${rank}/${u.max}</p>
            <button data-up="${u.id}" ${rank >= u.max ? "disabled" : ""}>${rank >= u.max ? "Al m\xE1ximo" : price + " oro"}</button></article>`;
      }).join("")}</div>
      </section>`;
      document.getElementById("back").onclick = () => {
        screen = "menu";
        render();
      };
      app.querySelectorAll("[data-skin]").forEach((b) => {
        b.onclick = () => buySkin(b.dataset.skin);
      });
      app.querySelectorAll("[data-up]").forEach((b) => {
        b.onclick = () => buyUpgrade(b.dataset.up);
      });
      return;
    }
    if (screen === "play") {
      app.innerHTML = `
      <canvas id="game"></canvas>
      <div class="hud">
        <div class="card"><div class="row"><span id="lvname">Nv ${level}</span><span id="hptxt"></span></div><div class="bar"><i id="hpfill"></i></div></div>
        <div class="row">
          <span class="pill" id="keys">Llaves</span>
          <span class="pill gold">\u25C6 ${save.coins}</span>
          <span class="pill">\u2694 <span id="enemies">0</span></span>
          <button class="ghost" id="leave">Salir</button>
        </div>
      </div>
      <div class="touch">
        <div id="stick" class="stick"></div>
        <button id="atk" class="atk">Golpe</button>
      </div>`;
      document.getElementById("leave").onclick = () => leavePlay();
      const stick = document.getElementById("stick");
      let origin = null;
      stick.onpointerdown = (e) => {
        stick.setPointerCapture(e.pointerId);
        origin = { x: e.clientX, y: e.clientY };
      };
      stick.onpointermove = (e) => {
        if (!origin || !arena) return;
        const dx = e.clientX - origin.x;
        const dy = e.clientY - origin.y;
        const m = Math.hypot(dx, dy) || 1;
        const c = Math.min(1, m / 48);
        arena.stick = { x: dx / m * c, y: dy / m * c };
      };
      const reset = () => {
        origin = null;
        if (arena) arena.stick = { x: 0, y: 0 };
      };
      stick.onpointerup = reset;
      stick.onpointercancel = reset;
      const atk = document.getElementById("atk");
      atk.onpointerdown = () => arena?.keys.add("Space");
      atk.onpointerup = () => arena?.keys.delete("Space");
      atk.onpointerleave = () => arena?.keys.delete("Space");
      return;
    }
    if (screen === "end" && end) {
      const win = end.reason === "clear";
      app.innerHTML = `
      <section class="center end">
        <p class="kicker">${win ? "Salida abierta" : "Ca\xEDste"}</p>
        <h2>${win ? "Nivel limpio" : "Derrota"}</h2>
        <p class="lead">${win ? `Escapaste del nivel ${level}.` : "El templo se queda con parte del bot\xEDn."}</p>
        <p class="gold big">\u25C6 +${end.coins} oro</p>
        <div class="stack">
          ${win && level < 5 && save.unlocked > level ? `<button class="primary" id="next">Siguiente templo</button>` : ""}
          <button class="ghost" id="retry">Reintentar</button>
          <button class="ghost" id="menu">Men\xFA</button>
        </div>
      </section>`;
      document.getElementById("next")?.addEventListener("click", () => startLevel(Math.min(5, level + 1)));
      document.getElementById("retry").onclick = () => startLevel(level);
      document.getElementById("menu").onclick = () => {
        screen = "menu";
        render();
      };
    }
  }
  render();
})();
