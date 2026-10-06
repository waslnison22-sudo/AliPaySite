export default function Logo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Логотип Али — оплата услуг мастера"
    >
      <defs>
        <linearGradient id="logo-g" x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F5B544" />
          <stop offset="1" stopColor="#E8722A" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#14100B" />
      <rect x="2.5" y="2.5" width="59" height="59" rx="15.5" stroke="url(#logo-g)" strokeWidth="2" />
      {/* монограмма «А» */}
      <path
        d="M32 14 L46 50 H39.2 L36.6 42.5 H27.4 L24.8 50 H18 Z M30.2 36.5 H33.8 L32 30.5 Z"
        fill="url(#logo-g)"
      />
      {/* монета с символом рубля */}
      <circle cx="47.5" cy="17.5" r="6.5" fill="url(#logo-g)" />
      <path
        d="M47.5 14.2 V20.8 M45.4 16 h3 a1.7 1.7 0 0 1 0 3.4 h-2.8 a1.7 1.7 0 0 0 0 3.4 h3"
        stroke="#14100B"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
