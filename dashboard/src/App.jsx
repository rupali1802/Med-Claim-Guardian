import React, { useState } from 'react';
import ClaimForm from './components/ClaimForm';
import PredictionResult from './components/PredictionResult';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { predictClaim } from './api';

function App() {
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClaimSubmit = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await predictClaim(data);
            setPrediction(result);
        } catch (err) {
            setError('Failed to get prediction. Please ensure the API is running.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.040L3 6.642a44.603 44.603 0 006 33.358A44.603 44.603 0 0021 6.642l-.382-.658z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">RCM Denial Engine</h1>
                    </div>
                    <p className="text-slate-500 text-lg">Predict and analyze healthcare claim denials with AI-driven insights.</p>
                </header>

                {/* Main Content */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-10">
                    {/* Left Column: Form */}
                    <div className="xl:col-span-8">
                        <ClaimForm onSubmit={handleClaimSubmit} isLoading={isLoading} />
                    </div>

                    {/* Right Column: Prediction Result */}
                    <div className="xl:col-span-4">
                        {prediction ? (
                            <PredictionResult result={prediction} />
                        ) : (
                            <div className="card h-full flex flex-col items-center justify-center text-center p-10 bg-slate-50/50 border-dashed border-2 border-slate-200">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-300 mb-4 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-400 mb-2">No Prediction Yet</h3>
                                <p className="text-slate-400 text-sm max-w-[200px]">Fill out the claim form and submit to see the AI analysis.</p>
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}
                    </div>
                </div>

                {/* Bottom Section: Analytics */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-800">Global Denial Analytics</h2>
                        <div className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">Live Stats</div>
                    </div>
                    <AnalyticsDashboard />
                </section>

                <footer className="mt-20 pt-10 border-t border-slate-100 text-center text-slate-400 text-sm">
                    <p>&copy; 2026 RCM Denial Prediction System. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}

export default App;
