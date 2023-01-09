const serverAddress = 'http://localhost:3000';

const getPeople = async () => {
  const response = await fetch(`${serverAddress}/people`);
  const person = await response.json();

  return person;
}

const deletePerson = async (id) => {
  const response = await fetch(`${serverAddress}/people/${id}`, {
    method: 'DELETE'
  });
  const person = await response.json();

  return person;
}

const createPerson = async (personProps) => {
  const response = await fetch(`${serverAddress}/people`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(personProps)
  });
  const person = await response.json();

  return person;
}

const updatePerson = async (id, personProps) => {
  const response = await fetch(`${serverAddress}/cars/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(personProps)
  });
  const person = await response.json();

  return person;
}

const ApiService = {
  getPeople,
  deletePerson,
  createPerson,
  updatePerson,
};

export default ApiService;
