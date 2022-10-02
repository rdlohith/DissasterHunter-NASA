define(['./worldwind.min'],
    function (WorldWind) {
        "use strict";

        function shapeConfigurationCallback(geometry, properties) {
            var configuration = {};
            configuration.attributes = new WorldWind.ShapeAttributes(null);
            configuration.attributes.drawOutline = true;
            configuration.attributes.outlineColor = new WorldWind.Color(
                0.6 * configuration.attributes.interiorColor.red,
                0.3 * configuration.attributes.interiorColor.green,
                0.3 * configuration.attributes.interiorColor.blue,
                1.0);
            configuration.attributes.outlineWidth = 1.0;
            return configuration;
        };

        function TectonicPlateLayer() {

            var plateBoundariesLayer = new WorldWind.RenderableLayer("Tectonic Plates");
            var plateBoundariesJSON = new WorldWind.GeoJSONParser("./new_eq_app_files/plate_boundaries.json");
            plateBoundariesJSON.load(null, shapeConfigurationCallback, plateBoundariesLayer);
            return plateBoundariesLayer;
        }
        return TectonicPlateLayer;
    });
