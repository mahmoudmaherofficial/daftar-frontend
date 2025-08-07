import React from "react";
import Button from "../button/button";

const PaginationControls = ({ page, setPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
        Prev
      </Button>
      <span className="text-[var(--text)] px-2">
        Page {page} of {totalPages}
      </span>
      <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
