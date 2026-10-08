# SICHERLUFT – CO headache micro-loop

Silent, seamless 8 s loop (24 fps, 16:9) for the homepage section below the hero.
Story: CO haze flows from the gas boiler → red pain point pulses → figure holds head → resolves to start pose.

| File | Use |
|---|---|
| `sicherluft-co-loop-1080p.webm` | Primary source (VP9, ~0.4 MB) |
| `sicherluft-co-loop-1080p.mp4` | Fallback / Safari (H.264, ~2.5 MB) |
| `sicherluft-co-loop-720p.mp4` | Lightweight mobile version (~0.5 MB) |
| `sicherluft-co-loop-poster.jpg` | Poster = first frame (no visual jump on load) |

No audio track. Last frame is dropped so the loop point has no duplicate-frame stutter.

```html
<video autoplay muted loop playsinline preload="auto"
       poster="sicherluft-co-loop-poster.jpg"
       style="width:100%;height:auto;display:block;background:#EEEEF5">
  <source src="sicherluft-co-loop-1080p.webm" type="video/webm">
  <source src="sicherluft-co-loop-720p.mp4" type="video/mp4" media="(max-width: 768px)">
  <source src="sicherluft-co-loop-1080p.mp4" type="video/mp4">
</video>
```
