/**
 * Add Record Page
 * Page for creating new records
 */

import { useState } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RecordForm } from '@/components/pages/add-record';
import { recordService } from '@/lib/api/records';
import { CreateRecordInput, UpdateRecordInput } from '@/common/types';
import { ROUTES, TOAST_MESSAGES } from '@/common/constants';

export default function AddRecord() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (data: CreateRecordInput | UpdateRecordInput) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess(false);

      await recordService.create(data as CreateRecordInput);
      
      setSuccess(true);
      
      // Show success message and redirect after a short delay
      setTimeout(() => {
        router.push(ROUTES.VIEW_RECORDS);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to create record');
      console.error('Error creating record:', err);
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
              <h1 className="text-2xl font-bold">Add New Record</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push(ROUTES.VIEW_RECORDS)}
            >
              View All Records
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-sm text-green-800">
              {TOAST_MESSAGES.SUCCESS.RECORD_CREATED}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Record Information</CardTitle>
            <CardDescription>
              Fill in the details to create a new record
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecordForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• <strong>Title:</strong> Enter a descriptive title for the record</li>
              <li>• <strong>Description:</strong> Optional details about the record</li>
              <li>• <strong>Amount:</strong> Optional monetary value</li>
              <li>• <strong>Date:</strong> When this record occurred or will occur</li>
              <li>• <strong>Category:</strong> Classify the record for better organization</li>
              <li>• <strong>Customer ID:</strong> Link to an existing customer</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
