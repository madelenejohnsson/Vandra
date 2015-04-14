exports.zoomMap = zoomMap;

function zoomMap(trailID){
	id = trailID;
	
	var zoomCordCollection = Alloy.Collections.trailsModel;
	zoomCordCollection.fetch({
		query : 'SELECT zoomLat, zoomLon FROM trailsModel where id = ' + id  
	}); 
	
	Ti.API.info(JSON.stringify(zoomCordCollection));
	
	var zoomJSON = zoomCordCollection.toJSON();
	Ti.API.info(JSON.stringify(zoomJSON));
	var lat = zoomJSON[0].zoomLat;
	var lon = zoomJSON[0].zoomLon;
	
	alert("lat :" + lat);
	
	map3.region = {
				latitude : lat,
				longitude : lon,
				latitudeDelta : 0.02,
				longitudeDelta : 0.02
			};
}
