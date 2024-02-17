import React from 'react'
import '../css/RunningProgressiveBar.css'
import { Progress } from 'antd'

const RunningProgressiveBar = ({ percent }) => {
    const progressColor = '#00FF00'
    return (
        <>
            <div className='progress-container'>
                <div style={{ textAlign: 'center', fontWeight: '500',fontFamily:'Roboto' }}>
                    <p>Runing stage</p>
                    <p>{percent.runningCount}/{percent.totalCount} Traders</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Progress type="circle" strokeColor={progressColor} percent={percent.runningPercentage} width={80} format={() => <span style={{ color: '#fff' }}>{`${percent.runningPercentage}%`}</span>} />
                </div>
            </div>
        </>
    )
}

export default RunningProgressiveBar
