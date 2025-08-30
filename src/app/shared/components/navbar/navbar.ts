import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { routes } from "../../../app.routes";
import { filter, map, tap } from "rxjs";
// import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: "navbar",
  imports: [AsyncPipe, RouterLink],
  templateUrl: "./navbar.html",
})

export class Navbar {
  router = inject(Router);

  routes = routes.map(route => ({
    path: route.path,
    title: `${route.title ?? "Mapas en Angular"}`,
  })).filter(route => route.path !== "**");

  // Como Observable
  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    // tap(event => console.log(event)),
    map(event => event.url),
    map(url => routes.find((route) => `/${route.path}` === url)?.title ?? "Mapas")
  );

  // Como señal
  // pageTitle = toSignal(
  //   this.router.events.pipe(
  //     filter(event => event instanceof NavigationEnd),
  //     // tap(event => console.log(event)),
  //     map(event => event.url),
  //     map(url => routes.find((route) => `/${route.path}` === url)?.title ?? "Mapas")
  //   )
  // );
}
