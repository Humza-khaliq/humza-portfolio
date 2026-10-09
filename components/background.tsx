/** Fixed wallpaper behind everything, dimmed so glass and text stay legible. */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <picture>
        <source media="(max-width: 768px)" srcSet="/media/wallpaper-sm.jpg" />
        <img src="/media/wallpaper.jpg" alt="" className="h-full w-full object-cover object-center" />
      </picture>
      <div className="absolute inset-0 bg-[rgba(3,8,14,.35)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,8,14,.55)_0%,rgba(3,8,14,.25)_45%,rgba(3,8,14,.1)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,15,0)_55%,rgba(5,8,15,.6)_100%)]" />
    </div>
  );
}
