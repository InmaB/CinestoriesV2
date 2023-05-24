import React from 'react';
import logo from "../assets/logo.png"
import { AiFillFacebook, AiFillTwitterSquare } from 'react-icons/ai';
import { FaInstagramSquare } from 'react-icons/fa'
import styled from 'styled-components';

function Footer() {
    return (
        <footer>
            <div className="footer-background">
                <div className="flex j-center">
                    <a href="./index.html">
                        <Logo src={logo} alt="Filmlane logo" />
                    </a>
                </div>
                <div className="flex">
                    <ul className="footer-list">
                        <li>
                            <a href="./index.html" className="footer-link">Home</a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">Movie</a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">TV Show</a>
                        </li>

                    </ul>
                </div>

                <div className="divisor"></div>

                <ul className="social-list">
                    <li>
                        <a href="#" className="social-link">
                            <AiFillFacebook></AiFillFacebook>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="social-link">
                            <AiFillTwitterSquare></AiFillTwitterSquare>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="social-link">
                            <FaInstagramSquare></FaInstagramSquare>
                        </a>
                    </li>
                </ul>


            </div>
            <div className="footer-bottom">
                <p className="copyright">
                    &copy; 2022 <a href="#">codewithsadee</a>. All Rights Reserved
                </p>
            </div>
        </footer>
    );
}

const Logo = styled.img`
width: 80%;
`
export default Footer;
