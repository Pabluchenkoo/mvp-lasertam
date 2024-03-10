// Hacer una petición a la API para guardar el nuevo usuario en la base de datos (MOCK_DATA.json)

export const guardarUsuarioNuevo = async (usuario) => {
    const url = 'https://juanse2003.github.io/APIusuarios.github.io/MOCK_DATA.json';
    const response = await fetch(url);
    const data = await response.json();
    data.push(usuario);
    const response2 = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response2;
};

