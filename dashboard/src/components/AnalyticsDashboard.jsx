import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AnalyticsDashboard = () => {
    // Sample data for demonstration
    const payerData = {
        labels: ['Star Health', 'HDFC ERGO', 'ICICI Lombard', 'Bajaj Allianz', 'New India Assurance'],
        datasets: [
            {
                label: 'Denial Rate (%)',
                data: [12, 19, 8, 15, 11],
                backgroundColor: 'rgba(14, 165, 233, 0.7)',
                borderColor: 'rgb(14, 165, 233)',
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    const procedureData = {
        labels: ['P001', 'P002', 'P003', 'P004', 'P005'],
        datasets: [
            {
                label: 'Procedure Denial Count',
                data: [65, 42, 88, 30, 55],
                borderColor: 'rgb(14, 165, 233)',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const ringData = {
        labels: ['Low Risk', 'Medium Risk', 'High Risk'],
        datasets: [
            {
                data: [60, 25, 15],
                backgroundColor: [
                    '#22c55e',
                    '#f59e0b',
                    '#ef4444',
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card col-span-1">
                <h3 className="text-base font-bold text-slate-800 mb-6">Denials by Payer</h3>
                <div className="h-64">
                    <Bar data={payerData} options={options} />
                </div>
            </div>

            <div className="card col-span-1">
                <h3 className="text-base font-bold text-slate-800 mb-6">Trends by Procedure</h3>
                <div className="h-64">
                    <Line data={procedureData} options={options} />
                </div>
            </div>

            <div className="card col-span-1">
                <h3 className="text-base font-bold text-slate-800 mb-6">Risk Distribution</h3>
                <div className="h-64 flex justify-center">
                    <Doughnut
                        data={ringData}
                        options={{
                            ...options,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;
