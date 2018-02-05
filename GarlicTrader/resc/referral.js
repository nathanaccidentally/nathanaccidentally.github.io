var address = window.location.href;
var referral = address.split('?');
referral = referral[1]; // Get our code.

console.log("Your referral code is: " + referral);

if (referral == "CUN2AQF9") {
	console.log("Tracking your referral...");

	var _gaq = _gaq || [];

	console.log("Running tracking");

      window._gaq.push(['_setAccount', 'UA-97184599-7']);
      window._gaq.push(['_trackPageview']);

      (function() {
          var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
          ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
          var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
       })();
} else {
	console.log("No tracking found.");
}