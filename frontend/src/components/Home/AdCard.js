import React from 'react'
import { useHistory } from 'react-router-dom';
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardText,
    Button
} from "reactstrap";

export default function AdCard(props) {

    const history = useHistory();

    const goToAd = (id) => {
        history.push(`/ad/${id}`);
    }

    return (
        <Card style={{ width: "20rem", color: "black", margin: "10px" }}>
            <img src={props.ad.images[0]}/>
            <CardBody>
                <CardTitle tag="h6" style={{ overflow: "hidden", textOverflow: "ellipsis", wordWrap: "break-word", display: "block", lineHeight: "1em", maxHeight: "1em"}}>{props.ad.title}</CardTitle>
                <Button
                    color="primary"
                    onClick={() => goToAd(props.ad.id)}
                >
                    View More
          </Button>
            </CardBody>
        </Card>
    )
}
