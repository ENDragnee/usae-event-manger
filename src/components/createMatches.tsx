'use client';

import { useState } from 'react';

export default function CreateMatches() {
    const [loadingFootball, setLoadingFootball] = useState(false);
    const [resultFootball, setResultFootball] = useState<any>(null);
    const [errorFootball, setErrorFootball] = useState<string | null>(null);

    const [loadingAthletics, setLoadingAthletics] = useState(false);
    const [resultAthletics, setResultAthletics] = useState<any>(null);
    const [errorAthletics, setErrorAthletics] = useState<string | null>(null);
    const [selectedDistance, setSelectedDistance] = useState<string>('100m');
    const [selectedGender, setSelectedGender] = useState<string>('Male');

    const handleCreateFootballMatches = async () => {
        try {
            setLoadingFootball(true);
            setErrorFootball(null);
            setResultFootball(null);

            const response = await fetch('/api/createMatch/football', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Pending' }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setResultFootball(data);
        } catch (err) {
            setErrorFootball(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoadingFootball(false);
        }
    };

    const handleCreateAthleticsMatches = async () => {
        try {
            setLoadingAthletics(true);
            setErrorAthletics(null);
            setResultAthletics(null);

            const response = await fetch('/api/createMatch/atlehte', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Pending', distance: selectedDistance, gender: selectedGender }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setResultAthletics(data);
        } catch (err) {
            setErrorAthletics(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoadingAthletics(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-2'>
            <h1 className="text-3xl font-bold">Create Tournament Matches</h1>
            <div className="min-h-screen p-8 flex justify-center items-center">
                <div className="max-w-2xl w-full space-y-10">
                    {/* Football Matches */}
                    <div className="p-6 dark:bg-blue-950 rounded-lg shadow-md text-center">
                        <h1 className="text-3xl font-bold mb-4">Create Football Tournament Matches</h1>
                        <button
                            onClick={handleCreateFootballMatches}
                            disabled={loadingFootball}
                            className={`px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 
                            ${loadingFootball ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
                            shadow-md hover:shadow-lg`}
                        >
                            {loadingFootball ? 'Creating...' : 'Create Football Matches'}
                        </button>

                        {errorFootball && (
                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md animate-fade">
                                {errorFootball}
                            </div>
                        )}

                        {resultFootball && (
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md animate-fade">
                                <p>{resultFootball.message}</p>
                                <p className="mt-2">Created {resultFootball.matches.insertedCount} matches</p>
                            </div>
                        )}
                    </div>

                    {/* Athletics Matches */}
                    <div className="p-6 dark:bg-blue-950 rounded-lg shadow-md text-center">
                        <h1 className="text-3xl font-bold mb-4">Create Athletics Tournament Matches</h1>
                        <div className='flex gap-4 justify-center'>
                            {/* Distance Dropdown */}
                            <div className="mb-4">
                                <label htmlFor="distance" className="block text-lg font-medium mb-2">
                                    Select Distance:
                                </label>
                                <select
                                    id="distance"
                                    value={selectedDistance}
                                    onChange={(e) => setSelectedDistance(e.target.value)}
                                    className="px-4 py-2 bg-gray-100 dark:bg-blue-950 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="100m">100m</option>
                                    <option value="200m">200m</option>
                                    <option value="400m">400m</option>
                                    <option value="4x100m">4x100m</option>
                                    <option value="4x400m">4x400m</option>
                                    <option value="800m">800m</option>
                                    <option value="1500m">1500m</option>
                                    <option value="3000m">3000m</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="distance" className="block text-lg font-medium mb-2">
                                    Select Gender:
                                </label>
                                <select
                                    id="distance"
                                    value={selectedGender}
                                    onChange={(e) => setSelectedGender(e.target.value)}
                                    className="px-4 py-2 bg-gray-100 dark:bg-blue-950 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <button
                            onClick={handleCreateAthleticsMatches}
                            disabled={loadingAthletics}
                            className={`px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 
                            ${loadingAthletics ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} 
                            shadow-md hover:shadow-lg`}
                        >
                            {loadingAthletics ? 'Creating...' : 'Create Athletics Matches'}
                        </button>

                        {errorAthletics && (
                            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md animate-fade">
                                {errorAthletics}
                            </div>
                        )}

                        {resultAthletics && (
                            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md animate-fade">
                                <p>{resultAthletics.message}</p>
                                <p className="mt-2">Created {resultAthletics.matches.insertedCount} matches</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
