import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardSubtitle, CardTitle } from 'reactstrap';
import { Input, InputAdornment, TextField, Button } from '@material-ui/core';
import { Comment } from '@material-ui/icons';
import { Link} from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';


const RenderBook = ({book}) => {
    return(
        <div >
            <Card >
                <CardImg src={baseUrl + book.image} height="300" width="auto"  />
                <CardTitle><h3>{book.name}</h3></CardTitle>
                <CardSubtitle className="text-secondary">-- {book.author}</CardSubtitle>
            </Card>
            
            
        </div>
    )
}

const RenderDescription = ({book}) => {

    return(
        <div >
            <h2>{book.name}</h2>
            <p>Price: ${book.price} <br/>Category: {book.category} <br/>Publication: {book.publication} <br/>ISBN: {book.ISBN}</p>
            <p>{book.description}</p>
            <p></p>
        </div>
    )
}


const BookDetail = (props) => {
    
    // alert(JSON.stringify(props.book));
    return(
        <div className="container">
            <div className="row">
            <Breadcrumb >
                    <BreadcrumbItem>
                    <Link to="/home" >
                        Home
                    </Link>
                    </BreadcrumbItem>
                    
                    <BreadcrumbItem>
                        <Link to="/menu">
                            Menu
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {props.book.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4">
                        <RenderBook book={props.book} />
                    </div>
                    <div className="col-12 col-md-8">
                        <RenderDescription book={props.book} />
                    </div>
                </div>
                
                <div className="row my-5">
                    <div className="col-12 col-md-8">
                        <TextField fullWidth placeholder="Add a review..." label="Add a Review" id="review" 
                        name="review" InputProps={{ endAdornment: (<InputAdornment><Comment /></InputAdornment>) }}   />
                    </div>
                    <Button className="ml-md-2" variant="contained" color="primary">Submit</Button>
                </div>    
                
        </div>
    )
}

export default BookDetail;