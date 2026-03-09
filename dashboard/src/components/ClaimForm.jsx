import React, { useState } from 'react';

const ClaimForm = ({ onSubmit, isLoading }) => {
    const [formData, setFormData] = useState({
        patient_age: '',
        insurance_type: 'Private',
        procedure_code: 'P001',
        diagnosis_code: 'D001',
        provider_type: 'Specialist',
        claim_amount: '',
        prior_authorization: 'Yes',
        documentation_complete: 'Yes',
        coding_accuracy_score: '0.9',
        claim_submission_delay_days: '5',
        payer: 'Star Health'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert numeric fields
        const payload = {
            ...formData,
            patient_age: parseInt(formData.patient_age),
            claim_amount: parseFloat(formData.claim_amount),
            coding_accuracy_score: parseFloat(formData.coding_accuracy_score),
            claim_submission_delay_days: parseInt(formData.claim_submission_delay_days)
        };
        onSubmit(payload);
    };

    return (
        <div className="card">
            <h2 className="text-xl font-bold mb-6 text-slate-800">New Claim Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Patient Age</label>
                        <input
                            type="number"
                            name="patient_age"
                            value={formData.patient_age}
                            onChange={handleChange}
                            placeholder="e.g. 45"
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Insurance Type</label>
                        <select name="insurance_type" value={formData.insurance_type} onChange={handleChange} className="input-field">
                            {['Private', 'Government (PMJAY)', 'ESI'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Procedure Code</label>
                        <input type="text" name="procedure_code" value={formData.procedure_code} onChange={handleChange} className="input-field" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Diagnosis Code</label>
                        <input type="text" name="diagnosis_code" value={formData.diagnosis_code} onChange={handleChange} className="input-field" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Provider Type</label>
                        <select name="provider_type" value={formData.provider_type} onChange={handleChange} className="input-field">
                            {['Specialist', 'General Practitioner', 'Hospital'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Claim Amount (₹)</label>
                        <input
                            type="number"
                            step="0.01"
                            name="claim_amount"
                            value={formData.claim_amount}
                            onChange={handleChange}
                            placeholder="e.g. 15000"
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Prior Authorization</label>
                        <select name="prior_authorization" value={formData.prior_authorization} onChange={handleChange} className="input-field">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Documentation Complete</label>
                        <select name="documentation_complete" value={formData.documentation_complete} onChange={handleChange} className="input-field">
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Coding Accuracy Score (0-1)</label>
                        <input
                            type="number"
                            step="0.01"
                            min="0"
                            max="1"
                            name="coding_accuracy_score"
                            value={formData.coding_accuracy_score}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Submission Delay (Days)</label>
                        <input
                            type="number"
                            name="claim_submission_delay_days"
                            value={formData.claim_submission_delay_days}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 mb-1">Payer</label>
                        <select name="payer" value={formData.payer} onChange={handleChange} className="input-field">
                            {['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Bajaj Allianz', 'New India Assurance'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn-primary w-full mt-4 flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Predicting...
                        </>
                    ) : 'Submit Claim'}
                </button>
            </form>
        </div>
    );
};

export default ClaimForm;
