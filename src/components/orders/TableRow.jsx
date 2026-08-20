import { Eye } from "lucide-react";

function DateToString(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TableRow({ row }) {
  return (
    <tr className="text-sm text-gray-500">
      <td className="px-4 py-3">
        <input type="checkbox" className="accent-brand-purple" />
      </td>

      <td className="px-4 py-3">{row.id}</td>
      <td className="px-4 py-3">{row.lawFirm}</td>
      <td className="px-4 py-3">{row.plan}</td>
      <td className="px-4 py-3">{DateToString(row.startDate)}</td>
      <td className="px-4 py-3">{DateToString(row.renewalDate)}</td>
      <td className="px-4 py-3">{row.billingCycle}</td>
      <td className="px-4 py-3">{row.price}</td>
      <td className="px-4 py-3">{row.status}</td>

      <td className="px-4 py-3 align-middle text-center">
        <button type="button">
          <Eye className="text-brand-orange" size={18} strokeWidth={1.5} />
        </button>
      </td>
    </tr>
  );
}
