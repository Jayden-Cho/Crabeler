var bCount = 0;
var aCount = 0;
var iCount = 0;
var bacc;
var aacc;
var iacc;
var matrix = [
    [0, 0, 0, 0], // Education
    [0, 0, 0, 0], // Interest
    [0, 0, 0, 0], // Award
    [0, 0, 0, 0]  // None
];
var outputdict = {};
var idxdict = {'education': 0, 'interest': 1, 'award': 2, 'none': 3};

function showPopups(event, sent) {
    var createdDiv,
        info = getSelectionInfo(event);

    createdDiv = createDiv(info);
    
    appendToDiv(createdDiv, info, sent);
}

function getSelectionInfo(event) {
    var word;
    var boundingRect;

    if (window.getSelection().toString().length > 1) {
        word = window.getSelection().toString();
        boundingRect = getSelectionCoords(window.getSelection());
    } else {
        return null;
    }

    var top = boundingRect.top + window.scrollY,
        bottom = boundingRect.bottom + window.scrollY,
        left = boundingRect.left + window.scrollX;

    if (boundingRect.height == 0) {
        top = event.pageY;
        bottom = event.pageY;
        left = event.pageX;
    }

    return {
        top: top,
        bottom: bottom,
        left: left,
        word: word,
        clientY: event.clientY,
        height: boundingRect.height
    };
}

function getSelectionCoords(selection) {
    var oRange = selection.getRangeAt(0);
    var oRect = oRange.getBoundingClientRect();
    return oRect
}

function createDiv(info) {
    var hostDiv = document.createElement("div");

    hostDiv.className = "labelDiv";
    hostDiv.style.left = info.left -10 + "px";
    hostDiv.style.position = "absolute";
    hostDiv.style.zIndex = "1000000";
    hostDiv.attachShadow({mode: 'open'});

    
    var shadow = hostDiv.shadowRoot;
    var style = document.createElement("style");
    style.textContent = ".mwe-popups{background:#fff;position:absolute;z-index:110;-webkit-box-shadow:0 30px 90px -20px rgba(0,0,0,0.3),0 0 1px #a2a9b1;box-shadow:0 30px 90px -20px rgba(0,0,0,0.3),0 0 1px #a2a9b1;padding:0;font-size:14px;min-width:300px;border-radius:2px}.mwe-popups.mwe-popups-is-not-tall{width:320px}.mwe-popups .mwe-popups-container{color:#222;margin-top:-9px;padding-top:9px;text-decoration:none}.mwe-popups.mwe-popups-is-not-tall .mwe-popups-extract{min-height:40px;max-height:140px;overflow:hidden;margin-bottom:47px;padding-bottom:0}.mwe-popups .mwe-popups-extract{margin:16px;display:block;color:#222;text-decoration:none;position:relative} .mwe-popups.flipped_y:before{content:'';position:absolute;border:8px solid transparent;border-bottom:0;border-top: 8px solid #a2a9b1;bottom:-8px;left:10px}.mwe-popups.flipped_y:after{content:'';position:absolute;border:11px solid transparent;border-bottom:0;border-top:11px solid #fff;bottom:-7px;left:7px} .mwe-popups.mwe-popups-no-image-tri:before{content:'';position:absolute;border:8px solid transparent;border-top:0;border-bottom: 8px solid #a2a9b1;top:-8px;left:10px}.mwe-popups.mwe-popups-no-image-tri:after{content:'';position:absolute;border:11px solid transparent;border-top:0;border-bottom:11px solid #fff;top:-7px;left:7px} .audio{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcUlEQVQ4y2P4//8/AyUYQhAH3gNxA7IAIQPmo/H3g/QA8XkgFiBkwHyoYnRQABVfj88AmGZcTuuHyjlgMwBZM7IE3NlQGhQe65EN+I8Dw8MLGgYoFpFqADK/YUAMwOsFigORatFIlYRElaRMWmaiBAMAp0n+3U0kqkAAAAAASUVORK5CYII=);background-position: center;background-repeat: no-repeat;cursor:pointer;margin-left: 8px;opacity: 0.5; width: 16px; display: inline-block;} .audio:hover {opacity: 1;}";
    shadow.appendChild(style);


    var encapsulateDiv = document.createElement("div");
    encapsulateDiv.style = "all: initial; text-shadow: transparent 0px 0px 0px, rgba(0,0,0,1) 0px 0px 0px !important;";
    shadow.appendChild(encapsulateDiv);
    

    var popupDiv = document.createElement("div");
    popupDiv.style = "font-family: arial,sans-serif; border-radius: 12px; border: 1px solid #a2a9b1; box-shadow: 0 0 17px rgba(0,0,0,0.5)";
    encapsulateDiv.appendChild(popupDiv);

    
    var contentContainer = document.createElement("div");
    contentContainer.className = "mwe-popups-container";
    popupDiv.appendChild(contentContainer);
    

    var content = document.createElement("div");
    content.className = "mwe-popups-extract";
    content.style = "line-height: 1.4; margin-top: 0px; margin-bottom: 11px; max-height: none";
    contentContainer.appendChild(content);

    var award = document.createElement("button");

    var interest = document.createElement("button");
    
    var education = document.createElement("button");

    var none = document.createElement("button");

    var sent = document.createElement("p");

    content.appendChild(award);
    content.appendChild(interest);
    content.appendChild(education);
    content.appendChild(none);
    content.appendChild(sent);
    document.body.appendChild(hostDiv);

    if(info.clientY < window.innerHeight/2){
        popupDiv.className = "mwe-popups mwe-popups-no-image-tri mwe-popups-is-not-tall";
        hostDiv.style.top = info.bottom + 10 + "px";
        if(info.height == 0){
            hostDiv.style.top = parseInt(hostDiv.style.top) + 8 + "px";
        }
    } else {
        popupDiv.className = "mwe-popups flipped_y mwe-popups-is-not-tall";
        hostDiv.style.top = info.top - 10 - popupDiv.clientHeight + "px";

        if(info.height == 0){
            hostDiv.style.top = parseInt(hostDiv.style.top) - 8 + "px";
        }
    }

    return {
        award, 
        interest,
        education,
        none,
        sent
    }
}

