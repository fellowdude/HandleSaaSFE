import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatFormField } from '@angular/material';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-maps-location',
  templateUrl: './maps-location.component.html',
  styleUrls: ['./maps-location.component.scss']
})
export class MapsLocationComponent implements OnInit {
  @Output() sendInfo: EventEmitter<any> = new EventEmitter<any>();
  @Input() title: string;
  textSearch: string;
  latlng: any;
  listPlaces: Array<any> = [];
  latlngC: string;
  location: string;
  lat: number;
  lng: number;
  zoom: number;
  label: string;
  myLocation: marker;
  markers: marker[];
  address: string;
  showMaps = false;
  editAddressArrayPosition: number;
  private geoCoder;
  @ViewChild('search', { static: true })
  @ViewChild('address', { static: true }) lbladdress: MatFormField;
  @ViewChild('lat', { static: true }) lbllat: MatFormField;
  @ViewChild('lng', { static: true }) lblng: MatFormField;

  public searchElementRef: ElementRef;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit() {
    this.showMaps = false;
    this.myLocation = {};
    this.latlngC = '';
    this.location = '';
    this.listPlaces = [];
  }

  searchCoordinates(coordinates: any) {
    this.latlng = undefined;
    if(coordinates.includes(',') && coordinates.length > 18) {
      setTimeout(() => {
        this.latlng = coordinates;
        if(coordinates != '') {
          let arrayCoordinates = [];
          arrayCoordinates = coordinates.split(',');
          this.myLocation.lat = arrayCoordinates[0].trim();
          this.myLocation.lng = arrayCoordinates[1].trim();
        }
       }, 1000);
    }
  }

  async searchLocation(location: any) {
    let stopTyping = this.location;
    setTimeout(async () => {
        if (stopTyping == this.location) {
            if (this.location) {
              const provider = new OpenStreetMapProvider();
              this.latlng = undefined;
              this.listPlaces = [];
              const results: any = await provider.search({ query: location });
              for(const r of results) {
                this.listPlaces.push(r);
              }
              console.log(this.listPlaces);
            } else {
              console.log("no")
            }
        }
    }, 2000);
  }

  choosePlace(i: any) {
    console.log('i', i)
    this.latlng = undefined;
    setTimeout(() => { 
      this.latlng = this.listPlaces[i].y.toString() + ',' + this.listPlaces[i].x.toString();
      this.myLocation.lat = this.listPlaces[i].y;
      this.myLocation.lng = this.listPlaces[i].x;
     }, 1000);
  }

  assignCoords(event) {
    console.log(event)
    this.myLocation.lat = event.lat;
    this.myLocation.lng = event.lng;
  }

  mapClicked(event) {

  }
  close() {
    this.showMaps = false;
    this.latlngC = '';
    this.location = '';
    this.listPlaces = [];
    this.latlng = undefined;
  }
  markerDragEnd($event: MouseEvent) {
    this.myLocation.lat = $event.coords.lat;
    this.myLocation.lng = $event.coords.lng;
    this.getAddress();
  }

  open(lat?, lng?, pos?, address?) {
    this.showMaps = true;
    this.myLocation.lat = lat;
    this.myLocation.lng = lng;
    this.myLocation.address = address;
    this.latlng = this.myLocation.lat.toString() + ',' + this.myLocation.lng.toString()
    if (pos !== undefined) {
      this.editAddressArrayPosition = pos;
    }

    /*
      this.textSearch = '';
      if (lat && lng && pos !== undefined) {
        this.editAddressArrayPosition = pos;
        this.myLocation.lat = lat;
        this.myLocation.lng = lng;
        this.getCustomLocation();
      } else {
        this.editAddressArrayPosition = undefined;
        this.getMyLocation();
      } */
  }

  async getCustomLocation() {
    this.mapsAPILoader.load().then(async () => {
      this.myLocation.label = 'L';
      this.myLocation.draggable = true;
      this.zoom = 16;
      this.geoCoder = new google.maps.Geocoder();
      this.getAddress();
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.myLocation.lat = place.geometry.location.lat();
          this.myLocation.lng = place.geometry.location.lng();
          this.zoom = 12;
          this.getAddress();
        });
      });
    });
  }

  async getMyLocation() {
    // load Places Autocomplete
    /*    this.mapsAPILoader.load().then(async () => {
         this.geoCoder = new google.maps.Geocoder();
         await this.setCurrentLocation();
         const autocomplete = new google.maps.places.Autocomplete(
           this.searchElementRef.nativeElement,
           {
             types: ['address']
           }
         );
         autocomplete.addListener('place_changed', () => {
           this.ngZone.run(() => {
             // get the place result
             const place: google.maps.places.PlaceResult = autocomplete.getPlace();
   
             // verify result
             if (place.geometry === undefined || place.geometry === null) {
               return;
             }
   
             // set latitude, longitude and zoom
             this.myLocation.lat = place.geometry.location.lat();
             this.myLocation.lng = place.geometry.location.lng();
             this.zoom = 12;
             this.getAddress();
           });
         });
       }); */
  }

  async setCurrentLocation() {
    /*   if ('geolocation' in navigator) {
        await navigator.geolocation.getCurrentPosition(position => {
          this.myLocation.lat = position.coords.latitude;
          this.myLocation.lng = position.coords.longitude;
          this.myLocation.label = 'L';
          this.myLocation.draggable = true;
          this.zoom = 16;
          this.getAddress();
        });
      } */
  }

  sentLocalitation() {
    this.sendInfo.emit({ newLocation:  this.myLocation , pos: this.editAddressArrayPosition });
    this.myLocation.address = '';
    this.myLocation.lat = 0;
    this.myLocation.lng = 0;
    this.close();
    /*     this.sendInfo.emit({newLocation: this.myLocation, pos: this.editAddressArrayPosition});
        this.close(); */
  }

  getAddress() {
    /* this.geoCoder.geocode(
      { location: { lat: this.myLocation.lat, lng: this.myLocation.lng } },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.zoom = 16;
            this.myLocation.address = results[0].formatted_address;
            this.address = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    ); */
  }
}

interface marker {
  lat?: number;
  lng?: number;
  label?: string;
  draggable?: boolean;
  _id?: string;
  marker?: string;
  address?: string;
}
