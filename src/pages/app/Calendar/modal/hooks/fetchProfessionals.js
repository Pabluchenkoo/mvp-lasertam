import React, {useEffect, useState} from "react";

const FetchProfessionals = () => {
    const [professionalsList, setProfessionalsList] = useState([]);

    useEffect(() => {

        fetch('https://raw.githubusercontent.com/Pabluchenkoo/webFetchs/main/professionals.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProfessionalsList(data))
            .catch(error => console.error('There has been a problem with your fetch operation:', error));
    }, []);

    return professionalsList;
}

export default FetchProfessionals;