import React from "react";
import './ReedemPage.css';
import Footer from "../Footer/Footerinfo";
import { useDispatch, useSelector } from "react-redux";
import { redeem } from "../../connecting";
import  {redeemCoin as storeRedeem} from "../../store/userData";
import { ToastContainer , toast } from "react-toastify";



const RedeemPage = () => {
    const userData = useSelector((state) => state.auth.userData)
    //console.log(userData);
    const Dispatch = useDispatch()
    
    const redeemCoin = async(data) => {
        await redeem({points : data})
        .then((res) => {
            toast.success(res.data ,{style : {background : "green" , color : "white"}})
            //console.log(res.message.coins);
            Dispatch(storeRedeem(res.message.coins))
        }
        ).catch((res) =>toast.error(res , {style : {background : "red" , color : "white"}}))
    }
    return(
        <>
            <div className="topContainer">
                <ToastContainer/>
                <h1 className="topContainer-heading">EcoCoin Store</h1>
                <p className="topContainer-text">Shop in our store or redeem your favourite coupons for free by using EcoCoins.</p>
                <div id="balance-points">
                    <p id="subheading">Your Points :</p>
                    <p>{userData.coins}</p>
                </div>
            </div>
            <div className="mainContainerrr">
                <div className="mainContainer-card">
                    <div className="card-img" id="card-img1">
                        <img src="https://cdn.brandfetch.io/id4J58sqa_/w/800/h/227/theme/dark/logo.png?k=id64Mup7ac&t=1674733845448?t=1674733845448" alt="" />
                    </div>
                    <p className="card-text">BookMyShow Coupon</p>
                    <p className="card-discount-text">40% discount on all Tollywood films</p>
                    <p className="card-item-cost">500 Coins</p>
                    <button onClick={() => redeemCoin(500)}>Redeem</button>
                </div>
                <div className="mainContainer-card">
                    <div className="card-img" id="card-img2">
                        <img src="https://cdn.brandfetch.io/idr5xgDFc2/w/820/h/238/theme/dark/logo.png?k=id64Mup7ac&t=1724660891015?t=1724660891015" alt="" />
                    </div>
                    <p className="card-text">Ajio Coupon</p>
                    <p className="card-discount-text">50% discount on all Casual Wear & Shoes</p>
                    <p className="card-item-cost">1000 Coins</p>
                    <button onClick={() => redeemCoin(1000)}>Redeem</button>
                </div>
                <div className="mainContainer-card">
                    <div className="card-img" id="card-img3">
                        <img src="https://cdn.brandfetch.io/ideeTxiKQK/w/800/h/233/theme/dark/logo.png?k=id64Mup7ac&t=1667590371713?t=1667590371713" alt="" />
                    </div>
                    <p className="card-text">Swiggy Coupon</p>
                    <p className="card-discount-text">Upto 60% discount on Biryani's & Desserts</p>
                    <p className="card-item-cost">1 Coins</p>
                    <button onClick={() => redeemCoin(1)}>Redeem</button>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default RedeemPage;