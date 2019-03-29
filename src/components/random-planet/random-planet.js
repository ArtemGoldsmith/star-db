import React, { Component } from 'react';
import './random-planet.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  constructor(props) {
    super(props);

    this.state = {
      planet: {},
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 100000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onPlanetLoaded = (planet) => {
    this.setState({
      planet,
      loading: false,
      error: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 17) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  };

  planetView = (planet) => {
    const { id, name, population, rotationPeriod, diameter } = planet;

    return (
      <React.Fragment>
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
             alt={name}
        />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>
    )
  };

  render() {
    const { loading, error, planet} = this.state;
    const hasData = !(loading || error);

    return (
      <div className="random-planet jumbotron rounded">
        {loading && <Spinner />}
        {hasData && this.planetView(planet)}
        {error && <ErrorIndicator />}
      </div>
    );
  }
}
