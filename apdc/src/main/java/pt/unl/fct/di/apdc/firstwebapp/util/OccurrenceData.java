package pt.unl.fct.di.apdc.firstwebapp.util;

public class OccurrenceData {
	
	public AuthToken token;
	public String title;
	public String description;
	public String type;
	public int level;
	public boolean visibility;
	public double lat;
	public double lon;
	public boolean notificationOnResolve;

	
	public OccurrenceData() {
		
	}
	
	public OccurrenceData(AuthToken token, String title, String description, String type, int level, 
			boolean visibility, double lat, double lon, boolean notificationOnResolve) {
		this.token = token;
		this.title = title;
		this.description = description;
		this.type = type;
		this.level = level;
		this.visibility = visibility;
		this.lat = lat;
		this.lon = lon;
		this.notificationOnResolve = notificationOnResolve;
	}
}
