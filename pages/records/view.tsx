/**
 * View Records Page
 * Page for viewing and managing records
 */

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { RecordsTable, RecordsFilter, Pagination } from '@/components/pages/view-records';
import { recordService } from '@/lib/api/records';
import { RecordItem, FilterConfig } from '@/common/types';
import { ROUTES, PAGINATION } from '@/common/constants';

export default function ViewRecords() {
  const router = useRouter();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);
  const [perPage, setPerPage] = useState<number>(PAGINATION.DEFAULT_PER_PAGE);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<FilterConfig>({});

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await recordService.getAll({
        page,
        perPage,
        filters,
      });

      setRecords(response.data || []);
      setTotal(response.total || 0);
    } catch (err: any) {
      setError(err.message || 'Failed to load records');
      console.error('Error fetching records:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, filters]);

  const handleFilterChange = (newFilters: FilterConfig) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handleResetFilters = () => {
    setFilters({});
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setPage(1);
  };

  const handleEdit = (record: RecordItem) => {
    // In a real app, navigate to edit page
    console.log('Edit record:', record);
    alert(`Edit functionality coming soon for: ${record.title}`);
  };

  const handleDelete = async (record: RecordItem) => {
    if (!confirm(`Are you sure you want to delete "${record.title}"?`)) {
      return;
    }

    try {
      await recordService.delete(record.id);
      // Refresh the list
      fetchRecords();
    } catch (err: any) {
      alert(err.message || 'Failed to delete record');
    }
  };

  const handleView = (record: RecordItem) => {
    // In a real app, navigate to detail page
    console.log('View record:', record);
    alert(`View functionality coming soon for: ${record.title}`);
  };

  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push(ROUTES.HOME)}
              >
                ← Home
              </Button>
              <h1 className="text-2xl font-bold">View Records</h1>
            </div>
            <Button onClick={() => router.push(ROUTES.ADD_RECORD)}>
              Add New Record
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6">
          <RecordsFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Records Table */}
        <RecordsTable
          records={records}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />

        {/* Pagination */}
        {!isLoading && total > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              perPage={perPage}
              total={total}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        )}
      </main>
    </div>
  );
}
