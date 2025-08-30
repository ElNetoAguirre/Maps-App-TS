import { Routes } from "@angular/router";
import { FullscreenMapPage } from "./pages/fullscreen-map-page/fullscreen-map-page";
import { SitiosPage } from "./pages/sitios-page/sitios-page";
import { MarkersPage } from "./pages/markers-page/markers-page";
import { FullscreenMapMlPage } from "./pages/fullscreen-map-ml-page/fullscreen-map-ml-page";
import { SitiosMlPage } from "./pages/sitios-ml-page/sitios-ml-page";
import { MarkersMlPage } from "./pages/markers-ml-page/markers-ml-page";

export const routes: Routes = [
  {
    path: "fullscreen",
    component: FullscreenMapPage,
    title: " Mapa pantalla completa - Mapbox",
  },
  {
    path: "sitios",
    component: SitiosPage,
    title: "Sitios de interés - Mapbox",
  },
  {
    path: "markers",
    component: MarkersPage,
    title: "Marcadores - Mapbox",
  },
  {
    path: "fullscreen-ml",
    component: FullscreenMapMlPage,
    title: " Mapa pantalla completa - MapLibre",
  },
  {
    path: "sitios-ml",
    component: SitiosMlPage,
    title: "Sitios de interés - MapLibre",
  },
  {
    path: "markers-ml",
    component: MarkersMlPage,
    title: "Marcadores - MapLibre",
  },
  {
    path: "**",
    redirectTo: "fullscreen",
  },
];
