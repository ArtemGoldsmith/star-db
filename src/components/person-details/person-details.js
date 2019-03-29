import React, { Component } from 'react';
import './person-details.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';

export default class PersonDetails extends Component {

  swapiService = new SwapiService();

  constructor() {
    super();

    this.state = {
      person: {},
      loading: true,
      error: false,
    };

    this.updatePerson();
  }

  onPersonLoaded = (person) => {
    this.setState({
      person,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updatePerson() {
    const id = Math.floor(Math.random() * 88) + 1;

    this.swapiService
      .getPerson(id)
      .then(this.onPersonLoaded)
      .catch(this.onError);
  }

  personView = (person) => {
    const { id, name, gender, birthYear, eyeColor } = person;

    return (
      <React.Fragment>
        <img className="person-image"
             src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
             alt="person"
        />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
    )
  };

  render() {
    const { loading, error, person } = this.state;
    const hasData = !(loading || error);

    return (
      <div className="person-details card">
        {loading && <Spinner />}
        {hasData && this.personView(person)}
        {error && <ErrorIndicator />}
      </div>
    );
  }
}
