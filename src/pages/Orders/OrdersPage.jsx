import { useState } from "react";
import StatisticCard from "../../components/orders/StatisticCard";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Search, Plus, X, Upload, Table } from "lucide-react";
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

const initialSubscriptionData = {
  orderId: "",
  lawfirm: "",
  billingCycle: "",
  plan: "",
  price: "",
  startDate: "",
  status: "Active",
  renewalDate: "",
  method: "",
};

const initialOneTimeData = {
  orderId: "",
  productName: "",
  type: "",
  category: "",
  client: "",
  price: "",
  orderDate: "",
  status: "Paid",
  productImage: "",
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("subscriptions");

  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isOneTimeModalOpen, setIsOneTimeModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [subscriptionFormData, setSubscriptionFormData] = useState(
    initialSubscriptionData,
  );
  const [oneTimeFormData, setOneTimeFormData] = useState(initialOneTimeData);

  const handleSubscriptionInputChange = (e) => {
    const { name, value } = e.target;
    setSubscriptionFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOneTimeInputChange = (e) => {
    const { name, value } = e.target;
    setOneTimeFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setOneTimeFormData((prev) => ({ ...prev, productImage: imageUrl }));
    }
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
      { name: "total purchases", statistic: orders.length },
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

  const handleAddClick = () => {
    setIsEditMode(true);
    if (activeTab === "subscriptions") {
      setSubscriptionFormData({
        ...initialSubscriptionData,
        orderId: `S-${Math.floor(100 + Math.random() * 900)}`,
      });
      setIsSubscriptionModalOpen(true);
    } else if (activeTab === "one-time purchases") {
      setOneTimeFormData({
        ...initialOneTimeData,
        orderId: `P-${Math.floor(100 + Math.random() * 900)}`,
      });
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

  const [checkedRows, setCheckedRows] = useState({
    subscriptions: {},
    "one-time purchases": {},
    customs: {},
  });

  const activeCheckedRows = checkedRows[activeTab];

  const allChecked =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((order) => activeCheckedRows[order.id]);

  const toggleAll = () => {
    setCheckedRows((prev) => {
      const current = prev[activeTab];

      if (allChecked) {
        const next = { ...current };
        paginatedOrders.forEach((order) => {
          delete next[order.id];
        });
        return { ...prev, [activeTab]: next };
      }

      const next = { ...current };
      paginatedOrders.forEach((order) => {
        next[order.id] = true;
      });

      return { ...prev, [activeTab]: next };
    });
  };

  const toggleRow = (id) => {
    setCheckedRows((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [id]: !prev[activeTab][id],
      },
    }));
  };

  return (
    <div className="-m-6 min-h-[calc(100vh-68px)] overflow-x-hidden bg-white text-gray-500">
      <div className="px-10 pt-[18px] pb-4 flex items-start justify-between gap-6">
        <span
          className="font-sans hover:underline cursor-pointer"
          style={{ fontSize: 12, color: "#F4512C" }}
        >
          &gt; Orders
        </span>
      </div>

      {/* Header */}
      <div className="w-full flex pb-6 border-b border-slate-200">
        <div className="min-w-0 flex-1 flex flex-col justify-center px-10 py-4 text-gray-500 border-r border-slate-200">
          <p className="text-xs tracking-widest">MANAGEMENT</p>
          <h1 className="font-heading font-bold text-[38px] text-brand-purple">
            Orders
          </h1>
          <p className="text-[13.5px]">Manage all orders made</p>
        </div>

        {/* Stats */}
        {activeStatistics.map((entry) => (
          <div key={entry.name} className="min-w-0 flex-1">
            <StatisticCard name={entry.name} statistic={entry.statistic} />
          </div>
        ))}
      </div>

      {/* Tabs & Search */}
      <div className="flex items-center justify-between px-10 py-5 border-b border-slate-200">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <Table size={15} strokeWidth={1.8}/>
            <span className="text-xs tracking-wider">TABLE</span>
          </div>
          <div className="flex border rounded-xl overflow-hidden border-slate-200 text-sm">
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
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 focus:outline-none focus:border-brand-purple"
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
      <div className="min-w-full px-8 border-b border-slate-200">
        <table className="w-full table-fixed border-collapse overflow-x-scroll">
          <colgroup>
            <col className="w-16 h-full align-middle text-center" />
            {activeTable.rows.map((row) => (
              <col key={row.label} className={row.className} />
            ))}
            <col className="w-24 h-full" />
          </colgroup>

          <thead>
            <tr className="border-b border-slate-200 align-middle">
              <th>
                <input
                  checked={allChecked}
                  onChange={toggleAll}
                  type="checkbox"
                  className="accent-brand-purple"
                />
              </th>
              {activeTable.rows.map((row) => (
                <th key={row} className="px-4 py-3 text-left text-[11px] tracking-wide text-gray-400">
                  {row.label.toUpperCase()}
                </th>
              ))}
              <th className="px-4 py-3 text-center text-[11px] tracking-wide text-gray-400">
                  ACTION
                </th>
            </tr>
          </thead>

          <tbody>
            {paginatedOrders.map((order, index) => (
              <TableRow
                key={index}
                isChecked={!!activeCheckedRows[order.id]}
                onToggle={() => toggleRow(order.id)}
                row={order}
                column={activeTable.keys}
              />
            ))}
          </tbody>
        </table>

        
      </div>
      {/* Pagination */}
        <div className="flex items-center justify-between px-10 py-4">
          <p className="text-sm">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex items-center text-sm border border-slate-200 rounded-xl">
            <button
              type="button"
              onClick={prevPage}
              disabled={!hasPrevPage}
              className="px-3 py-2 border-r"
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
                  className={`px-3 py-2 border-r last:border-none ${
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
              className="px-3 py-2"
            >
              Next
            </button>
          </div>
        </div>

      {/* 1. SUBSCRIPTION MODAL */}
      {isSubscriptionModalOpen && activeTab === "subscriptions" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-slate-800">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold font-heading text-brand-purple">
                Order: {subscriptionFormData.orderId || "New Subscription"}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-1.5 border border-slate-900 text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors"
                >
                  Terminate
                </button>
                <Button
                  variant="orange"
                  size="md"
                  className="rounded-[5px]"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? "Save Mode" : "Edit Mode"}
                </Button>
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
                <label className="text-slate-400 font-medium uppercase">
                  Law Firm:
                </label>
                <input
                  type="text"
                  name="lawfirm"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.lawfirm}
                  onChange={handleSubscriptionInputChange}
                  placeholder="Enter Law Firm Name"
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode
                      ? "bg-white focus:outline-none focus:border-brand-purple"
                      : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">
                  Billing Cycle:
                </label>
                <input
                  type="text"
                  name="billingCycle"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.billingCycle}
                  onChange={handleSubscriptionInputChange}
                  placeholder="e.g. Monthly, Yearly"
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode
                      ? "bg-white focus:outline-none focus:border-brand-purple"
                      : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">
                  Plan:
                </label>
                <input
                  type="text"
                  name="plan"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.plan}
                  onChange={handleSubscriptionInputChange}
                  placeholder="e.g. Premium, Free, Custom"
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode
                      ? "bg-white focus:outline-none focus:border-brand-purple"
                      : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">
                  Price:
                </label>
                <input
                  type="text"
                  name="price"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.price}
                  onChange={handleSubscriptionInputChange}
                  placeholder="e.g. 1,000"
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode
                      ? "bg-white focus:outline-none focus:border-brand-purple"
                      : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">
                  Start Date:
                </label>
                <input
                  type={isEditMode ? "date" : "text"}
                  name="startDate"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.startDate}
                  onChange={handleSubscriptionInputChange}
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode
                      ? "bg-white focus:outline-none focus:border-brand-purple cursor-pointer"
                      : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">
                  Status:
                </label>
                <input
                  type="text"
                  name="status"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.status}
                  onChange={handleSubscriptionInputChange}
                  placeholder="Active, Inactive"
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode
                      ? "bg-white focus:outline-none focus:border-brand-purple"
                      : "bg-slate-50/50"
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-medium uppercase">
                  Renewal Date:
                </label>
                <input
                  type={isEditMode ? "date" : "text"}
                  name="renewalDate"
                  readOnly={!isEditMode}
                  value={subscriptionFormData.renewalDate}
                  onChange={handleSubscriptionInputChange}
                  className={`w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 ${
                    isEditMode
                      ? "bg-white focus:outline-none focus:border-brand-purple cursor-pointer"
                      : "bg-slate-50/50"
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
                    <td className="py-3 px-2">
                      {subscriptionFormData.orderId || "--"}
                    </td>
                    <td className="py-3 px-2 truncate max-w-[120px]">
                      {subscriptionFormData.lawfirm || "--"}
                    </td>
                    <td className="py-3 px-2">
                      {subscriptionFormData.startDate || "--"}
                    </td>
                    <td className="py-3 px-2">
                      {subscriptionFormData.price
                        ? `${subscriptionFormData.price} php`
                        : "--"}
                    </td>
                    <td className="py-3 px-2">
                      {subscriptionFormData.method || "--"}
                    </td>
                    <td className="py-3 px-2 font-medium">
                      {subscriptionFormData.status || "--"}
                    </td>
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
                Order: {oneTimeFormData.orderId || "New Order"}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-4 py-1.5 border border-slate-900 text-slate-900 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors"
                >
                  Terminate
                </button>
                <Button
                  variant="orange"
                  size="md"
                  className="rounded-[5px]"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? "Save Mode" : "Edit Mode"}
                </Button>
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
                  <label className="text-slate-400 font-semibold uppercase">
                    Product Name:
                  </label>
                  <input
                    type="text"
                    name="productName"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.productName}
                    onChange={handleOneTimeInputChange}
                    placeholder="Enter product name"
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode
                        ? "bg-white focus:outline-none focus:border-brand-purple"
                        : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">
                    Type:
                  </label>
                  <input
                    type="text"
                    name="type"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.type}
                    onChange={handleOneTimeInputChange}
                    placeholder="e.g. Logo, Template"
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode
                        ? "bg-white focus:outline-none focus:border-brand-purple"
                        : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">
                    Category:
                  </label>
                  <input
                    type="text"
                    name="category"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.category}
                    onChange={handleOneTimeInputChange}
                    placeholder="Enter category"
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode
                        ? "bg-white focus:outline-none focus:border-brand-purple"
                        : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">
                    Client:
                  </label>
                  <input
                    type="text"
                    name="client"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.client}
                    onChange={handleOneTimeInputChange}
                    placeholder="Enter client name"
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode
                        ? "bg-white focus:outline-none focus:border-brand-purple"
                        : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">
                    Price:
                  </label>
                  <input
                    type="text"
                    name="price"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.price}
                    onChange={handleOneTimeInputChange}
                    placeholder="e.g. 1,000"
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode
                        ? "bg-white focus:outline-none focus:border-brand-purple"
                        : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">
                    Order Date:
                  </label>
                  <input
                    type={isEditMode ? "date" : "text"}
                    name="orderDate"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.orderDate}
                    onChange={handleOneTimeInputChange}
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode
                        ? "bg-white focus:outline-none focus:border-brand-purple cursor-pointer"
                        : "bg-slate-50/50"
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-semibold uppercase">
                    Status:
                  </label>
                  <input
                    type="text"
                    name="status"
                    readOnly={!isEditMode}
                    value={oneTimeFormData.status}
                    onChange={handleOneTimeInputChange}
                    placeholder="Paid, Pending"
                    className={`w-full border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-800 ${
                      isEditMode
                        ? "bg-white focus:outline-none focus:border-brand-purple"
                        : "bg-slate-50/50"
                    }`}
                  />
                </div>
              </div>

              {/* Product Placeholder Page Embedded */}
              <div className="space-y-2 text-[11px] font-sans">
                <label className="text-slate-400 font-semibold uppercase block">
                  Product:
                </label>

                <div className="w-full aspect-square border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col items-center justify-center relative overflow-hidden">
                  {oneTimeFormData.productImage ? (
                    <img
                      src={oneTimeFormData.productImage}
                      alt={oneTimeFormData.productName || "Product"}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <Card className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-white shadow-sm border border-slate-200">
                      <h3 className="text-lg font-heading font-bold text-slate-900 mb-2">
                        {oneTimeFormData.productName || "Product Preview"}
                      </h3>
                      <p className="text-xs text-slate-500 font-sans max-w-[200px] mb-4">
                        This is a scaffolded route placeholder for{" "}
                        <strong>
                          {oneTimeFormData.productName || "Product"}
                        </strong>
                        .
                      </p>

                      {isEditMode && (
                        <label
                          htmlFor="product-image-upload"
                          className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-purple text-white rounded-md text-xs font-medium shadow-sm hover:opacity-90 transition-opacity"
                        >
                          <Upload className="w-3.5 h-3.5" /> Upload Image
                        </label>
                      )}
                    </Card>
                  )}

                  <input
                    id="product-image-upload"
                    type="file"
                    accept="image/*"
                    disabled={!isEditMode}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
