var HTMLarr = [['education', 'He received a BS from&nbsp;<a class="external-link" href="http://www.ntu.edu.tw/" rel="nofollow" data-mce-href="http://www.ntu.edu.tw/" data-mce-style="text-decoration: none;" style="text-decoration: none; font-family: Arial, sans-serif; font-size: 13.63636302948px; line-height: 18.1818180084229px; color: rgb(50, 108, 166) !important;" target="_blank">National Taiwan University</a>&nbsp;and PhD from&nbsp;<a class="external-link" href="http://www.stanford.edu/" rel="nofollow" data-mce-href="http://www.stanford.edu/" data-mce-style="text-decoration: none;" style="text-decoration: none; font-family: Arial, sans-serif; font-size: 13.63636302948px; line-height: 18.1818180084229px; color: rgb(50, 108, 166) !important;" target="_blank">Stanford University</a>, in Electrical Engineering.'], 
            ['interest', 'His research addresses large scale information access, for search, mining, and integration across structured and unstructured big data, with current focuses on "entity-centric" Web search/mining and social media analytics.'],
            ['interest', 'He is passionate to bring research results to the real world and, with his students, co-founded&nbsp;<a class="external-link" href="http://www.cazoodle.com/" rel="nofollow" data-mce-href="http://www.cazoodle.com/" data-mce-style="text-decoration: none;" style="text-decoration: none; font-family: Arial, sans-serif; font-size: 13.63636302948px; line-height: 18.1818180084229px; color: rgb(50, 108, 166) !important;" target="_blank">Cazoodle</a>, a startup from the University of Illinois, for deepening vertical "data-aware" search over the web.'],
            ['award', 'He received two Best Paper Selections in VLDB 2000 and 2013, an NSF CAREER Award in 2002, an NCSA Faculty Fellow Award in 2003, IBM Faculty Awards in 2004 and 2005, Academy for Entrepreneurial Leadership Faculty Fellow Award in 2008, and the Incomplete List of Excellent Teachers at University of Illinois in 2001, 2004, 2005, 2006, 2010, and 2011.']
];

var TEXTarr = [['education' , 'He received a BS from National Taiwan University and PhD from Stanford University, in Electrical Engineering.'], 
    /*
    ['interest' , ], 
    ['interest' , ], 
    ['award' , ]
    */
];


