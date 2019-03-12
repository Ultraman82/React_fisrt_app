import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, 
    Breadcrumb, BreadcrumbItem,
    Row, Col, Button,
    Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required =(val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class CommentForm extends Component{
    constructor(props) {
        super(props);    
        
        this.state = {          
          isModalOpen: false          
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleFeedback = this.handleFeedback.bind(this);

    }
        toggleModal () {
        this.setState({            
            isModalOpen: !this.state.isModalOpen
            });          
        }
        handleFeedback(values) {
            this.toggleModal();
            console.log("Rating: " + values.rating + ", Yourname " + values.yourname
                + ", Feedback" + values.feedback);
            alert("Rating: " + values.rating + ", Yourname " + values.yourname
                + ", Feedback" + values.feedback);

        }

    render(){
        return(
            <div>
                <Row className="form-group">
                    <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit a feedback</Button>                
                </Row>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Feedback</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleFeedback(values)}>
                            <Row className="form-group">
                                <Label md={12} htmlFor="rating">Rating</Label>                                      
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="feedback" md={12}>Your Feedback</Label>
                                <Col>
                                    <Control.textarea model=".feedback" id="feedback" name="feedback"
                                        rows="8"
                                        className="form-control" />                                        
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

    function RenderComments({comments}){
        if (comments != null) {
            return (
                <div className="col-12 col-md-5 m-1">                        
                    <h4>Comments</h4>                    
                    <ul class = "list-unstyled">
                        {comments.map(comment =>                        
                            <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </li>                                                     
                        )}
                    </ul>
                    <CommentForm />    
                </div>                
            )
        }
        else {
            return(
                <div></div>
            )
        }
    }

    function RenderDish({dish}) {
        return(          
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
    }

    const DishDetail = (props) => {
            console.log(props,'test');
            if (props.dish != null)                
            {
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
                            <RenderDish dish={props.dish} />
                            <RenderComments comments={props.comments} />                            
                        </div>
                    </div>
                );
            }            
            else
                return(
                    <div></div>
                );
        
    }

export default DishDetail;