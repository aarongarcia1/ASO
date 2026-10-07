/* =========================================
   SP1.MD
   ========================================= */

let sp1Carregat = false;


/*
 * Carregar SP1.md
 */

async function carregarSP1() {

  const seccioSP1 =
    document.getElementById("sp1");

  const contingut =
    document.getElementById("markdown-content");


  /*
   * Mostrar secció SP1
   */

  seccioSP1.classList.add("visible");


  /*
   * Amagar portada
   */

  document.getElementById("projecte")
    .style.display = "none";

  document.getElementById("contingut")
    .style.display = "none";


  /*
   * Si ja s'ha carregat SP1.md,
   * no el tornem a carregar.
   */

  if (sp1Carregat) {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return;
  }


  try {

    /*
     * Agafar SP1.md directament
     * des de l'API de GitHub
     */

    const resposta = await fetch(
      "https://api.github.com/repos/aarongarcia1/ASO/contents/SP1.md"
    );


    if (!resposta.ok) {

      throw new Error(
        "No s'ha pogut trobar SP1.md a GitHub"
      );

    }


    /*
     * Convertir la resposta
     * a JSON
     */

    const dades =
      await resposta.json();


    /*
     * GitHub retorna el contingut
     * codificat en Base64.
     */

    const contingutBase64 =
      dades.content.replace(/\n/g, "");


    /*
     * Convertir Base64 a text
     *
     * Aquesta forma permet
     * també caràcters especials
     * del català.
     */

    const binari =
      atob(contingutBase64);


    const bytes =
      Uint8Array.from(
        binari,
        caracter => caracter.charCodeAt(0)
      );


    const markdown =
      new TextDecoder("utf-8")
        .decode(bytes);


    /*
     * Convertir Markdown a HTML
     *
     * Necessita la llibreria Marked
     * carregada a index.html.
     */

    contingut.innerHTML =
      marked.parse(markdown);


    /*
     * Indicar que ja està carregat
     */

    sp1Carregat = true;


    /*
     * Tornar a l'inici de la secció
     */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


  } catch (error) {

    console.error(error);


    contingut.innerHTML = `

      <div class="sp1-error">

        <h3>
          Error carregant SP1.md
        </h3>

        <p>
          No s'ha pogut carregar la documentació
          des de GitHub.
        </p>

        <p>
          Comprova que el fitxer
          <strong>SP1.md</strong>
          existeixi al repositori.
        </p>

      </div>

    `;

  }

}



/* =========================================
   TORNAR A L'INICI
   ========================================= */

function tornarInici() {

  document
    .getElementById("sp1")
    .classList.remove("visible");


  document.getElementById("projecte")
    .style.display = "";


  document.getElementById("contingut")
    .style.display = "";


  /*
   * Tornar al principi de la pàgina
   */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}



/* =========================================
   GALERIA DE CAPTURES
   ========================================= */


/*
 * Llista de captures
 *
 * 1.png
 * 2.png
 * ...
 * 14.png
 */

const captures = [];


for (let i = 1; i <= 14; i++) {

  captures.push(
    `imatges/${i}.png`
  );

}


/*
 * Captura actual
 *
 * 0 = primera
 * 1 = segona
 * etc.
 */

let capturaActual = 0;



/* =========================================
   OBRIR GALERIA
   ========================================= */

function obrirGaleria() {

  const galeria =
    document.getElementById("galeria");


  /*
   * Mostrar galeria
   */

  galeria.classList.add("activa");


  galeria.setAttribute(
    "aria-hidden",
    "false"
  );


  /*
   * Començar sempre per
   * la primera captura
   */

  capturaActual = 0;


  actualitzarGaleria();


  /*
   * Evitar scroll del fons
   */

  document.body.style.overflow =
    "hidden";

}



/* =========================================
   TANCAR GALERIA
   ========================================= */

function tancarGaleria() {

  const galeria =
    document.getElementById("galeria");


  /*
   * Amagar galeria
   */

  galeria.classList.remove("activa");


  galeria.setAttribute(
    "aria-hidden",
    "true"
  );


  /*
   * Tornar a permetre scroll
   */

  document.body.style.overflow =
    "";

}



