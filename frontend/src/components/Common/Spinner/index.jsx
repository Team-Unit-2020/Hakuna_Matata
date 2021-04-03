import React from 'react'
import Loading from './loading.svg'

export default function Spinner(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: props.marginTop ? props.marginTop: 0}}>
            <img src={Loading} alt={"Spinner"}/>
        </div>
    )
}
