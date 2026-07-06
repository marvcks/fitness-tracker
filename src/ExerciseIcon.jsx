const accent = '#f97316';
const dark = '#334155';
const soft = '#fed7aa';

function Base({ children }) {
  return (
    <svg viewBox="0 0 120 92" role="img" aria-hidden="true" className="exercise-icon">
      <rect x="2" y="2" width="116" height="88" rx="22" fill="#fff7ed" />
      {children}
    </svg>
  );
}

const body = {
  head: <circle cx="60" cy="21" r="7" fill={dark} />,
  torso: <path d="M58 30 L52 52 L68 52 L62 30 Z" fill={accent} opacity="0.9" />
};

export default function ExerciseIcon({ type }) {
  switch (type) {
    case 'press':
      return <Base><path d="M22 32h76M28 68h64" stroke={dark} strokeWidth="5" strokeLinecap="round"/><path d="M36 68V34M84 68V34" stroke={dark} strokeWidth="4"/><circle cx="60" cy="24" r="7" fill={dark}/><path d="M58 33v22" stroke={accent} strokeWidth="8" strokeLinecap="round"/><path d="M42 42h36" stroke={accent} strokeWidth="6" strokeLinecap="round"/></Base>;
    case 'fly':
      return <Base>{body.head}{body.torso}<path d="M53 36C38 27 29 29 21 39M67 36c15-9 24-7 32 3" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round"/><path d="M23 39h-8M97 39h8" stroke={dark} strokeWidth="5" strokeLinecap="round"/><path d="M38 70h44" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'shoulder':
      return <Base>{body.head}{body.torso}<path d="M44 34V16M76 34V16" stroke={accent} strokeWidth="6" strokeLinecap="round"/><path d="M35 16h18M67 16h18" stroke={dark} strokeWidth="5" strokeLinecap="round"/><path d="M42 70h36" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'lateral':
      return <Base>{body.head}{body.torso}<path d="M52 37L29 35M68 37l23-2" stroke={accent} strokeWidth="6" strokeLinecap="round"/><circle cx="24" cy="35" r="5" fill={dark}/><circle cx="96" cy="35" r="5" fill={dark}/><path d="M42 72h36" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'pulldown':
      return <Base><path d="M28 16h64" stroke={dark} strokeWidth="5" strokeLinecap="round"/>{body.head}{body.torso}<path d="M49 34L34 19M71 34l15-15" stroke={accent} strokeWidth="6" strokeLinecap="round"/><path d="M38 74h44" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'row':
      return <Base>{body.head}<path d="M47 35h28l-7 18H52z" fill={accent}/><path d="M40 47H18M80 47h22" stroke={dark} strokeWidth="5" strokeLinecap="round"/><path d="M50 56l-16 16M70 56l16 16M30 74h60" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'curl':
      return <Base>{body.head}{body.torso}<path d="M50 38c-13 3-18 11-18 22M70 38c13 3 18 11 18 22" stroke={accent} strokeWidth="6" strokeLinecap="round"/><circle cx="32" cy="64" r="6" fill={dark}/><circle cx="88" cy="64" r="6" fill={dark}/></Base>;
    case 'kickback':
      return <Base><circle cx="44" cy="24" r="7" fill={dark}/><path d="M50 31l30 12-8 14-30-13z" fill={accent}/><path d="M75 44l24-10M40 48L24 68M70 58l8 18" stroke={dark} strokeWidth="5" strokeLinecap="round"/><circle cx="103" cy="32" r="5" fill={dark}/></Base>;
    case 'squat':
      return <Base>{body.head}<path d="M55 31l-12 24h30L63 31z" fill={accent}/><path d="M42 56l-17 18M73 56l22 10M24 75h22M87 68h20" stroke={dark} strokeWidth="5" strokeLinecap="round"/><path d="M25 18v62M95 18v62" stroke={soft} strokeWidth="5"/></Base>;
    case 'extension':
      return <Base>{body.head}<path d="M49 32h25l-8 20H43z" fill={accent}/><path d="M46 54H23M66 54l30 18M91 72h16M28 72h35" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'legcurl':
      return <Base><path d="M25 58h70" stroke={dark} strokeWidth="6" strokeLinecap="round"/><circle cx="45" cy="36" r="7" fill={dark}/><path d="M52 41h28l-8 17H44z" fill={accent}/><path d="M72 59l22 17M92 76h16" stroke={accent} strokeWidth="6" strokeLinecap="round"/></Base>;
    case 'bridge':
      return <Base><circle cx="33" cy="53" r="7" fill={dark}/><path d="M41 54c14-20 32-20 48 0" stroke={accent} strokeWidth="9" strokeLinecap="round" fill="none"/><path d="M22 68h76M38 56l-16 12M87 56l13 12" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'plank':
      return <Base><circle cx="30" cy="47" r="7" fill={dark}/><path d="M39 48h45" stroke={accent} strokeWidth="9" strokeLinecap="round"/><path d="M24 61h72M48 52l-15 9M84 52l15 9" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'crunch':
      return <Base><circle cx="42" cy="48" r="7" fill={dark}/><path d="M50 50c10 2 20 8 27 18" stroke={accent} strokeWidth="9" strokeLinecap="round"/><path d="M25 70h70M70 68l18-18" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'walk':
      return <Base>{body.head}<path d="M58 31l-6 23" stroke={accent} strokeWidth="8" strokeLinecap="round"/><path d="M53 54L38 76M55 54l22 17M51 39l-16 8M62 39l15-11" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
    case 'run':
    default:
      return <Base>{body.head}<path d="M57 31L45 51l20 4 8-17" stroke={accent} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none"/><path d="M45 52L27 74M64 55l25 14M51 39l-20-6M70 39l17-15" stroke={dark} strokeWidth="5" strokeLinecap="round"/></Base>;
  }
}
