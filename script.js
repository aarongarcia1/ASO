/* =========================================================
   ASO · SCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   CONFIGURACIÓ
   ========================================================= */


/*
 * URL del fitxer SP1.md al repositori.
 *
 * NO obre GitHub.
 *
 * JavaScript llegeix el fitxer directament
 * i després el mostra dins de la nostra pàgina.
 */

const URL_SP1 =
  "https://raw.githubusercontent.com/aarongarcia1/ASO/main/SP1.md";


/*
 * Indica si SP1.md ja s'ha carregat.
 */

let sp1Carregat = false;



/* =========================================================
   CARREGAR SP1.MD
   ========================================================= */

async function carregarSP1() {

  /*
   * Elements de la pàgina
   */

  const seccioSP1 =
    document.getElementById("sp1");

  const contingut =
    document.getElementById("markdown-content");


  /*
   * Mostrar SP1
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
   * Canviar la URL.
   *
   * No utilitzem #sp1.
   *
   * La URL quedarà:
   *
   * /ASO/?file=SP1.md
   */

  const novaURL =
    window.location.pathname +
    "?file=SP1.md";


  history.pushState(
    {
      pagina: "SP1.md"
    },
    "",
    novaURL
  );


  /*
   * Si ja està carregat,
   * no el tornem a descarregar.
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
     * Mostrar carregant
     */

    contingut.innerHTML = `

      <div class="loading">

        <div class="loading-spinner"></div>

        <p>
          Carregant SP1.md...
        </p>

      </div>

    `;


    /*
     * Agafar SP1.md des de GitHub.
     *
     * raw.githubusercontent.com retorna
     * només el contingut del fitxer.
     */

    const resposta =
      await fetch(URL_SP1);


    /*
     * Comprovar resposta
     */

    if (!resposta.ok) {

      throw new Error(
        "No s'ha pogut carregar SP1.md"
      );

    }


    /*
     * Convertir la resposta
     * a text.
     */

    let markdown =
      await resposta.text();


    /*
     * Eliminar el Front Matter de Jekyll
     * si encara existeix.
     *
     * Exemple:
     *
     * ---
     * layout: page
     * title: SP1
     * permalink: /SP1.html
     * ---
     */

    markdown =
      markdown.replace(
        /^---[\s\S]*?---\s*/,
        ""
      );


    /*
     * Convertir Markdown a HTML
     */

    contingut.innerHTML =
      marked.parse(markdown);


    /*
     * Indicar que ja està carregat
     */

    sp1Carregat = true;


    /*
     * Tornar al principi de SP1
     */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


  } catch (error) {

    console.error(
      "Error carregant SP1.md:",
      error
    );


    /*
     * Mostrar error a la pàgina
     */

    contingut.innerHTML = `

      <div class="sp1-error">

        <h3>
          Error carregant SP1.md
        </h3>

        <p>
          No s'ha pogut carregar el fitxer
          <strong>SP1.md</strong>.
        </p>

        <p>
          Comprova que el fitxer existeixi
          al repositori.
        </p>

      </div>

    `;

  }

}



/* =========================================================
   TORNAR A L'INICI
   ========================================================= */

function tornarInici() {

  /*
   * Amagar SP1
   */

  document
    .getElementById("sp1")
    .classList.remove("visible");


  /*
   * Tornar a mostrar portada
   */

  document.getElementById("projecte")
    .style.display = "";


  document.getElementById("contingut")
    .style.display = "";


  /*
   * Eliminar el ?file=SP1.md
   */

  history.pushState(
    {
      pagina: "inici"
    },
    "",
    window.location.pathname
  );


  /*
   * Tornar a dalt
   */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}



/* =========================================================
   BOTÓ ENRERE DEL NAVEGADOR
   ========================================================= */

