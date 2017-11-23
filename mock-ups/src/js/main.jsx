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
//  require ('./component/googlemaps.js');

document.addEventListener('DOMContentLoaded', function(){



    class GMap extends React.Component{
        constructor(props) {
            super(props);
            this.state = {
                center: {
                     lat: this.props.lat,
                     lng: this.props.lng,
                },
                linia: []
               
            }
        }

        componentDidMount() {
            const url = 'https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=%20f2e5503e-927d-4ad3-9500-4ab9e55deb59&apikey=38529d37-eb98-49ad-99f7-8c3c2716e285&type=1'              
            
             
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
        }

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
     
        componentWillReceiveProps(nextProps) {
           this.setState({
             center: {
                  lat: nextProps.lat,
                  lng: nextProps.lng,
             },
             
           });
       }
   
       renderMarkers(map, maps) {
        let marker = new maps.Marker({
          position: {lat: 52.2319,
            lng:20.987835},
          map,
          
        });
      }
     
       pinSymbol =() => {
           return {
               path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
               fillColor: '#939393',
               fillOpacity: 1,
               strokeColor: '#676767',
               strokeWeight: 2,
               scale: 1.2,
               title: "asd",

          };
       }
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
        render() {

     
        // <Marker
        //    position={position2}
        //    icon={this.tramSymbol()} > 
        //    </Marker>   
        //    <Marker
        //    position={position3}
        //    icon={this.busSymbol()} >          
               
        //  </Marker>

            let position2 = {
                lat: 52.2319,
                lng:20.989935,
             }
             let position3 = {
                lat: 52.2319,
                lng:20.979935,
             }

             let lines = this.getBusMarkers()
            const SimpleMapExampleGoogleMap = withGoogleMap( props =>(
                <GoogleMap
                  defaultZoom={14}
                  center={props.center}
                  mapTypeControl= {false} 
                  fullscreenControl= {false}
                  streetViewControl= {false}
                  onGoogleApiLoaded={({map, maps}) => this.renderMarkers()}
                  yesIWantToUseGoogleMapApiInternals
                >
                <Marker
                    position={props.center}
                    icon={this.pinSymbol()}
                    label={ {
                        text: "A",
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 'bold'
                    }}
                >
           
                </Marker>
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
     

    class BusLines extends React.Component {
        constructor(props) {
            super(props);
 
            this.state = {
                linia: ''
                              
            }
        }      
            
       componentDidMount(){
            const url = 'https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=%20f2e5503e-927d-4ad3-9500-4ab9e55deb59&apikey=38529d37-eb98-49ad-99f7-8c3c2716e285&type=1'              
           
            
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
        }    
         
            render()
             {             
                 
                let lines;
                
           
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
                return (
                    <div> {linie} </div>   
                                         
                )
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

 
    class BusList extends React.Component {
        render() {
            return (
                <div className="list">
                  
                </div>                                
            );
        }
    }  
    class TramList extends React.Component {
        render() {
            return (
                <div className="list">
                   
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
       

    // class App extends React.Component {
    //     render() {
    //         return (
                
    //             <div className="container">
             
    //                 <div id="map"> <GMap lat={52.230481} lng={20.986805}/></div>
    //                 <Header />
    //                 <Hamburger />
    //                 <MapButtons /> 
                  

    //             </div> 
                            
    //         );
    //     }
    // }
    // class Demo extends React.Component {
    //     render() {
    //       return !this.props.isGeolocationAvailable
    //         ? <div>Your browser does not support Geolocation</div>
    //         : !this.props.isGeolocationEnabled
    //           ? <div>Geolocation is not enabled</div>
    //           : this.props.coords
    //             ? <table>
    //               <tbody>
    //                 <tr><td>latitude</td><td>{this.props.coords.latitude}</td></tr>
    //                 <tr><td>longitude</td><td>{this.props.coords.longitude}</td></tr>
    //                 <tr><td>altitude</td><td>{this.props.coords.altitude}</td></tr>
    //                 <tr><td>heading</td><td>{this.props.coords.heading}</td></tr>
    //                 <tr><td>speed</td><td>{this.props.coords.speed}</td></tr>
    //               </tbody>
    //             </table>
    //             : <div>Getting the location data&hellip; </div>;
    //     }
    //   }
       
    //   export default geolocated({
    //     positionOptions: {
    //       enableHighAccuracy: false,
    //     },
    //     userDecisionTimeout: 5000,
    //   })(Demo);

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

