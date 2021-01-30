import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	Breadcrumb,
	BreadcrumbItem,
	Button,
	Modal,
	Row,
	Col,
	Label,
	ModalBody,
	ModalHeader
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({ dish }) {
	if (dish != null)
		return (
			<div className="col-12 col-md-5 m-1">
				<Card>
					<CardImg top src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle>{dish.name}</CardTitle>
						<CardText>{dish.description}</CardText>
					</CardBody>
				</Card>
			</div>
		);
	else return <div />;
}

function RenderComments({ comments }) {
	if (comments != null) {
		return (
			<div className="col-12 col-md-5 m-1">
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{comments.map((comment) => {
						return (
							<li key={comment.id}>
								<p>{comment.comment}</p>
								<p>{`-- ${comment.author} , ${new Intl.DateTimeFormat("en-US", {
									year: "numeric",
									month: "short",
									day: "2-digit",
								}).format(new Date(Date.parse(comment.date)))}`}</p>
							</li>
						);
					})}
					<CommentForm />
				</ul>
			</div>
		);
	} else {
		return <div />;
	}
}

const DishDetail = (props) => {
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem>
							<Link to="/menu">Menu</Link>
						</BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<RenderDish dish={props.dish} />
					<RenderComments comments={props.comments} />
				</div>
			</div>
		);
	} else {
		return <div />;
	}
};

class CommentForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: false
		};

		this.handleComments = this.handleComments.bind(this);
	}

	toggleModal = () => {
		this.setState({
			isModalOpen: !this.state.isModalOpen
		});
	}

	handleComments(values) {
		console.log("Current State is: " + JSON.stringify(values));
		alert("Current State is: " + JSON.stringify(values));
	}

	render() {
		return (
			<div>
				<Button type="submit" value="submit" color='white' onClick={this.toggleModal}> <span className="fa fa-pencil"></span> Submit Comment</Button >

				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
					<ModalBody>
						< LocalForm onSubmit={(values) => this.handleComments(values)}>
							<Row className='form-group'>
								<Label htmlFor="rating" md={12}>Rating</Label>
								<Col md={12}>
									<Control.select model=".rating" id="rating" name="rating"
										className="form-control"
									>
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5" selected>5</option>
									</Control.select>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor="author" md={12}>Your Name</Label><br />
								<Col md={12}>
									<Control.text model=".author" id="author" name="author"
										placeholder="Your Name"
										className="form-control"
										validators={{
											required, minLength: minLength(3), maxLength: maxLength(15)
										}}
									/>
									<Errors
										className="text-danger"
										model=".author"
										show="touched"
										messages={{
											required: 'Required',
											minLength: 'Must be greater than 2 characters',
											maxLength: 'Must be 15 characters or less'
										}}
									/>
								</Col>
							</Row>
							<Row className='form-group'>
								<Label htmlFor="comment" md={12}>Comment</Label>
								<Col md={12}>
									<Control.textarea model=".comment" id="comment" name="comment"
										className="form-control"
									/>
								</Col>
							</Row>
							<Row className="form-group">
								<Col md={12}>
									<Button type="submit" color="primary">Submit</Button>
								</Col>
							</Row>
						</LocalForm>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

export default DishDetail;
