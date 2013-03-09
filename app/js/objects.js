if (!meterific)
	var meterific = {};

if (!window.meterific) {
	window.meterific = meterific;
}

meterific.hosts = {
		"prod"		: "http://meterific-be.herokuapp.com",
		"local"		: "http://localhost:9292"
};

meterific.host = "";
