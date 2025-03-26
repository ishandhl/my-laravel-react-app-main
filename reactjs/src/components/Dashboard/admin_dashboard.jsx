import React, { useState, useEffect, useRef } from 'react';
import AuthUser from '../Authentication/AuthUser';
import Chart from 'chart.js/auto';

export default function YourComponent() {
    const { http } = AuthUser();

    const [userTotal, setUserTotal] = useState(0);
    const [projectTotal, setProjectTotal] = useState(0);
    const [transactionTotal, setTransactionTotal] = useState(0);
    const [projectCounts, setProjectCounts] = useState({ crowdfund: 0, invest: 0 });

    useEffect(() => {
        // Fetch total number of users
        http.get('/admin/users/total')
            .then((response) => {
                setUserTotal(response.data);
            })
            .catch((error) => {
                console.error('Error fetching total users:', error);
            });

        // Fetch total number of projects
        http.get('/admin/projects/all')
            .then((response) => {
                setProjectTotal(response.data[0].length);
            })
            .catch((error) => {
                console.error('Error fetching total projects:', error);
            });

        // Fetch total number of transactions
        http.get('/admin/transactions/total')
            .then((response) => {
                setTransactionTotal(response.data);
            })
            .catch((error) => {
                console.error('Error fetching total transactions:', error);
            });
    }, []);

    // Refs for the chart canvases and chart instances
    const lineChartRef = useRef(null);
    const lineChartInstanceRef = useRef(null);

    useEffect(() => {
        // Destroy existing chart instance if it exists
        if (lineChartInstanceRef.current) {
            lineChartInstanceRef.current.destroy();
        }

        // Data for the line chart
        const lineChartData = {
            labels: ['Users', 'Projects', 'Transactions'],
            datasets: [{
                label: 'Count',
                data: [userTotal, projectTotal, transactionTotal],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false
            }]
        };

        // Options for the line chart
        const lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };

        // Render line chart
        if (lineChartRef.current) {
            const ctx = lineChartRef.current.getContext('2d');
            lineChartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: lineChartData,
                options: lineChartOptions
            });
        }
    }, [userTotal, projectTotal, transactionTotal]);


    // Refs for the chart canvases and chart instances
    const barChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const barChartInstanceRef = useRef(null);
    const pieChartInstanceRef = useRef(null);

    useEffect(() => {
        // Fetch total number of projects
        http.get('/admin/projects/all')
            .then((response) => {
                // Count Crowdfund and Invest projects
                const crowdfundCount = response.data[0].filter(project => project.type === 'Crowdfund').length;
                const investCount = response.data[0].filter(project => project.type === 'Invest').length;
                setProjectCounts({ crowdfund: crowdfundCount, invest: investCount });
                setProjectTotal(response.data[0].length);
    
                // Data for the pie chart
                const pieChartData = {
                    labels: ['Crowdfund', 'Invest'],
                    datasets: [{
                        label: 'Project Types',
                        data: [crowdfundCount, investCount],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1
                    }]
                };
    
                // Options for the pie chart
                const pieChartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                };
    
                // Render pie chart
                if (pieChartRef.current) {
                    const ctx = pieChartRef.current.getContext('2d');
                    pieChartInstanceRef.current = new Chart(ctx, {
                        type: 'pie',
                        data: pieChartData,
                        options: pieChartOptions
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching project counts:', error);
            });
    }, [projectTotal]);
    
    return (
        <div className="h-max overflow-auto">
            <div className="bg-white p-6 rounded-md shadow-md">
                <p className="text-lg font-semibold mb-2">Total Users: {userTotal}</p>
                <p className="text-lg font-semibold mb-2">Total Projects: {projectTotal}</p>
                <p className="text-lg font-semibold mb-2">Total Transactions: {transactionTotal}</p>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md mt-4">
                <canvas ref={lineChartRef} width={400} height={300}></canvas>
            </div>

            <div className="bg-white p-6 rounded-md shadow-md mt-4">
                <canvas ref={pieChartRef} width={400} height={200}></canvas>
            </div>
            <br /><br /><br /><br /><br />
        </div>
    );
}
