export function normalizeInput(dict, input) {
  if (JSON.stringify(dict) === "" || !input) {
    return null;
  }

  return dict[input.toLowerCase()] || Object.values(dict)[0];
}

export function randDarkColor(str, seed = 0.5) {
  str = (str || "").split("").map(c => c.charCodeAt(0));

  while (str.length < 6) {
    seed = Math.sin(seed) * 1000;
    str.push(Math.round(seed));
  }

  seed = Math.sin(str.reduce((a, b) => a + b));

  const lum = -0.25;
  let hex = String('#' + seed.toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  let rgb = "#",
    c, i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}

const componentDict = {
  value: {},
  assignNewID: function (name) {
    name = name || "Control";

    if (this.value[name]) {
      this.value[name] += 1;
    } else {
      this.value[name] = 1;
    }
    return name + this.value[name];
  }
};
export function generateComponentID(componentName) {
  return componentDict.assignNewID(componentName);
}