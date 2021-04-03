import React, { useEffect, useState } from 'react'
import Spinner from '../Common/Spinner';
import DashboardNav from '../Common/Navbars/DashboardNav';
import { getFavouritesbyUser } from '../../services/advertisementService';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { Container } from "reactstrap";
import AdCard from '../Home/AdCard';

const SweetAlert = withReactContent(Swal);

export default function Favourites() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adList, setAdList] = useState([]);
    const checkAuth = () => localStorage.getItem("access_token") ? true : false;

    useEffect(() => {
        if (checkAuth()) {
            var localUser = JSON.parse(localStorage.getItem("user"));
            setUser(localUser);
        }
    }, [checkAuth()]);

    useEffect(() => {
        if (user) {
            getFavouritesbyUser(user.id).then(ads => setAdList(ads.favouriteAds))
                .catch(err => SweetAlert.fire({ position: 'center', icon: 'error', title: err.message, showConfirmButton: true }))
                .finally(() => setLoading(false))
        }
    }, [user])


    return (
        <div>
            {loading ? (<Spinner />) : (
                <div>
                    <DashboardNav user={user} transparent={false} />
                    <Container >
                        <div><h3>Favourite Ads</h3></div>
                        {adList.map(x => (<AdCard ad={x} id={x.id} />))}
                    </Container>
                </div>
            )}
        </div >
    )
}