// award interest education
function modifyMatrix(sent, label='none') {
    if (outputdict[sent] == undefined) { // Output of sent was None
        if (label == 'education') {
            matrix[3][3]--;
            matrix[3][0]++;
            outputdict[sent] = 'education';
        }
        if (label == 'interest') {
            matrix[3][3]--;
            matrix[3][1]++;
        }
        if (label == 'award') {
            matrix[3][3]--;
            matrix[3][2]++;
        }
    } else {
        var idx = idxdict[outputdict[sent]];
        if (label == 'education') {
            matrix[idx][idx]--;
            matrix[idx][0]++;
        }
        if (label == 'interest') {
            matrix[idx][idx]--;
            matrix[idx][1]++;
        }
        if (label == 'award') {
            matrix[idx][idx]--;
            matrix[idx][2]++;
        }    
        if (label == 'none') {
            matrix[idx][idx]--;
            matrix[idx][3]++;
        } 
    }
}


function appendToDiv(createdDiv, info, sent) {
    createdDiv.award.textContent = "award";
    createdDiv.interest.textContent = "interest";
    createdDiv.education.textContent = "education";
    createdDiv.none.textContent = "none";
    createdDiv.sent.textContent = sent;

    createdDiv.award.addEventListener("click", function() {
        chrome.runtime.sendMessage( '', {
            type: 'award',
            content: sent,
        });
        remove();
        highlight(sent, 'red');
        modifyMatrix(sent, 'award');
    });

    createdDiv.interest.addEventListener("click", function(){
        chrome.runtime.sendMessage( '', {
            type: 'interest',
            content: sent,
        });
        remove();
        highlight(sent, 'blue');
        modifyMatrix(sent, 'interest');
    });

    createdDiv.education.addEventListener("click", function(){
        chrome.runtime.sendMessage( '', {
            type: 'education',
            content: sent,
        });
        remove();
        highlight(sent, 'orange');
        modifyMatrix(sent, 'education');
    });

    createdDiv.none.addEventListener("click", function(){
        chrome.runtime.sendMessage( '', {
            type: 'none',
            content: sent,
        });
        remove();
        unhighlight(sent);
        modifyMatrix(sent);
    });
}

function remove() {
    document.querySelectorAll(".labelDiv").forEach(function(Node) {
        Node.remove();
    });
}

