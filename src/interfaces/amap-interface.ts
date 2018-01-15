/* ==================================================================Basic =======================================================  o*/

export declare var AMap: any;

export declare var AMapUI: any;

export interface MapOptions {
    zoom: number; //地图显示的缩放级别
    center: LngLat; //地图中心点坐标值
    labelzIndex: number;
    zooms: number[];  //在PC上，默认为[3,18]，取值范围[3-18]；在移动设备上，默认为[3,19],取值范围[3-19]
    lang: string; //language;
}

export declare class Map {
    constructor(container: string | HTMLDivElement, options?: MapOptions);
    getZoom(): number;
    getLayers(): Array<any>;
    getCenter(): LngLat;
    remove(overlays: Marker[] | Polygon[] | Polyline | Marker): void;
    addControl(obj: Object): void;  //参数可以是插件列表中的任何插件对象，如：ToolBar、OverView、Scale等。
    setZoomAndCenter(zoomLevel: number, center: LngLat): void;
    getContainer(): HTMLElement;
    destroy(): void;
}

export declare class Size {
    constructor(width: number, height: number)
    getWidth(): number;
    getHeight(): number;
    toString(): string;   //以字符串形式返回尺寸大小对象
}

export interface LngLat {
    lng: number;
    lat: number;
}

export declare class LngLat {
    constructor(lng: number, lat: number)
    offset(w: number, s: number): LngLat;
    distance(c: LngLat | LngLat[]): number;
    getLng(): number;
    getLat(): number;
    equals(c: LngLat): boolean;
    toString(): string;
}

export declare class Pixel {
    constructor(x: number, y: number);
    getX(): number;
    getY(): number;
    equals(point: Pixel): boolean;
    toStrong(): string;
}

/* ======================================================Overlays============================================================== */

export interface MapsEvent {
    lnglat: LngLat;
    pixel: Pixel;
    type: string;
    target: Object;
}

export declare class Overlays {
    on(type: string, fun: (event: MapsEvent | MoveEvent) => void): void;
}

export interface MarkerOptions {
    map: Map;
    position: number[]; //[lng, lat];
    offset?: Pixel;
    content?: string | HTMLDocument;
}

export declare class Marker extends Overlays {
    constructor(options: MarkerOptions);
    getPosition(): LngLat;
    moveAlong(path: LngLat[], speed: number);
    stopMove(): void;
    pauseMove(): void;
    resumeMove(): void;
    moveTo(path: LngLat, speed: number): void;
    hide(): void;
    show(): void;
}

export interface MoveEvent {
    passedPath: LngLat[];
}

export interface SimpleMarkerOptions extends MarkerOptions {
    iconStyle: string | HTMLElement;
    iconLabel: string | object;
}

export declare class SimpleMarker extends Marker {
    setIconStyle(style: string | object): void;
    setIconThemeAndStyle(theme: string, style: string): void;
    setIconLabel(label: string | object): void;
    showPositionPoint(): void;
    hidePositionPoint(): void;
}

export interface PolygonOptions {
    map: Map;
    path: LngLat[] | LngLat[][];
    zIndex?: number;
    fillColor?: string;
    fillOpacity?: number; //小数
    strokeColor?: string;
    strokeWeight?: number;
    strokeStyle?: string; // solid or dashed;
}

export declare class Polygon extends Overlays {
    constructor(options: PolygonOptions)
    getPath(): LngLat[];
    setPath(): LngLat[] | LngLat[][];
    setMap(map: Map): void;
}

export interface IconOptions {
    size?: Size;
    imageOffset?: Pixel;
    image?: string; //image url;
    imageSize?: Size;
}

export declare class Icon {
    constructor(options: IconOptions)
    getImageSize(): Size;
    setImageSize(size: Size): void;
}

export interface PolylineOptions {
    map: Map;
    path: LngLat[]
    zIndex?: number;
    bubble?: boolean; //是否将覆盖物的鼠标或touch等事件冒泡到地图上 
    strokeWeight?: number;
    strokeColor?: string; //线条颜色，使用16进制颜色代码赋值
    strokeOpacity?: number; //小数
    strokeStyle?: string; // value: solid, dashed
}

export declare class Polyline extends Overlays {
    constructor(options: PolylineOptions)
    getPath(): LngLat[];
    setPath(path: LngLat[]): void;
    setMap(map: Map): void;
    show(): void;
    hide(): void;
}

/* ==================================================================InfoWindow================================================================= */

export interface InfoWindowOptions {
    autoMove?: boolean;
    content: string | HTMLElement;
    isCustom?: boolean;
    offset?: Pixel;
    position?: LngLat;
    showShadow?: boolean;
    size?: Size;
}

export declare class InfoWindow {
    constructor(options: InfoWindowOptions);
    open(map: Map, pos: LngLat): void;
    close(): void;
    getIsOpen(): boolean;
    setContent(content: string | HTMLDocument): void;
    setPosition(pos: LngLat): void;
    getPosition(): LngLat;
    setSize(size: Size): void;
    getSize(): Size;
}

/* ================================================================Basic control================================================================= */

export interface BasicControlOptions {
    theme?: string;
    position?: string | Object;    // string:  - lt left top, lm left middle lb left bottom ct center top, cb center bottom, rt right top rm right middle, rb right bottom 
}

export interface ZoomOptions extends BasicControlOptions {
    showZoomNum: boolean;
    theme: string
}

export declare class Zoom {
    constructor(options: ZoomOptions)
    zoomIn(): void;
    zoomOut(): void;
    showZoomNum(): void;
    hideZoomNum(): void;
}

export declare class BasicControl extends Zoom {
    constructor(options: BasicControlOptions)
    Zoom(options: BasicControlOptions): void;
}


/* =====================================================================Marker cluster============================================================ */

export interface MarkerClustererOptions {
    gridSize: number; // 聚合计算时网格的像素大小，默认60
    minClusterSize?: number;
    maxZoom?: number;
}

export declare class MarkerClusterer {
    constructor(map: Map, markers: Marker[], options: MarkerClustererOptions)
    clearMarkers(): void;
    addMarker(marker: Marker): void;
    removeMarker(marker: Marker): void;
    getGridSize(): number;
    getMap(): Map;
    getMarkers(): Marker[];
    addMarkers(markers: Marker[]): void;
    removeMarkers(markers: Marker[]): void;
}

/* ===========================================================Util============================================================ */

export interface Location extends LngLat {
    O: number;
    M: number;
}

export interface ConvertorResult {
    info: string;
    locations: Location[]
}
