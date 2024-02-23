import React from 'react'
import { Progress } from 'antd'
import '../css/RunningProgressiveBar.css'

const ExpiredProgressiveBar = ({percent}) => {
    const progressColor = '#FF0000'
    return (
        <div className='progress-container'>
            <div style={{ textAlign: 'center', fontWeight: '500',fontFamily:'Roboto' }}>
                <p>Expired stage</p>
                <p>{percent.expiredStage}/{percent.totalCount} Traders</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Progress type="circle" strokeColor={progressColor} percent={percent.expiredPercentage} width={80} format={() => <span style={{ color: '#fff' }}>{`${percent.expiredPercentage}%`}</span>} />
            </div>
        </div>
    )
}

export default ExpiredProgressiveBar
