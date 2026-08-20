export default function StatisticCard({ name, statistic }) {
  return (
    <div className="h-full flex flex-col justify-center p-8 pl-4 text-gray-500 border-r border-gray-500">
      <p>{name.toUpperCase()}</p>
      <h1 className="font-heading font-bold text-[44px] leading-none">{statistic}</h1>
    </div>
  );
}
