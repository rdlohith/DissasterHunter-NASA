define(function () {
    "use strict";

    var DataGrid = function (data) {
        var latitude, longitude, altitude, firstLatitude = -1e5, lineCounter = 0, indexMap = [];

        this.width = 0;
        this.positions = [];
        this.minLon = this.minLat = Number.MAX_VALUE;
        this.maxLon = this.maxLat = -Number.MAX_VALUE;
        var lines = data.split("\n");
        for (var i = 0; i < lines.length; i++) {
            var rawPosition = lines[i].trim().split("\t");
            if (rawPosition.length != 3) {
                continue;
            }

            longitude = parseFloat(rawPosition[0]);
            latitude = parseFloat(rawPosition[1]);

            if (longitude > 180) {
                longitude -= 360;
            }
            if (longitude < this.minLon)
                this.minLon = longitude;
            if (longitude > this.maxLon)
                this.maxLon = longitude;
            if (latitude < this.minLat)
                this.minLat = latitude;
            if (latitude > this.maxLat)
                this.maxLat = latitude;

            if (firstLatitude === -1e5) {
                firstLatitude = latitude;
            } else if (latitude !== firstLatitude && this.width === 0) {
                this.width = lineCounter;
            }

            if (rawPosition[2] != "NaN") {
                altitude = parseFloat(rawPosition[2]);
                indexMap[lineCounter] = this.positions.length;
                this.positions.push(new WorldWind.Position(latitude, longitude, altitude * 1000));
            }
            ++lineCounter;
        }

        this.height = lineCounter / this.width;
        this.deltaLat = (this.maxLat - this.minLat) / (this.height - 1);
        this.deltaLon = (this.maxLon - this.minLon) / (this.width - 1);
        this.indexMap = indexMap;
    };

    DataGrid.prototype.makeGridIndices = function () {
        var gridIndices = [], i = 0, width = this.width, height = this.height;
        for (var r = 0; r < height - 1; r++) {
            for (var c = 0; c < width - 1; c++) {
                var k = r * width + c;
                gridIndices[i++] = k;
                gridIndices[i++] = k + 1;
                gridIndices[i++] = k + width;
                gridIndices[i++] = k + 1;
                gridIndices[i++] = k + 1 + width;
                gridIndices[i++] = k + width;
            }
        }
        return gridIndices;
    };

    DataGrid.prototype.findTriangles = function () {
        var gridIndices = this.makeGridIndices(), 
            indexMap = this.indexMap, 
            mappedIndices = [],
            ia, ib, ic, iaMapped, ibMapped, icMapped;

        for (var i = 0; i < gridIndices.length; i += 3) { 
            ia = gridIndices[i];
            ib = gridIndices[i + 1];
            ic = gridIndices[i + 2];
            iaMapped = indexMap[ia];
            ibMapped = indexMap[ib];
            icMapped = indexMap[ic];

            if (iaMapped && ibMapped && icMapped) {
                mappedIndices.push(iaMapped);
                mappedIndices.push(ibMapped);
                mappedIndices.push(icMapped);
            }
        }
        return mappedIndices;
    };

    DataGrid.prototype.lookupValue = function (latitude, longitude) {
        var colNW = Math.floor((this.width - 1) * (longitude - this.minLon) / (this.maxLon - this.minLon)),
            rowNW = Math.floor((this.height - 1) * (this.maxLat - latitude) / (this.maxLat - this.minLat));

        if (colNW === this.width - 1) {
            --colNW;
        }
        if (rowNW === this.height - 1) {
            --rowNW;
        }

        var nwIndex = rowNW * this.width + colNW,
            neIndex = nwIndex + 1,
            swIndex = nwIndex + this.width,
            seIndex = swIndex + 1;

        var indexMap = this.indexMap;
        swIndex = indexMap[swIndex];
        seIndex = indexMap[seIndex];
        nwIndex = indexMap[nwIndex];
        neIndex = indexMap[neIndex];

        if (swIndex && seIndex && nwIndex && neIndex) {
            var a = this.positions[swIndex], aa = a.altitude,
                b = this.positions[seIndex], bb = b.altitude,
                c = this.positions[nwIndex], cc = c.altitude,
                d = this.positions[neIndex], dd = d.altitude;

            var s = (longitude - a.longitude) / this.deltaLon,
                t = (latitude - a.latitude) / this.deltaLat;
            var lower = (1 - s) * aa + s * bb,
                upper = (1 - s) * cc + s * dd,
                result = (1 - t) * lower + t * upper;

            return result;
        } else {
            return null;
        }
    };
    return DataGrid;
});