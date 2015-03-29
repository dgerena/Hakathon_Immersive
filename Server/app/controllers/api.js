
urlCat=[
	"Rides",
	"DiningLocations",
	"Shops",
	"Shows",
	"Lockers",
	"GuestServices",
	"FirstAidStations",
	"LostAndFoundStations",
	"SmokingAreas",
	"ServiceAnimalRestAreas",
	"Atms",
	"Restrooms",
	"Hotels",
	"Parades",
	"WaterParks"
	]

allurl = "https://servicesstg.universalorlando.com/api/PointsOfInterest?ApiKey=Hackathon1&Token=9ebc55c9-b5e4-4695-83c5-ade19ea6df4c"

allurl = "https://servicesstg.universalorlando.com/api/PointsOfInterest/"+urlCat+"?ApiKey=Hackathon1&Token=9ebc55c9-b5e4-4695-83c5-ade19ea6df4c"



function UniversalApi(apiKey, token){
	this.cats = function(){
		return
	}
}



var api = UniversalApi("Hackathon1","9ebc55c9-b5e4-4695-83c5-ade19ea6df4c");

for(var i = 0; i < urlCat.length;i++){
	catobj = api.cats(urlCat[i]);
	console.log('urls.js',38,catobj);
}