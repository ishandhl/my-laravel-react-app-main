import React, { useState, useEffect, useRef } from 'react';
import AuthUser from '../Authentication/AuthUser';
import Chart from 'chart.js/auto';

export default function EnhancedDashboard() {
  const { http } = AuthUser();

  const [userTotal, setUserTotal] = useState(0);
  const [projectTotal, setProjectTotal] = useState(0);
  const [transactionTotal, setTransactionTotal] = useState(0);
  const [projectCounts, setProjectCounts] = useState({ crowdfund: 0, invest: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Refs for the chart canvases and chart instances
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const barChartInstanceRef = useRef(null);
  const pieChartInstanceRef = useRef(null);
  const lineChartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch all data in parallel
        const [usersResponse, projectsResponse, transactionsResponse] = await Promise.all([
          http.get('/admin/users/total'),
          http.get('/admin/projects/all'),
          http.get('/admin/transactions/total')
        ]);

        setUserTotal(usersResponse.data);
        
        const projects = projectsResponse.data[0];
        setProjectTotal(projects.length);
        
        // Count Crowdfund and Invest projects
        const crowdfundCount = projects.filter(project => project.type === 'Crowdfund').length;
        const investCount = projects.filter(project => project.type === 'Invest').length;
        setProjectCounts({ crowdfund: crowdfundCount, invest: investCount });
        
        setTransactionTotal(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create/update charts when data is available
  useEffect(() => {
    if (isLoading) return;

    // Function to destroy charts if they exist
    const destroyCharts = () => {
      if (barChartInstanceRef.current) {
        barChartInstanceRef.current.destroy();
      }
      if (pieChartInstanceRef.current) {
        pieChartInstanceRef.current.destroy();
      }
    };

    // Create bar chart
    const createBarChart = () => {
      if (!barChartRef.current) return;

      const ctx = barChartRef.current.getContext('2d');
      barChartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Users', 'Projects', 'Transactions'],
          datasets: [{
            label: 'Platform Statistics',
            data: [userTotal, projectTotal, transactionTotal],
            backgroundColor: [
              'rgba(59, 130, 246, 0.7)', // blue-500
              'rgba(16, 185, 129, 0.7)', // emerald-500
              'rgba(139, 92, 246, 0.7)'  // violet-500
            ],
            borderColor: [
              'rgba(59, 130, 246, 1)', 
              'rgba(16, 185, 129, 1)', 
              'rgba(139, 92, 246, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                display: true,
                color: 'rgba(0, 0, 0, 0.05)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    };

    // Create pie chart
    const createPieChart = () => {
      if (!pieChartRef.current) return;

      const ctx = pieChartRef.current.getContext('2d');
      pieChartInstanceRef.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Crowdfund Projects', 'Investment Projects'],
          datasets: [{
            data: [projectCounts.crowdfund, projectCounts.invest],
            backgroundColor: [
              'rgba(251, 113, 133, 0.8)', // rose-400
              'rgba(250, 204, 21, 0.8)'   // yellow-400
            ],
            borderColor: [
              'rgba(251, 113, 133, 1)',
              'rgba(250, 204, 21, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    };

    // Destroy existing charts and create new ones
    destroyCharts();
    createBarChart();
    createPieChart();

    // Cleanup function
    return () => {
      destroyCharts();
    };
  }, [userTotal, projectTotal, transactionTotal, projectCounts, isLoading]);

  // Calculate growth percentages (replace with real data if available)
  const userGrowth = 12.5;
  const projectGrowth = 8.3;
  const transactionGrowth = 15.7;

  return (
    <div className="h-screen overflow-auto bg-gray-100">
      {/* Top navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-blue-500 text-white mr-4">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-semibold text-gray-900">{userTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${userGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {userGrowth >= 0 ? '↑' : '↓'} {Math.abs(userGrowth)}%
                    </span>
                    <span className="ml-2 text-sm text-gray-500">from last month</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-emerald-50 to-emerald-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-emerald-500 text-white mr-4">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Projects</p>
                      <p className="text-2xl font-semibold text-gray-900">{projectTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${projectGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {projectGrowth >= 0 ? '↑' : '↓'} {Math.abs(projectGrowth)}%
                    </span>
                    <span className="ml-2 text-sm text-gray-500">from last month</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-violet-50 to-violet-100">
                  <div className="flex items-center">
                    <div className="p-3 rounded-full bg-violet-500 text-white mr-4">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                      <p className="text-2xl font-semibold text-gray-900">{transactionTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transactionGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {transactionGrowth >= 0 ? '↑' : '↓'} {Math.abs(transactionGrowth)}%
                    </span>
                    <span className="ml-2 text-sm text-gray-500">from last month</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Growth Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-base font-medium text-gray-700 mb-2">User Acquisition</h3>
                <p className="text-3xl font-bold text-blue-600">{userGrowth}%</p>
                <p className="text-sm text-gray-500 mt-1">Monthly growth rate</p>
                <div className="mt-4 h-16 flex items-end space-x-1">
                  {[40, 30, 60, 70, 50, 65, 75].map((value, i) => (
                    <div 
                      key={i} 
                      className="bg-blue-500 rounded-t w-full"
                      style={{height: `${value}%`}}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-base font-medium text-gray-700 mb-2">Project Creation</h3>
                <p className="text-3xl font-bold text-emerald-600">{projectGrowth}%</p>
                <p className="text-sm text-gray-500 mt-1">Monthly growth rate</p>
                <div className="mt-4 h-16 flex items-end space-x-1">
                  {[30, 40, 35, 45, 55, 50, 60].map((value, i) => (
                    <div 
                      key={i} 
                      className="bg-emerald-500 rounded-t w-full"
                      style={{height: `${value}%`}}
                    ></div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-base font-medium text-gray-700 mb-2">Transaction Volume</h3>
                <p className="text-3xl font-bold text-violet-600">{transactionGrowth}%</p>
                <p className="text-sm text-gray-500 mt-1">Monthly growth rate</p>
                <div className="mt-4 h-16 flex items-end space-x-1">
                  {[50, 60, 70, 65, 80, 75, 90].map((value, i) => (
                    <div 
                      key={i} 
                      className="bg-violet-500 rounded-t w-full"
                      style={{height: `${value}%`}}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Platform Statistics</h2>
                <div className="h-64">
                  <canvas ref={barChartRef}></canvas>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Project Distribution</h2>
                <div className="h-64">
                  <canvas ref={pieChartRef}></canvas>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-center p-2 bg-rose-50 rounded-lg">
                    <div className="w-3 h-3 bg-rose-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">Crowdfund:</span>
                    <span className="ml-1 text-sm text-gray-900 font-semibold">{projectCounts.crowdfund}</span>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-yellow-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                    <span className="text-sm font-medium text-gray-700">Investment:</span>
                    <span className="ml-1 text-sm text-gray-900 font-semibold">{projectCounts.invest}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}