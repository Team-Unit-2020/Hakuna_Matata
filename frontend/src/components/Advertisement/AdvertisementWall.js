import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Col } from 'reactstrap';
import Advertisement from './Advertisement'
export default function AdvertisementWall() {
    const names = ['P&S', 'Fab', 'Pizzahut','Dominos', 'Authers'];
    return (
        <div>

            <Col className="ml-auto mr-auto" md="6">
                {names.map(name => (
                    <li>
                        <Advertisement myprop = {name}/>
                    </li>
                ))}
                
            </Col>
        </div>
    )
}