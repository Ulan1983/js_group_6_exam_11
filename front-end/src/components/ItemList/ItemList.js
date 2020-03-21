import React from 'react';
import {Card, CardBody, CardText} from "reactstrap";
import ItemThumbnail from "../ItemThumbnail/ItemThumbnail";
import {Link} from "react-router-dom";

const ItemList = props => {
	return (
		<Card style={{marginTop: '10px'}}>
			<CardBody>
				<ItemThumbnail image={props.image}/>
				<Link to={'/posts/' + props.id}>
					{props.title}
				</Link>
				<CardText style={{marginTop: '10px'}}>
					{props.price}
				</CardText>
			</CardBody>
		</Card>
	);
};

export default ItemList;