import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { FaXmark } from 'react-icons/fa6';
import axios from 'axios';
import AdminNavbar from "../components/AdminNavbar";
import randomColor from 'randomcolor';
import 'chart.js/auto';

const AdminReports = () => {
    const [usersDropDown, setUsersDropDown] = useState([]);
    const [userOptionSelection, setUserOptionSelection] = useState({});
    const [itemsDropDown, setItemsDropDown] = useState([]);
    const [itemOptionSelection, setItemOptionSelection] = useState({});
    const [currentReport, setCurrentReport] = useState("");
    const [checkSubmit, setCheckSubmit] = useState(false);


    // Variables
    const [amountForAllUsers, setAmountForAllUsers] = useState([]);
    const [amountForAllItems, setAmountForAllItems] = useState([]);
    const [amountForOneUser, setAmountForOneUser] = useState([]);
    const [amountForOneItem, setAmountForOneItem] = useState([]);
    const [showOneUserModal, setShowOneUserModal] = useState(false);
    const [userid, setUserid] = useState("");
    const [name, setName] = useState("");
    const [showOneItemModal, setShowOneItemModal] = useState(false);
    const [itemid, setItemid] = useState("");
    const [title, setTitle] = useState("");

    // Data For Total Amount Spent By Each User
    const dataForAllUsers = {
        labels: amountForAllUsers.map((user) => user.firstname),
        datasets: [
            {
                data: amountForAllUsers.map((user) => user.totalamount),
                borderColor: ['#424242'],
                backgroundColor: amountForAllUsers.map((user) => randomColor()),
                pointBackgroundColor: '#424242',
            }
        ]
    }

    // Options For Total Amount Spent By Each User 
    const optionsForAllUsers = {
        plugins: {
            title: {
                display: true,
                text: 'Total Amount Spent By Each User',
                color:'#424242',
                font: {
                    size: 28
                },
                padding:{
                    top: 20,
                    bottom: 20
                },
                responsive:true,
                animation: {
                    animateScale: true,
                }
            },
            scales: {
                x: {
                    offset: true
                },
                y: {
                    offset: true
                }
            }
        }
    }

    // Data For Total Amount Earned From Each Item
    const dataForAllItems = {
        labels: amountForAllItems.map((item) => item.title),
        datasets: [
            {
                data: amountForAllItems.map((item) => item.totalamount),
                borderColor: ['#424242'],
                backgroundColor: amountForAllItems.map((item) => randomColor()),
                pointBackgroundColor: '#424242',
            }
        ]
    }

    // Options For Total Amount Earned From Each Item
    const optionsForAllItems = {
        plugins: {
            title: {
                display: true,
                text: 'Total Amount Earned From Each Item',
                color:'#424242',
                font: {
                    size:28
                },
                padding:{
                    top: 20,
                    bottom: 20
                },
                responsive:true,
                animation: {
                    animateScale: true,
                }
            },
            scales: {
                x: {
                    offset: true
                },
                y: {
                    offset: true
                }
            }
        }
    }

    // Data For Total Amount Spent By One User
    const dataForOneUser = {
        labels: amountForOneUser.map((item) => item.title),
        datasets: [
            {
                data: amountForOneUser.map((item) => item.amount),
                borderColor: ['#424242'],
                backgroundColor: amountForOneUser.map((item) => randomColor()),
                pointBackgroundColor: '#424242',
            }
        ]
    }

    // Options For Total Spent By One User
    const optionsForOneUser = {
        plugins: {
            title: {
                display: true,
                text: `Total Amount Spent By One User`,
                color:'#424242',
                font: {
                    size:28
                },
                padding:{
                    top: 20,
                    bottom: 20
                },
                responsive:true,
                animation: {
                    animateScale: true,
                }
            },
            scales: {
                x: {
                    offset: true
                },
                y: {
                    offset: true
                }
            }
        }
    }


    // Data For Total Amount Earned From One Item
    const dataForOneItem = {
        labels: amountForOneItem.map((item) => item.name),
        datasets: [
            {
                data: amountForOneItem.map((item) => item.amount),
                borderColor: ['#424242'],
                backgroundColor: amountForOneItem.map((item) => randomColor()),
                pointBackgroundColor: '#424242',
            }
        ]
    }

    // Options For Total Earned From One Item
    const optionsForOneItem = {
        plugins: {
            title: {
                display: true,
                text: `Total Amount Earned From One Item`,
                color:'#424242',
                font: {
                    size:28
                },
                padding:{
                    top: 20,
                    bottom: 20
                },
                responsive:true,
                animation: {
                    animateScale: true,
                }
            },
            scales: {
                x: {
                    offset: true
                },
                y: {
                    offset: true
                }
            }
        }
    }

    // Get Total Amount Spent By Each User
    const getAmountForAllUsers = async () => {
        axios.get("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/amountforallusers")
        .then((response) => {
            console.log(response.data);
            setAmountForAllUsers(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    // Get Total Amount Earned From Each Item
    const getAmountForAllItems = async () => {
        axios.get("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/amountforallitems")
        .then((response) => {
            console.log(response.data);
            setAmountForAllItems(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    // Get Total Amount Spent By One User
    const getAmountForOneUser = async () => {
        axios.post('https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/amountforoneuser', {
            userid: userid,
        }).then((response) => {
            console.log(response.data);
            setAmountForOneUser(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    // Get Total Amount Earned From One Item
    const getAmountForOneItem = async () => {
        axios.post('https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/amountforoneitem', {
            itemid: itemid,
        }).then((response) => {
            console.log(response.data);
            setAmountForOneItem(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }


    // Get All Users and Items
    useEffect(() => {
        const getAllUsers = async () => {
            axios.get("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/users")
            .then((response) => {
                console.log(response.data)
                setUsersDropDown(response.data)
            }).catch((error) => {
                console.log(error);
            })
        }

        const getAllItems = async () => {
            axios.get("https://library-server-cosc3380-ee2497c0e61e.herokuapp.com/available")
            .then((response) => {
                console.log(response.data);
                setItemsDropDown(response.data);
            }).catch((error) => {
                console.log(error);
            })
        }

        getAllUsers();
        getAllItems();
    }, []);

    return (
        <div>
            <AdminNavbar />
            <div className="flex flex-col gap-6 mx-6">
                <p className="text-lg"> Reports </p>
                <div className="flex flex-col items-center justify-center w-full gap-6 p-10 bg-white border-4 border-gray-200 rounded-lg">
                    <button onClick={() => {
                        setCurrentReport("Report One")
                        getAmountForAllUsers()
                    }} className={`w-1/2 h-10 px-2 text-white ${currentReport === "Report One" ? "bg-blue-500" : "bg-gray-400"} rounded-md`}> Total Amount Spent By Each User </button>


                    
                    <button onClick={() => {
                        setCurrentReport("Report Two")
                        getAmountForAllItems()
                    }} className={`w-1/2 h-10 px-2 text-white ${currentReport === "Report Two" ? "bg-blue-500" : "bg-gray-400"} rounded-md`}> Total Amount Earned From Each Item </button>


                    <button onClick={() => {
                        setCurrentReport("Report Three")
                        setCheckSubmit(false);
                        setShowOneUserModal(true)
                    }} className={`w-1/2 h-10 px-2 text-white ${currentReport === "Report Three" ? "bg-blue-500" : "bg-gray-400"} rounded-md`}> Total Amount Spent By One User  </button>


                    <button onClick={() => {
                        setCurrentReport("Report Four")
                        setCheckSubmit(false);
                        setShowOneItemModal(true)
                    }} className={`w-1/2 h-10 px-2 text-white ${currentReport === "Report Four" ? "bg-blue-500" : "bg-gray-400"} rounded-md`}> Total Amount Earned From One Item </button>
                </div>
            </div>

            {/* Content For Total Amount Spent By Each User */}
            {currentReport === "Report One" && amountForAllUsers.length > 0 && (
                <div className="mx-6 mt-6">
                    <p className="my-6 text-lg"> Results </p>
                    <div className="flex flex-col items-center justify-center p-10 border-4 border-gray-200 rounded-lg">
                        <div className="w-2/5">
                            <Doughnut data={dataForAllUsers} options={optionsForAllUsers}/>
                        </div>
                        <div className="w-full my-6">
                            {amountForAllUsers.map((user) => (
                                <div className="flex items-center justify-between w-full my-6 bg-gray-200">
                                    <div className="w-1/5">
                                        <p> {user.userid.substring(0, 19) + "..."}</p>
                                    </div>
                                    <div className="flex items-center justify-center w-1/5">
                                        <p> {user.firstname}</p>
                                    </div>
                                    <div className="flex items-center justify-end w-1/5">
                                        <p> {user.totalamount === null ? 0 : user.totalamount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Content For Total Amount Earned From Each Item */}
            {currentReport === "Report Two" && amountForAllItems.length > 0 && (
                <div className="mx-6 mt-6">
                    <p className="my-6 text-lg"> Results </p>
                    <div className="flex flex-col items-center justify-center p-10 border-4 border-gray-200 rounded-lg">
                        <div className='w-2/5'>
                            <Doughnut data={dataForAllItems} options={optionsForAllItems}/>
                        </div>
                        <div className="w-full my-6">
                            {amountForAllItems.map((item) => (
                                <div className="flex items-center justify-between w-full my-6 bg-gray-200">
                                    <div className="w-1/5">
                                        <p> {item.itemid.substring(0, 19) + "..."}</p>
                                    </div>
                                    <div className="flex items-center justify-center w-1/5">
                                        <p> {item.title}</p>
                                    </div>
                                    <div className="flex items-center justify-end w-1/5">
                                        <p> {item.totalamount === null ? 0 : item.totalamount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Content For Total Amount Spent By One User */}
            {currentReport === "Report Three" && amountForOneUser.length > 0 && (
                <div className="mx-6 mt-6">
                    <p className="my-6 text-lg"> Results </p>
                    <div className="flex flex-col items-center justify-center p-10 border-4 border-gray-200 rounded-lg">
                        <div className='w-2/5'>
                            <Doughnut data={dataForOneUser} options={optionsForOneUser}/>
                        </div>
                        <div className='flex w-full my-6'>
                            <p> {"Results for " + name}  </p>
                        </div>
                        <div className="w-full">
                            {amountForOneUser.map((item) => (
                                <div className="flex items-center justify-between w-full my-6 bg-gray-200">
                                    <div className="w-1/5">
                                        <p> {item.itemid.substring(0, 19) + "..."}</p>
                                    </div>
                                    <div className="flex items-center justify-center w-1/5">
                                        <p> {item.title}</p>
                                    </div>
                                    <div className="flex items-center justify-end w-1/5">
                                        <p> {item.amount === null ? 0 : item.amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {currentReport === "Report Three" && checkSubmit === true && amountForOneUser.length === 0 && (
                <div className='flex items-center justify-center w-full h-20'>
                    <p> No Data For This User </p> 
                </div>
            )}

            {/* Content For Total Amount Earned From One Item */}
            {currentReport === "Report Four" && amountForOneItem.length > 0 && (
                <div className="mx-6 mt-6">
                    <p className="my-6 text-lg"> Results </p>
                    <div className="flex flex-col items-center justify-center p-10 border-4 border-gray-200 rounded-lg">
                        <div className='w-2/5'>
                            <Doughnut data={dataForOneItem} options={optionsForOneItem}/>
                        </div>
                        <div className='flex w-full my-6'>
                            <p> {"Results for " + title}  </p>
                        </div>
                        <div className="w-full">
                            {amountForOneItem.map((item) => (
                                <div className="flex items-center justify-between w-full my-6 bg-gray-200">
                                    <div className="w-1/5">
                                        <p> {item.borrowerid.substring(0, 19) + "..."}</p>
                                    </div>
                                    <div className="flex items-center justify-center w-1/5">
                                        <p> {item.name}</p>
                                    </div>
                                    <div className="flex items-center justify-end w-1/5">
                                        <p> {item.amount === null ? 0 : item.amount}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {currentReport === "Report Four" && checkSubmit === true && amountForOneItem.length === 0 && (
                <div className='flex items-center justify-center w-full h-20'>
                    <p> No Data For This Item </p> 
                </div>
            )}

        

            {/* One User Modal */}
            {showOneUserModal && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
                    <div className="flex flex-col items-center justify-center w-1/3 pb-10 bg-white bg-opacity-100 rounded-lg">
                        <div className="flex justify-end w-full p-4">
                            <FaXmark size={25} color="black" onClick={() => setShowOneUserModal(false)} className="hover:cursor-pointer"/>
                        </div>

                        <div className="flex flex-col my-4">
                            <label htmlFor='userdropdown'> Select A User: </label>
                            <select id="userdropdown" value={userOptionSelection} onChange={(event) => {
                                const selected = JSON.parse(event.target.value);
                                setUserOptionSelection(event.target.value);
                                setName(selected.firstname);
                                setUserid(selected.userid);
                            }}>
                                {usersDropDown.map((option) => (
                                    <option key={option.userid} value={JSON.stringify(option)}>
                                        {option.firstname + " : " + option.userid}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={() => {
                            getAmountForOneUser();
                            setShowOneUserModal(false);
                            setCheckSubmit(true);
                        }} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md"> Submit </button>
                    </div>
                </div>
            )}

            {/* One Item Modal */}
            {showOneItemModal && (
                <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-40">
                    <div className="flex flex-col items-center justify-center w-1/3 pb-10 bg-white bg-opacity-100 rounded-lg">
                        <div className="flex justify-end w-full p-4">
                            <FaXmark size={25} color="black" onClick={() => setShowOneItemModal(false)} className="hover:cursor-pointer"/>
                        </div>
                        
                        <div className="flex flex-col my-4">
                            <label htmlFor='itemdropdown'> Select An Item: </label>
                            <select id="itemdropdown" value={itemOptionSelection} onChange={(event) => {
                                const selected = JSON.parse(event.target.value);
                                setItemOptionSelection(event.target.value);
                                setTitle(selected.title);
                                setItemid(selected.itemid);
                            }}>
                                {itemsDropDown.map((option) => (
                                    <option key={option.itemid} value={JSON.stringify(option)}>
                                        {option.title+ " : " + option.itemid}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button onClick={() => {
                            getAmountForOneItem();
                            setShowOneItemModal(false);
                            setCheckSubmit(true);
                        }} className="w-3/4 h-10 px-2 my-2 text-white bg-blue-500 rounded-md"> Submit </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminReports