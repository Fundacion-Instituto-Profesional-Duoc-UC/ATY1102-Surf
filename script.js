document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#wave-data-table tbody');
    const fileUpload = document.getElementById('file-upload');
    const loadDataBtn = document.getElementById('load-data-btn');
    const paginationControls = document.getElementById('pagination-controls');
    const pageList = document.getElementById('page-list');

    let paginatedData = [];
    let currentPage = 1;
    const rowsPerPage = 50;

    loadDataBtn.addEventListener('click', () => {
        const file = fileUpload.files[0];

        if (!file) {
            alert('Por favor, selecciona un archivo primero.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const rawData = event.target.result;
            processAndStoreData(rawData);
        };

        reader.onerror = function(event) {
            alert('Error al leer el archivo.');
        };

        reader.readAsText(file);
    });

    function processAndStoreData(data) {
        const lines = data.trim().split('\n');
        paginatedData = [];

        // Almacena todas las líneas del archivo, excluyendo la primera (encabezado)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const values = line.split(/\s+/).filter(Boolean).map(Number);
            if (values.length >= 10) {
                paginatedData.push(values);
            }
        }
        
        // Ordena los datos de más reciente a menos reciente
        paginatedData.sort((a, b) => {
            const dateA = new Date(a[0], a[1] - 1, a[2], a[3]);
            const dateB = new Date(b[0], b[1] - 1, b[2], b[3]);
            return dateB - dateA;
        });

        currentPage = 1;
        displayPage(currentPage);
    }

    function displayPage(pageNumber) {
        tableBody.innerHTML = '';
        const startIndex = (pageNumber - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const pageData = paginatedData.slice(startIndex, endIndex);

        pageData.forEach(values => {
            const [year, month, day, hour, hm0, tz, te, tm, tp, dm] = values;

            const date = new Date(year, month - 1, day);
            const formattedDate = date.toLocaleDateString('es-ES');
            const formattedTime = `${Math.floor(hour).toString().padStart(2, '0')}:00`;

            const waveHeight = hm0.toFixed(2);
            const period = tp.toFixed(2);
            let surfRating = 'Condiciones variables. 🧐';
            let rowClass = '';

            if (waveHeight >= 1.5 && waveHeight <= 3.5 && period >= 8 && period <= 18) {
                surfRating = '¡Ideal para surf! 🤙';
                rowClass = 'table-success';
            } else if (waveHeight > 3.5 || period < 8) {
                surfRating = 'Oleaje grande o con poco swell. Precaución. ⚠️';
                rowClass = 'table-warning';
            }

            const row = document.createElement('tr');
            row.className = rowClass;
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${formattedTime}</td>
                <td>${waveHeight}</td>
                <td>${period}</td>
                <td>${dm.toFixed(2)}</td>
                <td>${surfRating}</td>
            `;
            tableBody.appendChild(row);
        });

        setupPagination(paginatedData.length);
    }

    function setupPagination(totalItems) {
        pageList.innerHTML = '';
        const totalPages = Math.ceil(totalItems / rowsPerPage);

        // Botón "Anterior"
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous">Anterior</a>`;
        prevLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                displayPage(currentPage);
            }
        });
        pageList.appendChild(prevLi);

        // Lógica de los botones de paginación
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // Mostrar "..." al inicio
        if (startPage > 1) {
            const firstPageLi = document.createElement('li');
            firstPageLi.className = 'page-item';
            firstPageLi.innerHTML = `<a class="page-link" href="#">1</a>`;
            firstPageLi.addEventListener('click', (e) => { e.preventDefault(); currentPage = 1; displayPage(currentPage); });
            pageList.appendChild(firstPageLi);

            if (startPage > 2) {
                const dotsLi = document.createElement('li');
                dotsLi.className = 'page-item disabled';
                dotsLi.innerHTML = `<span class="page-link">...</span>`;
                pageList.appendChild(dotsLi);
            }
        }

        // Botones de número de página
        for (let i = startPage; i <= endPage; i++) {
            const li = document.createElement('li');
            li.className = `page-item ${i === currentPage ? 'active' : ''}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                displayPage(currentPage);
            });
            pageList.appendChild(li);
        }

        // Mostrar "..." al final
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dotsLi = document.createElement('li');
                dotsLi.className = 'page-item disabled';
                dotsLi.innerHTML = `<span class="page-link">...</span>`;
                pageList.appendChild(dotsLi);
            }
            const lastPageLi = document.createElement('li');
            lastPageLi.className = 'page-item';
            lastPageLi.innerHTML = `<a class="page-link" href="#">${totalPages}</a>`;
            lastPageLi.addEventListener('click', (e) => { e.preventDefault(); currentPage = totalPages; displayPage(currentPage); });
            pageList.appendChild(lastPageLi);
        }
        
        // Botón "Siguiente"
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next">Siguiente</a>`;
        nextLi.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                displayPage(currentPage);
            }
        });
        pageList.appendChild(nextLi);

        paginationControls.style.display = totalItems > rowsPerPage ? 'block' : 'none';
    }
});