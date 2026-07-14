
        document.addEventListener('DOMContentLoaded', () => {
            
            // 1. Menú Móvil
            const btnMenu = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            const navbar = document.getElementById('navbar');

            btnMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                const icon = btnMenu.querySelector('i');
                if(mobileMenu.classList.contains('active')){
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });

            // 2. Efecto Navbar Scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // 3. Animaciones Scroll Reveal (Intersection Observer)
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);

            const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            revealElements.forEach(el => observer.observe(el));
        });



        /**animación counter up */
        document.addEventListener("DOMContentLoaded", () => {
    const contadores = document.querySelectorAll('.stat-item h3');
    const duracion = 2000; // Duración de la animación en milisegundos (2 segundos)

    const animarContador = (elemento) => {
        const target = +elemento.getAttribute('data-target'); // Número final
        const textoOriginal = elemento.innerText; // Para mantener el '+' o '%'
        const sufijo = textoOriginal.replace(/[0-0]/g, '').replace('0', ''); // Extrae '+', '%', '/7'
        
        let startTime = null;

        const actualizarNumero = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            
            // Calculamos el número actual basado en el progreso del tiempo
            const incremental = Math.min(Math.floor((progress / duracion) * target), target);
            
            // Reconstruimos el texto (ej: 500 + +)
            if (sufijo.includes('/')) {
                elemento.innerText = `${incremental}/7`;
            } else {
                elemento.innerText = incremental + sufijo;
            }

            // Si no ha terminado el tiempo, sigue animando
            if (progress < duracion) {
                requestAnimationFrame(actualizarNumero);
            } else {
                // Aseguramos que quede el número exacto al final
                elemento.innerText = target + (sufijo.includes('/') ? '/7' : sufijo);
            }
        };

        requestAnimationFrame(actualizarNumero);
    };

    // Intersection Observer para activar la animación al hacer scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elemento = entry.target;
                animarContador(elemento);
                observer.unobserve(elemento); // Deja de observar para que solo ocurra una vez
            }
        });
    }, { threshold: 0.5 }); // Se dispara cuando el 50% del elemento es visible

    contadores.forEach(contador => observer.observe(contador));
});



/**taps por qué elergirnos */
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".benefit-card");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Si el usuario hace clic en la pestaña que ya está activa, no hace nada
            if (tab.classList.contains("active")) return;

            // Busca la tarjeta que tiene la clase 'active' actualmente y se la remueve
            const activeTab = document.querySelector(".benefit-card.active");
            if (activeTab) {
                activeTab.classList.remove("active");
            }

            // Añade la clase 'active' a la pestaña clickeada para iniciar la animación CSS
            tab.classList.add("active");
        });
    });
});


/**slider modelos destacados */
document.addEventListener("DOMContentLoaded", () => {
    // Arreglo con la información de los 3 modelos de motocicletas
    const listaMotos = [
        {
            titulo: "GDM VZ200",
            imagen: "Assets/img/MODELO1.png",
            potencia: "18.57HP a 7500 rpm",
            transmision: "Mecánica 5 velocidades",
            precio: "S/.7,099.00"
        },
        {
            titulo: "SWORD 250",
            imagen: "Assets/img/MODELO2.png",
            potencia: "16.76HP a 8000 rpm",
            transmision: "Mecánica 5 velocidades",
            precio: "S/.6,999.00"
        },
        {
            titulo: "SWORD-200",
            imagen: "Assets/img/MODELO3.png",
            potencia: "15.42HP a 8000 rpm",
            transmision: "Mecánica 5 velocidades",
            precio: "S/.6,499.00"
        }
    ];

    // Selección de elementos del DOM
    const imgSlider = document.getElementById("slider-img");
    const txtTitulo = document.getElementById("slider-title");
    const txtPotencia = document.getElementById("slider-power");
    const txtTransmision = document.getElementById("slider-transmission");
    const txtPrecio = document.getElementById("slider-price");
    const dots = document.querySelectorAll(".dot");
    const gridContenedor = document.querySelector(".featured-grid");

    // Función encargada de actualizar la información de la interfaz
    const actualizarSlider = (index) => {

    const moto = listaMotos[index];

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

    gridContenedor.classList.remove("fade-anim");
    void gridContenedor.offsetWidth;
    gridContenedor.classList.add("fade-anim");

    imgSlider.src = moto.imagen;
    imgSlider.alt = moto.titulo;

    txtTitulo.innerText = moto.titulo;
    txtPotencia.innerText = moto.potencia;
    txtTransmision.innerText = moto.transmision;
    txtPrecio.innerText = moto.precio;

    /* ========= DATOS PARA EL CARRITO ========= */

    imgSlider.dataset.name = moto.titulo;

    imgSlider.dataset.price =
        moto.precio.replace("S/.","")
                .replace(",","");
    };

    // Escuchar el evento de clic en los botones de navegación
    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const indexSeleccionado = parseInt(e.target.getAttribute("data-index"));
            actualizarSlider(indexSeleccionado);
        });
    });
    /* BUSQUEDAD Cargar la primera moto al iniciar */
    actualizarSlider(0);
    /* Hacer pública la función */
    window.actualizarSlider = actualizarSlider;
});



