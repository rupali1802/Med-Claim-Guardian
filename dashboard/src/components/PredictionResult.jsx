import React from 'react';

const PredictionResult = ({ result }) => {
    if (!result) return null;

    const getRiskColor = (level) => {
        switch (level) {
            case 'Low': return 'bg-green-100 text-green-700 border-green-200';
            case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'High': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getProbabilityColor = (prob) => {
        if (prob < 0.33) return 'bg-green-500';
        if (prob < 0.67) return 'bg-amber-500';
        return 'bg-red-500';
    };

    return (
        <div className="card h-full flex flex-col justify-between">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800">Prediction Analysis</h2>
                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getRiskColor(result.risk_level)}`}>
                        {result.risk_level} Risk
                    </span>
                </div>

                <div className="mb-8">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-500">Denial Probability</span>
                        <span className="text-sm font-bold text-slate-800">{(result.denial_probability * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ease-out ${getProbabilityColor(result.denial_probability)}`}
                            style={{ width: `${result.denial_probability * 100}%` }}
                        ></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Suggested Actions</h3>
                    <ul className="space-y-3">
                        {result.suggested_action.split(' | ').map((action, i) => (
                            <li key={i} className="flex items-start gap-3 text-slate-700">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"></div>
                                <span className="text-sm leading-relaxed">{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Model Confidence</span>
                <span className="font-mono bg-slate-50 px-2 py-1 rounded">{(result.confidence_score * 100).toFixed(1)}%</span>
            </div>
        </div>
    );
};

export default PredictionResult;
