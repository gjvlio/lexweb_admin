import { useState } from "react";
import StatisticCard from "../../components/orders/StatisticCard";
import Button from "../../components/ui/Button";
import { Search, Plus, X } from "lucide-react";
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

  // Modal states
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isOneTimeModalOpen, setIsOneTimeModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Subscription Form State
  const [subscriptionFormData, setSubscriptionFormData] = useState({
    orderId: "S-123",
    lawfirm: "Bautista Lawfirm",
    billingCycle: "Monthly",
    plan: "Premium",
    price: "1,000",
    startDate: "2026-04-05",
    status: "Active",
    renewalDate: "2026-05-05",
    method: "Visa",
  });

  // One-Time Purchase Form State
  const [oneTimeFormData, setOneTimeFormData] = useState({
    orderId: "S-123",
    productName: "Scale-pink",
    type: "Logo",
    category: "Scale",
    client: "Bautista Lawfirm Office",
    price: "1,000",
    orderDate: "2026-05-05",
    status: "Paid",
    productImage: "",
  });

  const handleSubscriptionInputChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOneTimeInputChange = (e) => {
    const { name, value } = e.target;
    setOneTimeFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        { name: "total subscriptions", statistic: orders.length },
        { name: "free plans", statistic: orders.filter((order) => order.plan === "Free").length },
        { name: "premium plans", statistic: orders.filter((order) => order.plan === "Premium").length },
        { name: "custom plans", statistic: orders.filter((order) => order.plan === "Custom").length },
      ];
    }

    return [
      { name: "total purchases", statistic: orders.length },
      { name: "logos", statistic: orders.filter((order) => order.productType === "Logo").length },
      { name: "copywrites", statistic: orders.filter((order) => order.productType === "Copywrite").length },
      { name: "photos", statistic: orders.filter((order) => order.productType === "Photo").length },
      { name: "templates", statistic: orders.filter((order) => order.productType === "Template").length },
    ];
  }

  const activeStatistics = calculateStatistics(activeTable.orders, activeTab);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    resetPage();
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    if (activeTab === "subscriptions") {
      setIsSubscriptionModalOpen(true);
    } else if (activeTab === "one-time purchases") {
      setIsOneTimeModalOpen(true);
    }
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
      {/* Header */}
      <div className="w-full flex border-y border-gray-500">
        <div className="min-w-0 flex-1 flex flex-col justify-center px-10 py-4 bg-brand-purple text-white">
          <p>MANAGEMENT</p>
          <h1 className="font-heading font-bold text-[44px]">Orders</h1>
          <p className="tracking-[-0.88px]">Manage all orders made</p>
        </div>

        {/* Stats */}
        {activeStatistics.map((entry) => (
          <div key={entry.name} className="min-w-0 flex-1">
            <StatisticCard name={entry.name} statistic={entry.statistic} />
          </div>
        ))}
      </div>

      {/* Tabs & Search */}
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
            <Button
              variant="orange"
              size="md"
              className="rounded-[5px]"
              onClick={handleAddClick}
            >
              <Plus className="w-4 h-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="min-w-full">
        <table className="w-full table-fixed border-collapse">
          <colgroup>
            <col className="w-10" />
            {activeTable.rows.map((row) => (
              <col key={row} />
            ))}
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

        {/* Pagination */}
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

      {/* 1. SUBSCRIPTION MODAL */}
      {isSubscriptionModalOpen && activeTab === "subscriptions" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-purple">
                Order: {subscriptionFormData.orderId}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-1.5 border border-slate-900 text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors"
                >
                  Terminate
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="px-4 py-1.5 bg-brand-orange text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  {isEditMode ? "Save Mode" : "Edit Mode"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubscriptionModalOpen(false)}
                  className="p-1 text-slate-500 hover:text-slate-800 transition-colors ml-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">Lawfirm:</label>
                <input
                  type="text"
                  name="lawfirm"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.lawfirm}
                  onChange={handleSubscriptionInputChange}
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">Billing Cycle:</label>
                <input
                  type="text"
                  name="billingCycle"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.billingCycle}
                  onChange={handleSubscriptionInputChange}
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">Plan:</label>
                <input
                  type="text"
                  name="plan"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.plan}
                  onChange={handleSubscriptionInputChange}
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">Price:</label>
                <input
                  type="text"
                  name="price"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.price}
                  onChange={handleSubscriptionInputChange}
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">Start Date:</label>
                <input
                  type={isEditMode ? "date" : "text"}
                  name="startDate"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.startDate}
                  onChange={handleSubscriptionInputChange}
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode ? "bg-white focus:outline-none focus:border-brand-purple cursor-pointer" : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">Status:</label>
                <input
                  type="text"
                  name="status"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.status}
                  onChange={handleSubscriptionInputChange}
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">Renewal Date:</label>
                <input
                  type={isEditMode ? "date" : "text"}
                  name="renewalDate"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.renewalDate}
                  onChange={handleSubscriptionInputChange}
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode ? "bg-white focus:outline-none focus:border-brand-purple cursor-pointer" : "bg-slate-50/50"
                  }`}
                />
              </div>
            </div>

            {/* Subscription Table */}
            <div className="pt-2 overflow-x-auto">
              <table className="w-full text-xs text-slate-700 text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 font-semibold text-slate-800">
                    <th className="py-2 px-2">#</th>
                    <th className="py-2 px-2">ID</th>
                    <th className="py-2 px-2">Order ID</th>
                    <th className="py-2 px-2">Client</th>
                    <th className="py-2 px-2">Transaction date</th>
                    <th className="py-2 px-2">Amount</th>
                    <th className="py-2 px-2">Method</th>
                    <th className="py-2 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2">123</td>
                    <td className="py-3 px-2">{subscriptionFormData.orderId}</td>
                    <td className="py-3 px-2 truncate max-w-[120px]">{subscriptionFormData.lawfirm}</td>
                    <td className="py-3 px-2">{subscriptionFormData.startDate}</td>
                    <td className="py-3 px-2">{subscriptionFormData.price} php</td>
                    <td className="py-3 px-2">{subscriptionFormData.method}</td>
                    <td className="py-3 px-2 font-medium">{subscriptionFormData.status}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. ONE-TIME PURCHASE MODAL */}
      {isOneTimeModalOpen && activeTab === "one-time purchases" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-purple">
                Order: {oneTimeFormData.orderId}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-1.5 border border-slate-900 text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors"
                >
                  Terminate
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditMode(!isEditMode)}
                  className="px-4 py-1.5 bg-brand-orange text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  {isEditMode ? "Save Mode" : "Edit Mode"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOneTimeModalOpen(false)}
                  className="p-1 text-slate-500 hover:text-slate-800 transition-colors ml-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Form Fields Left Column */}
              <div className="space-y-3 text-[11px] font-sans">
                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">Product Name:</label>
                  <input
                    type="text"
                    name="productName"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.productName}
                    onChange={handleOneTimeInputChange}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">Type:</label>
                  <input
                    type="text"
                    name="type"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.type}
                    onChange={handleOneTimeInputChange}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">Category:</label>
                  <input
                    type="text"
                    name="category"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.category}
                    onChange={handleOneTimeInputChange}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">Client:</label>
                  <input
                    type="text"
                    name="client"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.client}
                    onChange={handleOneTimeInputChange}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">Price:</label>
                  <input
                    type="text"
                    name="price"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.price}
                    onChange={handleOneTimeInputChange}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">Order Date:</label>
                  <input
                    type={isEditMode ? "date" : "text"}
                    name="orderDate"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.orderDate}
                    onChange={handleOneTimeInputChange}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode ? "bg-white focus:outline-none focus:border-brand-purple cursor-pointer" : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">Status:</label>
                  <input
                    type="text"
                    name="status"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.status}
                    onChange={handleOneTimeInputChange}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode ? "bg-white focus:outline-none focus:border-brand-purple" : "bg-slate-50/50"
                    }`}
                  />
                </div>
              </div>

              {/* Product Preview Right Column */}
              <div className="space-y-2 text-[11px] font-sans">
                <label className="text-slate-400 font-semibold uppercase block">Product:</label>
                <div className="w-full aspect-square border border-slate-800 rounded-md p-4 flex flex-col items-center justify-center bg-white">
                  {oneTimeFormData.productImage ? (
                    <img
                      src={oneTimeFormData.productImage}
                      alt={oneTimeFormData.productName}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center text-slate-900 space-y-2">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 30 H40 V75 H20 Z" />
                        <circle cx="30" cy="38" r="4" />
                        <circle cx="30" cy="48" r="4" />
                        <path d="M50 25 L85 25 M67.5 25 V65" />
                        <path d="M52 45 L67.5 25 L83 45" />
                        <path d="M50 45 C50 55 85 55 85 45 Z" />
                        <path d="M10 15 L90 15 L90 60 C90 80 50 90 50 90 C50 90 10 80 10 60 Z" strokeWidth="2.5" />
                      </svg>
                      <div className="mt-2 font-bold text-lg tracking-wider uppercase">
                        {oneTimeFormData.client.split(" ")[0] || "YOURNAME"}
                      </div>
                      <div className="text-[9px] tracking-widest text-slate-500 uppercase">
                        Your Tagline Here
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}