/* =========================================
   ACTUALITZAR CAPTURA
   ========================================= */

function actualitzarGaleria() {

  const imatge =
    document.getElementById(
      "galeria-imatge"
    );


  const numero =
    document.getElementById(
      "galeria-numero"
    );


  /*
   * Fer desaparèixer una mica
   * la imatge actual
   */

  imatge.style.opacity = "0";


  setTimeout(function() {


    /*
     * Canviar la imatge
     */

    imatge.src =
      captures[capturaActual];


    /*
     * Actualitzar text alternatiu
     */

    imatge.alt =
      `Captura ${capturaActual + 1} del treball SP1`;


    /*
     * Actualitzar número
     */

    numero.textContent =
      `${capturaActual + 1} / ${captures.length}`;


    /*
     * Tornar a mostrar la imatge
     */

    imatge.style.opacity = "1";


  }, 100);

}



/* =========================================
   CAPTURA SEGÜENT
   ========================================= */

function capturaSeguent() {

  capturaActual++;


  /*
   * Si arribem a la 15,
   * tornem a la primera.
   */

  if (
    capturaActual >= captures.length
  ) {

    capturaActual = 0;

  }


  actualitzarGaleria();

}



/* =========================================
   CAPTURA ANTERIOR
   ========================================= */

function capturaAnterior() {

  capturaActual--;


  /*
   * Si estem a la primera
   * i anem enrere,
   * passem a l'última.
   */

  if (capturaActual < 0) {

    capturaActual =
      captures.length - 1;

  }


  actualitzarGaleria();

}



/* =========================================
   TECLAT
   ========================================= */

document.addEventListener(
  "keydown",
  function(event) {


    const galeria =
      document.getElementById(
        "galeria"
      );


    /*
     * Si la galeria no està oberta,
     * ignorem les tecles.
     */

    if (
      !galeria.classList.contains(
        "activa"
      )
    ) {

      return;

    }


    /*
     * FLETXA DRETA
     */

    if (
      event.key === "ArrowRight"
    ) {

      capturaSeguent();

    }


    /*
     * FLETXA ESQUERRA
     */

    if (
      event.key === "ArrowLeft"
    ) {

      capturaAnterior();

    }


    /*
     * ESC
     */

    if (
      event.key === "Escape"
    ) {

      tancarGaleria();

    }

  }
);



/* =========================================
   SWIPE EN MÒBIL
   ========================================= */

let touchInicialX = 0;

let touchFinalX = 0;


const zonaImatge =
  document.getElementById(
    "galeria-imatge-container"
  );



/*
 * Quan comencem a tocar
 */

zonaImatge.addEventListener(
  "touchstart",
  function(event) {

    touchInicialX =
      event.changedTouches[0].screenX;

  },
  {
    passive: true
  }
);



/*
 * Quan deixem de tocar
 */

zonaImatge.addEventListener(
  "touchend",
  function(event) {

    touchFinalX =
      event.changedTouches[0].screenX;


    gestionarSwipe();

  },
  {
    passive: true
  }
);



/*
 * Comprovar direcció del swipe
 */

function gestionarSwipe() {

  const diferencia =
    touchFinalX - touchInicialX;


  /*
   * Esquerra = següent
   */

  if (
    diferencia < -50
  ) {

    capturaSeguent();

  }


  /*
   * Dreta = anterior
   */

  if (
    diferencia > 50
  ) {

    capturaAnterior();

  }

}



/* =========================================
   TANCAR CLICANT FORA
   ========================================= */

document
  .getElementById("galeria")
  .addEventListener(
    "click",
    function(event) {


      /*
       * Només tanquem si es clica
       * sobre el fons.
       */

      if (
        event.target === this
      ) {

        tancarGaleria();

      }

    }
  );



/* =========================================
   #SP1
   ========================================= */

/*
 * Si entrem directament a:
 *
 * https://aarongarcia1.github.io/ASO/#sp1
 *
 * carreguem automàticament SP1.md.
 */

if (
  window.location.hash === "#sp1"
) {

  carregarSP1();

}
