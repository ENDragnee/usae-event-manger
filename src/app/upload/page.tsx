'use client';
import { useState } from 'react';

export default function UploadPage() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (e : any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`Success: ${result.updatedCount} records updated!`);
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('Failed to upload file');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Update Chess Scores</h1>
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileUpload}
        disabled={isLoading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {isLoading && <p className="mt-2 text-gray-600">Processing...</p>}
      {message && <p className={`mt-2 ${message.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
    </div>
  );
}