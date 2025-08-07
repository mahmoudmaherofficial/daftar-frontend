import { faFileLines, faBoxesStacked, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const dashboardIcons = {
  invoices: faFileLines,
  customers: faUsers,
  products: faBoxesStacked,
};

const DashboardCard = ({ title, value }) => {
  return (
    <Link href={`/dashboard/${title.toLowerCase()}`}>
      <div className="bg-[var(--card)] max-h-24 hover:bg-[var(--card-hover)] p-4 flex items-center gap-4 shadow transition-colors rounded-xl">
        <FontAwesomeIcon icon={dashboardIcons[title.toLowerCase()]} className="text-[var(--text)] text-6xl max-h-15" />
        <div>
          <h2 className="text-xl font-semibold text-[var(--text)]">{title}</h2>
          <p className="text-3xl font-bold mt-2 text-[var(--text)]">{value}</p>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
