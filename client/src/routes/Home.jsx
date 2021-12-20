import React from "react";
import hero from "../assets/hero.jpg";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <header className="relative  overflow-hidden min-h-screen">
                <div className="px-4 sm:px-6 md:px-8">
                    <div className="absolute inset-0 bottom-0 bg-gray-50">
                        <img
                            src={hero}
                            alt=""
                            className="absolute bottom-0 left-1/2 w-[150rem] ml-[-75rem] max-w-none h-[100rem]"
                        />
                    </div>
                    <div className="relative pt-6 lg:pt-8 flex items-center justify-between text-gray-700 font-semibold text-sm leading-6">
                        <div className="font-bold text-black text-3xl">
                            CitizenV
                        </div>
                        <div className="flex items-center">
                            <nav className="">
                                <ul className="flex items-center space-x-8">
                                    <li>
                                        
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
                        <h1 className="text-gray-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center">
                            Hệ thống điều tra dân số toàn quốc
                        </h1>
                        <p className="mt-6 text-lg text-gray-600 text-center max-w-3xl mx-auto">
                            Ứng dụng điều tra dân số với nhiều tính năng như{" "}
                            <span className="font-medium text-sky-500">
                                khai báo
                            </span>
                            ,{" "}
                            <span className="font-medium text-sky-500">
                                quản lý
                            </span>{" "}
                            và {/* */}{" "}
                            <span className=" font-medium text-sky-500">
                                phân tích số liệu
                            </span>{" "}
                            phục vụ công tác điều tra dân số trên toàn quốc
                        </p>
                        <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
                            <Link
                                className="bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center w-full max-w-xl"
                                to="/login"
                            >
                                Bắt đầu
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Home;




