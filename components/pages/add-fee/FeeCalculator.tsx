/**
 * Fee Calculator Component
 * Helper tool for calculating fees
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/common/utils';

export function FeeCalculator() {
  const [baseAmount, setBaseAmount] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [fixedFee, setFixedFee] = useState<number>(0);

  const calculatedFee = (baseAmount * percentage) / 100 + fixedFee;
  const totalAmount = baseAmount + calculatedFee;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fee Calculator</CardTitle>
        <CardDescription>
          Calculate fees based on percentage and fixed amounts
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="baseAmount">Base Amount</Label>
          <Input
            id="baseAmount"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={baseAmount || ''}
            onChange={(e) => setBaseAmount(Number(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="percentage">Percentage (%)</Label>
            <Input
              id="percentage"
              type="number"
              step="0.01"
              placeholder="0"
              value={percentage || ''}
              onChange={(e) => setPercentage(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fixedFee">Fixed Fee</Label>
            <Input
              id="fixedFee"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={fixedFee || ''}
              onChange={(e) => setFixedFee(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Base Amount:</span>
            <span className="font-medium">{formatCurrency(baseAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Calculated Fee:</span>
            <span className="font-medium">{formatCurrency(calculatedFee)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount:</span>
            <span>{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
