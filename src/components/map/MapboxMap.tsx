// MapboxMap.tsx
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  useSearchState,
  Result,
  useSearchActions,
} from "@yext/search-headless-react";
import mapboxgl, { Map } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Location from "../../types/locations";
import { CardComponent } from "@yext/search-ui-react";

interface Coordinate {
  latitude?: number;
  longitude?: number;
}

type CoordinateGetter<TEntity> = (
  result: Result<TEntity>
) => Coordinate | undefined;

interface MapProps<TEntity> {
  mapboxAccessToken: string;
  mapboxStyle?: string | mapboxgl.Style;
  PinComponent?: CardComponent<TEntity>;
  getCoordinate: CoordinateGetter<TEntity>;
  defaultCenter?: mapboxgl.LngLatLike;
}

function MapboxMap<TEntity>({
  mapboxAccessToken,
  PinComponent,
  getCoordinate,
  mapboxStyle = "mapbox://styles/mapbox/streets-v11",
  defaultCenter = [-122.33, 47.6],
}: MapProps<TEntity>): JSX.Element {
  mapboxgl.accessToken = mapboxAccessToken;

  //TODO: Don't just cast this, use TS Generics
  const results = useSearchState(
    (s) => s.vertical.results
  ) as any as Result<Location>[];

  const searchActions = useSearchActions();

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (map.current) {
      return;
    } else {
      map.current = new mapboxgl.Map({
        accessToken: import.meta.env.YEXT_PUBLIC_MAPBOX_API_KEY,
        container: mapContainer.current || "",
        style: mapboxStyle,
        interactive: true,
        // center: center,
        zoom: 9,
      });
      map.current.addControl(new mapboxgl.NavigationControl());
    }
    searchActions.setVerticalLimit(50);
    searchActions.executeVerticalQuery();
  }, []);

  useEffect(() => {
    if (results && map.current) {
      const bounds = new mapboxgl.LngLatBounds();

      results?.forEach((result, i) => {
        const location = result.rawData;

        if (
          location.yextDisplayCoordinate &&
          location.yextDisplayCoordinate?.latitude &&
          location.yextDisplayCoordinate?.longitude
        ) {
          const coord = {
            lat: location.yextDisplayCoordinate.latitude,
            lng: location.yextDisplayCoordinate.longitude,
          };
          const el = document.createElement("div");
          PinComponent && ReactDOM.render(<PinComponent result={result} />, el);
          el.className = "marker";
          new mapboxgl.Marker(el)
            .setLngLat(coord)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Object is possibly 'null'.
            .addTo(map.current);
          // }
          bounds.extend([coord.lng, coord.lat]);
        }
      });

      if (!bounds.isEmpty()) {
        map.current.setCenter(bounds.getCenter());
        map.current.fitBounds(bounds, {
          padding: {
            top: 30,
            bottom: 30,
            left: 30,
            right: 30,
          },
          maxZoom: 15,
        });
      }
    }
  }, [results]);

  return (
    <div className="h-full w-full">
      <div ref={mapContainer} className="map-container h-full w-full" />
    </div>
  );
}

export default MapboxMap;
