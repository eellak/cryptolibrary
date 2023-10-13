import React, { Component } from 'react';
import axios from 'axios';

class application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
  }

  componentDidMount() {
    // Make an Axios GET request to your Spring Boot endpoint
    axios.get('http://localhost:8080/formpar') // Replace with your endpoint URL
      .then((response) => {
        // Handle the response data and update the component's state
        this.setState({ formData: response.data });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  render() {
    const { formData } = this.state;

    return (
      <div>
        <h1>Form Data</h1>
        <ul>
          <li>Application Category: {formData.applicationcategory}</li>
          <li>Application Entry: {formData.applicationentry}</li>
          {/* Add more fields here */}
        </ul>
      </div>
    );
  }
}

export default application;
