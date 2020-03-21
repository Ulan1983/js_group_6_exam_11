import React, {Component, Fragment} from 'react';
import ItemList from "../../components/ItemList/ItemList";
import {connect} from "react-redux";
import {fetchItems} from "../../store/actions/itemsActions";

class Posts extends Component {
	componentDidMount() {
		this.props.fetchItems();
	}

	render() {
		return (
			<Fragment>
				{this.props.items.map(item => (
					<ItemList
						key={item._id}
						id={item._id}
						image={item.image}
						title={item.title}
						price={item.price}
					/>
				))}
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	items: state.items.items,
	error: state.items.itemsError
});

const mapDispatchToProps = dispatch => ({
	fetchItems: () => dispatch(fetchItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);