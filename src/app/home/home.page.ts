import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  map!: L.Map;

  constructor() {}
  ongOnInit() {

  }
  ionViewDidEnter() {
    this.map = L.map('mapId').setView([35.7643, -580081], 14);

    // Menambahkan TileLayer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.prd/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

  // Menambahkan marker di Keraton Solo
  const customIcon = L.icon({
    iconUrl: 'https://w7.pngwing.com/pngs/579/974/png-transparent-house-home-maps-location-placeholder-pin-icon.png', 
    iconSize: [41, 41], 
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });
  const marker = L.marker([-7.5662, 110.8275], { icon: customIcon }).addTo(this.map);
  const imageUrl = 'https://th.bing.com/th/id/OIP.AyQ1MfbDtcbEw9nefde9qgHaD8?rs=1&pid=ImgDetMain';

  marker.bindPopup(`
    <b>Keraton Surakarta</b><br>
    Pusat kebudayaan Jawa dan tempat tinggal Sultan Surakarta.<br>
    <img src="${imageUrl}" alt="Keraton Surakarta" style="width: 200px; height: auto;"/>
  `).openPopup();

    // Base maps
  const satelliteLayer = L.tileLayer('https://{s}.google.com/vt?x={x}&y={y}&z={z}&s=Ga', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.google.com/intl/en_us/help/terms_maps.html">Google Maps</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  });

  const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://opentopomap.org/copyright">OpenTopoMap</a>'
  });

  const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  const cartoDBLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
  });

  // Menambahkan layer satellite sebagai base map awal
  satelliteLayer.addTo(this.map);

  // Menambahkan layer control
  const baseMaps = {
    'Satellite': satelliteLayer,
    'Topographic': topoLayer,
    'OpenStreetMap': osmLayer,
    'CartoDB Dark Matter': cartoDBLayer
  };

  L.control.layers(baseMaps).addTo(this.map);
  }

  
}