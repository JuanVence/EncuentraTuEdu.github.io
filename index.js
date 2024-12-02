document.addEventListener('DOMContentLoaded', function() {
    let list = document.querySelectorAll(".navigation li");

    function activeLink() {
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        this.classList.add("hovered");
    }

    list.forEach((item) => item.addEventListener("click", activeLink));

    // Menu Toggle
    let toggle = document.querySelector(".toggle");
    let navigation = document.querySelector(".navigation");
    let main = document.querySelector(".main");

    toggle.onclick = function() {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
    }

    // Cards animation
    const navLinks = document.querySelectorAll('.navigation .list');
    const cards = document.querySelectorAll('.main .card');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');

            cards.forEach(card => {
                card.classList.remove('fade-in');
                card.classList.add('fade-out');
                setTimeout(() => card.style.display = 'none', 1500);
            });

            const targetCard = document.getElementById(targetId);
            if (targetCard) {
                setTimeout(() => {
                    targetCard.style.display = 'block';
                    targetCard.classList.remove('fade-out');
                    targetCard.classList.add('fade-in');
                }, 1500);
            }
        });
    });

    // Handle form submission and reset
    const form = document.getElementById('NewForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const inputs = document.querySelectorAll('#NewForm input');
            const selects = document.querySelectorAll('#NewForm select');

            inputs.forEach(function(input) {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });

            selects.forEach(function(select) {
                select.selectedIndex = 0;
            });
        });
    }

    const { ipcRenderer } = require('electron');

    ipcRenderer.on('notification', (event, message) => {
        new Notification('Notificación', {
            body: message
        });

        if (message === 'client successfully added') {
            if (form) {
                form.reset(); // Reinicia todos los campos del formulario
            }
        }
    });

    // Function to handle checkbox changes
    document.querySelectorAll('input[type="checkbox"]').forEach(function(checkbox) {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    function handleCheckboxChange(event) {
        const checkbox = event.target;
        console.log(`Checkbox ${checkbox.id} changed to ${checkbox.checked}`);
    }
});

function loadPDF(event) {
    const file = event.target.files[0];

    if (!file || file.type !== 'application/pdf') {
        alert('Por favor, selecciona un archivo PDF.');
        return;
    }

    document.getElementById('pdfFile').style.display = 'none';
    document.getElementById('fileLabel').style.display = 'none';
    document.getElementById('submitButton').style.display = 'flex';

    const fileURL = URL.createObjectURL(file);
    const pdfViewer = document.getElementById('pdfViewer');
    pdfViewer.innerHTML = `<iframe class="pdf" src="${fileURL}" width="100%" height="600px" frameborder="0"></iframe>`;
}

function hidePDFViewer() {
    document.getElementById('pdfViewer').style.display = 'none';
    document.getElementById('submitButton').style.display = 'none';

    document.getElementById('pdfFile').style.display = 'flex';
    document.getElementById('fileLabel').style.display = 'flex';
}
