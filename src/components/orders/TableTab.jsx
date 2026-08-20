export default function TableTab({name, isActive = false, onClick  }) {
  const mainClasses = "px-8 py-2 flex items-center justify-center border-r border-gray-500 last:border-none transition-colors"
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
