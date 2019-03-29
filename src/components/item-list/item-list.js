import React, { Component } from 'react';
import './item-list.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';

export default class ItemList extends Component {

  swapiService = new SwapiService();

  constructor(props) {
    super(props);

    this.state = {
      peopleList: {},
      loading: true,
      error: false,
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  componentDidMount() {
    this.swapiService
      .getAllPeople()
      .then((peopleList) => {
        this.setState({
          peopleList,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  itemsView(peopleList) {

    const people = peopleList.map((person) => {
      return (
        <li key={person.id} className="list-group-item">{person.name}</li>
      );
    });

    return (
      <ul className="item-list list-group">
        {people}
      </ul>
    );
  }

  render() {

    const { loading, error, peopleList } = this.state;
    const hasData = !(loading || error);

    return (
      <React.Fragment>
        {loading && <Spinner />}
        {hasData && this.itemsView(peopleList)}
        {error && <ErrorIndicator />}
      </React.Fragment>
    );
  }
}
