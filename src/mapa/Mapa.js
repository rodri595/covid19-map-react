import React, { Component } from 'react'
import {Map, TileLayer, Marker, Popup, FeatureGroup, LayerGroup, LayersControl, CircleMarker, Tooltip, GeoJSON } from 'react-leaflet'
import L from 'leaflet';
import Navbar from '../pages/nav';

import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export const hospital = new L.Icon({
    iconUrl: '/hospital.svg',
    iconSize: [25, 25]
  });


export default class Mapa extends Component{
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          data2: [],
          currentPos: null,

        };
        this.handleClick = this.handleClick.bind(this);
      }

      myStyle = () => {
        return {
          color: "red",
          weight: 3,
          opacity: 0.4,
          fillColor: "red",
          dashArray: '8 5'
        }
      }

      onEachFeature(feature: Object, layer: Object) {
        const popupContent = ` <Popup><p>Municipio: <br />${feature.properties.nombre}</pre></Popup>`
        layer.bindPopup(popupContent)
      }
      handleClick(e){
        this.setState({ currentPos: e.latlng });
      }
  render() {
    return (
      <>
    <Navbar></Navbar>

        <Map minZoom={2.5} maxZoom={10} onClick={this.handleClick} 
        bounds={[
            [75.62863223279015,179.29687500000003],
            [-57.98480801923985,-151.87500000000003]
          ]}>
        <LayersControl position="topright">

          <BaseLayer checked name="Mapa Paises">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>

          <BaseLayer name="Mapa Base">

            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
        
          <Overlay checked name="Casos en el Mundo ">
          <LayerGroup>
          {this.state.data2.map(item => {
          return(
            <CircleMarker center={[item.countryInfo.lat,item.countryInfo.long]}
                          color={
                            (item.cases < 1000)? 
                            "#95EE0D" : (item.cases < 10000 )?
                            "#E7D015" :(item.cases < 100000 )?
                            "#E75D15 " : "#A70000"
                            }
                            radius={Math.log(item.cases)}
                            fillColor="#dc004e"
                            weight="1"
                            fillOpacity="0.8"
                            >
              <Tooltip sticky direction="left" offset={[-8, -2]} opacity={1} /*permanent*/>

                <div>
                <span>{item.country}</span>
                </div>
                
                <div>
                <img src={item.countryInfo.flag} alt={`${item.country}'s flag`} height="42" />
                </div>

                <div>
                <span className='confirmed'>{"Casos :" + " " + item.cases}</span>
                </div>

                <div>
                <span className='deaths'>{"Muertes:" + " " + item.deaths}</span>
                </div>

                <div>
                <span className='recovered'>{"Recuperados:" + " " + item.recovered}</span> 
                </div>
                
                <div>
                <span className='active'>{"Activos:" + " " + item.active}</span> 
                </div>

              </Tooltip>
            </CircleMarker>
          )
        })}
          </LayerGroup>
          </Overlay>


          
          <Overlay name="Municipios de Honduras">
          <FeatureGroup>
        {this.state.data.map(f => {
          return <GeoJSON key={f.properties.id} data={f} style={this.myStyle} onEachFeature={this.onEachFeature}/>
        })}
      </FeatureGroup>
          </Overlay>



          <Overlay name="Marcador arrastrable">
          <LayerGroup>
        { this.state.currentPos && <Marker position={this.state.currentPos} draggable={true}>
            <Popup position={this.state.currentPos}>
              Coordenadas: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
            </Popup>
          </Marker>}
          </LayerGroup>
          </Overlay>
          <Overlay name="Hospitales trato de Covid en Honduras">
          <LayerGroup>
            <Marker position={[14.322350, -87.678296]} icon={hospital}><Popup><span>Hospital Roberto Suazo Cordova</span></Popup></Marker>
            <Marker position={[13.991370, -86.568137]} icon={hospital}><Popup><span>Hospital Gabriela Alavarado</span></Popup></Marker>
            <Marker position={[15.754173, -87.489606]} icon={hospital}><Popup><span>Hospital Tela Integrado</span></Popup></Marker>
            <Marker position={[15.769286, -86.809014]} icon={hospital}><Popup><span>Hospital Regional Atlantida</span></Popup></Marker>
            <Marker position={[14.768887, -88.784984]} icon={hospital}><Popup><span>Hospital Occidente</span></Popup></Marker>
            <Marker position={[14.453329, -87.642776]} icon={hospital}><Popup><span>Hospital Santa Teresa</span></Popup></Marker>
            <Marker position={[13.302876,-87.2034328]} icon={hospital}><Popup><span>Hospital Sur</span></Popup></Marker>
            <Marker position={[15.500163, -88.030843]} icon={hospital}><Popup><span>Hospital Leonardo Martinez</span></Popup></Marker>
            <Marker position={[14.103699, -87.185135]} icon={hospital}><Popup><span>Hospital San Felipe</span></Popup></Marker>
            <Marker position={[14.078353, -87.162755]} icon={hospital}><Popup><span>Hospital Maria de Especialidades</span></Popup></Marker>
            <Marker position={[15.524503, -88.041762]} icon={hospital}><Popup><span>Hospital Mario Catarino Rivas</span></Popup></Marker>
            <Marker position={[14.104574, -87.183353]} icon={hospital}><Popup><span>Hospital Cardiopulmonar</span></Popup></Marker>
          </LayerGroup>
          </Overlay>

        </LayersControl>

        <CircleMarker center={[14.059685, -87.218065]} radius={10}>
        <Tooltip sticky direction="left" offset={[-8, -2]} opacity={1} permanent interactive={true}>
          <div>
          Hello, I´m <strong>Rodrigo Erazo</strong> From <strong>Honduras</strong> <br/>If you want to <a href="https://paypal.me/rodrigoerazo595" target="_blank" >Support me</a><br/>you can buy me a Beer
          </div>
          </Tooltip>      
        </CircleMarker>

      </Map>
      </>
    )
  }
  componentDidMount() {
   this.fetchData();
   this.fetchData2();
  }

  fetchData() {
    let request = fetch("/hondurasgeo.json");

    request
      .then(r => r.json())
      .then(data => {
        this.setState({
          data: data.features
        });
      }, (error) => {
        console.error(error);
      });
  }
  fetchData2() {
    fetch("https://corona.lmao.ninja/v2/countries")
      .then(r => r.json())
      .then(data2 => {
        
        this.setState({
          data2: data2
        });

      }, (error) => {
        console.error(error);
      });
  }
}
