import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
const key = 'pk.eyJ1IjoiemV4YXhhd3lueSIsImEiOiJjazJuZDMzNGYwbXc5M2dueDJhazBmajJmIn0.tRzMu-yiZZEF-0RYt5H8Ow';
const center :any = [31.2357, 30.0444];


@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent {
  coordinates :any
  constructor(
    /**
     *  latitude : doctor['ClinicLatitude'],
        longitude : doctor['ClinicLongitude'],
     */
    // anuglar material dialog
    public dialogRef: MatDialogRef<MapboxComponent> ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    center[0] = data.longitude
    center[1] = data.latitude
  }
  ngAfterViewInit() {
    const map = new mapboxgl.Map({
      accessToken : key,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: 13
    });

    // map.addControl(
    //   new MapboxGeocoder({
    //     accessToken: key,
    //     mapboxgl: mapboxgl
    //   })
    // );

    const marker = new mapboxgl.Marker({
      draggable: false,
      color: "#4D0790",
      })
      .setLngLat(center)
      .addTo(map);
      // function onDragEnd() {
      //   const lngLat = marker.getLngLat();
      //   // to get the coordinates of the center of the map
      //   console.log(`Longitude: ${lngLat.lng} || Latitude: ${lngLat.lat}`);
      //   // set coordinates input value
      //   let coordinates :any = document.getElementById('coordinates');
      //   coordinates.value = lngLat;
      // }
      // marker.on('dragend', onDragEnd);
  }

  set(coordinates:any){
    alert(coordinates);
  }
}
