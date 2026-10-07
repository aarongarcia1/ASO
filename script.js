/* =========================================================
   ASO · SCRIPT.JS
   ========================================================= */


/* =========================================================
   CONFIGURACIÓ
   ========================================================= */

/*
 * Fitxer Markdown que volem carregar.
 *
 * NO enviem l'usuari a aquesta URL.
 *
 * JavaScript simplement llegeix el contingut.
 */

const URL_SP1 =
  "https://raw.githubusercontent.com/aarongarcia1/ASO/main/SP1.md";


/*
 * Controla si SP1 ja s'ha carregat.
 */

let sp1Carregat = false;



/* =========================================================
   CARREGAR SP1.MD
   ========================================================= */

async function carregarSP1() {

  console.log("Carregant SP1.md...");


  /*
   * Elements de la pàgina
   */

  const projecte =
    document.getElementById("projecte");

  const contingutPrincipal =
    document.getElementById("contingut");

  const seccioSP1 =
    document.getElementById("sp1");

  const markdown =
    document.getElementById("markdown-content");


  /*
   * Comprovar que existeixen.
   */

  if (!seccioSP1 || !markdown) {

    console.error(
      "No s'han trobat els elements de SP1."
    );

    return;

  }


  /*
   * Mostrar SP1
   */

  seccioSP1.classList.add("visible");


  /*
   * Amagar portada
   */

  if (projecte) {

    projecte.style.display = "none";

  }


  if (contingutPrincipal) {

    contingutPrincipal.style.display = "none";

  }


  /*
   * Posar missatge de càrrega
   */

  markdown.innerHTML = `

    <div class="loading">

      <div class="loading-spinner"></div>

      <p>
        Carregant SP1.md...
      </p>

    </div>

  `;


  /*
   * Si ja està carregat,
   * no cal tornar-lo a descarregar.
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
     * IMPORTANT:
     *
     * Aquí JavaScript descarrega SP1.md.
     *
     * L'usuari NO és redirigit.
     */

    const resposta =
      await fetch(URL_SP1);


    /*
     * Comprovar si s'ha carregat correctament.
     */

    if (!resposta.ok) {

      throw new Error(
        "HTTP " + resposta.status
      );

    }


    /*
     * Convertir el fitxer a text.
     */

    let textMarkdown =
      await resposta.text();


    /*
     * Eliminar el Front Matter de Jekyll
     * si encara existeix.
     *
     * Això elimina:
     *
     * ---
     * layout: page
     * title: SP1
     * permalink: /SP1.html
     * ---
     */

    textMarkdown =
      textMarkdown.replace(
        /^---[\s\S]*?---\s*/,
        ""
      );


    /*
     * Convertir Markdown a HTML.
     */

    if (
      typeof marked === "undefined"
    ) {

      throw new Error(
        "La llibreria Marked no està carregada."
      );

    }


    markdown.innerHTML =
      marked.parse(textMarkdown);


    /*
     * IMPORTANT:
     *
     * Les imatges del Markdown poden quedar
     * amb una ruta incorrecta perquè SP1.md
     * està sent carregat des de raw.githubusercontent.com.
     *
     * Per això corregim les rutes.
     */

    const imatges =
      markdown.querySelectorAll("img");


    imatges.forEach(
      function(img) {

        const src =
          img.getAttribute("src");


        /*
         * Si és una imatge local:
         *
         * imatges/1.png
         *
         * la convertim en:
         *
         * https://aarongarcia1.github.io/ASO/imatges/1.png
         */

        if (
          src &&
          !src.startsWith("http") &&
          !src.startsWith("https") &&
          !src.startsWith("data:")
        ) {

          const rutaNeta =
            src.replace(/^\.?\//, "");


          img.src =
            "https://aarongarcia1.github.io/ASO/" +
            rutaNeta;

        }

      }
    );


    /*
     * Marcar com carregat.
     */

    sp1Carregat = true;


    /*
     * Tornar al principi de SP1.
     */

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });


    console.log(
      "SP1.md carregat correctament."
    );


  } catch (error) {

    console.error(
      "Error carregant SP1.md:",
      error
    );


    /*
     * Mostrar error.
     */

    markdown.innerHTML = `

      <div class="sp1-error">

        <h3>
          Error carregant SP1.md
        </h3>

        <p>
          No s'ha pogut carregar la documentació.
        </p>

        <p>
          Error:
          <strong>
            ${error.message}
          </strong>
        </p>

      </div>

    `;

  }

}



