import React, { Component } from "react";
import useDataFetching from "./useDataFetching.js";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    const { data, loading } = useDataFetching();
    this.setState({ fetchedData: data, isLoading: loading });
  }

  render() {
    const { fetchedData, isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p>Data: {fetchedData.name}</p>
          </div>
        )}
      </div>
    );
  }
}

export default ClassComponent;
