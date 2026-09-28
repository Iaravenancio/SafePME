/* =========================================================
   SAFEPME
   APP.JS
========================================================= */


/* =========================================================
   1. MENU MOBILE - SITE PÚBLICO
========================================================= */

function toggleMobileMenu() {

    const nav = document.querySelector(".main-nav");
    const actions = document.querySelector(".header-actions");

    if (!nav) return;

    const isOpen = nav.classList.contains("mobile-open");

    if (isOpen) {

        nav.classList.remove("mobile-open");

        if (actions) {
            actions.classList.remove("mobile-open");
        }

    } else {

        nav.classList.add("mobile-open");

        if (actions) {
            actions.classList.add("mobile-open");
        }

    }
}


/* =========================================================
   2. SIDEBAR MOBILE
========================================================= */

function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.classList.toggle("open");
}


/* =========================================================
   3. MOSTRAR / OCULTAR SENHA
========================================================= */

function togglePassword(inputId) {

    const input = document.getElementById(inputId);

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";

    }
}


/* =========================================================
   4. CADASTRO SIMULADO
========================================================= */

function handleRegister(event) {

    event.preventDefault();

    const company =
        document.getElementById("company").value;

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("registerEmail").value;

    const password =
        document.getElementById("registerPassword").value;


    const user = {

        company: company,

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
    "safePMEUser",
    JSON.stringify(user)
    );

    localStorage.setItem(
        "safePMESession",
        "true"
    );

    alert(
        "Conta criada com sucesso!\n\n" +
        "Agora você será direcionado para o painel."
    );

    window.location.href = "dashboard.html";
    }


/* =========================================================
   5. LOGIN SIMULADO
========================================================= */

function handleLogin(event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;


    const savedUser =
        JSON.parse(
            localStorage.getItem("safePMEUser")
        );


    /*
       Para facilitar a demonstração do MVP:

       Se não houver cadastro,
       permitimos a entrada com qualquer
       e-mail e senha preenchidos.
    */

    if (!savedUser) {

        localStorage.setItem(
            "safePMESession",
            "true"
        );

        window.location.href = "dashboard.html";

        return;
    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "safePMESession",
            "true"
        );

        window.location.href = "dashboard.html";

    } else {

        alert(
            "E-mail ou senha incorretos.\n\n" +
            "Para esta demonstração, você pode criar uma conta primeiro."
        );

    }
}


/* =========================================================
   6. LOGOUT
========================================================= */

function logout() {

    localStorage.removeItem("safePMESession");

    window.location.href = "index.html";
}


/* =========================================================
   7. CARREGAR DADOS DO USUÁRIO
========================================================= */

function loadUserData() {

    const savedUser =
        JSON.parse(
            localStorage.getItem("safePMEUser")
        );


    if (!savedUser) return;


    const userNameElements =
        document.querySelectorAll(
            "#userName, #dashboardName"
        );


    userNameElements.forEach(element => {

        element.textContent =
            savedUser.name;

    });

}


/* =========================================================
   8. ARQUIVO SELECIONADO
========================================================= */

function showSelectedFile() {

    const input =
        document.getElementById("boletoFile");

    const output =
        document.getElementById("selectedFile");


    if (!input || !output) return;


    if (input.files.length > 0) {

        output.textContent =
            "✓ Arquivo selecionado: " +
            input.files[0].name;

    } else {

        output.textContent = "";

    }
}


/* =========================================================
   9. ANÁLISE SIMULADA DE BOLETO
========================================================= */

function analisarBoleto() {

    const input =
        document.getElementById("boletoFile");

    const result =
        document.getElementById("verificationResult");


    if (!input || !result) return;


    if (input.files.length === 0) {

        alert(
            "Selecione um arquivo antes de realizar a análise."
        );

        return;
    }


    result.classList.remove("hidden");


    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   10. ANÁLISE SIMULADA DE MENSAGEM
========================================================= */

function analisarMensagem() {

    const input =
        document.getElementById("messageInput");

    const result =
        document.getElementById("verificationResult");


    if (!input || !result) return;


    const message =
        input.value.trim();


    if (message.length < 5) {

        alert(
            "Cole uma mensagem ou conteúdo para realizar a análise."
        );

        return;
    }


    result.classList.remove("hidden");


    result.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   11. FILTROS DOS ALERTAS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const filterButtons =
            document.querySelectorAll(".filter-tab");


        filterButtons.forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    filterButtons.forEach(btn => {

                        btn.classList.remove("active");

                    });


                    this.classList.add("active");

                }
            );

        });

    }
);


/* =========================================================
   12. INICIALIZAÇÃO
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadUserData();

    }
);