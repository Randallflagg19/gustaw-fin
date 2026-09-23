interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function Background({ children, className = "" }: BackgroundProps) {
  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/cosmos-bg.png')",
        }}
      />
      <div className="fixed inset-0 -z-10 bg-black/35" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,215,140,0.12),transparent_28%),linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.45))]" />

      <div className="relative min-h-screen">{children}</div>
    </div>
  );
}