/*=========================================================
                CARRITO DE COMPRAS
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const carrito = [];

    const cartBtn = document.getElementById("cart-btn");
    const cart = document.getElementById("shopping-cart");
    const overlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");

    const addCartBtn = document.querySelector(".add-cart");

    const cartItems = document.getElementById("cart-items");

    const cartTotal = document.getElementById("cart-total");

    const cartCount = document.getElementById("cart-count");

    /*==============================
        ABRIR Y CERRAR
    ==============================*/

    function abrirCarrito(){

        cart.classList.add("active");
        overlay.classList.add("active");

    }

    function cerrarCarrito(){

        cart.classList.remove("active");
        overlay.classList.remove("active");

    }

    cartBtn.addEventListener("click", abrirCarrito);

    closeCart.addEventListener("click", cerrarCarrito);

    overlay.addEventListener("click", cerrarCarrito);



    /*==============================
        GUARDAR LOCAL STORAGE
    ==============================*/

    function guardar(){

        localStorage.setItem("gdmCarrito",JSON.stringify(carrito));

    }



    function cargar(){

        const datos=JSON.parse(localStorage.getItem("gdmCarrito"));

        if(datos){

            carrito.push(...datos);

        }

        renderCarrito();

    }



    /*==============================
        AGREGAR PRODUCTO
    ==============================*/

    addCartBtn.addEventListener("click",()=>{

        const img=document.getElementById("slider-img");

        const nombre=img.dataset.name;

        const precio=parseFloat(img.dataset.price);

        const imagen=img.src;



        const existe=carrito.find(item=>item.nombre===nombre);



        if(existe){

            existe.cantidad++;

        }else{

            carrito.push({

                nombre,

                precio,

                imagen,

                cantidad:1

            });

        }

        guardar();

        renderCarrito();

        abrirCarrito();

    });



    /*==============================
        DIBUJAR CARRITO
    ==============================*/

    function renderCarrito(){

        cartItems.innerHTML="";

        if(carrito.length===0){

            cartItems.innerHTML=`

            <p class="empty-cart">

            Tu carrito está vacío.

            </p>

            `;

            cartTotal.innerText="S/.0.00";

            cartCount.innerText="0";

            return;

        }



        let total=0;

        let cantidadTotal=0;



        carrito.forEach((producto,index)=>{

            total+=producto.precio*producto.cantidad;

            cantidadTotal+=producto.cantidad;



            cartItems.innerHTML+=`

            <div class="cart-item">

                <img src="${producto.imagen}">

                <div class="cart-info">

                    <h4>${producto.nombre}</h4>

                    <div class="cart-price">

                        S/. ${producto.precio.toLocaleString()}

                    </div>

                    <div class="quantity">

                        <button class="menos"

                        data-index="${index}">-</button>

                        <span>${producto.cantidad}</span>

                        <button class="mas"

                        data-index="${index}">+</button>

                    </div>

                    <div class="remove-item"

                    data-index="${index}">

                    Eliminar

                    </div>

                </div>

            </div>

            `;

        });

        cartTotal.innerText="S/."+total.toLocaleString();

        cartCount.innerText=cantidadTotal;

        cartCount.classList.add("bump");

        setTimeout(()=>{

            cartCount.classList.remove("bump");

        },300);

        eventosCarrito();

    }



    /*==============================
        BOTONES + -
    ==============================*/

    function eventosCarrito(){

        document.querySelectorAll(".mas").forEach(btn=>{

            btn.onclick=()=>{

                carrito[btn.dataset.index].cantidad++;

                guardar();

                renderCarrito();

            }

        });



        document.querySelectorAll(".menos").forEach(btn=>{

            btn.onclick=()=>{

                if(carrito[btn.dataset.index].cantidad>1){

                    carrito[btn.dataset.index].cantidad--;

                }else{

                    carrito.splice(btn.dataset.index,1);

                }

                guardar();

                renderCarrito();

            }

        });



        document.querySelectorAll(".remove-item").forEach(btn=>{

            btn.onclick=()=>{

                carrito.splice(btn.dataset.index,1);

                guardar();

                renderCarrito();

            }

        });

    }



    cargar();

});

