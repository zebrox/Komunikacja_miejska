import React from 'react';
import ReactDOM from 'react-dom';
import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import {geolocated} from 'react-geolocated';



 require ('../sass/main.scss');


document.addEventListener('DOMContentLoaded', function(){



    class GMap extends React.Component{

// CONTRUCTOR // 

        constructor(props) {
            super(props);
            this.state = {
                center: {
                     lat: this.props.lat,
                     lng: this.props.lng,
                },
                linia: [],
                liniaT: [],
            }
        }

         
 // CENTER VIEW //

        componentWillReceiveProps(nextProps) {
            this.setState({
              center: {
                   lat: nextProps.lat,
                   lng: nextProps.lng,
              },
              
            });
        }

// PETLE //
        componentDidMount() {
            const url = 'https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=%20f2e5503e-927d-4ad3-9500-4ab9e55deb59&apikey=38529d37-eb98-49ad-99f7-8c3c2716e285&type=1'              
            const urlT = 'https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=%20f2e5503e-927d-4ad3-9500-4ab9e55deb59&apikey=38529d37-eb98-49ad-99f7-8c3c2716e285&type=2'     
             
             fetch(url).then(resp => resp.json()).then(resp => {
                 console.log(resp)
 
                 let lines = resp.result.map(elem => {
                     let obj = {
                         nameLine: elem.Lines,
                         lat: elem.Lat,
                         lon: elem.Lon,
                     }
                     return obj
                 })
 
                 this.setState ({
                     linia: lines                
                 })
                
             })  
             fetch(urlT).then(resp => resp.json()).then(resp => {
                console.log(resp)

                let linesT = resp.result.map(elem => {
                    let objT = {
                        nameLine: elem.Lines,
                        lat: elem.Lat,
                        lon: elem.Lon,
                    }
                    return objT
                    console.log(objT)
                })

                this.setState ({                   
                    liniaT: linesT, 
                })
            })  
        }

// MARKERY //

        getBusMarkers = () => {
            let lines = [];
            
       
            if(this.state.linia != undefined && this.state.linia != "") {
                lines = this.state.linia.map( item => {

                    let pos = {
                        lat: item.lat,
                        lng: item.lon,
                    }

                    let objStyle = {
                            text: item.nameLine,
                            color: 'black',
                            fontSize: '15px',
                            fontWeight: 'bold'
                    }

                    return <Marker
                        position={pos}
                        icon={this.busSymbol()}
                        label={ objStyle} >
                    </Marker>
             
                })
            }
            return lines;
        }
    
   
 
        getTramMarkers = () => {
            let linesT = [];
            
       
            if(this.state.liniaT != undefined && this.state.liniaT != "") {
                linesT = this.state.liniaT.map( item => {

                    let posT = {
                        lat: item.lat,
                        lng: item.lon,
                    }

                    let objStyleT = {
                            text: item.nameLine,
                            color: 'black',
                            fontSize: '15px',
                            fontWeight: 'bold'
                    }

                    return <Marker
                        position={posT}
                        icon={this.tramSymbol()}
                        label={ objStyleT} >
                    </Marker>
             
                })
            }
            return linesT;
        }
     
  // SYMBOLS //   
  
       tramSymbol =() => {
            return {
                path: 'M 0 0 L 6 6 L 12 0 L 6 -6 Z ',
                fillColor: '#E90024',
                fillOpacity: 1,               
                scale: 1.2,
                
            };
        }
        busSymbol = () => {
            return {
                path: 'M 0 0 H 8 V 8 H 0 V 0',
                fillColor: '#88007C',
                fillOpacity: 1.2,                
                scale: 1.2,
                
            }


        }
// MAP + POINTS RENDER // 

        render() {    
              let lines = this.getBusMarkers()
             let linesT = this.getTramMarkers()   
            const SimpleMapExampleGoogleMap = withGoogleMap( props =>(
                <GoogleMap
                  defaultZoom={16}
                  center={props.center}
                  defaultOptions={{
                 
                  
                    streetViewControl: false,
                    scaleControl: false,
                    mapTypeControl: false,
                    panControl: false,
                    zoomControl: true,
                    rotateControl: false,
                    fullscreenControl: false
                  }}



                //   mapTypeControl= {false} 
                //   fullscreenControl= {false}
                //   streetViewControl= {false}           
                >                
                {linesT}
                {lines}               
                </GoogleMap>
            ));
     
            return <SimpleMapExampleGoogleMap
                    center={this.state.center}
                    containerElement={
                      <div style={{ height: `100vh` }} />
                    }
                    mapElement={
                      <div style={{ height: `100vh` }} />
                    }
                />
        }
    }
     
    class MapButtons extends React.Component {
        handleClickTram = () => {            
                console.log("tram");        
        }
        handleClickBus = () => {            
                console.log("bus");        
        }

        render() {
            return (
                <div className="buttons">           
                    <div className="arrows"> 
                        <div className="background-arrow"> 
                            <div className="tram-arrow" onClick={ this.handleClickTram }>
                            </div>
                        </div>            
                        <div className="background-arrow" onClick={ this.handleClickBus }>  
                            <div className="bus-arrow">                        
                            </div>
                        </div>    
                    </div>                                 
                </div>  
            );
        }
    }
    class TramButtons extends React.Component {
        handleClickMap = () => {            
                console.log("mapa");        
        }
        handleClickBus = () => {            
                console.log("bus");        
        }
        render() {
            return (
                <div className="buttons">           
                    <div className="arrows"> 
                        <div className="background-arrow"> 
                            <div className="map-arrow" onClick={ this.handleClickMap }>
                            </div>
                        </div>            
                        <div className="background-arrow" onClick={ this.handleClickBus }>  
                            <div className="bus-arrow">                        
                            </div>
                        </div>    
                    </div>                                 
                </div>  
            );
        }
    }      

 
    class Hamburger extends React.Component {
        render() {
            return (
                <div className="menu">
                    <div className="circle"> 
                        <div className="hamburger">
                        </div>
                    </div>
                </div>                                
            );
        }
    }  
  
    class Header extends React.Component {
        render() {
            return (
                <div className="header">
                    <div className="header-text">
                        Legenda:
                    </div>
                    <div className="header-logo">
                        <div className="bus-logo">                
                        </div>
                        <div className="bus-text">  
                            - Autobusy              
                        </div>
                        <div className="tram-logo">                                
                        </div>
                        <div className="tram-text">  
                            - Tramwaje              
                        </div>
                    </div>   
                </div> 
            );
        }
    }
       
    class App extends React.Component {
        render() {
            return (
                
                <div className="container">             
                    <div id="map"> <GMap lat={52.230481} lng={20.986805}/></div>
                    <Header />
                    <Hamburger />
                    <MapButtons /> 
                </div>                
                          
            );
        }
    }
    
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );

});

