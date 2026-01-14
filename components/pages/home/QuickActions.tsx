/**
 * Quick Actions Component
 * Displays quick action buttons for common tasks
 */

import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/common/constants';

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      label: 'Add New Record',
      description: 'Create a new record',
      route: ROUTES.ADD_RECORD,
      variant: 'default' as const,
    },
    {
      label: 'View All Records',
      description: 'Browse and manage records',
      route: ROUTES.VIEW_RECORDS,
      variant: 'outline' as const,
    },
    {
      label: 'Add Fee',
      description: 'Add a new fee',
      route: ROUTES.ADD_FEE,
      variant: 'outline' as const,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {actions.map((action) => (
          <Button
            key={action.route}
            variant={action.variant}
            className="w-full justify-start"
            onClick={() => router.push(action.route)}
          >
            <div className="text-left">
              <div className="font-medium">{action.label}</div>
              <div className="text-xs text-muted-foreground">
                {action.description}
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
