const keyFullscreen = ['p'];
const keyEditMode = ['i', '/'];
const keyAddTextElement = ['a'];
const keyNextTransformation = ['s', 'j'];
const keyDelete = ['d', 'delete', 'backspace']

const defaultArt = 0;

const controlValues = {
    textElementBorder: false,
    textElementBorderColor: "#ffffff"
};

const canvasApp = document.getElementById('text');
const canvasArt = document.getElementById('art');
const editPanel = document.getElementById('edit-panel');
const editPanelHeader = document.getElementById('edit-panel-header');

let isDraggingEditPanel = false;
let offsetEditPanel = { x: 0, y: 0 }

editPanelHeader.addEventListener('mousedown', (e) => {
    const activeTag = document.activeElement.tagName.toLowerCase();
    if (activeTag === 'input' || activeTag === 'label') return;
    isDraggingEditPanel = true;
    offsetEditPanel.x = e.clientX - editPanel.offsetLeft;
    offsetEditPanel.y = e.clientY - editPanel.offsetTop;
    e.stopPropagation();
});

document.addEventListener('mousemove', (e) => {
    if (isDraggingEditPanel) {
        editPanel.style.right = '';
        editPanel.style.left = `${e.clientX - offsetEditPanel.x}px`;
        editPanel.style.top = `${e.clientY - offsetEditPanel.y}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDraggingEditPanel = false;
});

window.controlValues = controlValues;
const borderCheckbox = document.getElementById('textElementBorder');
const borderColorInput = document.getElementById('textElementBorderColor');

function updateTextElementBorders() {
    const elements = document.querySelectorAll('.text-element');
    elements.forEach(el => {
        if (controlValues.textElementBorder) {
            el.style.boxShadow = `inset 0 0 0 1px ${controlValues.textElementBorderColor}`;
        } else {
            el.style.boxShadow = 'none';
        }
    });
}

borderCheckbox.addEventListener('change', () => {
    controlValues.textElementBorder = borderCheckbox.checked;
    updateTextElementBorders();
});

borderColorInput.addEventListener('input', () => {
    controlValues.textElementBorderColor = borderColorInput.value;
    updateTextElementBorders();
});


const transformations = ['scale', 'opacity', 'rotate'];
let currentTransformation = 0;
let isEditMode = false;

const hydra = new Hydra({
    canvas: canvasArt,
    detectAudio: true,
    enableStreamCapture: false
});

let artIndex = 0;
let artBlendAmount = 0;
let artTransitioning = false;

const renderArt = (art) => {
    speed = 1;
    art().out(o3);

    artBlendAmount = 0;
    artTransitioning = true;
}

const noArt = () => renderArt(() => solid(0, 0, 0, 1));

setInterval(() => {
    if (artTransitioning) {
        artBlendAmount += 0.001;
        if (artBlendAmount >= 1) {
            artBlendAmount = 1;
            artTransitioning = false;
        }
    }
    src(o3).blend(src(o0), 1 - artBlendAmount).out();
}, 30);

function updateResolution() {
    const scale = window.devicePixelRatio || 1;
    hydra.setResolution(window.innerWidth * scale, window.innerHeight * scale);
}

updateResolution();
window.addEventListener('resize', updateResolution);

window.addEventListener('load', () => {
    if (!isNaN(defaultArt) && defaultArt >= 0 && defaultArt < arts.length)
        renderArt(arts[defaultArt]);
});

let textElementHistory = [];
let selectedTextElement = null;

document.body.addEventListener('keydown', (e) => {
    const activeTag = document.activeElement.tagName.toLowerCase();
    if (activeTag === 'textarea') return;

    key = e.key.toLowerCase();
    num = parseInt(key);

    if (keyFullscreen.includes(key))
        toggleFullscreen();

    if (keyEditMode.includes(key))
        toggleEditMode();

    if (!isNaN(num)) {
        if (num == 0)
            noArt();
        else if (num > 0 && num <= arts.length)
            renderArt(arts[num - 1]);
    }

    if (!isEditMode) return;

    if (keyAddTextElement.includes(key))
        addTextElement();

    if (keyNextTransformation.includes(key))
        nextTransformation();

    if (keyDelete.includes(key))
        deleteTextElement(selectedTextElement);
});

function setCurrentTransformation(i) {
    currentTransformation = i;
    document.getElementById('current-transformation-indicator').textContent = transformations[currentTransformation];
}

function nextTransformation() {
    setCurrentTransformation((currentTransformation + 1) % transformations.length);
}

function toggleEditMode() {
    isEditMode = !isEditMode;
    setCurrentTransformation(0);
    document.body.classList.toggle('edit-mode', isEditMode);

    if (isEditMode)
        a.show();
    else
        a.hide();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error(`Error attempting fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function selectTextElement(el) {
    if (selectedTextElement === el) return;

    if (selectedTextElement) {
        selectedTextElement.classList.remove('selected-text-element');
    }

    if (el !== null);
    selectedTextElement = el;

    textElementHistory = textElementHistory.filter(e => e !== el);
    textElementHistory.unshift(el);

    if (selectedTextElement) {
        selectedTextElement.classList.add('selected-text-element');
    }
}

function deleteTextElement(el) {
    if (el === null) return;
    el.remove();
    textElementHistory = textElementHistory.filter(el => el !== selectedTextElement);

    selectedTextElement = textElementHistory[0] || null;
    if (selectedTextElement) {
        selectedTextElement.classList.add('selected-text-element');
    }
}

function addTextElement() {
    const defaultText = "text";

    const el = document.createElement('div');
    el.className = 'text-element';
    el.style.left = '100px';
    el.style.top = '100px';
    el.style.transform = `rotate(0deg) scale(1)`;

    el.innerHTML = `
    <span>${defaultText}</span>
    <textarea name="text">${defaultText}</textarea>
  `;

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    let rotate = 0;
    let scale = 1;
    let opacity = 1;

    // Drag
    el.addEventListener('mousedown', (e) => {
        if (!isEditMode) return;

        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = parseFloat(el.style.left);
        initialTop = parseFloat(el.style.top);
        selectTextElement(el);
        e.preventDefault();
        e.stopPropagation();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isEditMode || !isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        el.style.left = `${initialLeft + dx}px`;
        el.style.top = `${initialTop + dy}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    el.addEventListener('wheel', (e) => {
        if (!isEditMode) return;
        e.preventDefault();

        if (transformations[currentTransformation] === 'rotate') {

            // Rotate
            rotate += e.deltaY < 0 ? -1 : 1;
            updateTransform();

        } else if (transformations[currentTransformation] === 'scale') {

            // Scale
            scale += e.deltaY < 0 ? 0.025 : -0.025;
            scale = Math.max(0.9, scale);
            updateTransform();

        } else if (transformations[currentTransformation] === 'opacity') {

            // Opacity
            opacity += e.deltaY < 0 ? 0.05 : -0.05;
            opacity = Math.min(1, Math.max(0.1, opacity));
            el.style.opacity = opacity;

        }
    });

    function updateTransform() {
        el.style.transform = `rotate(${rotate}deg) scale(${scale})`;
    }

    el.addEventListener('dblclick', () => {
        if (!isEditMode) return;
        el.classList.add('editing');
        el.querySelector('textarea').focus();
    });

    el.querySelector('textarea').addEventListener('blur', () => {
        const val = el.querySelector('textarea').value;
        el.querySelector('span').textContent = val;
        el.classList.remove('editing');
    });

    // Select for delete
    el.addEventListener('click', () => {
        if (!isEditMode) return;
        document.querySelectorAll('.text-element').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
    });

    canvasApp.appendChild(el);
    updateTextElementBorders();
    selectTextElement(el);
}

document.body.addEventListener('mousedown', () => {
    if (!isEditMode) return;
    selectTextElement(null);
});
