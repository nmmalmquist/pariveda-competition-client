import React from 'react';

import styles from "../css/AdminAddButton.module.css"

const AdminAddButton = ({onClick}) => {
    return ( 
        <div onClick={onClick} className={styles.container}>
            <h2 className={styles.text}>+ Add</h2>
        </div>
     );
}
 
export default AdminAddButton;