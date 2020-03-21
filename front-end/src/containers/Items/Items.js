import React, {Component, Fragment} from 'react';
import ItemList from "../../components/ItemList/ItemList";
import {connect} from "react-redux";
import {fetchCategoryItems, fetchItems} from "../../store/actions/itemsActions";
import {fetchCategories} from "../../store/actions/categoriesActions";

class Posts extends Component {
	componentDidMount() {
		this.props.fetchItems();
		this.props.fetchCategories();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.props.fetchCategoryItems(this.props.match.params.id);
		}
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
	error: state.items.itemsError,
	categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
	fetchItems: () => dispatch(fetchItems()),
	fetchCategories: () => dispatch(fetchCategories()),
	fetchCategoryItems: id => dispatch(fetchCategoryItems(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);