'use client';

import { useDataContext } from '@/context/ApiContext';

function Pagination() {
  const { page, setPage, totalResults } = useDataContext();
  const totalPages = Math.ceil(totalResults / 10);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5 sm:flex-row">
      <p className="text-sm text-slate-300">
        Page <span className="font-semibold text-white">{page}</span> of{' '}
        <span className="font-semibold text-white">{totalPages}</span>
      </p>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition enabled:hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
          className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition enabled:hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
