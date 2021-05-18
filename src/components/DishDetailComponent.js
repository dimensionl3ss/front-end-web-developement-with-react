import React from 'react';
import {Card, CardImg,CardText, CardBody,CardTitle, Breadcrumb, BreadcrumbItem, 
        Button, Modal, ModalHeader, ModalBody, Row, Col, Input, Label} from 'reactstrap';
import {Link} from 'react-router-dom';

import { Component } from 'react'
import { Control, LocalForm, Errors} from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen : false
        }
        this.toggleCommentForm = this.toggleCommentForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCommentForm() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.toggleCommentForm();
    }
    render() {
        return (
            <div>
                <Button outline onClick={this.toggleCommentForm}>
                    <span className="fa fa-pencil fa-lg"></span>
                    Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggleCommentForm={this.toggleCommentForm}>
                <ModalHeader toggle={this.toggleCommentForm}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Col md={{ size: 12 }}>
                                    <Control.select
                                        model=".rating"
                                        name="rating"
                                        className="form-control"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row><br />
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Col md={12}>
                                    <Control.text
                                        model=".author"
                                        id="author"
                                        name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                        required,
                                        minLength: minLength(3),
                                        maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                        required: "Required",
                                        minLength: "Must be greater than 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                        }}
                                    />
                                </Col>
                            </Row><br />
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>
                                Comment
                                </Label>
                                <Col md={12}>
                                <Control.textarea
                                    model=".comment"
                                    id="comment"
                                    name="comment"
                                    rows={5}
                                    className="form-control"
                                />
                                </Col>
                            </Row><br />
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

function RenderComments({comments})
{
    if (comments != null) {
        let options = { year: "numeric", month: "short", day: "2-digit" };
        return comments.map(comment => (
            <ul key={comment.id} className="list-unstyled">
            <li className="mb-2">{comment.comment}</li>
            <li>
                -- {comment.author}{" "}
                {new Intl.DateTimeFormat("en-US", options).format(new Date(Date.parse(comment.date)))}
            </li>
            </ul>
            
        ));
    }
    return <div></div>;
}

function RenderDish( {dish} )
{
    return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
    );
}
const DishDetail = (props) => {

    if(props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments comments={props.comments} />
                        <CommentForm />
                    </div>
                </div>
            </div>
        );
    }
    return <div></div> ;
}

export default DishDetail;