function removeLabel(event) {
    var element = event.target;
    if(!element.classList.contains("labelDiv")) {
        document.querySelectorAll(".labelDiv").forEach(function(Node) {
            Node.remove();
        });
    }
}

document.addEventListener('mouseup', ((e) => {
    var sent = window.getSelection().toString();

    showPopups(e, sent);
}))

document.addEventListener('dblclick', removeLabel);

function highlight(text, color) {
    var inputText = window.document.getElementsByTagName('main')[0];
    var innerHTML = inputText.innerHTML;
    var index = innerHTML.indexOf(text);
    if (index >= 0) { 
     innerHTML = innerHTML.substring(0,index) + "<span style='background-color: " + color + ";'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
     inputText.innerHTML = innerHTML;
    }
}

function unhighlight(text) {
    var inputText = window.document.getElementsByTagName('main')[0];
    var innerHTML = inputText.innerHTML;
    var index = innerHTML.indexOf(text);
    if (index >= 0) { 
     innerHTML = innerHTML.substring(0,index) + "<span style='background-color: rgba(255, 255, 255, 1);'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
     inputText.innerHTML = innerHTML;
    }
}

function createMatrix(dict) {
    for (const key of Object.keys(dict)) {
        if (key == 'bnum') {
            matrix[0][0] = dict[key];
        }
        if (key == 'anum') {
            matrix[2][2] = dict[key];
        }
        if (key == 'inum') {
            matrix[1][1] = dict[key];
        }
    }
    matrix[3][3] = 1;
}

function storescores(dict) {
    for (const key of Object.keys(dict)) {
        if (key == 'bacc') {
            bacc = (dict[key]*100).toFixed(2);
        }
        if (key == 'aacc') {
            aacc = (dict[key]*100).toFixed(2);
        }
        if (key == 'iacc') {
            iacc = (dict[key]*100).toFixed(2);
        }
    }
}

function highlightbyTopic(dict) {
    for (const key of Object.keys(dict)) {
        if (key == 'interest') {
            for (let i = 0; i < dict[key].length; i++) {
                var content = dict[key][i].replaceAll('\u00a0', ' ');
                highlight(content, 'blue');
                outputdict[content] = 'interest';
            }
        }
        if (key == 'awards') {
            for (let i = 0; i < dict[key].length; i++) {
                var content = dict[key][i].replaceAll('\u00a0', ' ');
                highlight(content, 'red');
                outputdict[content] = 'award';
            }
        }
        if (key == 'background') {
            for (let i = 0; i < dict[key].length; i++) {
                var content = dict[key][i].replaceAll('\u00a0', ' ');
                highlight(content, 'orange');
                outputdict[content] = 'education';
            }
        }
    };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if( request.message === "highlight" ) {

    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "show to CS") {
        var elems = window.document.body.getElementsByTagName('main')[0].getElementsByTagName('p');

        var texts = [];
        for (let i = 0; i < elems.length; i++) {
            texts.push([elems[i].innerText]);
        }

        for (let i = 0; i < elems.length; i++) {
            elems[i].innerHTML = elems[i].innerHTML.replace(/\n|<.*?>/g,'').replaceAll('&nbsp;', ' ');
        }
    
        chrome.runtime.sendMessage({
            type: 'show to BG',
            message: texts,
        }, function(response) {
            highlightbyTopic(response.data);
            createMatrix(response.data);
        });
    }
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "send to CS") {
        var elems = window.document.body.getElementsByTagName('main')[0].getElementsByTagName('p');

        var texts = [];
        for (let i = 0; i < elems.length; i++) {
            texts.push([elems[i].innerText]);
        }

        //backPrec, intPrec, awardPrec, backRec, intRec, awardRec = PrecAndRec(matrix);

        chrome.runtime.sendMessage({
            type: 'send to BG',
            message: texts,
            mat: matrix,
            /*
            bp: backPrec, 
            ip: intPrec, 
            ap: awardPrec, 
            br: backRec, 
            ir: intRec, 
            ar: awardRec*/
        }, function(response) {
            chrome.runtime.sendMessage({
                type: 'send to popup',
                accs: response.data,
                mat: matrix,
                abr: response.data.backRec,
                air: response.data.intRec,
                aar: response.data.awardRec,
                abp: response.data.backPrec,
                aip: response.data.intPrec,
                aap: response.data.awardPrec
            })
        });
    }
})