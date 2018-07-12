
import * as L from 'leaflet';

export class MapState {
  public static center = L.latLng([59.931645, 10.753526]);
  public static bounds = L.latLngBounds([[57.720147, 3.402159], [71.342626, 32.850698]]);
  public static country: any;
  public static region: any;
  public static selectedFieldId: string = null;
  public static selectedSectorId: string = null;
  public static selectedRouteId: string = null;
  public static selectedRockId: string = null;
  public static fieldsArray: any = [];
  public static layersArray: L.Layer [] = [];
  public static sectorsArray: any [] = [];
  public static routesArray: any [] = [];
  public static rocksArray: any [] = [];
  public static regions: any [] = [];
}
