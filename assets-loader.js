async function prepareCV() {
  try {
    const res = await fetch('assets/cv-latest.b64', { cache: 'no-store' });
    if (!res.ok) throw new Error('Unable to load the CV PDF');
    const b64 = (await res.text()).trim();
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

prepareCV();
