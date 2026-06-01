/* Tweaks app — mounts ONLY the floating panel; applies values to the document.
   Page content stays plain HTML so it's directly editable. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#F47C5D", "#FFE5DA", "#B4452B"],
  "profile": "sticker",
  "hero": "marquee",
  "blobs": true
}/*EDITMODE-END*/;

function TweakApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    const a = Array.isArray(t.accent) ? t.accent : [t.accent, '#FFE5DA', '#B4452B'];
    r.style.setProperty('--accent', a[0]);
    r.style.setProperty('--accent-soft', a[1]);
    r.style.setProperty('--accent-ink', a[2]);
  }, [t.accent]);

  React.useEffect(() => { document.body.dataset.profile = t.profile; }, [t.profile]);
  React.useEffect(() => { document.body.dataset.hero = t.hero; }, [t.hero]);
  React.useEffect(() => { document.body.dataset.blobs = t.blobs ? 'on' : 'off'; }, [t.blobs]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent" />
      <TweakColor
        label="Color"
        value={t.accent}
        options={[
          ['#F47C5D', '#FFE5DA', '#B4452B'],
          ['#9B82F2', '#ECE6FF', '#5A41B5'],
          ['#4FB996', '#DCF3EA', '#1F7D60'],
          ['#EFB44E', '#FBEDCC', '#9A6F12'],
          ['#5BB4E6', '#DDF0FB', '#1E6F9E'],
        ]}
        onChange={(v) => setTweak('accent', v)}
      />
      <TweakSection label="Profile card" />
      <TweakRadio
        label="Style"
        value={t.profile}
        options={['sticker', 'minimal', 'polaroid']}
        onChange={(v) => setTweak('profile', v)}
      />
      <TweakSection label="Hero" />
      <TweakRadio
        label="Layout"
        value={t.hero}
        options={['editorial', 'marquee', 'cards']}
        onChange={(v) => setTweak('hero', v)}
      />
      <TweakSection label="Background" />
      <TweakToggle
        label="Organic blobs"
        value={t.blobs}
        onChange={(v) => setTweak('blobs', v)}
      />
    </TweaksPanel>
  );
}

(function mountTweaks() {
  const el = document.createElement('div');
  el.id = 'tweak-root';
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(<TweakApp />);
})();
