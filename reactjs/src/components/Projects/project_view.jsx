import React, { useEffect, useState } from "react";
import AuthUser from "../Authentication/AuthUser";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProjectChatbot from '../Projects/ProjectChatbot';



export default function Project_View() {
  const { user, http, khalti } = AuthUser();
  const project_id = window.location.pathname.split("/")[2];
  const [project, setProject] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModalDonate, setShowModalDonate] = useState(false);
  const [showModalInvest, setShowModalInvest] = useState(false);
  const [amount, setAmount] = useState(0);
  const [reportModal, setReportModal] = useState(false);
  const [report, setReport] = useState("");
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    http
      .get(`/project/${project_id}`)
      .then((response) => {
        console.log(response.data.project[0]);
        setProject(response.data.project[0]);
      })
      .catch((error) => {
        console.error(error);
      });

    http
      .get(`/user/project/${project_id}/updates`)
      .then((response) => {
        setUpdates(response.data.project_updates);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % project.images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + project.images.length) % project.images.length
    );
  };

  const redirectToLogin = () => {
    navigate("/login");
  };

  const InitiatePaymentCrowdfund = () => {
    if (!user) {
      redirectToLogin();
      return;
    }
    setShowModalDonate(true);
  };

  const InitiatePaymentInvest = () => {
    if (!user) {
      redirectToLogin();
      return;
    }
    setShowModalInvest(true);
  };

  const CreateReport = () => {
    setReportModal(true);
  };

  const crowdfundPay = () => {
    khalti
      .post("epayment/initiate/", {
        return_url: "http://localhost:3000/payment/",
        website_url: "http://localhost:3000/",
        amount: amount * 100,
        purchase_order_id:
          "userid_" + user.id + "_projectid_" + project.projectID,
        purchase_order_name: "donation_" + project.project_title,
        customer_info: {
          name: user.name,
          email: user.email,
          phone: "9800000123",
        },
      })
      .then((response) => {
        window.location.href = response.data.payment_url;
      })
      .catch((error) => {
        toast.error("Enter Valid Amount");
      });
  };

  const investPay = (reward) => {
    const rewardID = reward.rewardID;

    khalti
      .post("epayment/initiate/", {
        return_url: "http://localhost:3000/payment/",
        website_url: "http://localhost:3000/",
        amount: reward.minimumamount * 100,
        purchase_order_id:
          "userid_" +
          user.id +
          "_projectid_" +
          project.projectID +
          "_rewarded_" +
          rewardID,
        purchase_order_name: "rewarded_" + project.project_title,
        customer_info: {
          name: user.name,
          email: user.email,
          phone: "9800000123",
        },
      })
      .then((response) => {
        window.location.href = response.data.payment_url;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReportSubmit = () => {
    http
      .post("/report/add", {
        project_id: project_id,
        user_id: user.id,
        report: report,
      })
      .then((response) => {
        console.log(response.data);
        toast.success("Report submitted successfully");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to submit report. Please try again.");
      });
    setReportModal(false);
  };

  const fundingPercentage = (
    (parseFloat(project.total_amount_raised) /
      parseFloat(project.funding_goal)) *
    100
  ).toFixed(2);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {project.project_title}
              </h1>
              <p className="text-lg text-blue-100">
                {project.short_description}
              </p>
            </div>
            <button
              onClick={CreateReport}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 transform hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                  clipRule="evenodd"
                />
              </svg>
              Report
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl">
              <div className="relative h-72 sm:h-96 w-full">
                {project.images && project.images.length > 0 && (
                  <img
                    src={`http://localhost:8000/${project.images[currentImageIndex].image}`}
                    alt="Project"
                    className="object-cover w-full h-full"
                  />
                )}

                {/* Image Navigation */}
                {project.images && project.images.length > 1 && (
                  <>
                    <button
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
                      onClick={handlePrevImage}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200"
                      onClick={handleNextImage}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Navigation */}
              {project.images && project.images.length > 1 && (
                <div className="flex overflow-x-auto p-2 bg-gray-50 gap-2">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-blue-500 scale-105"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={`http://localhost:8000/${image.image}`}
                        alt={`Thumbnail ${index}`}
                        className="h-16 w-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Funding Details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-xl h-full">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Funding Progress
                </h2>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {project.type === "Invest" ? "Investment" : "Crowdfunding"}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-3xl font-bold text-gray-800">
                    Rs. {project.total_amount_raised}
                  </span>
                  <span className="text-lg font-medium text-gray-500">
                    of Rs. {project.funding_goal}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 mb-2">
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                      style={{ width: `${Math.min(fundingPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="font-medium text-blue-600">
                    {fundingPercentage}% funded
                  </p>
                  <p className="text-gray-500">
                    Goal: Rs. {project.funding_goal}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">Backers</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {project.total_transactions}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-500 text-sm mb-1">Ends On</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {project.end_date}
                  </p>
                </div>
              </div>

              {project.status === "Running" ? (
                <div className="mt-6">
                  {project.type === "Invest" ? (
                    <button
                      onClick={InitiatePaymentInvest}
                      className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
                          clipRule="evenodd"
                        />
                        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                      </svg>
                      Select a Reward
                    </button>
                  ) : (
                    <button
                      onClick={InitiatePaymentCrowdfund}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path
                          fillRule="evenodd"
                          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Support this Project
                    </button>
                  )}

                  {/* Top Supporters Section */}
                  {project.top_three_donors && (
                    <div className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm mb-4 mt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-100 p-1 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="font-medium text-sm text-blue-700">
                          Top Supporters
                        </h3>
                        {project.total_amount_raised && (
                          <span className="text-xs text-blue-500 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                            Total: Rs.{" "}
                            {typeof project.total_amount_raised === "number"
                              ? project.total_amount_raised.toFixed(2)
                              : project.total_amount_raised}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {Object.entries(project.top_three_donors)
                          .filter(([key]) => !isNaN(parseInt(key)))
                          .sort(
                            (a, b) => Number(b[1].amount) - Number(a[1].amount)
                          ) // Sort by amount descending
                          .map(([_, donor], index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center bg-blue-50 p-2 rounded-md"
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`${
                                    index === 0
                                      ? "bg-blue-200 text-blue-800"
                                      : "bg-blue-100 text-blue-700"
                                  } w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold`}
                                >
                                  {index === 0
                                    ? "1st"
                                    : index === 1
                                    ? "2nd"
                                    : "3rd"}
                                </span>
                                <p className="font-medium text-sm text-gray-800">
                                  {donor.name}
                                </p>
                              </div>
                              <p className="font-bold text-sm text-blue-600">
                                Rs. {Number(donor.amount).toFixed(2)}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="mt-6 p-5 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-red-600 font-medium flex items-center gap-2 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Project is no longer active
                  </p>
                  <p className="text-red-500 ml-7">
                    Current status: {project.status}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Description */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            About This Project
          </h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg">
              {project.description}
            </p>
          </div>
        </div>

        {/* Updates Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Progress and Updates
          </h2>

          {updates && updates.length > 0 ? (
            <div className="space-y-6">
              {updates.map((update, index) => (
                <div
                  key={index}
                  className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-400"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {update.created_at.split("T")[0]}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {update.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              <p className="text-gray-500 text-lg">No updates available yet</p>
            </div>
          )}
        </div>

        {/* Donate Modal */}
        {showModalDonate && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
                onClick={() => setShowModalDonate(false)}
              ></div>

              <div className="bg-white rounded-xl overflow-hidden shadow-2xl transform transition-all max-w-lg w-full z-10 border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5">
                  <h3 className="text-xl font-bold text-white">
                    Support this Project
                  </h3>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold mb-4 text-gray-800">
                    {project.project_title}
                  </h4>

                  <div className="mb-6">
                    <label
                      htmlFor="donation-enter"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Enter Amount (Rs):
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">Rs.</span>
                      </div>
                      <input
                        type="number"
                        id="donation-enter"
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg pl-10 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-8">
                    <button
                      onClick={() => setShowModalDonate(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={crowdfundPay}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg flex items-center gap-2 transition-all shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Pay with Khalti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invest Modal */}
        {showModalInvest && (
          <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
              <div
                className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
                onClick={() => setShowModalInvest(false)}
              ></div>

              <div className="bg-white rounded-xl overflow-hidden shadow-2xl transform transition-all max-w-3xl w-full z-10 border border-gray-100">
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-5">
                  <h3 className="text-xl font-bold text-white">
                    Select Your Reward
                  </h3>
                </div>

                <div className="p-6 max-h-96 overflow-y-auto">
                  {project.rewards && project.rewards.length > 0 ? (
                    <div className="space-y-6">
                      {project.rewards.map((reward, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/3 flex-shrink-0">
                              <img
                                src={`http://localhost:8000/${reward.reward_image}`}
                                alt={reward.title}
                                className="w-full h-40 object-cover rounded-lg shadow-md"
                              />
                            </div>

                            <div className="md:w-2/3">
                              <h4 className="text-xl font-bold mb-2 text-gray-800">
                                {reward.title}
                              </h4>
                              <p className="text-gray-600 mb-4">
                                {reward.description}
                              </p>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Contribution
                                  </p>
                                  <p className="font-bold text-lg text-gray-800">
                                    Rs. {reward.minimumamount}
                                  </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                  <p className="text-sm text-gray-500">
                                    Estimated Delivery
                                  </p>
                                  <p className="font-bold text-lg text-gray-800">
                                    {reward.estimated_delivery}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => investPay(reward)}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md transform hover:scale-105"
                              >
                                Get This Reward
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mx-auto text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <p className="text-gray-500 text-lg mt-4">
                        No rewards are available for this project.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 p-4 flex justify-end">
                  <button
                    onClick={() => setShowModalInvest(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2 text-start">
                    Create a Report
                  </h3>
                  <div className="mb-4">
                    <label htmlFor="report" className="block  text-start">
                      Report:
                    </label>
                    <textarea
                      id="report"
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      rows="4"
                      placeholder="Enter your report here..."
                      onChange={(e) => setReport(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleReportSubmit}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit Report
                  </button>
                  <button
                    type="button"
                    onClick={() => setReportModal(false)}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <ProjectChatbot />
          </div>
        )}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <ProjectChatbot />
    </div>
  );
}
