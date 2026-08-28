import { Eye } from "lucide-react";

function DateToString(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TableRow({ isChecked = false, row, column }) {
  return (
    <tr className="py-4 text-gray-500">
      <td className="align-middle text-center">
        <input
          checked={isChecked}
          type="checkbox"
          className="accent-brand-purple"
        />
      </td>

      {/* <td className="px-4 py-3">{row.id}</td>
      <td className="px-4 py-3">{row.lawFirm}</td>
      <td className="px-4 py-3">{row.plan}</td>
      <td className="px-4 py-3">{DateToString(row.startDate)}</td>
      <td className="px-4 py-3">{DateToString(row.renewalDate)}</td>
      <td className="px-4 py-3">{row.billingCycle}</td>
      <td className="px-4 py-3">{row.price}</td>
      <td className="px-4 py-3">{row.status}</td> */}

      {column.map((col) => {
        const value = row[col.key];
        let isBold = false;
        if (col.key === 'lawFirm' || col.key === 'client' || col.key === 'productName') isBold = true;

        return (
          <td key={col.key} className={`py-4 ${col.key === 'status' ? 'text-center' : ''} ${isBold ? 'font-bold text-black' : ''}`}>
            {col.render
              ? col.render(value)
              : value instanceof Date
                ? DateToString(value)
                : value}
          </td>
        );
      })}

      <td className="py-4 align-middle text-center">
        <button type="button">
          <Eye className="text-brand-orange" size={18} strokeWidth={1.5} />
        </button>
      </td>
    </tr>
  );
}
