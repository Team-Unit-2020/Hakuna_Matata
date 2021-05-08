import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";
import { removeFromFavourite } from '../../services/advertisementService';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const SweetAlert = withReactContent(Swal)

export default function AdCard(props) {

    const history = useHistory();
    const [user, setUser] = useState(null);
    const checkAuth = () => localStorage.getItem("access_token") ? true : false;

    const goToAd = (id) => {
        history.push(`/ad/${id}`);
    }

    useEffect(() => {
        if (checkAuth()) {
            var localUser = JSON.parse(localStorage.getItem("user"));
            setUser(localUser);
        }
    }, [checkAuth()]);

    const removeFavourite = (adId) => {
        removeFromFavourite(user.id, adId)
            .then(result => {
                SweetAlert
                    .fire({ position: 'center', icon: 'success', title: result.message, showConfirmButton: true });
                props.setUpdate();
            })
            .catch(err => SweetAlert.fire({ position: 'center', icon: 'error', title: err.message, showConfirmButton: true }))
    }

    return (
        <Card style={{ width: "20rem", color: "black", margin: "10px" }}>
            <img src={props.ad.images[0]} height="200px"/>
            <CardBody>
                <CardTitle tag="h6" style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-word", display: "block", lineHeight: "1em", maxHeight: "1em" }}>{props.ad.title}</CardTitle>
                <Button
                    color="primary"
                    onClick={() => goToAd(props.ad.id)}
                >
                    View More
          </Button>
                {props.favouriteCard && (<Button
                    color="danger"
                    onClick={() => {
                        removeFavourite(props.ad.id);
                    }}
                >
                    Remove from Favourites
                </Button>)}
            </CardBody>
        </Card>
    )
}
