import React, {Component, Fragment} from 'react';
import {Alert, Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {connect} from "react-redux";

class ItemForm extends Component {
	state = {
		title: '',
		description: '',
		price: '',
		image: '',
		category: ''
	};

	submitFormHandler = event => {
		event.preventDefault();

		const formData = new FormData();

		Object.keys(this.state).forEach(key => {
			if (this.state[key]) {
				formData.append(key, this.state[key]);
			}
		});

		this.props.onSubmit(formData)
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	fileChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.files[0]
		})
	};

	render() {
		return (
			<Fragment>
				{this.props.error && (
					<Alert color="danger">{this.props.error.error}</Alert>
				)}
				<Form onSubmit={this.submitFormHandler}>
					<FormGroup row>
						<Label sm={2} for="title">Title</Label>
						<Col sm={10}>
							<Input
								type="text"
								name="title" id="title"
								placeholder="Enter title"
								value={this.state.title}
								onChange={this.inputChangeHandler}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2} for="description">Description</Label>
						<Col sm={10}>
							<Input
								type="textarea"
								name="description" id="description"
								placeholder="Enter description"
								value={this.state.description}
								onChange={this.inputChangeHandler}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2} for="price">Price</Label>
						<Col sm={10}>
							<Input
								type="number"
								name="price" id="price"
								placeholder="Enter price"
								value={this.state.price}
								onChange={this.inputChangeHandler}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2} for="image">Image</Label>
						<Col sm={10}>
							<Input
								type="file"
								name="image" id="image"
								onChange={this.fileChangeHandler}
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2} for="category">Category</Label>
						<Col sm={10}>
							<Input
								type="select"
								name="category" id="category"
								value={this.state.category}
								onChange={this.inputChangeHandler}
							>
								<option value="">Please select a category...</option>
								{this.props.categories.map(category => (
									<option key={category._id} value={category._id}>{category.title}</option>
								))}
							</Input>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Col sm={{offset:2, size: 10}}>
							<Button type="submit" color="primary">Create item</Button>
						</Col>
					</FormGroup>
				</Form>
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
	error: state.items.createItemError
});

export default connect(mapStateToProps)(ItemForm);