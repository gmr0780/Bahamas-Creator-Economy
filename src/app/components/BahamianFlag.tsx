interface BahamianFlagProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function BahamianFlag({
  className = "",
  width = 32,
  height,
}: BahamianFlagProps) {
  // The Bahamas flag ratio is 1:2
  const h = height ?? width * 0.5;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 600 300"
      width={width}
      height={h}
      className={className}
      role="img"
      aria-label="Flag of The Bahamas"
    >
      {/* Top aquamarine stripe */}
      <rect x="0" y="0" width="600" height="100" fill="#00ABC9" />
      {/* Middle gold stripe */}
      <rect x="0" y="100" width="600" height="100" fill="#FFD100" />
      {/* Bottom aquamarine stripe */}
      <rect x="0" y="200" width="600" height="100" fill="#00ABC9" />
      {/* Black equilateral triangle on the hoist side */}
      <polygon points="0,0 200,150 0,300" fill="#000000" />
    </svg>
  );
}
