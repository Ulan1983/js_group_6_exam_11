import React, {Component} from 'react';
import {fetchItem} from "../../store/actions/itemsActions";
import {connect} from "react-redux";
import {Card, CardBody, CardText} from "reactstrap";
import ItemThumbnail from "../../components/ItemThumbnail/ItemThumbnail";

class SingleItem extends Component {
	componentDidMount() {
		this.props.fetchItem(this.props.match.params.id);
	}

	render() {
		if (!this.props.item) return null;
		return (
			<Card>
				<CardBody>
					<ItemThumbnail image={this.props.item.image}/>
					<CardText>
						<strong>Заголовок: </strong>
						{this.props.item.title}
					</CardText>
					<CardText>
						<strong>Описание: </strong>
						{this.props.item.description}
					</CardText>
					<CardText>
						<strong>Категория: </strong>
						{this.props.item.category.title}
					</CardText>
					<CardText>
						<strong>ФИО продавца: </strong>
						{this.props.user.displayName}
					</CardText>
					<CardText>
						<strong>Номер телефона продавца: </strong>
						{this.props.user.phone}
					</CardText>
				</CardBody>
			</Card>
		);
	}
}

const mapStateToProps = state => ({
	item: state.items.item,
	error: state.items.itemError,
	user: state.users.user
});

const mapDispatchToProps = dispatch => ({
	fetchItem: id => dispatch(fetchItem(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(SingleItem);