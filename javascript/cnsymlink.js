function moveSymlinkerButtons(scriptContainerId) {
    var scriptContainer = document.getElementById(scriptContainerId);
    if (scriptContainer) {
        var cnSymlinkButtons = document.createElement("div");
        cnSymlinkButtons.id = "cn_symlinker_buttons";
        var sdCnButton = scriptContainer.querySelector("#cn_sd_symlinker_button");
        var sdxlCnButton = scriptContainer.querySelector("#cn_sdxl_symlinker_button");
        var controlnetExtTabs = scriptContainer.querySelector("#" + scriptContainerId + "_controlnet_tabs");
        if (sdCnButton && sdxlCnButton && controlnetExtTabs) {
            sdCnButton.parentNode.insertBefore(cnSymlinkButtons, sdCnButton);
            cnSymlinkButtons.appendChild(sdCnButton);
            cnSymlinkButtons.appendChild(sdxlCnButton);
            var cnSymlinkContainer = cnSymlinkButtons.parentNode;
            cnSymlinkContainer.id = "cn_symlynk_container";
            controlnetExtTabs.insertBefore(cnSymlinkContainer, controlnetExtTabs.firstChild);
        } else {
            console.log("дополнения не загружены?");
        }
    } else {
        console.log("контейнер скриптов не найден");
    }
}


function onElementsLoaded(observer, elementsToObserve, callback) {
    const elementsFound = elementsToObserve.map(selector => document.querySelector(selector));
    if (elementsFound.every(element => element !== null)) {
        observer.disconnect();
        callback();
    }
}

function observeDOM(elementsToObserve, callback) {
    const observer = new MutationObserver(mutations => {
        onElementsLoaded(observer, elementsToObserve, callback);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}


const elementsToObserve = [
    '#txt2img_controlnet',
    '#img2img_controlnet',
    '#controlnet_models_gdrive'
];


observeDOM(elementsToObserve, () => {
    moveSymlinkerButtons("txt2img_script_container");
    moveSymlinkerButtons("img2img_script_container");
});

