import React, { useState } from 'react';
import './Header.scss';
import { NavLink, useNavigate } from "react-router-dom";
import { getCategories, getCurrency } from "../../server/server";
import { useQuery } from "@apollo/client";

const Header = () => {
    const [cartOverlayToggle, setCartOverlayToggle] = useState(false);
    const [moneyMenu, setMoneyMenu] = useState(false);
    const [moneySymbol, setMoneySymbol] = useState("$")
    const navigate = useNavigate();

    function DisplayCategories() {
        const {loading, error, data} = useQuery(getCategories);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.categories.map(({name}) => (
           <NavLink
              key={name}
              to={`/categories/${name}`}
              className={({ isActive }) => (isActive ? 'link link--active' : 'link')}
           >
              {name.toUpperCase()}
           </NavLink>
           )
        )
    }

    function DisplayCurrencies() {
        const {loading, error, data} = useQuery(getCurrency);
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return (
            <div className="moneyMenu">
                <button
                    className="moneyButton"
                    onClick={() => {
                        setMoneyMenu(!moneyMenu)
                    }}
                >
                    <p className="moneySymbol">{moneySymbol}</p>
                    <div className={moneyMenu ? "" : "spin"}>
                        {moneyMenu ?
                            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 4L4 1L7 4" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            :
                            <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 0.5L4 3.5L7 0.5" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                    </div>
                </button>
                {moneyMenu &&
                    <div className="moneyBar">
                        {data.currencies.map((currency, index) => (
                            <div
                                key={currency.symbol}
                                className={index % 2 === 0 ? "evenCurrency" : "oddCurrency"}
                                onClick={() => {
                                    setMoneyMenu(false);
                                    setMoneySymbol(currency.symbol);
                                }}
                            >
                                <div className="moneySymbol">{`${currency.symbol} ${currency.label}`}</div>
                            </div>
                        ))}
                    </div>
                }
            </div>
        )
    }

    return (
        <section className="headerSection">
            <nav className="leftContainer">
                <DisplayCategories />
            </nav>
            <div className="middleContainer">
                <div className="logo">
                    <NavLink to="/categories/all">
                        <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.0222 23.6646C30.0494 23.983 29.8009 24.2566 29.4846 24.2566H3.46924C3.15373 24.2566 2.90553 23.9843 2.93156 23.6665L4.7959 0.912269C4.8191 0.629618 5.05287 0.412109 5.33372 0.412109H27.5426C27.8226 0.412109 28.0561 0.628527 28.0801 0.910361L30.0222 23.6646Z" fill="#1DCF65"/>
                            <path d="M32.0988 29.6014C32.1313 29.9985 31.8211 30.339 31.4268 30.339H1.59438C1.2009 30.339 0.890922 30.0002 0.922082 29.6037L3.06376 2.34717C3.09168 1.9927 3.38426 1.71973 3.73606 1.71973H29.1958C29.5468 1.71973 29.8391 1.99161 29.868 2.34499L32.0988 29.6014Z" fill="url(#paint0_linear_150_362)"/>
                            <path d="M15.9232 21.6953C12.0402 21.6953 8.88135 17.8631 8.88135 13.1528C8.88135 12.9075 9.07815 12.7085 9.32109 12.7085C9.56403 12.7085 9.76084 12.9073 9.76084 13.1528C9.76084 17.3732 12.5253 20.8067 15.9234 20.8067C19.3214 20.8067 22.0859 17.3732 22.0859 13.1528C22.0859 12.9075 22.2827 12.7085 22.5257 12.7085C22.7686 12.7085 22.9654 12.9073 22.9654 13.1528C22.9653 17.8631 19.8062 21.6953 15.9232 21.6953Z" fill="white"/>
                            <path d="M20.2581 13.0337C20.1456 13.0337 20.0331 12.9904 19.9471 12.9036C19.7754 12.7301 19.7754 12.4488 19.9471 12.2753L22.226 9.97292C22.3084 9.88966 22.4203 9.84277 22.5369 9.84277C22.6536 9.84277 22.7654 9.88952 22.8479 9.97292L25.1045 12.2529C25.2762 12.4264 25.2762 12.7077 25.1045 12.8812C24.9327 13.0546 24.6543 13.0547 24.4826 12.8812L22.5368 10.9155L20.569 12.9036C20.4831 12.9904 20.3706 13.0337 20.2581 13.0337Z" fill="white"/>
                            <defs>
                                <linearGradient id="paint0_linear_150_362" x1="25.8733" y1="26.3337" x2="7.51325" y2="4.9008" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#52D67A"/>
                                    <stop offset="1" stopColor="#5AEE87"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </NavLink>
                </div>
            </div>
            <div className="rightContainer">
                <DisplayCurrencies />
                <button
                    className="buttonCart"
                    onClick={() => {
                    setCartOverlayToggle(!cartOverlayToggle)
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5613 4.87359C19.1822 4.41031 18.5924 4.12873 17.9821 4.12873H5.15889L4.75914 2.63901C4.52718 1.77302 3.72769 1.16895 2.80069 1.16895H0.653099C0.295301 1.16895 0 1.45052 0 1.79347C0 2.13562 0.294459 2.418 0.653099 2.418H2.80069C3.11654 2.418 3.39045 2.61936 3.47434 2.92139L6.04306 12.7077C6.27502 13.5737 7.07451 14.1778 8.00152 14.1778H16.4028C17.3289 14.1778 18.1507 13.5737 18.3612 12.7077L19.9405 6.50575C20.0877 5.941 19.9619 5.33693 19.5613 4.87365L19.5613 4.87359ZM18.6566 6.22252L17.0773 12.4245C16.9934 12.7265 16.7195 12.9279 16.4036 12.9279H8.00154C7.68569 12.9279 7.41178 12.7265 7.32789 12.4245L5.49611 5.39756H17.983C18.1936 5.39756 18.4042 5.49824 18.5308 5.65948C18.6567 5.81994 18.7192 6.0213 18.6567 6.22266L18.6566 6.22252Z" fill="#43464E"/>
                        <path d="M8.44437 14.9816C7.2443 14.9816 6.25488 15.9279 6.25488 17.0754C6.25488 18.2228 7.24439 19.1691 8.44437 19.1691C9.64445 19.1698 10.6339 18.2236 10.6339 17.076C10.6339 15.9283 9.64436 14.9814 8.44437 14.9814V14.9816ZM8.44437 17.9013C7.9599 17.9013 7.58071 17.5387 7.58071 17.0754C7.58071 16.6122 7.9599 16.2495 8.44437 16.2495C8.92885 16.2495 9.30804 16.6122 9.30804 17.0754C9.30722 17.519 8.90748 17.9013 8.44437 17.9013Z" fill="#43464E"/>
                        <path d="M15.6875 14.9814C14.4875 14.9814 13.498 15.9277 13.498 17.0752C13.498 18.2226 14.4876 19.1689 15.6875 19.1689C16.8875 19.1689 17.877 18.2226 17.877 17.0752C17.8565 15.9284 16.8875 14.9814 15.6875 14.9814ZM15.6875 17.9011C15.2031 17.9011 14.8239 17.5385 14.8239 17.0752C14.8239 16.612 15.2031 16.2493 15.6875 16.2493C16.172 16.2493 16.5512 16.612 16.5512 17.0752C16.5512 17.5188 16.1506 17.9011 15.6875 17.9011Z" fill="#43464E"/>
                    </svg>
                    <div className="itemCounterInCart">0</div>
                </button>
            </div>
            {cartOverlayToggle &&
                <div className="cartOverlay">
                    <p className="titleCartOverlay">My Bag, <span className="spanCartOverlay">0 items</span></p>
                    <div className="totalContainer">
                        <p className="totalTitle">Total</p>
                        <p className="totalAmount">$0.00</p>
                    </div>
                    <div className="buttonsContainer">
                        <button className="buttonViewBag" onClick={() => navigate("/cart")}>View Bag</button>
                        <button className="buttonCheckOut">Check Out</button>
                    </div>
                </div>
            }
        </section>
    );
};

export default Header;