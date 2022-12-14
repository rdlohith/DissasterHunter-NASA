define([''], function (ww) {
    function Cylinder(coord, maginitude) {

        var color = WorldWind.Color.BLUE;
        var lat = coord[1],
            long = coord[0],
            depth = coord[2];
        var format = false;
        var radius = .12;
        var center = new WorldWind.Location(lat, long);
        var height = maginitude;
        var earthRadiusInfo = {
            earthRadiusInKm: 6317,
            earthRadiusInM: 6317 * 1000
        };

        this.initialHeight = height;

        var EarthToCartesian = function (longitude, latitude) {
            var R = earthRadiusInfo.earthRadiusInKm;
            var x = R * Math.cos(latitude) * Math.cos(longitude);
            var y = R * Math.cos(latitude) * Math.sin(longitude);
            var z = R * Math.sin(latitude);
            return {
                x: x,
                y: y,
                z: z
            };
        };

        var CartesianToEarth = function (x, y, z) {
            var R = earthRadiusInfo.earthRadiusInKm;
            var lat = Math.asin(z / R);
            var long = Math.atan2(x, y);
            return new WorldWind.Location(lat, long);
        };

        this.color = color;
        this.center = center;
        this.radius = radius;
        this.height = height;

        var coordinates = EarthToCartesian(center.longitude, center.latitude);

        function getXCoordinate(angle) {
            return center.longitude + radius * Math.sin(angle);
        }

        function getYCoordinate(angle) {
            return center.latitude + radius * Math.cos(angle);
        }

        var numPoints = 10;
        var angles = [];
        var fullCircle = 2 * Math.PI;
        var step = fullCircle / numPoints;
        var start = 0;

        for (var idx = 0; idx < numPoints; idx++) {
            angles.push(start);
            start += step;
        }

        var locations = angles.map(function (angle) {
            var x = getXCoordinate(angle);
            var y = getYCoordinate(angle);
            return [x, y];
        });

        var altitude = Math.abs(depth) * -1000 * 4;
        var positions = locations.map(function (location) {
            var loc = CartesianToEarth(location[0], location[1], coordinates.z)
            var lat = location[1];
            var long = location[0];
            return new WorldWind.Position(lat, long, altitude);
        });

        var boundaries = [positions, []];

        for (var idx = 0; idx < positions.length; idx += 1) {
            boundaries[1].push(new WorldWind.Position(center.latitude, center.longitude, height));
        }

        var cylinderAttribute = new WorldWind.ShapeAttributes(null);
        cylinderAttribute.interiorColor = color;
        cylinderAttribute.outlineColor = color;
        cylinderAttribute.drawInterior = true;
        cylinderAttribute.drawVerticals = true;
        this.cylinder = new WorldWind.Polygon(boundaries);
        this.cylinder.attributes = cylinderAttribute;
        this.cylinder.altitudeMode = WorldWind.RELATIVE_TO_GROUND;
        this.cylinder.extrude = true;
        this.cylinder.eyeDistanceScalingThreshold = 1e6;
        this.cylinder.enabled = true;

        function flatten(arr) {
            var ans = [].concat.apply([], arr);
            return ans;
        }

        this.render = function (dc) {
            var cylinderBoundaries = flatten(this.cylinder._boundaries);
            var someBoundary = cylinderBoundaries[0];
            var currHeight = someBoundary;
            cylinderBoundaries.forEach(function (boundary) {
                if (dc.eyePosition.altitude < height) {
                    boundary.altitude = 0
                    this.enabled = false;
                } else {
                    boundary.altitude = height;
                    this.enabled = true;
                }
            });
            this.cylinder.render(dc);
        }
    }
    return Cylinder;
});
