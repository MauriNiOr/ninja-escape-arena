window.NEA_ASSETS = {};
const parts = window.NEA_PARTS || [];
for (let i = 0; i < parts.length; i += 3) {
  const path = parts[i];
  const mime = parts[i + 1];
  const chunk = parts[i + 2];
  if (!window.NEA_ASSETS[path]) window.NEA_ASSETS[path] = "data:" + mime + ";base64,";
  window.NEA_ASSETS[path] += chunk;
}
