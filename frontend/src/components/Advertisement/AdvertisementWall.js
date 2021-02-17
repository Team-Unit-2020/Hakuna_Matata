import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Col } from 'reactstrap';
import Advertisement from './Advertisement'
import ServiceProviderService from '../../services/service-provider.service'

const names = ['P&S', 'Fab', 'Pizzahut','Dominos', 'Authers'];

export default class AdvertisementWall extends React.Component {
    constructor(props){
        super(props);
        this.getAll = this.getAll.bind(this);
        this.state = {
            adsList : []
        };
    }
    componentDidMount(){
        this.getAll()
    }
    getAll(){
        ServiceProviderService.getAllAdvertisements()
        .then(res =>{
            this.setState({
                adsList: res.body
            })
           
        })
        .catch(e=>{
            //console.log(e);
        });
    }
    render(){
        const { adsList } = this.state;
        return (
            <div>
    
                <Col className="ml-auto mr-auto" md="6">
                
                        {adsList && adsList.map((ad, index)=>(
                           
                            <li
                            key ={index}>
                                <Advertisement prodname = {ad.name}/>

                            </li>
               
                        ))}
            
                    
                </Col>
            </div>
        )
    }
}