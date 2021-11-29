import React from 'react';

import styles from "../css/button.module.css"

const BuyButton = ({text, onClick}) => {
    return ( 
        <div onClick={onClick} className={styles.button}>
            <h3 className={styles.text}>{text}</h3>
        </div>
     );
}
 
export default BuyButton;