/**
 * Add Fee Page
 * Page for creating new fees
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FeeForm, FeeCalculator } from '@/components/pages/add-fee';
import { feeService } from '@/lib/api/fees';
import { CreateFeeInput, UpdateFeeInput } from '@/common/types';
import { ROUTES, TOAST_MESSAGES } from '@/common/constants';

export default function AddFee() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: CreateFeeInput | UpdateFeeInput) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess(false);

      await feeService.create(data as CreateFeeInput);
      
      setSuccess(true);
      
      // Show success message for a moment
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to create fee');
      console.error('Error creating fee:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
              >
                ← Back
              </Button>
              <h1 className="text-2xl font-bold">Add New Fee</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push(ROUTES.HOME)}
            >
              Go to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-sm text-green-800">
                  {TOAST_MESSAGES.SUCCESS.FEE_CREATED}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Form Card */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Information</CardTitle>
                <CardDescription>
                  Fill in the details to add a new fee
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FeeForm
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Service Fee:</strong> Charged for specific services provided</li>
                  <li>• <strong>Late Fee:</strong> Applied when payment is overdue</li>
                  <li>• <strong>Processing Fee:</strong> Transaction or handling charges</li>
                  <li>• <strong>Other:</strong> Any additional custom fees</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Calculator */}
          <div>
            <FeeCalculator />
          </div>
        </div>
      </main>
    </div>
  );
}
