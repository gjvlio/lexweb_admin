import { useState } from "react";
import StatisticCard from "../../components/orders/StatisticCard";

export default function OrdersPage() {
  const subscriptionStatistics = [
    {
      name: "total subscriptions",
      statistic: 727,
    },
    {
      name: "free plans",
      statistic: 500,
    },
    {
      name: "premium plans",
      statistic: 227,
    },
    {
      name: "custom plans",
      statistic: 0,
    },
  ];

  const [activeStatistics, setActiveStatistics] = useState(
    subscriptionStatistics,
  );

  return (
    <div className="relative -left-8 w-[calc(100%+4rem)] h-full">
      <div className="w-full flex border-y border-gray-500">
        <div className="min-w-0 flex-1 flex flex-col justify-center px-10 py-4 bg-brand-purple text-white">
          <p>MANAGEMENT</p>
          <h1 className="font-heading font-bold text-[44px]">Orders</h1>
          <p className="tracking-[-0.88px]">Manage all orders made</p>
        </div>

        {/* Stats */}
        {activeStatistics.map((entry) => (
          <div key={entry.name} className="min-w-0 flex-1">
            <StatisticCard
              key={entry.name}
              name={entry.name}
              statistic={entry.statistic}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
