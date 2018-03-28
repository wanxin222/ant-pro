import React from 'react';
import {Icon} from 'antd';
import styles from './NewLayout.less';

function NewLayout({location,children}){
    
    return (
        <div>
            {children?children:'11111'}
            <Icon type="like"></Icon>
            
            
        </div>
    )
}

export default NewLayout;
