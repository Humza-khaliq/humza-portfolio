/** Dark, minimal background: faint dot grid + two slow-drifting glows. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-base">
      <div className="bg-glow bg-glow-a" />
      <div className="bg-glow bg-glow-b" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.075)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(120%_90%_at_50%_40%,#000_40%,transparent_100%)]" />
    </div>
  );
}
