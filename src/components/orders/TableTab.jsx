export default function TableTab({name, isActive = false  }) {
  const mainClasses = "px-8 py-2 flex items-center justify-center border-r border-gray-500 last:border-none transition-colors"
  const hoverClasses = "hover:bg-brand-purple-soft hover:text-white"
  const activeClasses = "bg-brand-purple font-bold text-white"

  return (
    <div className={`${mainClasses} ${hoverClasses} ${
      isActive ? activeClasses : ""
    }`}>
      {name}
    </div>
  );
}
