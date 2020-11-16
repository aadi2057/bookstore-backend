import React, { Component } from "react";
import { Label, Row } from "reactstrap";
import { Button } from "@material-ui/core";

import { Control, Form } from "react-redux-form";

class AddBooks extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    alert(JSON.stringify(values));
    this.props.postBook(
      values.bookname,
      values.author,
      values.description,
      values.publication,
      values.image,
      parseInt(values.price),
      values.category,
      values.ISBN
    );
    this.props.resetAddBook();
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{ justifyContent: "center" }}>
          <h2 className="display-4 text-center">Add More Books</h2>
        </div>
        <div className="row " style={{ justifyContent: "center" }}>
          <div className="col-12 col-sm-7">
            <Form
              model="addbook"
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <Row className="mb-3 form-group">
                <Label md={3} htmlFor="bookname">
                  Book Name
                </Label>
                <Control.text
                  className="col-12 col-md-9"
                  model=".bookname"
                  placeholder="Name"
                  id="bookname"
                  name="bookname"
                />
              </Row>
              <Row className="mb-3 form-group">
                <Label md={3} htmlFor="author">
                  Author
                </Label>
                <Control.text
                  className="col-12 col-md-9"
                  model=".author"
                  placeholder="Author"
                  id="author"
                  name="author"
                />
              </Row>
              <Row className="mb-3 form-group">
                <Label md={3} htmlFor="price">
                  Price
                </Label>
                <Control.text
                  className="col-12 col-md-9"
                  model=".price"
                  placeholder="Price in $"
                  id="price"
                  name="price"
                  placeholder=" Price"
                />
              </Row>
              <Row className="mb-3  form-group">
                <Label md={3} htmlFor="category">
                  Category
                </Label>
                <Control.text
                  className="col-12 col-md-9"
                  model=".category"
                  placeholder="Category"
                  id="category"
                  name="category"
                />
              </Row>
              <Row className="mb-3 form-group">
                <Label md={3} htmlFor="publication">
                  Publication
                </Label>
                <Control.text
                  className="col-12 col-md-9"
                  placeholder="Publication"
                  model=".publication"
                  id="publication"
                  name="publication"
                />
              </Row>
              <Row className="mb-3 form-group">
                <Label md={3} htmlFor="image">
                  Upload Image
                </Label>
                <Control.text
                  placeholder="Image"
                  className="col-12 col-md-9"
                  model=".image"
                  id="image"
                  name="image"
                />
              </Row>
              <Row className="mb-3 form-group">
                <Label md={3} htmlFor="ISBN">
                  ISBN No.
                </Label>
                <Control.text
                  placeholder="ISBN No."
                  className="col-12 col-md-9"
                  model=".ISBN"
                  id="ISBN"
                  name="ISBN"
                />
              </Row>
              <Row className="mb-3 form-group">
                <Label md={3} htmlFor="description" for="description">
                  Description
                </Label>
                <Control.textarea
                  model=".description"
                  className="col-12 col-md-9"
                  rows="8"
                  id="description"
                  name="description"
                ></Control.textarea>
              </Row>
              <Row className="mb-5 form-group ">
                <Button variant="contained" type="submit" color="primary">
                  Submit
                </Button>
                <Button
                  className="ml-3"
                  variant="contained"
                  type="submit"
                  onClick={this.props.resetAddBook()}
                >
                  Cancel
                </Button>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddBooks;
