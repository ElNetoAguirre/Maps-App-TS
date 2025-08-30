import { DecimalPipe, JsonPipe } from "@angular/common";
import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from "@angular/core";
import maplibregl from "maplibre-gl";

@Component({
  selector: "fullscreen-map-ml-page",
  imports: [DecimalPipe, JsonPipe],
  templateUrl: "./fullscreen-map-ml-page.html",
  styles: `
    div {
      width: 100vw;
      height: calc(100vh - 64px);
    }

    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 40px;
      right: 10px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `,
})

export class FullscreenMapMlPage implements AfterViewInit {
  divElement = viewChild<ElementRef>("map");
  map = signal<maplibregl.Map | null>(null);

  zoom = signal(9);
  cordinates = signal({lng: -99.1, lat: 19.5});

  zoomEffect = effect(() => {
    if(!this.map()) return;

    this.map()?.setZoom(this.zoom());
    // this.map()?.zoomTo(this.zoom());
  });

  async ngAfterViewInit() {
    if(!this.divElement()) return;
    await new Promise((resolve) => setTimeout(resolve, 80));
    const element = this.divElement()?.nativeElement;
    const {lat, lng} = this.cordinates();

    maplibregl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.3.0/dist/mapbox-gl-rtl-text.js",
      true
    );

    const map = new maplibregl.Map({
      container: element, // container id
      style: "https://tiles.openfreemap.org/styles/bright", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom() // starting zoom
    });

    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map) {
    map.on("zoomend", (event) => {
      const newZoom = event.target.getZoom()
      this.zoom.set(newZoom);
    });

    map.on("moveend", () => {
      const center = map.getCenter();
      this.cordinates.set(center);
    });

    map.addControl(new maplibregl.FullscreenControl());
    map.addControl(new maplibregl.NavigationControl());
    map.addControl(new maplibregl.ScaleControl());

    this.map.set(map);
  }
}
