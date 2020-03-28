import React, { useState, useEffect } from 'react';
import './App.css';
import github from './github.svg'
import logo from './logo.svg'


function App() {
  const [brasil, setBrasil] = useState([])
  const [pais, setPais] = useState([])

  useEffect(() => {
    fetch('https://covid19-brazil-api.now.sh/api/report/v1', { method: 'GET' })
      .then(function (response) {
        return response.json()
      }).then(info => {
        setBrasil(info.data)
      })
  }, [])

  useEffect(() => {
    fetch('https://covid19-brazil-api.now.sh/api/report/v1/countries', { method: 'GET' })
      .then(function (response) {
        return response.json()
      }).then(info => {
        setPais(info.data)
      })
  }, [])
  return (
    <div className="App">
      <header className="header">
        <div>
          <img id="logo" src={logo} />
          <p className="title-header">CORONAVIRUS</p>
        </div>
        <div>
          <a href="http://github.com/jadson179">
            <img id="icon-social" src={github} />
          </a>
        </div>
      </header>
      <main className="main">
        <div id="container-main">
          <div>
            <h2>Status por Estado</h2>
            <talbe>
              <tr>
                <th> Estados</th>
                <th>🚨 Confirmados</th>
                <th>🤧 Suspeitos</th>
                <th>❌ Recusados</th>
                <th>☠  Mortes</th>
              </tr>
              <tbody>
                {
                  brasil.map(item => (
                    <tr>
                      <td><img width={30} src={`https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${item.uf}.png`} alt="" srcset="" />{item.state}</td>
                      <td>{item.cases}</td>
                      <td>{item.suspects}</td>
                      <td>{item.refuses}</td>
                      <td>{item.deaths}</td>
                    </tr>
                  ))
                }
              </tbody>

            </talbe>
          </div>
          <div>
            { 
              pais.map(item => (
                <ul>
                  <h2>{item.country}</h2>
                  <li>✔  Confirmados: {item.confirmed}</li>
                  <li>🚨 Ativos: {item.cases}</li>
                  <li>♻  Recuperados: {item.recovered}</li>
                  <li>☠  Mortes: {item.deaths}</li>
                  <p></p>
                  <li>🕓 Atualizado: {item.updated_at}</li>
                  <li>📊 Fonte: WHO </li>
                </ul>
              ))
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