/*=========================================================
                BUSCADOR DE MOTOS
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================
            ELEMENTOS
    ==============================*/

    const btnSearch = document.getElementById("search-btn");
    const panelSearch = document.getElementById("search-panel");
    const overlaySearch = document.getElementById("search-overlay");
    const closeSearch = document.getElementById("close-search");

    const inputSearch = document.getElementById("search-input");
    const resultados = document.getElementById("search-results");

    /*==============================
        PRODUCTOS DISPONIBLES
    ==============================*/

    const motos = [

        {
            nombre: "GDM VZ200",
            precio: "S/.7,099.00",
            imagen: "Assets/img/MODELO1.png",
            indice: 0
        },

        {
            nombre: "SWORD 250",
            precio: "S/.6,999.00",
            imagen: "Assets/img/MODELO2.png",
            indice: 1
        },

        {
            nombre: "SWORD-200",
            precio: "S/.6,499.00",
            imagen: "Assets/img/MODELO3.png",
            indice: 2
        }

    ];

    /*==============================
            ABRIR
    ==============================*/

    btnSearch.addEventListener("click", () => {

        panelSearch.classList.add("active");
        overlaySearch.classList.add("active");

        inputSearch.focus();

        mostrarResultados(motos);

    });

    /*==============================
            CERRAR
    ==============================*/

    function cerrarBuscador(){

        panelSearch.classList.remove("active");
        overlaySearch.classList.remove("active");

        inputSearch.value="";

        resultados.innerHTML=`

            <p class="empty-search">

                Escribe el nombre de una moto.

            </p>

        `;

    }

    closeSearch.addEventListener("click", cerrarBuscador);

    overlaySearch.addEventListener("click", cerrarBuscador);

    /*==============================
            MOSTRAR
    ==============================*/

    function mostrarResultados(lista){

        resultados.innerHTML="";

        if(lista.length===0){

            resultados.innerHTML=`

            <p class="empty-search">

                No se encontraron resultados.

            </p>

            `;

            return;

        }

        lista.forEach(moto=>{

            resultados.innerHTML+=`

            <div class="search-card"

                data-index="${moto.indice}">

                <img src="${moto.imagen}" alt="${moto.nombre}">

                <div class="search-info">

                    <h4>${moto.nombre}</h4>

                    <p>${moto.precio}</p>

                </div>

            </div>

            `;

        });

    }

    /*==============================
            FILTRAR
    ==============================*/

    inputSearch.addEventListener("keyup", ()=>{

        const texto=inputSearch.value.toLowerCase();

        const filtradas=motos.filter(m=>

            m.nombre.toLowerCase().includes(texto)

        );

        mostrarResultados(filtradas);

    });

});

/*==============================
    SELECCIONAR RESULTADO
==============================*/

resultados.addEventListener("click",(e)=>{

    const tarjeta = e.target.closest(".search-card");

    if(!tarjeta) return;

    const indice = parseInt(tarjeta.dataset.index);

    if(window.actualizarSlider){

        window.actualizarSlider(indice);

    }

    cerrarBuscador();

});
