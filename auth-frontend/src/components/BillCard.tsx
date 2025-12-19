import { Pencil, Trash2, CreditCard } from "lucide-react";

interface BillCardProps {
  bill: {
    _id: string;
    invoice: string;
    date: string;
    description?: string;
    totalAmount?: number;
  };
  onUpdate: (id: string) => void;
  onPay: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function BillCard({ bill, onUpdate, onPay, onDelete }: BillCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow bg-white flex justify-between">
      {/* Bill Info */}
      <div>
        <h2 className="text-xl font-bold">Invoice: {bill.invoice}</h2>
        <p className="text-gray-600">Date: {new Date(bill.date).toLocaleDateString()}</p>

        {bill.description && (
          <p className="text-gray-700 mt-2">Description: {bill.description}</p>
        )}

        <p className="mt-2 font-semibold">Amount: Rs. {bill.totalAmount || 0}</p>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-3">
        {/* Update */}
        <button onClick={() => onUpdate(bill._id)}>
          <Pencil className="text-blue-600 hover:text-blue-800 cursor-pointer" />
        </button>

        {/* Pay */}
        <button onClick={() => onPay(bill._id)}>
          <CreditCard className="text-green-600 hover:text-green-800 cursor-pointer" />
        </button>

        {/* Delete */}
        <button onClick={() => onDelete(bill._id)}>
          <Trash2 className="text-red-600 hover:text-red-800 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
