import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from "@angular/core";
import mapboxgl, { LngLatLike } from "mapbox-gl"; // or "const mapboxgl = require("mapbox-gl");"
import { environment } from "../../../environments/environment";
import { JsonPipe, DecimalPipe } from "@angular/common";
import {v4 as UUIDV4} from "uuid";

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: "markers-page",
  imports: [JsonPipe],
  templateUrl: "./markers-page.html",
})

export class MarkersPage implements AfterViewInit{
  divElement = viewChild<ElementRef>("map");
  map = signal<mapboxgl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 80));
    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [-99.1340, 19.4324], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: mapboxgl.Map) {
    map.on("click", (event) => this.mapClick(event))

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new mapboxgl.ScaleControl());

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent) {
    if(!this.map()) return;
    const map = this.map()!;
    const coords = event.lngLat;

    const color = "#xxxxxx".replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapboxMarker = new mapboxgl.Marker({
      color: color,
    })
      .setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDV4(),
      mapboxMarker: mapboxMarker,
    }

    this.markers.set([newMarker, ...this.markers()]);

    // console.log(this.markers());
  }

  flyToMarker(lngLat: LngLatLike) {
    if(!this.map()) return;

    this.map()?.flyTo({
      center: lngLat,
    });
  }

  deleteMarker(marker: Marker) {
    if(!this.map()) return;
    const map = this.map()!;
    marker.mapboxMarker.remove();
    this.markers.set(this.markers().filter((m) => m.id !== marker.id));
  }
}
