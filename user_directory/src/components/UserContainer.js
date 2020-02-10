import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import SearchForm from "./SearchForm";
import UserInfo from "./UserInfo";
import UserList from "../data/directory.json";

class UserContainer extends Component {
  state = {
    result: [],
    search: ""
  };

  // When this component mounts, search for the movie "The Matrix"
  componentDidMount() {
    this.searchUsersFirst();
  }

  searchUsersFirst = () => {
    const searchQuery = this.state.search.trim();
    const searchResultsFirst = UserList.filter((user) => user.name.first === searchQuery);
    this.setState({ 'result': searchResultsFirst });
  };

  searchUsersLast = () => {
    const searchQuery = this.state.search.trim();
    const searchResultsLast = UserList.filter((user) => user.name.last === searchQuery);
    this.setState({ 'result': searchResultsLast });
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchUsersFirst();
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <SearchForm
              searchtype="First Name"
              value={this.state.search}
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
            />
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <hr />
            <UserInfo search={this.state.search} />
          </Col>
        </Row>
      </Container >
    );
  }
}

export default UserContainer;
