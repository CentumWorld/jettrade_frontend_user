import React from 'react'
import '../css/RunningProgressiveBar.css'
import { Progress } from 'antd'

const TrialProgressiveBar = ({percent}) => {
    const progressColor = '#F6BE00'
    return (
        <div className='progress-container'>
            <div style={{ textAlign: 'center', fontWeight: '500',fontFamily:'Roboto' }}>
                <p>Trial stage</p>
                <p>{percent.trialStage}/{percent.totalCount} Traders</p>
            </div>
            <div style={{ textAlign: 'center' }}>
                <Progress type="circle" strokeColor={progressColor} percent={percent.trialPercentage} width={80} format={() => <span style={{ color: '#fff' }}>{`${percent.trialPercentage}%`}</span>} />
            </div>
        </div>
    )
}

export default TrialProgressiveBar
