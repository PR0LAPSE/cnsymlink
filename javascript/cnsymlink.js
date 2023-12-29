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


function onElementsLoaded(elementsToObserve, callback) {
    const elementsStatus = elementsToObserve.reduce((status, selector) => {
        status[selector] = false;
        return status;
    }, {});

    function checkElementsStatus() {
        if (Object.values(elementsStatus).every(status => status)) {
            observer.disconnect();
            callback();
        }
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                elementsToObserve.forEach(selector => {
                    if (document.querySelector(selector)) {
                        elementsStatus[selector] = true;
                    }
                });
                checkElementsStatus();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    elementsToObserve.forEach(selector => {
        if (document.querySelector(selector)) {
            elementsStatus[selector] = true;
        }
    });
    checkElementsStatus();
}


const elementsToObserve = [
    '#txt2img_controlnet',
    '#img2img_controlnet',
    '#controlnet_models_gdrive',
    '#cn_sd_symlinker_button',
    '#cn_sdxl_symlinker_button',
    '#txt2img_script_container',
    '#img2img_script_container'
];

document.addEventListener('DOMContentLoaded', function () {
    onUiLoaded(function () {
        
        onElementsLoaded(elementsToObserve, () => {
            moveSymlinkerButtons("txt2img_script_container");
            moveSymlinkerButtons("img2img_script_container");
        });
    });
});
