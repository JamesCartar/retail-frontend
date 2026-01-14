/**
 * Recent Activity Component
 * Displays recent records and activities
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate, formatCurrency } from '@/common/utils';
import { RecordItem } from '@/common/types';

export interface RecentActivityProps {
  records: RecordItem[];
  isLoading?: boolean;
  onViewAll?: () => void;
}

export function RecentActivity({ records, isLoading, onViewAll }: RecentActivityProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest records and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (!records || records.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest records and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No recent activity</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest records and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.slice(0, 5).map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{record.title}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(record.date)}
                </p>
              </div>
              {record.amount && (
                <div className="ml-4 text-right">
                  <p className="font-medium">{formatCurrency(record.amount)}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {record.status || 'pending'}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        {onViewAll && (
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={onViewAll}
          >
            View All Records
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
