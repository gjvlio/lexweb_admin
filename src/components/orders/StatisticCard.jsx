export default function StatisticCard({ name, statistic }) {
  return (
    <div className="h-full flex flex-col justify-center p-8 pl-4 text-black border-r border-slate-200">
      <p className="text-xs tracking-wider">{name.toUpperCase()}</p>
      <h1 className="font-heading font-bold text-[32px] leading-none">{statistic}</h1>
    </div>
  );
}
