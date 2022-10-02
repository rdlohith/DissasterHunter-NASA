define(['./worldwind.min'],
    function (WorldWind) {
        "use strict";

        function EQPlacemark(coordinates, coloring, magnitude, time, query) {

            var longitude = coordinates[0],
                latitude = coordinates[1],
                depth = coordinates[2];

            var placemark, highlightAttributes,
                placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

            var green = ('rgb(0, 255, 0)'),
                yellow = ('rgb(255, 255, 0)'),
                orange = ('rgb(255, 165, 0)'),
                red = ('rgb(255, 0, 0)'),
                white = ('rgb(255, 255, 255)');

            function getColor() {
                var color = {};

                if (coloring == 'magnitude') {
                    if (0 < magnitude && magnitude <= 3) {
                        color.code = green;
                        color.name = "green";
                    } else if (3 < magnitude && magnitude <= 5) {
                        color.code = yellow;
                        color.name = "yellow";
                    } else if (5 < magnitude && magnitude <= 7) {
                        color.code = orange;
                        color.name = "orange";
                    } else if (7 < magnitude && magnitude <= 10) {
                        color.code = red;
                        color.name = "red";
                    } else {
                        color.code = white;
                        color.name = "white";
                    }
                }

                else if (coloring == 'time') {
                    var toDate = new Date(query.ToDate);
                    var fromDate = new Date(query.FromDate);
                    var deltaT = toDate - time;
                    var percentInterval = 100 * deltaT / (toDate - fromDate);

                    if (0 < percentInterval && percentInterval <= 10) {
                        color.code = red;
                        color.name = "red";
                    } else if (10 < percentInterval && percentInterval <= 30) {
                        color.code = orange;
                        color.name = "orange";
                    } else if (30 < percentInterval && percentInterval <= 60) {
                        color.code = yellow;
                        color.name = "yellow";
                    } else {
                        color.code = green;
                        color.name = "green";
                    }
                }
                return color;
            }

            function renderCircle() {

                var canvas = document.createElement("canvas"),
                    ctx2d = canvas.getContext("2d");
                var size = Math.abs(magnitude * 5),
                    c = size / 2 - 0.5,
                    outerRadius = size / 2.2;

                canvas.width = size;
                canvas.height = size;

                ctx2d.fillStyle = getColor().code;

                ctx2d.globalAlpha = 0.85;
                ctx2d.arc(c, c, outerRadius, 0, 2 * Math.PI, false);
                ctx2d.fill();

                return canvas;
            }

            function getImage() {
                var color = getColor().name;

                return './images/dots/' + color + ".svg";
            }

            placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude, -depth * 1000));
            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
            placemark.data = this;
            placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            var dotImage = new WorldWind.ImageSource(renderCircle());
            placemarkAttributes.imageScale = magnitude / 1e1;
            placemarkAttributes.imageSource = dotImage;
            placemark.attributes = placemarkAttributes;
            highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            highlightAttributes.imageScale = 1.2;
            highlightAttributes.imageSource = dotImage;
            placemark.highlightAttributes = highlightAttributes;
            this.placemark = placemark;
            this.placemark.center = new WorldWind.Position(latitude, longitude);
        }
        return EQPlacemark;
    }
);
