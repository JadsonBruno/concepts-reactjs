import React from "react";
import {useState} from 'react';
import {useEffect} from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  /**
   * I get all repositories from api.
   */
  async function getRepositories ()
  {
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }

  useEffect(() => {
    getRepositories();
  }, []);

  async function handleAddRepository() {
    const data = {
      title: "Virtual Keyboard Test",
      url: "https://github.com/JadsonBruno/concepts-node/blob/master/src/app.js",
      techs: ["VueJS", "Node.js", "Redis"]
    };

    const repository = await api.post('/repositories', data);
    setRepositories([...repositories, repository.data]);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
             Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
