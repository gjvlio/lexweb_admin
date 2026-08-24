import { useState } from "react";
import StatisticCard from "../../components/orders/StatisticCard";
import Button from "../../components/ui/Button";
import { Search, Plus } from "lucide-react";
import TableTab from "../../components/orders/TableTab";
import {
  customKeys,
  customOrders,
  customRows,
  oneTimeKeys,
  oneTimeOrders,
  oneTimeRows,
  subscriptionKeys,
  subscriptionOrders,
  subscriptionRows,
} from "./OrdersData";
import TableRow from "../../components/orders/TableRow";
import usePagination from "../../hooks/usePagination";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("subscriptions");

  const tableConfig = {
    subscriptions: {
      keys: subscriptionKeys,
      rows: subscriptionRows,
      orders: subscriptionOrders,
    },

    "one-time purchases": {
      keys: oneTimeKeys,
      rows: oneTimeRows,
      orders: oneTimeOrders,
    },

    customs: {
      keys: customKeys,
      rows: customRows,
      orders: customOrders,
    },
  };

  const activeTable = tableConfig[activeTab];

  function calculateStatistics(orders, tab) {
    if (tab === "subscriptions") {
      return [
        {
          name: "total subscriptions",
          statistic: orders.length,
        },
        {
          name: "free plans",
          statistic: orders.filter((order) => order.plan === "Free").length,
        },
        {
          name: "premium plans",
          statistic: orders.filter((order) => order.plan === "Premium").length,
        },
        {
          name: "custom plans",
          statistic: orders.filter((order) => order.plan === "Custom").length,
        },
      ];
    }

    return [
      {
        name: "total purchases",
        statistic: orders.length,
      },
      {
        name: "logos",
        statistic: orders.filter((order) => order.productType === "Logo")
          .length,
      },
      {
        name: "copywrites",
        statistic: orders.filter((order) => order.productType === "Copywrite")
          .length,
      },
      {
        name: "photos",
        statistic: orders.filter((order) => order.productType === "Photo")
          .length,
      },
      {
        name: "templates",
        statistic: orders.filter((order) => order.productType === "Template")
          .length,
      },
    ];
  }

  const activeStatistics = calculateStatistics(activeTable.orders, activeTab);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    resetPage();
  };

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    resetPage,
    hasNextPage,
    hasPrevPage,
  } = usePagination({
    totalItems: activeTable.orders.length,
    itemsPerPage: 8,
  });

  const paginatedOrders = activeTable.orders.slice(startIndex, endIndex);

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

      <div className="flex items-center justify-between px-10 py-8 border-b border-gray-500">
        <div className="flex border rounded-[5px] border-gray-500 text-sm">
          <TableTab
            name={"Subscriptions"}
            isActive={activeTab === "subscriptions"}
            onClick={() => handleTabClick("subscriptions")}
          />
          <TableTab
            name={"One-Time Purchases"}
            isActive={activeTab === "one-time purchases"}
            onClick={() => handleTabClick("one-time purchases")}
          />
          <TableTab
            name={"Customs"}
            isActive={activeTab === "customs"}
            onClick={() => handleTabClick("customs")}
          />
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

      <div className="min-w-full">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            {/* checkbox */}
            <col className="w-10" />

            {activeTable.rows.map((row) => (
              <col key={row} />
            ))}

            {/* Action */}
            <col className="h-full" />
          </colgroup>

          <thead>
            <tr className="border-b border-gray-500 align-middle">
              <th className="px-4 py-3">
                <input type="checkbox" className="accent-brand-purple" />
              </th>
              {activeTable.rows.map((row) => (
                <th
                  key={row}
                  className="px-4 py-3 text-left text-sm font-bold text-gray-500"
                >
                  {row}
                </th>
              ))}

              <th>Action</th>
            </tr>
          </thead>

          <tbody className="border-b border-gray-500">
            {paginatedOrders.map((order, index) => (
              <TableRow key={index} row={order} column={activeTable.keys} />
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between px-10 py-4">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevPage}
              disabled={!hasPrevPage}
              className="px-3 py-2 border rounded"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 border rounded ${
                    currentPage === page ? "bg-brand-purple text-white" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              onClick={nextPage}
              disabled={!hasNextPage}
              className="px-3 py-2 border rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
