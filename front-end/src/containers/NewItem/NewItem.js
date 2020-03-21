import React, {Component, Fragment} from 'react';
import {createItem} from "../../store/actions/itemsActions";
import {connect} from "react-redux";
import {fetchCategories} from "../../store/actions/categoriesActions";
import ItemForm from "../../components/UI/Form/ItemForm";

class NewItem extends Component {
	componentDidMount() {
		this.props.fetchCategories();
	}

	createItem = async (itemData) => {
		await this.props.createItem(itemData);
	};

	render() {
		return (
			<Fragment>
				<h3>Create new item</h3>
				<ItemForm
					onSubmit={this.createItem}
					categories={this.props.categories}
				/>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	categories: state.categories.categories
});

const mapDispatchToProps = dispatch => ({
	createItem: itemData => dispatch(createItem(itemData)),
	fetchCategories: () => dispatch(fetchCategories())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewItem);