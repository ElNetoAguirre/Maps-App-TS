import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from "@angular/core";
import maplibregl from "maplibre-gl";

@Component({
  selector: "mini-map-ml",
  imports: [],
  templateUrl: "./mini-map-ml.html",
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `,
})

export class MiniMapMl implements AfterViewInit {
  divElement = viewChild<ElementRef>("map");
  lngLat = input.required<{lng: number; lat: number}>();
  zoom = input<number>(14);


  async ngAfterViewInit() {
     if(!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 80));
    const element = this.divElement()!.nativeElement;

    const map = new maplibregl.Map({
      container: element, // container ID
      style: "https://tiles.openfreemap.org/styles/bright", // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false,
      pitch: 30,
    });

    new maplibregl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
