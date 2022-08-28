import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Map';
import { type } from '@testing-library/user-event/dist/type';

function App() {
  type position = { longitude: number, latitude: number }
  const [history, setHistory] = useState<position[]>([{
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
  ]);
  const [atualPosition, setAtualPosition] = useState<position>();

  if (!navigator.geolocation) {
    alert('Localizacao nao autorizada')
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {

        setAtualPosition({
          latitude: +(position.coords.latitude.toFixed(6)),
          longitude: +(position.coords.longitude.toFixed(6))
        });
      })
    }
  }, []);

  useEffect(() => {
    if (atualPosition) {
      const index = history.indexOf(atualPosition);

      if (index === -1) {
        setHistory([...history, atualPosition]);
      }
    }
  }, [atualPosition])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Map data={history}></Map>
          {
            history.map((item, i) => {
              return (<ul key={i}>
                <li>Latitude: {item.latitude} </li>
                <li>Longitude: {item.longitude}</li>
              </ul>)
            })
          }
          {history.length}
        </div>
      </header>
    </div>
  );
}

export default App;
