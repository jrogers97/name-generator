document.addEventListener("DOMContentLoaded", function () {
	const input = document.querySelector("#input");
	const form = document.querySelector("#form");
	const outputIntro = document.querySelector("#output-name-intro");
	const output = document.querySelector("#output-text-name");
	const loadingContainer = document.querySelector("#loading-container");
	const innerLoadingBar = document.querySelector("#inner-loading-bar");
	const twitterLink = document.querySelector("#twitter-link");

	let generatingName = false;

    const firstNames = [
        "Crash","Shrim","Aqua","Goldenrod","Luddington","Camel","Figaro","Honest","Fripp","Tilson",
        "Tint","Grivel","Rap","Glint","Pocket","Harpo","Fern","Jip","Verro","Dafoo","Hapful","Moose","Thripe","Cynco",
        "Vessey","Tranquil","Jank","Pleet","Scoon","Klint","Sloop","Thruthamore","Grunt","Alpine","Traif","Kugel","Dent",
        "Tallon","Shredded","Schist","Chaz","Pleather","Crony","Tamped","Grander","Silk","Pleated","Organic","Filly",
        "Omnibus","Plisken","Cork","Bishop","Rooster","Sonic","Prismic","Franken","Dallas","Poppy","Ash","Kernel","Jewel",
        "Alabaster","Onyx","Diamond","Lazuli","Cavity","Truck","Dendrite","Chisp","Capillary","Prinzer","Modular","Crump",
        "Cookie","Crab","Snorkel","Grau","Deeny","Grovis","Chapper","Brigg","Sted","Selfish","Cellino","Barnes","Stirrup",
        "Blader","Dirtha","Pooda","Tinter","Dohta","Maza","Stoop","Glap","Hiver","Booster","Rooney","Speckel","Tupelo","Pelican",
        "Winder","Borialis","Spinoza","Samsa","Rivener","Tartulis","Bartleby","Tas","Plugger","Grub","Tab","Zoela","Tsk","Fizz",
        "Bubble","Splitter","Substine","Entangled","Indeterminate","Tanked","Flub","Tuna","Frinny","Howler","Speedy","Tortoise",
        "Toots","Etcher","Graydon","Seldom","Quincy","Grifty","Brownie","Boxcar","Hollow","Stort","Hasten","Slinker","Sondo",
        "Canopy","Helipad ","Choppy","Troubadour","Pinnacle ","Dander","Jolly","Sockem ","Bristow","Tradeoff","Knack","Guffle",
        "Chauncey ","Kelso","Jammer","Stimp"
	];

    const lastNames = [
        "crab","show","wurst","spear","tooth","frag","neck","tank","stonk","sybbyl","truth","stool","teeter","jet",
        "turpen","shark","flop","scrabble","crag","hammer","gringe","grunge","gangus","scramp","vittle","stump","tetro","snake","brow",
        "femur","malt","silver","fleck","quip","brunt","safe","bread","sham","clam","straw","hoop","frump","tick","cubus","flea","tent",
        "snow","lizard","bark","omni","snap","clamp","trink","hive","gruff","tree","london","semi","fizz","hunk","pillow","snark","cadaver",
        "center","crevice","bite","moth","point","nasal","plant","raft","gland","lymph","wave","tween","teed","plaid","bean","wheel","pucker",
        "metal","mouse","straw","berry","kale","squash","razor","pog","stroop","waffel","corn","glass","file","gum","trellis","bush",
        "preacher","toast","spurt","folder","paper","spelt","eddy","leader","quanta","rock","socket","neuro","glia","gem","cove","spike",
        "hole","rabbit","waxer","breaker","lib","cat","seek","boson","quark","neutrino","trick","wolf","qubit","glow","ink","grease","elk",
        "oil","present","salve","pound","elbow","joint","crease","flank","bone","chill","frog","droop","service","fest","jester","gear",
        "yellow","flint","helix","chisel","wrinkle","ripple","crest","holler","hodgepodge","briar","wink"
    ];

	form.addEventListener("submit", handleSubmit);

	function handleSubmit(e) {
		e.preventDefault();

		if (generatingName || !input.value.trim().length) {
			return;
		}

		form.reset();
		input.blur();

		// don't allow submit while already generating
		generatingName = true;

		// remove existing generated name, show loading bar
		loadingContainer.classList.remove("hidden");
		outputIntro.classList.add("hidden");
		twitterLink.classList.add("hidden");
		output.innerHTML = "";

		window.setTimeout(() => innerLoadingBar.classList.add("loading"), 10);

		const name = createRandomName();
		// wait for loading transition, show name and remove loading bar
		window.setTimeout(() => {
			output.innerHTML = name;
			twitterLink.setAttribute("href", getTwitterLink(name));
			loadingContainer.classList.add("hidden");
			outputIntro.classList.remove("hidden");
			twitterLink.classList.remove("hidden");
			innerLoadingBar.classList.remove("loading");
			generatingName = false;
		}, 4000);
	}

	function createRandomName() {
		// pick random first name
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];

		// pick 2 random, distinct last name indices, concatenate the corresponding names
		const lastNameIdx1 = Math.floor(Math.random() * lastNames.length);
		const lastNameIdx2 = (lastNameIdx1 + (Math.floor(Math.random() * (lastNames.length - 1)) + 1)) % lastNames.length;
		const lastName1 = lastNames[lastNameIdx1];
		const lastName2 = lastNames[lastNameIdx2];

		const lastName = lastName1.charAt(0).toUpperCase() + lastName1.slice(1) + lastName2;
		return `${firstName} ${lastName}`;
	}

	function getTwitterLink(name) {
		const message = window.encodeURI(
			`My CBLR trailname is ${name}! Get yours at ${window.location.origin}`
		);
		return `https://twitter.com/intent/tweet?text=${message}`;
	}
});
