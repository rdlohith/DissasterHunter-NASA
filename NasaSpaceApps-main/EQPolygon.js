define(['./worldwind.min'],
    function (WorldWind) {
        "use strict";

        function EQPolygon(coordinates) {

            var latitude = coordinates[1],
                longitude = coordinates[0],
                depth = coordinates[2];

            var height = 0.12;

            var polyhighlightAttributes;

            var polygonAttributes = new WorldWind.ShapeAttributes(null);

            polygonAttributes.drawInterior = true;
            polygonAttributes.drawOutline = false;
            polygonAttributes.outlineColor = WorldWind.Color.YELLOW;
            polygonAttributes.interiorColor = WorldWind.Color.YELLOW;
            polygonAttributes.applyLighting = true;
            var boundaries = [];
            boundaries[0] = [];
            var altitude = Math.abs(depth) * -1000;
            depth = Math.abs(depth);
            boundaries[0].push(new WorldWind.Position(latitude - 1, longitude - 1, altitude));
            boundaries[0].push(new WorldWind.Position(latitude - 1, longitude + 1, altitude));
            boundaries[0].push(new WorldWind.Position(latitude + 1, longitude + 1, altitude));
            boundaries[0].push(new WorldWind.Position(latitude + 1, longitude - 1, altitude));

            this.polygon = new WorldWind.Polygon(boundaries, null);
            this.polygon.altitudeMode = WorldWind.ABSOLUTE;
            this.polygon.extrude = true;
            this.polygon.textureCoordinates = [
                [new WorldWind.Vec2(0, 0), new WorldWind.Vec2(1, 0), new WorldWind.Vec2(1, 1), new WorldWind.Vec2(0, 1)]
            ];
            polyhighlightAttributes = new WorldWind.ShapeAttributes(polygonAttributes);
            polyhighlightAttributes.outlineColor = WorldWind.Color.RED;
            polyhighlightAttributes.interiorColor = WorldWind.Color.RED;
            polygonAttributes.highlightAttributes = polyhighlightAttributes;
            this.polygon.highlightAttributes = polyhighlightAttributes;
            this.polygon.attributes = polygonAttributes;
            this.polygon.center = new WorldWind.Position(latitude, longitude);
        }
        return EQPolygon;
    });
