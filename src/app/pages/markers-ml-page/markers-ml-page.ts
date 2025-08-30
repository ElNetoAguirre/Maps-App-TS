import { DecimalPipe, JsonPipe } from "@angular/common";
import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from "@angular/core";
import maplibregl, { LngLatLike } from "maplibre-gl";
import {v4 as UUIDV4} from "uuid";

interface Marker {
  id: string;
  maplibreMarker: maplibregl.Marker;
}

@Component({
  selector: "markers-ml-page",
  imports: [JsonPipe],
  templateUrl: "./markers-ml-page.html",
})

export class MarkersMlPage implements AfterViewInit{
  divElement = viewChild<ElementRef>("map");
  map = signal<maplibregl.Map | null>(null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 80));
    const element = this.divElement()!.nativeElement;

    const map = new maplibregl.Map({
      container: element, // container ID
      style: "https://tiles.openfreemap.org/styles/bright", // style URL
      center: [-99.1340, 19.4324], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map) {
    map.on("click", (event) => this.mapClick(event))

    map.addControl(new maplibregl.FullscreenControl());
    map.addControl(new maplibregl.NavigationControl());
    map.addControl(new maplibregl.ScaleControl());

    this.map.set(map);
  }

  mapClick(event: maplibregl.MapMouseEvent) {
    if(!this.map()) return;
    const map = this.map()!;
    const coords = event.lngLat;

    const color = "#xxxxxx".replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const maplibreMarker = new maplibregl.Marker({
      color: color,
    })
      .setLngLat(coords)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDV4(),
      maplibreMarker: maplibreMarker
    }

    this.markers.set([newMarker, ...this.markers()]);

    // console.log(this.markers());
  }

  flyToMarker(lngLat: LngLatLike) {
    if(!this.map()) return;

    this.map()?.flyTo({
      center: lngLat,
    })
  }

  deleteMarker(marker: Marker) {
    if(!this.map()) return;
    const map = this.map()!;
    marker.maplibreMarker.remove();
    this.markers.set(this.markers().filter((m) => m.id !== marker.id));
  }
}
