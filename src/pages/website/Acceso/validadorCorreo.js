
export const validarCorreo = async (correo) => {
    const url = 'https://juanse2003.github.io/APIusuarios.github.io/MOCK_DATA.json';
    const response = await fetch(url);
    const data = await response.json();
    const existe = data.some((usuario) => usuario.email === correo);
    return !existe;
};