document.addEventListener('dblclick', ((e) => {
    var range = window.getSelection().getRangeAt(0);
    var sentBefore = range.startContainer.wholeText.substr(0, range.startOffset);
    var sentAfter = range.startContainer.wholeText.substr(range.startOffset);

    var startIndex = sentBefore.lastIndexOf(". ");
    var endIndex = sentAfter.indexOf(". ");

    var before, after;
    if (startIndex == -1) {
        before = sentBefore;
    } else {
        before = sentBefore.substr(startIndex+1, range.endOffset)
    }

    if (endIndex == -1) {
        after = sentAfter;
    } else {
        after = sentAfter.substr(0, endIndex);
    }
    var sent = (before + after + ".").trim();

    /*
    chrome.runtime.sendMessage({
        type: 'sent',
        word: sent,
    })
    */


    showPopups(e, sent);

    /*
    var word = window.getSelection().toString();
    var paragraph = window.getSelection().getRangeAt(0).startContainer.wholeText;
    var sents = paragraph.match(/\S.*?\."?(?=\s|$)/g);
    */

    /*
    var word = window.getSelection().toString();
    var paragraph = window.getSelection().getRangeAt(0).startContainer.wholeText;

    var reStr =
        "\. +"                   + // a preceding sentence-ender, i.e. a period
                                    //   followed by one or more spaces
        "("                      + // begin remembering the match (i.e. arr[1] below)
            "[A-Z]"                + // a sentence-starter, i.e. an uppercase letter
            "("                    + // start of a sentence-continuer, which is either
            "[^.]"               + // anything but a period
            "|"                  + // or
            "\.(?! +[A-Z])"      + // a period not followed by one or more spaces
                                    //   and an uppercase letter
            ")"                    + // end of a sentence-continuer
            "*?"                   + // zero or more of the preceding sentence-continuers
                                    //   but as few as possible
            word                + // the keyword being sought
            "([^.]|\.(?! +[A-Z]))" + // a sentence-continuer, as described above
            "*?"                   + // zero or more of them but as few as possible
            "\."                   + // a sentence-ender, i.e. a period
            "(?= +[A-Z])"          + // followed by one or more spaces and an
                                    //   uppercase letter, which is not remembered
        ")";                       // finish remembering the match
    var re = new RegExp(reStr, "g");
    */

    return;
}));

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if( request.message === "highlight" ) {
        var inputText = window.document.getElementsByTagName('main')[0];
        var innerHTML = inputText.innerHTML;
        var search = ex;

        chrome.runtime.sendMessage({
            type: 'highlight to BG',
            message: search,
        })
        

        /*
        for (let i = 0; i < HTMLarr.length; i++) {
            chrome.runtime.sendMessage({
                type: 'highlight to BG',
                message: HTMLarr[i],
            })

            if (HTMLarr[i][0] == 'education') {
                highlight(HTMLarr[i][1], '#FFFF00');
                showPopups()
                
            } else if (HTMLarr[i][0] == 'interest') {
                highlight(HTMLarr[i][1], '#FF0000');
            } else {
                highlight(HTMLarr[i][1], '#800080');
            }
        }
        */

       /*
        var inputText = window.document.getElementsByTagName('main')[0];
        var innerHTML = inputText.innerHTML;
        var innerText = inputText.innerText;
        var HTML = HTMLarr[0][1];
        var TEXT = TEXTarr[0][1];
        var HTMLindex = innerHTML.indexOf(HTML);
        var TEXTindex = innerText.indexOf(TEXT);

        chrome.runtime.sendMessage({
            type: 'highlight to BG',
            message: TEXTindex,
        })
        */
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if( request.message === "test" ) {

        var elems = window.document.getElementsByTagName('main')[0].getElementsByTagName('p'); 

        var texts = [];
        for (let i = 0; i < elems.length; i++) {
            texts.push(elems[i].innerText);
        }

        chrome.runtime.sendMessage({
            type: 'texts to BG',
            message: texts,
        })


        /*
        var texts = [];
        var objs = [];
        for (let i = 0; i < elems.length; i++) {
            objs.push(elems[i]);
            texts.push(elems[i].innerText);
            //arr.push(elems[i].innerText);
            //elems[i].style.color = 'red'; // convert sentence color as red 
            //elems[i].style.backgroundColor = "#FDFF47"; // highlight the sentences  
        }

        chrome.runtime.sendMessage({
            type: 'BG',
            message: [objs, texts],
        })
        */

        /*
        const allTextNodes = [];
        const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        while (treeWalker.nextNode()) {
          allTextNodes.push(treeWalker.currentNode.data);
        }

        const occurrenceRegex = options.occurrenceRegex(selectionString.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));

        chrome.runtime.sendMessage({
            type: 'BG',
            message: allTextNodes,
        })
        */
    }
});

function retrieveLabel(info) {
    return chrome.runtime.sendMessage({
        type: 'retrieve',
        word: info.word,
    })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "send") {
        var elems = window.document.getElementsByTagName('main')[0].getElementsByTagName('p'); 

        var texts = [];
        for (let i = 0; i < elems.length; i++) {
            texts.push([elems[i].innerText]);
        }

        chrome.runtime.sendMessage({
            type: 'send',
            message: texts,
        }, function(response) {
            result = response.farewell;
            alert(result.text.substr(0, 5));
            //highlight(result.text.substr(0, 5), '#FFFF00');
        });
    }
})