import React, { useContext, useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot, MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { GiFamilyHouse, GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../Context/AuthContext';
import { listingDataContext } from '../Context/ListingContext';
import { userDataContext } from "../Context/UserContext";
import axios from 'axios';

function Nav() {
    const [showpopup, setShowpopup] = useState(false);
    const [cate, setCate] = useState();
    const [input, setInput] = useState("");

    const navigate = useNavigate();

    const { userData, getCurrentUser } = useContext(userDataContext);
    const { serverUrl, setCurrentUser } = useContext(authDataContext);

    const {
        listingData,
        setNewListData,
        searchData,
        handleSearch,
        handleViewCard
    } = useContext(listingDataContext);

    const handleLogOut = async () => {
        try {
            await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
            setCurrentUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleCategory = (category) => {
        setCate(category);
        if (category === "trending") {
            setNewListData(listingData);
        } else {
            setNewListData(listingData.filter((list) => list.category === category));
        }
    };

    const handleClick = (id) => {
        if (userData) {
            handleViewCard(id);
        } else {
            navigate("/login");
        }
    };

    useEffect(() => {
        handleSearch(input);
    }, [input]);

    return (
        <div className='fixed top-0 bg-white z-[20] w-full'>
            <div className='w-full min-h-[80px] border-b border-[#dcdcdc] px-5 flex items-center justify-between md:px-10'>
                <img src={logo} alt="Logo" className='w-[130px]' />

                {/* Search Input */}
                <div className='w-[35%] relative hidden md:block'>
                    <input
                        type="text"
                        className='w-full px-[30px] py-[10px] border-2 border-[#bdbaba] outline-none rounded-[30px] text-[17px]'
                        placeholder='Any Where | Any Location | Any City'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <button className='absolute p-2 rounded-full bg-red-600 right-2 top-[5px]'>
                        <FiSearch className='w-5 h-5 text-white' />
                    </button>
                </div>

                {/* Profile */}
                <div className='flex items-center gap-2 relative'>
                    <span
                        className='text-[18px] cursor-pointer rounded-full hover:bg-gray-200 px-2 py-1 hidden md:block'
                        onClick={() => navigate("/listingpage1")}
                    >
                        List your home
                    </span>
                    <button
                        className='px-4 py-2 flex items-center gap-2 border border-gray-500 rounded-full hover:shadow-lg'
                        onClick={() => setShowpopup(prev => !prev)}
                    >
                        <GiHamburgerMenu className='w-5 h-5' />
                        {userData ? (
                            <span className='w-8 h-8 bg-black text-white rounded-full flex items-center justify-center uppercase'>
                                {userData?.name?.slice(0, 1)}
                            </span>
                        ) : (
                            <CgProfile className='w-6 h-6' />
                        )}
                    </button>

                    {/* Dropdown */}
                    {showpopup && (
                        <div className='w-[220px] absolute bg-slate-50 top-[110%] right-0 border border-gray-400 rounded-lg z-10'>
                            <ul className='text-[17px] py-2'>
                                {!userData && (
                                    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/login"); setShowpopup(false) }}>
                                        Login
                                    </li>
                                )}
                                {userData && (
                                    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { handleLogOut(); setShowpopup(false) }}>
                                        Logout
                                    </li>
                                )}
                                <div className='h-px bg-gray-300 mx-2 my-1' />
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/listingpage1"); setShowpopup(false) }}>
                                    List your Home
                                </li>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/mylisting"); setShowpopup(false) }}>
                                    My Listing
                                </li>
                                <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/mybooking"); setShowpopup(false) }}>
                                    My Booking
                                </li>
                                {userData?.isAdmin && (
                                    <li className='px-4 py-2 hover:bg-gray-100 cursor-pointer' onClick={() => { navigate("/admin"); setShowpopup(false) }}>
                                        Admin Dashboard
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Search */}
            <div className='w-full h-[60px] flex items-center justify-center md:hidden'>
                <div className='w-[80%] relative'>
                    <input
                        type="text"
                        className='w-full px-[30px] py-[10px] border-2 border-[#bdbaba] outline-none rounded-[30px] text-[17px]'
                        placeholder='Any Where | Any Location | Any City'
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <button className='absolute p-2 rounded-full bg-red-600 right-2 top-[5px]'>
                        <FiSearch className='w-5 h-5 text-white' />
                    </button>
                </div>
            </div>

            {/* Search Result Overlay */}
            {searchData?.length > 0 && (
                <div className='w-full h-[450px] flex flex-col gap-4 absolute top-[50%] overflow-auto left-0 items-center'>
                    <div className='max-w-[700px] w-full h-[300px] bg-white p-5 rounded-lg border border-gray-400 cursor-pointer'>
                        {searchData.map(search => (
                            <div className='border-b p-2' key={search._id} onClick={() => handleClick(search._id)}>
                                {search.title} in {search.landMark}, {search.city}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Category Bar */}
            <div className='w-full h-[85px] bg-white flex items-center gap-10 overflow-auto md:justify-center px-4'>
                <CategoryIcon label="Trending" icon={<MdWhatshot />} onClick={() => handleCategory("trending")} active={cate === ""} />
                <CategoryIcon label="Villa" icon={<GiFamilyHouse />} onClick={() => handleCategory("villa")} active={cate === "villa"} />
                <CategoryIcon label="Farm House" icon={<FaTreeCity />} onClick={() => handleCategory("farmHouse")} active={cate === "farmHouse"} />
                <CategoryIcon label="Pool House" icon={<MdOutlinePool />} onClick={() => handleCategory("poolHouse")} active={cate === "poolHouse"} />
                <CategoryIcon label="Rooms" icon={<MdBedroomParent />} onClick={() => handleCategory("rooms")} active={cate === "rooms"} />
                <CategoryIcon label="Flat" icon={<BiBuildingHouse />} onClick={() => handleCategory("flat")} active={cate === "flat"} />
                <CategoryIcon label="PG" icon={<IoBedOutline />} onClick={() => handleCategory("pg")} active={cate === "pg"} />
                <CategoryIcon label="Cabins" icon={<GiWoodCabin />} onClick={() => handleCategory("cabin")} active={cate === "cabin"} />
                <CategoryIcon label="Shops" icon={<SiHomeassistantcommunitystore />} onClick={() => handleCategory("shops")} active={cate === "shops"} />
            </div>
        </div>
    );
}

// Reusable component for category icons
function CategoryIcon({ label, icon, onClick, active }) {
    return (
        <div
            className={`flex flex-col items-center text-[13px] cursor-pointer ${active ? 'border-b-2 border-black' : 'hover:border-b border-gray-400'}`}
            onClick={onClick}
        >
            <div className='w-[30px] h-[30px] text-black'>{icon}</div>
            <h3>{label}</h3>
        </div>
    );
}

export default Nav;
