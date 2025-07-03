import { PresentationChartBarIcon, PlusCircleIcon, ClipboardDocumentListIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

export function DefaultSidebar() {
  const { pathname } = useLocation();
  return (
    <nav className="flex flex-col h-full bg-[#111318] text-white py-8 px-4 w-64">
      <div className="mb-10 px-2">
        <span className="text-2xl font-bold tracking-tight">Expense Tracker</span>
      </div>
      <ul className="flex-1 space-y-2">
        <li>
          <Link to="/" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-[#23272f] ${pathname === "/" ? "bg-[#23272f]" : ""}`}>
            <PresentationChartBarIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/transaction/new" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-[#23272f]`}>
            <PlusCircleIcon className="h-5 w-5" />
            <span>Add Transaction</span>
          </Link>
        </li>
        <li>
          <Link to="/transactions" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-[#23272f]`}>
            <ClipboardDocumentListIcon className="h-5 w-5" />
            <span>All transactions</span>
            <span className="ml-auto text-xs bg-[#23272f] px-2 py-0.5 rounded-full">14</span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-[#23272f]`}>
            <Cog6ToothIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
      <div className="mt-auto">
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg w-full transition hover:bg-[#23272f] text-left">
          <PowerIcon className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </nav>
  );
}