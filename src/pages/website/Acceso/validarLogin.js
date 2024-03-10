// Validar que el correo y el password sean correctos y que existan en la base de datos (MOCK_DATA.json)
export const validarLogin = async (correo, password) => {
    const url = 'https://juanse2003.github.io/APIusuarios.github.io/MOCK_DATA.json';
    const response = await fetch(url);
    const data = await response.json();
    const existe = data.some((usuario) => usuario.email === correo && usuario.password === password);
    return existe;
};
