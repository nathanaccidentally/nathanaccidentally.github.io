// a simple way to sync audio across devices and give the impression the audio is live!
// a solution like this is fun to play around with but costly if you use something like amazon s3 because the files are pretty big
// this uses howler.js and moment.js so please add those to your project :)

var mmt = moment();
var mmtMidnight = mmt.clone().startOf('day');
var diffSeconds = mmt.diff(mmtMidnight, 'seconds');
var source = "";

function jsync(src) {
	if (diffSeconds < 21600) {
			// do nothing
		} else if (diffSeconds > 21600 && diffSeconds < 43200) {
			window.diffSeconds = diffSeconds - 21600;
		} else if (diffSeconds > 43200 && diffSeconds < 64800) {
			window.diffSeconds = diffSeconds - 43200;
		} else if (diffSeconds > 64800) { 
			window.diffSeconds = diffSeconds - 64800;
		}

		var radio = new Howl({
			src: [src]
		});

		radio.once('load', function(){
			radio.seek(diffSeconds)
			radio.play();
		});
}

function jsync12(src) {
	if (diffSeconds < 43200) {
			// do nothing
		} else {
			window.diffSeconds = diffSeconds - 43200;
		}

		var radio = new Howl({
			src: [src]
		});

		radio.once('load', function(){
			radio.seek(diffSeconds)
			radio.play();
		});
}

// written by nathan goodwin
// 2019