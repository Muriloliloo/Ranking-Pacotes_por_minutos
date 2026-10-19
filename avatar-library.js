/* Galeria de avatares SSP15: ilustrações vetoriais geradas localmente, sem dependências externas. */
(function () {
  "use strict";
  const KEY = "ranking-pacotes-avatares-v1";
  const styles = [
    { id: "m-classico", group: "masculino", name: "Clássico", hair: "short" },
    { id: "m-topete", group: "masculino", name: "Topete", hair: "quiff" },
    { id: "m-cacheado", group: "masculino", name: "Cacheado", hair: "curls" },
    { id: "m-bone", group: "masculino", name: "Boné", hair: "cap" },
    { id: "m-barba", group: "masculino", name: "Barba", hair: "beard" },
    { id: "f-longo", group: "feminino", name: "Longo", hair: "long" },
    { id: "f-chanel", group: "feminino", name: "Chanel", hair: "bob" },
    { id: "f-cacheado", group: "feminino", name: "Cachos", hair: "curly" },
    { id: "f-coque", group: "feminino", name: "Coque", hair: "bun" },
    { id: "f-franja", group: "feminino", name: "Franja", hair: "bangs" }
  ];
  const palette = {
    skin: { clara: "#FAD6B5", media: "#EDB386", morena: "#B97953", escura: "#70452F" },
    hair: { preto: "#162436", castanho: "#603A2B", loiro: "#B8893D", ruivo: "#A44E35", grisalho: "#858A98" },
    bg: {
      azul: ["#C2E3FB", "#5484B8"],
      dourado: ["#FFF2BB", "#DDA940"],
      lilas: ["#E9DFFF", "#877ABB"],
      verde: ["#DDF2DF", "#79B7A0"]
    }
  };
  const defaults = { skin: "media", hair: "preto", bg: "azul" };
  let avatarByName = {};
  try {
    const persisted = JSON.parse(localStorage.getItem(KEY) || "{}");
    if (persisted && typeof persisted === "object" && !Array.isArray(persisted)) avatarByName = persisted;
  } catch (e) { /* modo sem armazenamento disponível */ }

  const styleById = id => styles.find(style => style.id === id);
  const isValid = profile => !!(profile && styleById(profile.id) &&
    Object.prototype.hasOwnProperty.call(palette.skin, profile.skin) &&
    Object.prototype.hasOwnProperty.call(palette.hair, profile.hair) &&
    Object.prototype.hasOwnProperty.call(palette.bg, profile.bg));
  const safe = value => String(value).replace(/[&<>"']/g, character =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);

  function vector(profile) {
    if (!isValid(profile)) return "";
    const style = styleById(profile.id);
    const hair = palette.hair[profile.hair];
    const skin = palette.skin[profile.skin];
    const bg = palette.bg[profile.bg];
    const h = {
      short: '<path d="M38 52 Q33 18 65 20 Q95 21 91 57 L83 42 Q71 47 57 38 Q50 48 41 49Z" fill="'+hair+'"/>',
      quiff: '<path d="M35 51 Q33 32 49 27 Q49 12 66 17 Q87 12 93 35 L91 56 Q85 44 75 37 Q53 49 40 48Z" fill="'+hair+'"/><path d="M49 29 Q63 7 84 19 Q69 19 64 33Z" fill="'+hair+'"/>',
      curls: '<g fill="'+hair+'"><circle cx="43" cy="40" r="14"/><circle cx="56" cy="29" r="15"/><circle cx="73" cy="27" r="15"/><circle cx="87" cy="39" r="14"/><circle cx="37" cy="50" r="9"/><circle cx="92" cy="49" r="9"/></g>',
      cap: '<path d="M39 49 Q43 26 65 28 Q86 28 90 50Z" fill="'+hair+'"/><path d="M35 42 Q60 20 90 39 L94 47 L31 47Z" fill="#124B86"/><path d="M56 45 Q87 38 105 53 Q88 59 64 49Z" fill="#0A2E58"/>',
      beard: '<path d="M38 52 Q34 18 65 21 Q96 21 91 57 L84 42 Q63 44 44 47Z" fill="'+hair+'"/><path d="M45 73 Q49 99 66 100 Q83 97 86 74 Q74 85 66 79 Q58 86 45 73Z" fill="'+hair+'"/>',
      long: '<path d="M34 43 Q32 17 66 18 Q96 17 96 44 L104 105 L82 106 L78 52 L49 52 L47 106 L24 106Z" fill="'+hair+'"/>',
      bob: '<path d="M35 46 Q30 17 65 18 Q96 18 94 47 L98 88 Q88 97 81 88 L81 48 L46 48 L45 88 Q34 96 27 86Z" fill="'+hair+'"/>',
      curly: '<g fill="'+hair+'"><circle cx="34" cy="45" r="14"/><circle cx="43" cy="29" r="17"/><circle cx="63" cy="24" r="18"/><circle cx="83" cy="29" r="17"/><circle cx="95" cy="45" r="14"/><circle cx="31" cy="65" r="15"/><circle cx="95" cy="67" r="15"/></g>',
      bun: '<circle cx="65" cy="17" r="19" fill="'+hair+'"/><path d="M36 52 Q30 25 65 22 Q97 20 93 55 L82 47 Q59 35 44 54Z" fill="'+hair+'"/>',
      bangs: '<path d="M31 48 Q30 15 63 17 Q98 16 98 48 L101 92 L84 94 L83 48 L46 48 L45 94 L27 94Z" fill="'+hair+'"/>'
    };
    const behind = ["long", "bob", "curly", "bangs"].includes(style.hair) ? h[style.hair] : "";
    const above = behind
      ? '<path d="M36 47 Q38 21 65 23 Q89 24 92 49 Q78 43 71 34 Q57 45 42 48Z" fill="'+hair+'"/>' +
        (style.hair === "bangs" ? '<path d="M42 35 Q60 49 87 36 Q75 55 61 50 Q55 57 45 49Z" fill="'+hair+'"/>' : "")
      : h[style.hair];
    const earrings = style.group === "feminino"
      ? '<circle cx="42" cy="73" r="2" fill="#F5C64A"/><circle cx="88" cy="73" r="2" fill="#F5C64A"/>'
      : "";
    return '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">' +
      '<defs><linearGradient id="fade" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+bg[0]+'"/><stop offset="1" stop-color="'+bg[1]+'"/></linearGradient><clipPath id="portrait"><circle cx="64" cy="64" r="64"/></clipPath></defs>' +
      '<g clip-path="url(#portrait)"><rect width="128" height="128" fill="url(#fade)"/><circle cx="103" cy="23" r="30" fill="#FFF" opacity=".14"/>' +
      '<path d="M12 130 Q16 101 46 96 L58 88 L71 88 L83 96 Q113 99 116 130" fill="#153E67"/>' +
      '<path d="M45 97 Q64 120 84 97 L73 88 L54 88Z" fill="#FAFAFB"/>' +
      behind + '<path d="M57 85 L57 99 Q65 107 73 99 L73 85Z" fill="'+skin+'"/>' +
      '<ellipse cx="65" cy="62" rx="27" ry="34" fill="'+skin+'"/><ellipse cx="39" cy="65" rx="5" ry="9" fill="'+skin+'"/><ellipse cx="91" cy="65" rx="5" ry="9" fill="'+skin+'"/>' +
      above + '<path d="M48 61 Q55 58 60 61 M72 61 Q78 58 83 61" stroke="#52392F" stroke-width="2.3" stroke-linecap="round" fill="none"/>' +
      '<circle cx="55" cy="65" r="2.4" fill="#52392F"/><circle cx="77" cy="65" r="2.4" fill="#52392F"/>' +
      '<path d="M65 67 L62 76 L68 76" stroke="#52392F" stroke-width="1.5" stroke-linecap="round" opacity=".42" fill="none"/>' +
      '<path d="M57 82 Q65 87 73 82" stroke="#A24C4E" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
      earrings + '</g></svg>';
  }
  function uri(profile) {
    const svg = vector(profile);
    return svg ? "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg) : "";
  }
  function getKey() {
    return document.getElementById("photoPerson").value;
  }
  function choices() {
    return {
      skin: document.getElementById("avatarSkin").value,
      hair: document.getElementById("avatarHairColor").value,
      bg: document.getElementById("avatarBackground").value
    };
  }
  function sync() {
    const selected = avatarByName[getKey()];
    if (isValid(selected)) {
      document.getElementById("avatarCategory").value = styleById(selected.id).group;
      document.getElementById("avatarSkin").value = selected.skin;
      document.getElementById("avatarHairColor").value = selected.hair;
      document.getElementById("avatarBackground").value = selected.bg;
    }
    draw();
  }
  function draw() {
    const chosen = avatarByName[getKey()];
    const group = document.getElementById("avatarCategory").value;
    const col = choices();
    document.getElementById("avatarGallery").innerHTML = styles.filter(item => item.group === group).map(item => {
      const profile = Object.assign({ id: item.id }, col);
      const selected = isValid(chosen) && chosen.id === item.id;
      return '<button type="button" data-avatar-id="'+item.id+'" class="'+(selected?"selected":"")+
        '" aria-label="Selecionar avatar '+safe(item.name)+'" aria-pressed="'+selected+'">' +
        '<img alt="" src="'+uri(profile)+'"><small>'+safe(item.name)+'</small></button>';
    }).join("");
  }
  function save(profile, onUpdate) {
    const key = getKey();
    if (!key || !isValid(profile)) return;
    const old = avatarByName[key];
    avatarByName[key] = profile;
    try {
      localStorage.setItem(KEY, JSON.stringify(avatarByName));
      draw();
      onUpdate("✅ Avatar personalizado salvo. Ele aparece no pódio quando este colaborador estiver no Top 5.");
    } catch (e) {
      if (old) avatarByName[key] = old;
      else delete avatarByName[key];
      draw();
      onUpdate("Não foi possível salvar o avatar neste navegador.");
    }
  }
  function remove(key, silent) {
    if (!key || !avatarByName[key]) return;
    const old = avatarByName[key];
    delete avatarByName[key];
    try { localStorage.setItem(KEY, JSON.stringify(avatarByName)); }
    catch (e) { avatarByName[key] = old; return false; }
    if (!silent) draw();
    return true;
  }
  function init(onUpdate) {
    const gallery = document.getElementById("avatarGallery");
    gallery.addEventListener("click", event => {
      const button = event.target.closest("button[data-avatar-id]");
      if (button) save(Object.assign({ id: button.dataset.avatarId }, choices()), onUpdate);
    });
    document.getElementById("avatarCategory").addEventListener("change", draw);
    ["avatarSkin","avatarHairColor","avatarBackground"].forEach(id => {
      document.getElementById(id).addEventListener("change", () => {
        const chosen = avatarByName[getKey()];
        const group = document.getElementById("avatarCategory").value;
        if (isValid(chosen) && styleById(chosen.id).group === group) {
          save(Object.assign({ id: chosen.id }, choices()), onUpdate);
        } else draw();
      });
    });
    draw();
  }
  window.TopAvatarLibrary = {
    init: init,
    sync: sync,
    draw: draw,
    remove: remove,
    hasAvatar: key => isValid(avatarByName[key]),
    getUri: key => isValid(avatarByName[key]) ? uri(avatarByName[key]) : "",
    styleCount: styles.length
  };
}());
