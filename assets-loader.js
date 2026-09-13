const assetSpecs = [
  { id: 'togo-img', file: 'assets/togo.b64' },
  { id: 'nlos-img', file: 'assets/nlos.b64' },
  { id: 'pinnet-img', file: 'assets/pinnet.b64' }
];

async function loadImage(spec) {
  try {
    const res = await fetch(spec.file, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Unable to load ${spec.file}`);
    const b64 = (await res.text()).trim();
    const img = document.getElementById(spec.id);
    if (!img) return;
    img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
    img.src = `data:image/webp;base64,${b64}`;
    if (img.complete) img.classList.add('loaded');
  } catch (err) {
    console.error(err);
  }
}

async function prepareCV() {
  const files = Array.from({ length: 13 }, (_, i) => `assets/cvp-${String(i).padStart(2, '0')}.b64`);
  try {
    const parts = [];
    for (const file of files) {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Unable to load ${file}`);
      parts.push((await res.text()).trim());
    }
    const b64 = parts.join('');
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
    const link = document.getElementById('cv-link');
    if (link) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noreferrer';
    }
  } catch (err) {
    console.error(err);
  }
}

assetSpecs.forEach(loadImage);
prepareCV();
