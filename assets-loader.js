const assetSpecs = [
  { id: 'togo-img', mime: 'image/webp', files: ['assets/togo-0.b64','assets/togo-1.b64','assets/togo-2.b64'] },
  { id: 'nlos-img', mime: 'image/webp', files: ['assets/nlos-0.b64','assets/nlos-1.b64'] },
  { id: 'pinnet-img', mime: 'image/webp', files: ['assets/pinnet-0.b64','assets/pinnet-1.b64','assets/pinnet-2.b64','assets/pinnet-3.b64'] }
];

async function readChunks(files) {
  const parts = [];
  for (const file of files) {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Unable to load ${file}`);
    parts.push((await res.text()).trim());
  }
  return parts.join('');
}

async function loadImage(spec) {
  try {
    const b64 = await readChunks(spec.files);
    const img = document.getElementById(spec.id);
    img.src = `data:${spec.mime};base64,${b64}`;
    img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
  } catch (err) {
    console.error(err);
  }
}

async function prepareCV() {
  const link = document.getElementById('cv-link');
  const files = ['assets/cv-0.b64','assets/cv-1.b64','assets/cv-2.b64','assets/cv-3.b64'];
  try {
    const b64 = await readChunks(files);
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    link.href = url;
    link.target = '_blank';
    link.rel = 'noreferrer';
  } catch (err) {
    console.error(err);
  }
}

assetSpecs.forEach(loadImage);
prepareCV();
