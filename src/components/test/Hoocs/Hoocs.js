import React, { useState, useContext, useEffect, useRef } from "react";
import * as ReactDOM from 'react-dom';


let cnt = 0;
let lrt = null;


import { MyContext} from "@components/Pages/Index/MainPage";
import Axios from "axios";

import {axiosInstance} from "@redux/api/ApiService/ApiService";

const qq = axiosInstance.getAxiosApi().CancelToken.source();
//console.log(qq);

const tt = axiosInstance.getCancelSource();
//console.log(tt);



// const getServerData = () => {
//     const [userData, setUserData] = useState(null);
//     const [isDataFetched, setFetchingStatus] = useState(false);
//
//     let cancelToken = null;
//
//     const fetchSomeData = () => {
//         cancelToken = Axios.CancelToken.source();
//
//         setFetchingStatus(true);
//         setUserData(null);
//
//         Axios.get("api/index", {
//             cancelToken: cancelToken.token
//         }).then(data => {
//             setFetchingStatus(false);
//             setUserData(data.firstName);
//         });
//     };
//
//     const cancelRequest = () => {
//         cancelToken.cancel();
//     };
//
//     return (
//         <div>
//             {
//                 isDataFetched
//                 &&
//                 <div>
//                     <h1>WAITING</h1>
//                     <div><button onClick={cancelRequest}>Cancel request</button></div>
//                 </div>
//             }
//             <p>{ userData && userData.toString()}</p>
//             <p>
//                 <button onClick={fetchSomeData}>Click me</button>
//             </p>
//         </div>
//     )
// };


let req = null;

export const HookOne = () => {
    const [isUserShowed, toggleUser] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isDataFetched, setFetchingStatus] = useState(false);


    useEffect(() => {
        const gettedData = axiosInstance.customAxiosInstance.get("index").then((gettedData) => setUserData(gettedData.data.phones.main.alias));

        axiosInstance.customAxiosInstance.get("index").then((gettedData) => {
            //console.log(gettedData);
            setUserData(gettedData.data.phones.main.alias);
        });
        return () => {
            //console.log('clear');
            //alert("asd")
            //setUserData(null);
        };
    }, []);

    const fetchSomeData = () => {

    };



    // useEffect(() => {
    //     const timerNote = setTimeout(() => {
    //         toggleUser(false);
    //     }, 3000);
    //     return () => {
    //         clearTimeout(timerNote)
    //     }
    // }, []);


    //const CancelToken = axios.CancelToken;
    //const source = CancelToken.source();



    //const axios = ApiService._axios;

    //let src = null;



    // const fetchSomeData = () => {
    //     req = Axios.CancelToken.source();
    //
    //     setFetchingStatus(true);
    //     setUserData(null);
    //
    //     Axios.get("api/index", {
    //         cancelToken: req.token
    //     }).then(data => {
    //         setFetchingStatus(false);
    //         setUserData("gg");
    //     });
    // };
    //
    // const cancelRequest = () => {
    //     req.cancel();
    // };



    // const cancelToken = useRef();
    //
    // const fetchSomeData = () => {
    //     cancelToken.current = Axios.CancelToken.source();
    //
    //     setFetchingStatus(true);
    //     setUserData(null);
    //
    //     Axios.get("api/index", {
    //         cancelToken: cancelToken.current.token
    //     }).then(data => {
    //         setFetchingStatus(false);
    //         setUserData("gg");
    //     });
    // };
    //
    // const cancelRequest = () => {
    //     cancelToken.current.cancel();
    // };


    //const CancelToken = axios.CancelToken;
    //const source = CancelToken.source();


    // const click = () => {
    //     src = Axios.CancelToken.source();
    //
    //     setFetchingStatus(true);
    //     setUserData(null);
    //
    //     Axios.get("api/index", {
    //         cancelToken: src.token
    //     }).then((gettedData) => {
    //         setFetchingStatus(false);
    //         setUserData(gettedData.data.phones.main.alias);
    //     });
    // };



    return (
        <div>
            {/*{isUserShowed && <h1>HELLO</h1>}*/}

            {/*{userData && userData.toString()}*/}

            {
                isDataFetched
                &&
                <div>
                    <h1>WAITING</h1>
                    {/*<div><button onClick={cancelRequest}>Cancel request</button></div>*/}
                </div>
            }
            {/*<div><button onClick={cancelRequest}>Cancel request</button></div>*/}

            <p>
                <button onClick={fetchSomeData}>Click me</button>
            </p>
        </div>
    )
};


