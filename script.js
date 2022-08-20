let optionsButtons = document.querySelectorAll('.option-button');
let advancedOptionsButtons = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let textArea = document.getElementById('textArea');
let linkButton = document.getElementById('createLink');
let alignButtons = document.querySelectorAll('.align');
let spacingButtons = document.querySelectorAll('.spacing');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');

// Lista de Fontes
let fontList = ["Times New Roman", "Courier New", "Georgia", 
"Trebuchet MS", "Comic Sans MS", "Impact", "Lucida Console", "Lucida Sans Unicode", 
"Palatino Linotype", "Tahoma", "Arial", "Arial Black", "Arial Narrow", "Arial Rounded MT Bold", 
"Avant Garde", "Calibri", "Cambria", "Candara", "Century Gothic", "Consolas", "Constantia", 
"Corbel", "Courier", "Courier New", "Franklin Gothic Medium", "Garamond", "Geneva", 
"Gill Sans MT", "Helvetica", "Impact", "Lucida Bright", "Lucida Sans", "Lucida Sans Typewriter", 
"Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", 
"MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "Palatino", "Segoe Print", "Segoe Script", 
"Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", 
"Times New Roman", "Trebuchet MS", "Verdana", "Webdings", "Wingdings", "Wingdings 2", "Wingdings 3"];

// Configurações iniciais
const initializer = () => {
    // Função que chama os botões de destaque
    // Sem destaques para links, unlinks, listas, desfazer e refazer, pois são operações únicas
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // Criar opções de nomes das fontes
    fontList.map(value => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // Tamanho da fonte disponível até 7
    for (let i = 1; i <= 7; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    };

    // Tamanho padrão
    fontSizeRef.value = 3;
};

// Lógica
const modifyText = (command, defaultUi, value) => {
    // Executa o comando no texto selecionado
    document.execCommand(command, defaultUi, value);
}

optionsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionsButtons.forEach((button) => {
    button.addEventListener('change', () => {
        modifyText(button.id, false, button.value);
    });
});

// Link
linkButton.addEventListener('click', () => {
    let userLink = prompt('Digite o link: ');
    // Se o link tiver "http" passa direto, se não adiciona "http://"
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = 'http://' + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

// Botões clicados em destaque
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener('click', () => {
            // needsRomoval = true significa que apenas um botão deve estar destacado
            if (needsRemoval) {
                let alreadyActive = false;

                // Verifica se o botão já está destacado
                if (button.classList.contains('active')) {
                    alreadyActive = true;
                }

                // Remove o destaque dos outros botões
                highlighterRemove(className);
                if(!alreadyActive) {
                    // Adiciona destaque ao botão clicado
                    button.classList.add('active');
                }
            } else {
                // Se os outros botões puderem ser destacados
                button.classList.toggle('active');
            }
        });
    });
};

const highlighterRemove = (className) => {
    className.forEach((button) => {
        button.classList.remove('active');
    });
};

initializer();