import { useState } from "react";
import StatisticCard from "../../components/orders/StatisticCard";
import Button from '../../components/ui/Button'
import { Search, Plus } from 'lucide-react'
import TableTab from "../../components/orders/TableTab";

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
    <div className="relative -left-8 w-[calc(100%+4rem)] h-full text-gray-500">
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

      <div className="flex items-center justify-between px-10 py-8">
        <div className="flex border rounded-[5px] border-gray-500 text-sm">
          <TableTab isActive={true} name={"Subscriptions"} />
          <TableTab name={"One-Time Purchases"} />
          <TableTab name={"Customs"} />
        </div>

        {/* search bar */}
        <div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-slate-50 border border-slate-200 rounded-[5px] pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-purple"
              />
            </div>
            <Button variant="orange" size="md" className="rounded-[5px]">
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
