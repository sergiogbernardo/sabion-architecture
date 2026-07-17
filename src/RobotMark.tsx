type RobotMarkProps = {
  size?: number;
  className?: string;
};

export default function RobotMark({ size = 38, className = "" }: RobotMarkProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Sabion, assistente de arquitetura"
    >
      <defs>
        <linearGradient id="sabionBotFace" x1="8" y1="5" x2="40" y2="43" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9AF6CD" />
          <stop offset="1" stopColor="#42DFA0" />
        </linearGradient>
      </defs>
      <path d="M24 4.5 40 13.7v20.6L24 43.5 8 34.3V13.7L24 4.5Z" fill="#0d1f1b" stroke="#7cf0bc" strokeWidth="1.4" />
      <path d="M24 8.4 36.6 15.7v16.6L24 39.6 11.4 32.3V15.7L24 8.4Z" fill="url(#sabionBotFace)" />
      <path d="M17.2 18.2h13.6a3.7 3.7 0 0 1 3.7 3.7v6.5a3.7 3.7 0 0 1-3.7 3.7H17.2a3.7 3.7 0 0 1-3.7-3.7v-6.5a3.7 3.7 0 0 1 3.7-3.7Z" fill="#07100f" />
      <path d="M24 14.2v4" stroke="#07100f" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="24" cy="12.8" r="1.7" fill="#07100f" />
      <circle cx="19.2" cy="24.6" r="2" fill="#9af6cd" />
      <circle cx="28.8" cy="24.6" r="2" fill="#9af6cd" />
      <path d="M19.7 28.5c1.2 1 2.6 1.5 4.3 1.5s3.1-.5 4.3-1.5" fill="none" stroke="#7cf0bc" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 22.5H5.8M42.2 22.5H40" stroke="#7cf0bc" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
