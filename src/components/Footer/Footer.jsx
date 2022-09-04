import React from 'react';
import './Footer.css';
import { GiWingCloak } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  function updateURLParameter(url, param, paramVal){
      var newAdditionalURL = "";
      var tempArray = url.split("?");
      var baseURL = tempArray[0];
      var additionalURL = tempArray[1];
      var temp = "";
      if (additionalURL) {
          tempArray = additionalURL.split("&");
          for (var i=0; i<tempArray.length; i++){
              if(tempArray[i].split('=')[0] !== param){
                  newAdditionalURL += temp + tempArray[i];
                  temp = "&";
              }
          }
      }
  
      var rows_txt = temp + "" + param + "=" + paramVal;
      return baseURL + "?" + newAdditionalURL + rows_txt;
  }
  
  return (
    <footer className="footerContent text-center">
      <div className="" >
        {t("FooterText")} <GiWingCloak color='red' fontSize="1.5em"/>
      </div>
      <div className="languages">
        <button type='button' className='btn' onClick={() => {window.location.href = updateURLParameter(window.location.href, 'lang', 'tr')}}>
            <img className='language-img' src={require("../../styles/images/trFlag.png")} 
                alt="trFlag"/> 
        </button>
        <button type='button' className='btn' onClick={() => {window.location.href = updateURLParameter(window.location.href, 'lang', 'en')}}>
          <img className='language-img' src={require("../../styles/images/enFlag.png")} 
                alt="enFlag"/> 
        </button>
      </div>
    </footer>
  );
}