async function buscarCarta() {
    const nombreCarta = document.getElementById("nombreCarta").value.trim();
    const resultadosDiv = document.getElementById("resultados");

    if (!nombreCarta) {
        resultadosDiv.innerHTML = "<p>Por favor, ingresa un nombre.</p>";
        return;
    }

    try {
        const response = await fetch(`https://magicthegathering.onrender.com/precio/porediciones/${encodeURIComponent(nombreCarta)}`);
        const data = await response.json();

        if (!Array.isArray(data)) {
            resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        let html = "<ul>";
        data.forEach(carta => {
            
            const precioUsd = !isNaN(parseFloat(carta.precio_usd)) ? `$${carta.precio_usd}` : "No disponible";
            const precioMxn = !isNaN(parseFloat(carta.precio_mxn)) ? `$${carta.precio_mxn}` : "No disponible";
            html += `<li>
                <img src="${carta.imagen_normal}" alt="${carta.nombre}" style="width:200px;">
                <br><strong>${carta.nombre}</strong> - ${carta.edicion}
                <br>📌 Número de colección: ${carta.numero_coleccion}
                <br>💰 Precio USD:  ${precioUsd}
                <br>💰 Precio MXN:  ${precioMxn}
            </li><hr>`;
        });
        html += "</ul>";

        resultadosDiv.innerHTML = html;

    } catch (error) {
        resultadosDiv.innerHTML = "<p>Error al obtener los datos.</p>";
    }
}
