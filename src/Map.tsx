import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './App.css';

export default function Map(props: any) {
    const canvasRef = useRef<any>(null);
    const { data } = props;

/*
    const data = [{
        latitude: -27.642633,
        longitude: -48.679381
    },
    {
        latitude: -27.641940,
        longitude: -48.679035
    },
    {
        latitude: -27.642133,
        longitude: -48.678176
    },
    {
        latitude: -27.642769,
        longitude: -48.678317
    },
    {
        latitude: -27.642633,
        longitude: -48.679381
    }
    ];
*/

    if (canvasRef.current && data) {
        const canvas = canvasRef.current;
        const context = canvas!.getContext('2d')

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'orange';

        let minX: number = 0, minY: number = 0, maxX: number = 0, maxY: number = 0;

        data.forEach((p: any, i: number) => {

            if (i === 0) {
                minX = maxX = p.latitude;
                minY = maxY = p.longitude;
            } else {
                minX = Math.min(p.latitude, minX);
                minY = Math.min(p.longitude, minY);
                maxX = Math.max(p.latitude, maxX);
                maxY = Math.max(p.longitude, maxY);
            }

        });

        // now get the map width and heigth in its local coords
        const mapWidth = maxX - minX;
        const mapHeight = maxY - minY;
        const mapCenterX = (maxX + minX) / 2;
        const mapCenterY = (maxY + minY) / 2;

        // to find the scale that will fit the canvas get the min scale to fit height or width
        const scale = Math.min(canvas!.width / mapWidth, canvas!.height / mapHeight);

        // Now you can draw the map centered on the cavas
        context!.beginPath();
        data.forEach((p: any) => {
            context!.lineTo(
                (p.latitude - mapCenterX) * scale + canvas!.width / 2,
                (p.longitude - mapCenterY) * scale + canvas!.height / 2
            );
        });
        context!.stroke();
    }
    /*
    const { data } = props;
     
    var bounds = {
        "minLon": -81.267555236816,
        "maxLon": -81.261039733887,
        "maxLat": 28.979709625244,
        "minLat": 28.977783203125
    }
     
    var dimensions = {
        width: 400,
        height: 200
    }
     
    function getX(x: number) {
        var position = (x - bounds.minLon) / (bounds.maxLon - bounds.minLon);
        return dimensions.width * position;
    }
     
    function getY(y: number) {
        var position = (y - bounds.minLat) / (bounds.maxLat - bounds.minLat);
        return dimensions.height * position;
    }
     
    let listPoints = [];
     
    for (let i = 0; i < data.length; i++) {
        const point = { x: getX(data[i].latitude), y: getY(data[i].longitude) }
     
        listPoints.push(point);
        //setpoints([...points!,point.x+","+point.y]);
     
    }
    */

    return (
        <canvas className="canvas" ref={canvasRef} width="300" height="200"></canvas>
    )
}