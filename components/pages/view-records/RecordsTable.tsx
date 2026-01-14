/**
 * Records Table Component
 * Displays a table of records with actions
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RecordItem } from '@/common/types';
import { formatDate, formatCurrency } from '@/common/utils';

export interface RecordsTableProps {
  records: RecordItem[];
  isLoading?: boolean;
  onEdit?: (record: RecordItem) => void;
  onDelete?: (record: RecordItem) => void;
  onView?: (record: RecordItem) => void;
}

export function RecordsTable({
  records,
  isLoading,
  onEdit,
  onDelete,
  onView,
}: RecordsTableProps) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">Loading records...</p>
        </CardContent>
      </Card>
    );
  }

  if (!records || records.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <p className="text-center text-muted-foreground">No records found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Records</CardTitle>
        <CardDescription>View and manage all records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium">Category</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr
                  key={record.id}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{record.title}</p>
                      {record.description && (
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {record.description}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-sm">{formatDate(record.date)}</td>
                  <td className="p-3 font-medium">
                    {record.amount ? formatCurrency(record.amount) : '-'}
                  </td>
                  <td className="p-3">
                    <span className="text-sm capitalize">
                      {record.category || '-'}
                    </span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : record.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {record.status || 'pending'}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-2">
                      {onView && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onView(record)}
                        >
                          View
                        </Button>
                      )}
                      {onEdit && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(record)}
                        >
                          Edit
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDelete(record)}
                        >
                          Delete
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