/* =========================================================
   TORNAR A L'INICI
   ========================================================= */

function tornarInici() {

  const seccioSP1 =
    document.getElementById("sp1");

  const projecte =
    document.getElementById("projecte");

  const contingutPrincipal =
    document.getElementById("contingut");


  /*
   * Amagar SP1
   */

  if (seccioSP1) {

    seccioSP1.classList.remove("visible");

  }


  /*
   * Tornar a mostrar portada
   */

  if (projecte) {

    projecte.style.display = "";

  }


  if (contingutPrincipal) {

    contingutPrincipal.style.display = "";

  }


  /*
   * Tornar a dalt
   */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}



/* =========================================================
   GALERIA
   ========================================================= */


/*
 * 14 captures
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


let capturaActual = 0;



/* =========================================================
   OBRIR GALERIA
   ========================================================= */

function obrirGaleria() {

  const galeria =
    document.getElementById("galeria");


  if (!galeria) {

    return;

  }


  galeria.classList.add("activa");


  galeria.setAttribute(
    "aria-hidden",
    "false"
  );


  capturaActual = 0;


  actualitzarGaleria();


  document.body.style.overflow =
    "hidden";

}



/* =========================================================
   TANCAR GALERIA
   ========================================================= */

function tancarGaleria() {

  const galeria =
    document.getElementById("galeria");


  if (!galeria) {

    return;

  }


  galeria.classList.remove(
    "activa"
  );


  galeria.setAttribute(
    "aria-hidden",
    "true"
  );


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


  if (!imatge || !numero) {

    return;

  }


  imatge.style.opacity = "0";


  setTimeout(
    function() {

      imatge.src =
        captures[capturaActual];


      imatge.alt =
        `Captura ${capturaActual + 1} del treball SP1`;


      numero.textContent =
        `${capturaActual + 1} / ${captures.length}`;


      imatge.style.opacity =
        "1";

    },
    100
  );

}



/* =========================================================
   SEGÜENT
   ========================================================= */

function capturaSeguent() {

  capturaActual++;


  if (
    capturaActual >= captures.length
  ) {

    capturaActual = 0;

  }


  actualitzarGaleria();

}



/* =========================================================
   ANTERIOR
   ========================================================= */

function capturaAnterior() {

  capturaActual--;


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
      document.getElementById("galeria");


    if (
      !galeria ||
      !galeria.classList.contains("activa")
    ) {

      return;

    }


    if (
      event.key === "ArrowRight"
    ) {

      capturaSeguent();

    }


    if (
      event.key === "ArrowLeft"
    ) {

      capturaAnterior();

    }


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


if (zonaImatge) {

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


  zonaImatge.addEventListener(
    "touchend",
    function(event) {

      touchFinalX =
        event.changedTouches[0].screenX;


      const diferencia =
        touchFinalX - touchInicialX;


      if (
        diferencia < -50
      ) {

        capturaSeguent();

      }


      if (
        diferencia > 50
      ) {

        capturaAnterior();

      }

    },
    {
      passive: true
    }
  );

}



/* =========================================================
   TANCAR GALERIA CLICANT AL FONS
   ========================================================= */

const galeria =
  document.getElementById("galeria");


if (galeria) {

  galeria.addEventListener(
    "click",
    function(event) {

      if (
        event.target === this
      ) {

        tancarGaleria();

      }

    }
  );

}
