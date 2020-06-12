import React from 'react';
import { withRouter } from 'react-router-dom';
import { parse } from '../../utils/querystring';
import ReactMapboxGl, { GeoJSONLayer } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiLXJvb3N0ZXItIiwiYSI6ImNqeHMyazh3YjBmNXMzcG55bzQ4MHZlYmYifQ.H2v__5jvkeZEvIvLwgPiPw"
});

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: undefined,
      lat: undefined,
      zoom: undefined,
      geojson: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const loc = parse(nextProps.location.search);

    if(location.search !== nextProps.location.search) {
      this.getPolygon(loc.city)
    }
  }

  componentDidMount() {
    const { location, history } = this.props;

    const loc = parse(location.search);

    if(!loc.city){
      history.push(`/map?city=gdl`)
    }

    this.getPolygon(loc.city)
  }

  getPolygon(city) {
    fetch(`/polygons?name=${city}`)
      .then(response => response.json())
      .then(data => {
        this.setState({
          lng: data.features[0].properties.longitude,
          lat:  data.features[0].properties.latitude,
          zoom: data.features[0].properties.zoom,
          geojson: data
        });
    });   
  }

  render() {
    const { lng, lat, zoom, geojson } = this.state;

    if(!lng && !lat) {
      return null;
    }

    return(
      <Map 
        // eslint-disable-next-line
        style="mapbox://styles/mapbox/streets-v8"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        zoom={zoom}
        center={[lng, lat]}
      >
        <GeoJSONLayer
          data={geojson}
          fillPaint={{
            "fill-color": "#3eb0d6",
            "fill-opacity": 0.5
          }}
        />
      </Map>
    );
  }
}

export default withRouter(MapView);