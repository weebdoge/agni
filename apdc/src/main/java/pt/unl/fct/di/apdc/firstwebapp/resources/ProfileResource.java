package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Transaction;
import com.google.appengine.api.datastore.TransactionOptions;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.gson.Gson;

import pt.unl.fct.di.apdc.firstwebapp.resources.constructors.ProfileEditData;
import pt.unl.fct.di.apdc.firstwebapp.resources.constructors.ProfileData;
import pt.unl.fct.di.apdc.firstwebapp.util.SecurityManager;

@Path("/profile")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class ProfileResource {

	/**
	 * A logger object.
	 */
	private static final Logger LOG = Logger.getLogger(ProfileResource.class.getName());
	private final Gson g = new Gson();
	private static final DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

	public ProfileResource() { } //Nothing to be done here...

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getProfile(ProfileData data) {
		LOG.info("Attempt to get user: " + data.username + "profile information requested by user: " + data.token.username);
		FilterPredicate filter = new FilterPredicate("user_username", FilterOperator.EQUAL, data.username);
		Query userQuery = new Query("User").setFilter(filter);
		List<Entity> results = datastore.prepare(userQuery).asList(FetchOptions.Builder.withDefaults());
		if(results.isEmpty()) {
			// Username does not exist
			LOG.warning("Failed to request profile, user:" + data.username + " does not exist");
			return Response.status(Status.BAD_REQUEST).build();
		}
		Entity user = results.get(0);
		if(!data.token.isTokenValid()) {
			LOG.warning("Failed to request profile, token for user: " + data.token.username + " is invalid");
			return Response.status(Status.FORBIDDEN).build();
		}
		if(!data.token.username.equals(data.username) && !SecurityManager.userHasAccess("see_user_profile", data.token.userID)) {
			LOG.warning("Failed to request profile, user: " + data.token.username + " does not have the rights to do it");
			return Response.status(Status.FORBIDDEN).build();
		}
		Map<String, Object> profile = new HashMap<String, Object>();
		profile.putAll(user.getProperties());
		profile.remove("user_pwd");
		LOG.info("User " + data.username + " profile was sent successfully to user " + data.token.username);
		return Response.ok(g.toJson(profile)).build();
	}
	
	@POST
	@Path("/edit")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response editProfile(ProfileEditData data) {
		LOG.fine("Attempt to edit profile for user: " + data.username);
		if(!data.valid()) {
			return Response.status(Status.BAD_REQUEST).entity("Missing or wrong parameter.").build();
		}
		if(!data.token.isTokenValid()) {
			LOG.warning("Failed to edit profile, token for user: " + data.token.username + " is invalid");
			return Response.status(Status.FORBIDDEN).build();
		}
		if(!data.token.username.equals(data.username) && !SecurityManager.userHasAccess("edit_user_profile", data.token.userID)) {
			LOG.warning("Failed to edit profile, user: " + data.token.username + " does not have the rights to do it");
			return Response.status(Status.FORBIDDEN).build();
		}
		TransactionOptions options = TransactionOptions.Builder.withXG(true);
		Transaction txn = datastore.beginTransaction(options);
		try {
			FilterPredicate filter = new FilterPredicate("user_username", FilterOperator.EQUAL, data.username);
			Query userQuery = new Query("User").setFilter(filter);
			List<Entity> results = datastore.prepare(userQuery).asList(FetchOptions.Builder.withDefaults());
			if(results.isEmpty()) {
				// Username does not exist
				txn.rollback();
				LOG.warning("Failed to edit profile, user:" + data.username + " does not exist");
				return Response.status(Status.BAD_REQUEST).build();
			}
			Entity user = results.get(0);
			if(data.email != null && data.email != "") {
				user.setProperty("user_email", data.email);
			}
			if(data.district != null && data.district != "") {
				user.setProperty("user_district", data.district);
			}
			if(data.county != null && data.county != "") {
				user.setProperty("user_county", data.county);
			}
			if(data.locality != null && data.locality != "") {
				user.setProperty("user_locality", data.locality);
			}
			datastore.put(txn, user);
			if(data.uploadPhoto) {
				Entity fileUpload = UploadResource.newUploadFileEntity(
						"user/" + user.getKey().getId() + "/", 
						"photo", 
						"IMAGE",
						true,
						false
						);
				datastore.put(txn, fileUpload);
				txn.commit();
				LOG.info("User " + data.username + " profile updated");
				return Response.ok(g.toJson(fileUpload.getKey().getId())).build();
			}
			txn.commit();
			LOG.info("User " + data.username + " profile updated");
			return Response.ok().build();
		} finally {
			if (txn.isActive()) {
				txn.rollback();
			}
		}
	}

}
