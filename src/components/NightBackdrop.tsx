"use client";

export function NightBackdrop() {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden bg-[#0A0A0A]">
      {/* Animated Gradient Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#E05A33] opacity-20 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#7C3AED] opacity-20 blur-[150px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[50%] w-[30%] h-[30%] rounded-full bg-[#3B82F6] opacity-10 blur-[100px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
    </div>
  );
}