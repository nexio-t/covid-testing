import React from 'react';

function DataCard({data}) {

    const { title , total } = data; 

    const formmatedNum = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return (
        <div className="data-card">
            <h2 className="data-title">{title}</h2>
            <div className="data-num">{formmatedNum}</div>
        </div>
    )

}

export default DataCard;