window.addEventListener(
  "popstate",
  function() {

    /*
     * Comprovar si estem a SP1
     */

    const params =
      new URLSearchParams(
        window.location.search
      );


    const fitxer =
      params.get("file");


    if (
      fitxer === "SP1.md"
    ) {

      /*
       * Obrir SP1 sense tornar
       * a modificar l'historial.
       */

      carregarSP1SenseHistorial();

    } else {

      /*
       * Tornar a inici.
       */

      document
        .getElementById("sp1")
        .classList.remove("visible");


      document.getElementById("projecte")
        .style.display = "";


      document.getElementById("contingut")
        .style.display = "";


      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  }
);



/* =========================================================
   CARREGAR SP1 SENSE MODIFICAR URL
   ========================================================= */

async function carregarSP1SenseHistorial() {

  const seccioSP1 =
    document.getElementById("sp1");

  const contingut =
    document.getElementById("markdown-content");


  /*
   * Mostrar SP1
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
   * Si ja està carregat,
   * no cal tornar-lo a carregar.
   */

  if (sp1Carregat) {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    return;

  }


  try {

    contingut.innerHTML = `

      <div class="loading">

        <div class="loading-spinner"></div>

        <p>
          Carregant SP1.md...
        </p>

      </div>

    `;


    /*
     * Carregar Markdown
     */

    const resposta =
      await fetch(URL_SP1);


    if (!resposta.ok) {

      throw new Error(
        "No s'ha pogut carregar SP1.md"
      );

    }


    /*
     * Convertir a text
     */

    let markdown =
      await resposta.text();


    /*
     * Eliminar Front Matter
     */

    markdown =
      markdown.replace(
        /^---[\s\S]*?---\s*/,
        ""
      );


    /*
     * Convertir Markdown a HTML
     */

    contingut.innerHTML =
      marked.parse(markdown);


    sp1Carregat = true;


    /*
     * Tornar a dalt
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
          No s'ha pogut carregar la documentació.
        </p>

      </div>

    `;

  }

}



/* =========================================================
   GALERIA DE CAPTURES
   ========================================================= */


/*
 * Crear llista de captures
 *
 * 1.png
 * 2.png
 * ...
 * 14.png
 */

const captures = [];


for (
  let i = 1;
  i <= 14;
  i++
) {

  captures.push(
    `imatges/${i}.png`
  );

}


/*
 * Índex de la captura actual.
 */

let capturaActual = 0;



/* =========================================================
   OBRIR GALERIA
   ========================================================= */

function obrirGaleria() {

  const galeria =
    document.getElementById("galeria");


  /*
   * Obrir galeria
   */

  galeria.classList.add("activa");


  galeria.setAttribute(
    "aria-hidden",
    "false"
  );


  /*
   * Començar per la primera
   */

  capturaActual = 0;


  actualitzarGaleria();


  /*
   * Bloquejar scroll del fons
   */

  document.body.style.overflow =
    "hidden";

}



/* =========================================================
   TANCAR GALERIA
   ========================================================= */

function tancarGaleria() {

  const galeria =
    document.getElementById("galeria");


  /*
   * Tancar
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



/* =========================================================
   ACTUALITZAR GALERIA
   ========================================================= */

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
   * Fer transició
   */

  imatge.style.opacity = "0";


  setTimeout(
    function() {


      /*
       * Canviar imatge
       */

      imatge.src =
        captures[capturaActual];


      /*
       * Actualitzar ALT
       */

      imatge.alt =
        `Captura ${capturaActual + 1} del treball SP1`;


      /*
       * Actualitzar contador
       */

      numero.textContent =
        `${capturaActual + 1} / ${captures.length}`;


      /*
       * Mostrar imatge
       */

      imatge.style.opacity = "1";


    },
    100
  );

}



/* =========================================================
   CAPTURA SEGÜENT
   ========================================================= */

function capturaSeguent() {

  capturaActual++;


  /*
   * Tornar a la primera
   */

  if (
    capturaActual >= captures.length
  ) {

    capturaActual = 0;

  }


  actualitzarGaleria();

}



/* =========================================================
   CAPTURA ANTERIOR
   ========================================================= */

function capturaAnterior() {

  capturaActual--;


  /*
   * Anar a l'última
   */

  if (
    capturaActual < 0
  ) {

    capturaActual =
      captures.length - 1;

  }


  actualitzarGaleria();

}



/* =========================================================
   TECLAT
   ========================================================= */

document.addEventListener(
  "keydown",
  function(event) {


    const galeria =
      document.getElementById(
        "galeria"
      );


    /*
     * Si la galeria està tancada,
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
     * Dreta
     */

    if (
      event.key === "ArrowRight"
    ) {

      capturaSeguent();

    }


    /*
     * Esquerra
     */

    if (
      event.key === "ArrowLeft"
    ) {

      capturaAnterior();

    }


    /*
     * Escape
     */

    if (
      event.key === "Escape"
    ) {

      tancarGaleria();

    }

  }
);



/* =========================================================
   SWIPE MÒBIL
   ========================================================= */

let touchInicialX = 0;

let touchFinalX = 0;


const zonaImatge =
  document.getElementById(
    "galeria-imatge-container"
  );



/*
 * Inici del toc
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
 * Final del toc
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
 * Gestionar direcció
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



/* =========================================================
   TANCAR CLICANT FORA
   ========================================================= */

document
  .getElementById("galeria")
  .addEventListener(
    "click",
    function(event) {

      if (
        event.target === this
      ) {

        tancarGaleria();

      }

    }
  );



/* =========================================================
   CARREGAR SP1 SI ENTREM AMB ?file=SP1.md
   ========================================================= */

const parametres =
  new URLSearchParams(
    window.location.search
  );


const fitxerInicial =
  parametres.get("file");


if (
  fitxerInicial === "SP1.md"
) {

  carregarSP1SenseHistorial();

}
