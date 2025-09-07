/* Basic helpers for positioning + quick debug in console */
AFRAME.registerComponent('log-when-loaded', {
  init() {
    this.el.addEventListener('model-loaded', (e) => {
      console.log('Loaded:', this.el, e.detail);
    });
    this.el.addEventListener('model-error', (e) => {
      console.error('Model error:', this.el, e.detail);
    });
  }
});

// Attach to all gltf-model entities automatically
AFRAME.scenes[0]?.addEventListener('loaded', () => {
  document.querySelectorAll('[gltf-model]').forEach(el => {
    el.setAttribute('log-when-loaded', '');
  });
});

// Keyboard nudging (WASD arrows) for whole rig
window.addEventListener('keydown', (e) => {
  const rig = document.querySelector('#rig');
  if (!rig) return;
  const step = (e.shiftKey ? 0.5 : 0.15);

  const p = rig.object3D.position;
  switch (e.key) {
    case 'ArrowUp':   p.z -= step; break;
    case 'ArrowDown': p.z += step; break;
    case 'ArrowLeft': p.x -= step; break;
    case 'ArrowRight':p.x += step; break;
  }
});
