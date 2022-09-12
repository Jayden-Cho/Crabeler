var extractedSents = [];
var Predicted_total_awd = 0;
var Predicted_total_edu = 0;
var Predicted_total_int = 0;

var Correct_total_awd = 0;
var Correct_total_edu = 0;
var Correct_total_int = 0;

var True_total_awd = 0;
var True_total_edu = 0;
var True_total_int = 0;

var serverhost = 'http://10.250.13.18:8000';
//var serverhost = 'http://127.0.0.1:8000';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ( request.type === 'show to BG' ) {
        console.log(request.message);

        
        var url = serverhost + '/classifier/receive_json/?text='+ encodeURIComponent(request.message);
        console.log(url);

        fetch(url, {method: "POST", body: request.message})
        .then((response) => response.json())
        .then((response) => sendResponse({data: response}));
        

        /*
        result = {
            "background": [
                "Kevin C. Chang is a Professor in Computer Science,\u00a0University of Illinois at Urbana-Champaign.", 
                "He received a BS from\u00a0National Taiwan University\u00a0and PhD from\u00a0Stanford University, in Electrical Engineering.", 
                "You will join our projects to work with graduate students for design algorithms and implement systems in data management, data mining, and social media/network analytics."
            ], 
            "awards": [
                "He received two Best Paper Selections in VLDB 2000 and 2013, an NSF CAREER Award in 2002, an NCSA Faculty Fellow Award in 2003, IBM Faculty Awards in 2004 and 2005, Academy for Entrepreneurial Leadership Faculty Fellow Award in 2008, and the Incomplete List of Excellent Teachers at University of Illinois in 2001, 2004, 2005, 2006, 2010, and 2011."
            ], 
            "interest": [
                "His research addresses large scale information access, for search, mining, and integration across structured and unstructured big data, with current focuses on \"entity-centric\" Web search/mining and social media analytics.",
                "Therefore, our research spans across\u00a0data mining,\u00a0data management/databases,\u00a0information retrieval, machine learning, with current efforts focusing on\u00a0interactive data management,\u00a0entity-centric Web search and mining,\u00a0social media analytics,\u00a0and\u00a0social network mining.", 
                "As our objectives, we aim at developing novel systems, principled algorithms, and formal theories that ultimately deliver real world applications.", "As our approaches, we seek to be inspired by and learn from the data we are tackling-- i.e., we believe the key to tame big data is to learn the wisdom hidden in the large scale of the data.", 
                "Our current projects studies theories and algorithms as well as build systems for real world data management applications for Web search/mining and social media analytics.", 
                "Take a look at our recent publications to see what we work on."
            ]
        }
        */
        


        /*
        var url = serverhost + '/wiki/get_wiki_summary/?text='+ encodeURIComponent(request.message);
        console.log(url);
        console.log(extractedSents)

        
        var result = {
            "background": ["He received a BS from\u00a0National Taiwan University\u00a0and PhD from\u00a0Stanford University, in Electrical Engineering."],
            "interest": ["His research addresses large scale information access, for search, mining, and integration across structured and unstructured big data, with current focuses on \"entity-centric\" Web search/mining and social media analytics.", "He is passionate to bring research results to the real world and, with his students, co-founded\u00a0Cazoodle, a startup from the University of Illinois, for deepening vertical \"data-aware\" search over the web."],
            "awards": ["He received two Best Paper Selections in VLDB 2000 and 2013, an NSF CAREER Award in 2002, an NCSA Faculty Fellow Award in 2003, IBM Faculty Awards in 2004 and 2005, Academy for Entrepreneurial Leadership Faculty Fellow Award in 2008, and the Incomplete List of Excellent Teachers at University of Illinois in 2001, 2004, 2005, 2006, 2010, and 2011."],
            "bnum": 1,
            "anum": 1,
            "inum": 2,
            "none": 1
        };

        fetch(url)
        .then((response) => response.json())
        .then((response) => sendResponse({farewell: response, data: result}));
        */
        
	}

    return true;
});

function PrecAndRec(matrix) {
    var rowSum = matrix.map(r => r.reduce((a, b) => a + b));
	var colSum = matrix.reduce((a, b) => a.map((x, i) => x + b[i]));

    Predicted_total_awd = rowSum[0];
    Predicted_total_edu = rowSum[1];
    Predicted_total_int = rowSum[2];
    
    Correct_total_edu = matrix[0][0];
    Correct_total_int = matrix[1][1];
    Correct_total_awd = matrix[2][2];
    
    True_total_edu = colSum[0];
    True_total_int = colSum[1];
    True_total_awd = colSum[2];

    return Predicted_total_awd, Predicted_total_edu, Predicted_total_int, Correct_total_awd, Correct_total_edu, Correct_total_int, True_total_awd, True_total_edu, True_total_int
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ( request.type === 'send to BG' ) {
        console.log(request.message);
        console.log('aa');
        console.log(request.mat);
        Predicted_total_awd, Predicted_total_edu, Predicted_total_int, Correct_total_awd, Correct_total_edu, Correct_total_int, True_total_awd, True_total_edu, True_total_int = PrecAndRec(request.mat);
        console.log(Predicted_total_awd, Predicted_total_edu, Predicted_total_int, Correct_total_awd, Correct_total_edu, Correct_total_int, True_total_awd, True_total_edu, True_total_int);
        console.log('bb');
        
        var url = serverhost + '/classifier/receive_json/?text='+ encodeURIComponent(request.message) + '&data=' + encodeURIComponent(JSON.stringify(extractedSents))
                    + '&Predicted_total_awd=' + encodeURIComponent(JSON.stringify(Predicted_total_awd)) + '&Predicted_total_edu=' + encodeURIComponent(JSON.stringify(Predicted_total_edu))
                    + '&Predicted_total_int=' + encodeURIComponent(JSON.stringify(Predicted_total_int)) + '&Correct_total_awd=' + encodeURIComponent(JSON.stringify(Correct_total_awd))
                    + '&Correct_total_edu=' + encodeURIComponent(JSON.stringify(Correct_total_edu)) + '&Correct_total_int=' + encodeURIComponent(JSON.stringify(Correct_total_int))
                    + '&True_total_awd=' + encodeURIComponent(JSON.stringify(True_total_awd)) + '&True_total_edu=' + encodeURIComponent(JSON.stringify(True_total_edu))
                    + '&True_total_int=' + encodeURIComponent(JSON.stringify(True_total_int));
        console.log(url);

        fetch(url, {method: "POST", body: request.message})
        .then((response) => response.json())
        .then((response) => sendResponse({data: response}));
        
        /*
        var url = serverhost + '/wiki/get_wiki_summary/?text='+ encodeURIComponent(request.message) 
        console.log(url);
        console.log(extractedSents)

        var result = {
            'accEdu': 70,
            'accInt': 80,
            'accAwa': 90,
        };

        fetch(url)
        .then((response) => response.json())
        .then((response) => sendResponse({farewell: response, data: result}));
        */
	}

    return true;
});



chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ( request.type === 'award' ) {
        extractedSents.push([request.content, 'awards']);
        console.log(extractedSents);
	}

    return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ( request.type === 'interest' ) {
        extractedSents.push([request.content, 'interest'])
        console.log(extractedSents);
	}

    return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ( request.type === 'education' ) {
        extractedSents.push([request.content, 'background'])
        console.log(extractedSents);
	}

    return true;
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if ( request.type === 'none' ) {
        extractedSents.push([request.content, 'none'])
        console.log(extractedSents);
	}

    return true;
});