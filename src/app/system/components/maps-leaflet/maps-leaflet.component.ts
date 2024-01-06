import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
/* import { icon, latLng, marker, tileLayer } from 'leaflet'; */
import * as L from 'leaflet';

@Component({
  selector: 'app-maps-leaflet',
  templateUrl: './maps-leaflet.component.html',
  styleUrls: ['./maps-leaflet.component.scss']
})
export class MapsLeafletComponent implements OnInit {
  @Input() initialCoordinates: any;
  private initialZoom = 17;
  private maxZoomAlowwed = 19;
  private initialLat: any;
  private initialLon: any;
  private iconRetinaUrl = 'assets/marker-icon-2x.png';
  private iconUrl = 'assets/marker-icon.png';
  private shadowUrl = 'assets/marker-shadow.png';
  lat: number = 0;
  lng: number = 0;
  options: any;
  layers: any;
  @Output() coordinates: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  private map: any;

  private initMap(lon: number, lat: number): void {
    this.map = L.map('map', {
      center: [lon, lat],
      zoom: this.initialZoom
    });

    const tiles = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxZoom: this.maxZoomAlowwed,
      subdomains:['mt0','mt1','mt2','mt3']
    });

    /* const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: this.maxZoomAlowwed,
      minZoom: this.initialZoom,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }); */

    this.layers = L.marker([this.initialLat, this.initialLon], {
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: this.iconRetinaUrl,
          iconRetinaUrl: this.iconUrl,
          shadowUrl: this.shadowUrl
        })
      });
    
    this.layers.addTo(this.map);

    tiles.addTo(this.map);
  }

  changeMousePosition() {
    this.map.on("click", e => {
      this.map.removeLayer(this.layers);
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
      this.sendCoordinates(e.latlng.lat, e.latlng.lng);
      this.layers = L.marker([e.latlng.lat, e.latlng.lng], {
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: this.iconRetinaUrl,
          iconRetinaUrl: this.iconUrl,
          shadowUrl: this.shadowUrl
        })
      });

      this.layers.addTo(this.map);
    });
  }

  sendCoordinates(lat, lng) {
    this.coordinates.emit({lat, lng});
  }


  ngOnInit(): void {
    let arrayCoordinates = []
    arrayCoordinates = this.initialCoordinates.split(',');
    this.initialLat = arrayCoordinates[0].trim();
    this.initialLon = arrayCoordinates[1].trim();
    console.log("iniciando mapa", this.initialLat, this.initialLon)
    this.initMap(this.initialLat, this.initialLon)
  }

/*   ngOnInit(): void {
    let arrayCoordinates = []
    arrayCoordinates = this.initialCoordinates.split(',');
    this.initialLat = arrayCoordinates[0].trim();
    this.initialLon = arrayCoordinates[1].trim();
    this.options = {
      layers: [
        tileLayer(
          'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
          { maxZoom: this.maxZoomAlowwed,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
          }),
      ],
      zoom: this.initialZoom,
      center: latLng(this.initialLat, this.initialLon)
    };

    this.layers = [
      marker([this.initialLat, this.initialLon], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: this.iconRetinaUrl,
          iconRetinaUrl: this.iconUrl,
          shadowUrl: this.shadowUrl
        })
      })
    ];

    this.lat = this.initialLat;
    this.lng = this.initialLon;

  }

  changeMousePosition($event: any) {
    console.log($event)
    console.log($event.latlng.lat)
    const lat = $event.latlng.lat
    const lng = $event.latlng.lng
    this.layers = [
      marker([lat, lng], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: this.iconRetinaUrl,
          iconRetinaUrl: this.iconUrl,
          shadowUrl: this.shadowUrl
        })
      })
    ];
    this.lat = lat;
    this.lng = lng;
  } */

}