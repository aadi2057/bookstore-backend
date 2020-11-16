import React, {useState} from 'react';
import { Card,  CardBody, CardImgOverlay,  CardTitle, CardSubtitle, CardImg, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { Button, IconButton, Tooltip, Snackbar, Input, InputAdornment, FormControl } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import { Send, Delete, FavoriteBorder, Favorite, Close, Home, Search, Edit } from '@material-ui/icons';

function RenderBooks({book, removeBook}) {
    const [isFavClicked, setIsFavClicked] = useState(false);
    const [isFavSnackbarOpen, setIsFavSnackbarOpen ] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsFavSnackbarOpen(false);
      };

    return(
        <div>
        <Card className="my-4" style={{boxShadow: "5px 5px 8px grey"}}>
            <CardImg  src={baseUrl + book.image} alt={book.name} height="250" width="auto"  />
            <CardImgOverlay className="m-0 p-0"> 
                
                    <Link to={`/menu/${book._id}/edit`}>
                        <Tooltip title="Edit Book">
                            <IconButton className="float-right " style={{color: "black"}} ><Edit/></IconButton>
                        </Tooltip>
                    </Link>
                
            </CardImgOverlay>
            <CardTitle className="ml-2"><h4>{book.name}</h4></CardTitle>
            <CardSubtitle className="ml-2">--{book.author}</CardSubtitle>
            
            <CardBody className="px-0 align-contents-center">
                <Link to={`/menu/${book._id}`} >
                    <Button className="col-6 col-sm-6 col-md-4 col-lg-5 ml-1 mr-0 " variant="contained" color="primary" endIcon={<Send/>} >Read </Button>
                </Link>
                <div className="col-6 col-sm-6 col-md-6 col-lg-7 d-inline m-0">
                    <Tooltip title="Add to Favorites">
                        <IconButton color="secondary" className="mx-0" aria-label="favorite-border" onClick={() => setIsFavClicked(!isFavClicked)} >{ isFavClicked ? <Favorite/> :  <FavoriteBorder  />}</IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete" onClick={() =>  setIsDeleteModalOpen(!isDeleteModalOpen)}><Delete/></IconButton>
                    </Tooltip>
                </div>
                <Snackbar open={isFavSnackbarOpen} anchorOrigin={{vertical: 'top', horizontal: 'right'}} onClose={handleClose} autoHideDuration={5000} >
                    <Alert variant="filled" severity="success">Successfully Deleted the book. 
                    <IconButton color="inherit" aria-label="close" size="small" onClick={handleClose}>
                        <Close fontSize="small" />
                    </IconButton>
                    </Alert>
                    
                </Snackbar>
            </CardBody>
        </Card>
        <Modal className="modal-dialog-centered" isOpen={isDeleteModalOpen} toggle={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>
            <ModalHeader className="bg-warning" toggle={() => setIsDeleteModalOpen(!isDeleteModalOpen)}><h4>Do you want to delete the item?</h4></ModalHeader>
            <ModalBody className="bg-light">
                <Button className="col-3 rounded-0 mr-3" variant="contained" color="secondary" onClick={() => {setIsFavSnackbarOpen(!isFavSnackbarOpen); setIsDeleteModalOpen(!isDeleteModalOpen); removeBook(book._id)}}>Yes</Button>
                <Button className=" col-3 rounded-0" variant="contained" onClick={() => setIsDeleteModalOpen(!isDeleteModalOpen)}>Cancel</Button>
            </ModalBody>
        </Modal>
        </div>
    )
}

const Menu = (props) => {
    const [search, setSearch ] = useState('');
    const menu = props.books.books.map((book) => {
        return(
            <div key={book._id} className="col-10 col-sm-6 col-lg-3">
                {/* <span>{book._id}</span> */}
                <RenderBooks book={book} removeBook={props.removeBook} />
            </div>
        )
    })
    if(props.books.isLoading) {
        return(
            <div>
                <Loading/>
            </div>
        )
    }

    else if (props.books.errMess) {
        return(
            <div className="col-6 col-sm-4">
                <h4>{props.books.errMess}</h4>
            </div>
        )
    }
    else
        
        return(
            <div className="" style={{backgroundColor: "#d9dbdb"}}>
            <div className="container ">
                <div className="row">
                <Breadcrumb >
                    <BreadcrumbItem>
                    <Link to="/" >
                        <Home fontSize="small" className="text-secondary" />Home
                    </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        Menu
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12 col-sm-6 ml-auto my-3">
                    <FormControl fullWidth>
                        <Input id="search-bar" placeholder="Search..."  startAdornment={<InputAdornment position="start"><Search/></InputAdornment>} />
                    </FormControl>  

                </div>
                </div>
                
                <div className="row " style={{justifyContent: "center"}}>
                    {menu}
                </div>
            </div>
            </div>
        )
}

export default Menu;