//const create = document.getElementById('create-csv');
//const dload = document.getElementById('download-csv');
//const test = document.getElementById('test-sents');
//const highlight = document.getElementById('highlight-sents');
const show = document.getElementById('show-result');
const label = document.getElementById('send-label');

show.addEventListener( 'click', () => {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "show to CS"});
    });
})

label.addEventListener( 'click', () => {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "send to CS"}, function(response) {
			if (document.getElementsByTagName('p').length == 0) {
				/*
				var cumulPerf = document.createElement('p');
				document.body.appendChild(cumulPerf);
				cumulPerf.innerHTML = "<b>Cumulated performance:</b> " + response.background + "%";
	
				var currPerf = document.createElement('p');
				document.body.appendChild(currPerf);
				currPerf.innerHTML = "<b>Current page performance:</b> " + response.interest + "%";
				*/
			}
		});
    });
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "send to popup") {
		if (document.getElementsByTagName('p').length == 0) {
			var rowSum = request.mat.map(r => r.reduce((a, b) => a + b));
			var colSum = request.mat.reduce((a, b) => a.map((x, i) => x + b[i]));


			/*
			var backPrec = document.createElement('p');
			document.body.appendChild(backPrec);
			backPrec.innerHTML = "<b>Precision for Background:</b> " + (request.mat[0][0] / rowSum[0]) * 100 + "%";

			var intPrec = document.createElement('p');
			document.body.appendChild(intPrec);
			intPrec.innerHTML = "<b>Precision for Interest:</b> " + (request.mat[1][1] / rowSum[1]) * 100 + "%";
			
			var awardPrec = document.createElement('p');
			document.body.appendChild(awardPrec);
			awardPrec.innerHTML = "<b>Precision for Award:</b> " + (request.mat[2][2] / rowSum[2]) * 100 + "%";


			var backRec = document.createElement('p');
			document.body.appendChild(backRec);
			backRec.innerHTML = "<b>Recall for Background:</b> " + (request.mat[0][0] / colSum[0]) * 100 + "%";

			var intRec = document.createElement('p');
			document.body.appendChild(intRec);
			intRec.innerHTML = "<b>Recall for Interest:</b> " + (request.mat[1][1] / colSum[1]) * 100 + "%";
			
			var awardRec = document.createElement('p');
			document.body.appendChild(awardRec);
			awardRec.innerHTML = "<b>Recall for Award:</b> " + (request.mat[2][2] / colSum[2]) * 100 + "%";
			*/

			var t = document.createElement('table');
			t.style.width = '250px';
  			t.style.border = '1px solid black';

			for (let i = 0; i < 4; i++) {
				const tr = t.insertRow();
				for (let j = 0; j < 3; j++) {
					const td = tr.insertCell();
					
					if (i == 1 && j == 0) {
						td.appendChild(document.createTextNode(`E`));
					}
					if (i == 2 && j == 0) {
						td.appendChild(document.createTextNode(`I`));
					}
					if (i == 3 && j == 0) {
						td.appendChild(document.createTextNode(`A`));
					}
					if (i == 0 && j == 1) {
						td.appendChild(document.createTextNode(`Precision`));
					}
					if (i == 0 && j == 2) {
						td.appendChild(document.createTextNode(`Recall`));
					}
					
					//td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
					if (i == 1 && j == 1) {
						td.appendChild(document.createTextNode((request.mat[0][0] / rowSum[0]) * 100 + "%" + " (" + request.abp + "%)"));
					}
					if (i == 2 && j == 1) {
						td.appendChild(document.createTextNode((request.mat[1][1] / rowSum[1]) * 100 + "%" + " (" + request.aip + "%)"));
					}
					if (i == 3 && j == 1) {
						td.appendChild(document.createTextNode((request.mat[2][2] / rowSum[2]) * 100 + "%" + " (" + request.aap + "%)"));
					}

					if (i == 1 && j == 2) {
						td.appendChild(document.createTextNode((request.mat[0][0] / colSum[0]) * 100 + "%" + " (" + request.abr + "%)"));
					}
					if (i == 2 && j == 2) {
						td.appendChild(document.createTextNode((request.mat[1][1] / colSum[1]) * 100 + "%" + " (" + request.air + "%)"));
					}
					if (i == 3 && j == 2) {
						td.appendChild(document.createTextNode((request.mat[2][2] / colSum[2]) * 100 + "%" + " (" + request.aar + "%)"));
					}
					td.style.border = '1px solid black';
				}
			}

  			document.body.appendChild(t);
		}
	}
})

/*
highlight.addEventListener( 'click', () => {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "highlight"});
    });
})

test.addEventListener( 'click', () => {
	chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "test"});
    });
})

create.addEventListener( 'click', () => {
	chrome.runtime.sendMessage( '', {
		type: 'creation',
	});
} );

dload.addEventListener( 'click', () => {
	chrome.storage.local.get( ['json'], data => {
		var hiddenElement = document.createElement('a');
		hiddenElement.href = "data:text/json;charset=utf-8," + encodeURIComponent(data.json);
		hiddenElement.download = 'result.json';
		hiddenElement.click();
	})
} )
*/