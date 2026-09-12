const assetSpecs = [
  { id: 'togo-img', file: 'assets/togo.b64' },
  { id: 'nlos-img', file: 'assets/nlos.b64' },
  { id: 'pinnet-img', file: 'assets/pinnet.b64' }
];

async function loadImage(spec) {
  try {
    const res = await fetch(spec.file);
    if (!res.ok) throw new Error(`Unable to load ${spec.file}`);
    const b64 = (await res.text()).trim();
    const img = document.getElementById(spec.id);
    img.src = `data:image/webp;base64,${b64}`;
    img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
  } catch (err) {
    console.error(err);
  }
}

assetSpecs.forEach(loadImage);
