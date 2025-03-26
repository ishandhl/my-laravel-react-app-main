import React, { useEffect, useState } from "react";
import AuthUser from "../Authentication/AuthUser";
import { Link } from "react-router-dom";

export default function Post_Pledge() {
  const { http, khalti } = AuthUser();
  const [transactionID, setTransactionID] = useState('');
  const [amount, setTotalAmount] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const pidx = urlParams.get('pidx');
  const userID = urlParams.get('purchase_order_id').split('_')[1];
  const projectID = urlParams.get('purchase_order_id').split('_')[3];
  const rewardID = urlParams.get('purchase_order_id').split('_')[5];

  console.log(urlParams)
  //fix all those above to states, use the information from below post !
  useEffect(() => {
    khalti.post('/epayment/lookup/', {
      pidx: pidx
    }).then((response) => {
      setTotalAmount(response.data.total_amount);
      setTransactionID(response.data.transaction_id);
    }).catch((error) => {
      console.log(error);
    });

    http.post('/transaction/add', {
      transaction_id: transactionID,
      transction_date: new Date().toLocaleDateString('eu-EU'),
      user_id: userID,
      project_id: projectID,
      amount: amount / 100,
      reward_id: rewardID
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <section className="relative z-10 bg-primary py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[400px] text-center text-yellow-500">
              <h2 className="mb-2 text-[50px] font-bold leading-none">
                Success!
              </h2>
              <h4 className="mb-3 text-[22px] font-semibold leading-tight">
                Thank you for backing the project!
              </h4>
              <p className="mb-8 text-lg">
                Your pledge is appreciated greatly by our team at Diyo and the project creators!
              </p>
              <h7>
                You can view the updates about the project (and rewards if any) in the involved projects page.
              </h7>
              <div className="bg-white-700 p-4 rounded">
                <p className="font-bold text-3xl">Pledged Amount Rs.{amount / 100}</p>
              </div>
              <div className="bg-white-700 p-4 rounded">
                <Link to="/" className="bg-yellow-500 hover:bg-blue-600 text-white px-4 py-2 rounded opacity-90">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />

      <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
        <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
        <div className="flex h-full w-1/3">
          <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
          <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
        </div>
        <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
      </div>
    </section>
  );
}
