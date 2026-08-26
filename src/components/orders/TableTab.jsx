export default function TableTab({name, isActive = false, onClick  }) {
  const mainClasses = "px-8 py-2 flex items-center justify-center text-sm border-r border-slate-200 last:border-none transition-colors"
  const hoverClasses = "hover:bg-brand-purple hover:text-white"
  const activeClasses = "bg-brand-purple text-white"

  return (
    <button onClick={onClick} className={`${mainClasses} ${hoverClasses} ${
      isActive ? activeClasses : ""
    }`}>
      {name}
    </button>
  );
}
