enum TOAST_SEVERITY {
    SUCCCESS = 'success',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

enum MAPBOX_STYLEURI {
    STREETS = "mapbox://styles/mapbox/streets-v11",
    OUTDOORS = "mapbox://styles/mapbox/outdoors-v11",
    LIGHT = "mapbox://styles/mapbox/light-v10",
    DARK = "mapbox://styles/mapbox/dark-v10",
    SATELLITE = "mapbox://styles/mapbox/satellite-v9",
    SATELLITE_STREETS = "mapbox://styles/mapbox/satellite-streets-v11",
    NAVIGATION_DAY = "mapbox://styles/mapbox/navigation-day-v1",
    NAVIGATION_NIGHT = "mapbox://styles/mapbox/navigation-night-v1",
}

enum ORIENTATION {
    NORTH = "NORTH",
    SOUTH = "SOUTH",
    EAST = "EAST",
    WEST = "WEST",
}

enum MapControlPosition {
    TOP_RIGHT = "top-right",
    TOP_LEFT = "top-left",
    BOTTOM_RIGHT = "bottom-right",
    BOTTOM_LEFT = "bottom-left",
}

export {
    TOAST_SEVERITY,
    MAPBOX_STYLEURI,
    ORIENTATION,
    MapControlPosition,
};
