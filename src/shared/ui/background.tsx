interface BackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function Background({ children, className = "" }: BackgroundProps) {
  return (
    <div
      className={`cosmos-background relative isolate min-h-screen overflow-hidden bg-[#080604] bg-cover bg-center bg-fixed bg-no-repeat ${className}`}
      style={{ backgroundColor: "#080604" }}
    >
      <div className="fixed inset-0 z-0 bg-black/35" />
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top,rgba(255,215,140,0.12),transparent_28%),linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.45))]" />

      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
