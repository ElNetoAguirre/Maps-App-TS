import { Component, signal } from "@angular/core";
import { v4 as UUID4 } from "uuid";
import { MiniMapMl } from "../../maps/components/mini-map-ml/mini-map-ml";

interface SitiosProperty {
  id: string;
  name: string;
  description: string;
  lngLat: {lng: number; lat: number};
  tags: string[];
}

@Component({
  selector: "sitios-ml-page",
  imports: [MiniMapMl],
  templateUrl: "./sitios-ml-page.html",
})

export class SitiosMlPage {
  sitios = signal<SitiosProperty[]>([
    {
      id: UUID4(),
      name: "Villa Serenidad",
      description: "Un refugio tranquilo con vistas panorámicas al mar y jardines exuberantes.",
      lngLat: {lng: -0.861526, lat: 41.65649},
      tags: ["Villa", "Mar", "Jardines"],
    },
    {
      id: UUID4(),
      name: "Casa del Sol",
      description: "Una casa luminosa y acogedora con amplias terrazas y piscina privada.",
      lngLat: {lng: -0.862, lat: 41.657},
      tags: ["Casa", "Sol", "Terrazas"],
    },
    {
      id: UUID4(),
      name: "Residencia Esmeralda",
      description: "Elegante propiedad con acabados de lujo y un diseño arquitectónico moderno.",
      lngLat: {lng: -0.863, lat: 41.658},
      tags: ["Casa", "Esmeralda", "Acabados"],
    },
    {
      id: UUID4(),
      name: "Hacienda del Lago",
      description: "Encantadora hacienda con acceso directo al lago y un entorno natural impresionante.",
      lngLat: {lng: -0.864, lat: 41.659},
      tags: ["Casa", "Lago", "Hacienda"],
    },
    {
      id: UUID4(),
      name: "Zócalo CDMX",
      description: "Centro Histórico de la Ciudad de México, Centro, Ciudad de México, CDMX.",
      lngLat: {lng: -99.1341, lat: 19.4325},
      tags: ["CDMX", "Zócalo", "Centro"],
    },
    {
      id: UUID4(),
      name: "Cañon del Sumidero, Chiapas",
      description: "Desfiladero profundo y estrecho en el parque nacional Cañón del Sumidero accesible mediante paseos en bote.",
      lngLat: {lng: -93.1207, lat: 16.8276},
      tags: ["Cañón", "Naturaleza", "Chiapas"],
    },
    {
      id: UUID4(),
      name: "Cenote Azul, Quintana Roo",
      description: "Hermoso Cenote de agua dulce y fresca, especial para relajarte y pasarla bien.",
      lngLat: {lng: -87.2519, lat: 20.4888},
      tags: ["Cenote", "Naturaleza", "Quintana Roo"],
    },
    {
      id: UUID4(),
      name: "Chichén Itzá, Yucatán",
      description: "Sitio arqueológico con ruinas excavadas de la gran ciudad maya, con una emblemática pirámide escalonada.",
      lngLat: {lng: -88.5677, lat: 20.6843},
      tags: ["Arqueología", "Mayas", "Ruinas", "Yucatán"],
    },
  ]);
}
