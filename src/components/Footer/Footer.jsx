import React from 'react';
import './Footer.css';
import { GiWingCloak } from 'react-icons/gi';

export const Footer = () => {
  return (
    <footer className="footerContent">
        <div className="text-center p-3 " >
            © 2022 Copyright RedCloak <GiWingCloak color='red' fontSize="1.5em"/>
        </div>
    </footer>
  );
}