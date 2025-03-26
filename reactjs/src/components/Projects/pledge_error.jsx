import React from "react";
import { Link } from "react-router-dom";

export default function Pledge_Error() {
    return (
        <section className="relative z-10 bg-primary py-[120px]">
            <div className="container mx-auto">
                <div className="-mx-4 flex">
                    <div className="w-full px-4">
                        <div className="mx-auto max-w-[400px] text-center">
                            <h2 className="mb-2 text-[50px] font-bold leading-none">

                                ERROR!
                            </h2>
                            <h4 className="mb-3 text-[22px] font-semibold leading-tight">
                                Transaction wasn't successful!
                            </h4>
                            <p className="mb-8 text-lg">
                                Sorry for the inconvenience, please try again.
                            </p>
                            <Link
                                to="/"
                                className="inline-block rounded-lg border border-black px-8 py-3 text-center bg-yellow-300 text-base font-semibold text-gray-600 transition hover:bg-white hover:text-primary"
                            >
                                Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

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
};
