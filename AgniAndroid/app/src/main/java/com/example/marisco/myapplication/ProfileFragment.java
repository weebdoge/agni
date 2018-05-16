package com.example.marisco.myapplication;

import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.Fragment;
import android.text.InputType;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import butterknife.BindView;
import butterknife.ButterKnife;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * A simple {@link Fragment} subclass.
 */
public class ProfileFragment extends Fragment {

    private static final String TOKEN = "token";
    public static final String RESPONSE = "com.example.marisco.myapplication.RESPONSE";
    private static final String ENDPOINT = "https://liquid-layout-196103.appspot.com/rest/";
    private String username, email, type, name;
    private Retrofit retrofit;
    private LoginResponse token;

    //@BindView(R.id.profile_edit_avatar) ImageView profile_edit_avatar;

    @BindView(R.id.profile_username) EditText profile_username;
    @BindView(R.id.profile_role) EditText profile_type;
    @BindView(R.id.profile_name) EditText profile_name;
    @BindView(R.id.profile_email) EditText profile_email;
    @BindView(R.id.profile_locality) EditText profile_locality;
    @BindView(R.id.profile_county) EditText profile_county;
    @BindView(R.id.profile_district) EditText profile_district;

    public ProfileFragment() {

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View v = inflater.inflate(R.layout.fragment_profile, container, false);
        ButterKnife.bind(this, v);
        Bundle b = this.getArguments();
        if(b != null){
            this.token = (LoginResponse) b.getSerializable(TOKEN);
        }
        this.username = token.getUsername();
        getProfile();
        fieldsSetup();

        return v;
    }

    //Sets up all the EditText fields in this fragment to be un-editable.
    public void fieldsSetup(){
        profile_username.setInputType(InputType.TYPE_NULL);
        profile_username.setEnabled(false);
        profile_username.setTextIsSelectable(false);

        profile_name.setInputType(InputType.TYPE_NULL);
        profile_name.setEnabled(false);
        profile_name.setTextIsSelectable(false);

        profile_county.setInputType(InputType.TYPE_NULL);
        profile_county.setEnabled(false);
        profile_county.setTextIsSelectable(false);

        profile_district.setInputType(InputType.TYPE_NULL);
        profile_district.setEnabled(false);
        profile_district.setTextIsSelectable(false);

        profile_email.setInputType(InputType.TYPE_NULL);
        profile_email.setEnabled(false);
        profile_email.setTextIsSelectable(false);

        profile_locality.setInputType(InputType.TYPE_NULL);
        profile_locality.setEnabled(false);
        profile_locality.setTextIsSelectable(false);
    }

    public void editProfile(){
        profile_username.setInputType(InputType.TYPE_CLASS_TEXT);
        profile_username.setEnabled(true);
        profile_username.setTextIsSelectable(true);

        profile_name.setInputType(InputType.TYPE_CLASS_TEXT);
        profile_name.setEnabled(true);
        profile_name.setTextIsSelectable(true);

        profile_county.setInputType(InputType.TYPE_CLASS_TEXT);
        profile_county.setEnabled(true);
        profile_county.setTextIsSelectable(true);

        profile_district.setInputType(InputType.TYPE_CLASS_TEXT);
        profile_district.setEnabled(true);
        profile_district.setTextIsSelectable(true);

        profile_email.setInputType(InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS);
        profile_email.setEnabled(true);
        profile_email.setTextIsSelectable(true);

        profile_locality.setInputType(InputType.TYPE_CLASS_TEXT);
        profile_locality.setEnabled(true);
        profile_locality.setTextIsSelectable(true);
    }

    public void getProfile() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(ENDPOINT)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }

        AgniAPI agniAPI = retrofit.create(AgniAPI.class);

        ProfileRequest request = new ProfileRequest(token.username, token);
        Call<ProfileResponse> call = agniAPI.getProfile(request);

        call.enqueue(new Callback<ProfileResponse>() {
            @Override
            public void onResponse(Call<ProfileResponse> call, Response<ProfileResponse> response) {
                if (response.code() == 200)
                    fillInfo(response.body());
                else {
                    Toast toast = Toast.makeText(getActivity(), "Failed to get profile" + response.code(), Toast.LENGTH_SHORT);
                    toast.show();
                }
            }

            @Override
            public void onFailure(Call<ProfileResponse> call, Throwable t) {
                Log.e("ERROR", t.toString());
            }
        });
    }

    /*public void launchActivity(ProfileResponse response){
        Intent intent = new Intent(this, HomePage.class);
        intent.putExtra(RESPONSE, response);
        startActivity(intent);
    }*/
    private void fillInfo(ProfileResponse response){
        profile_type.setText(response.getRole());
        profile_username.setText(username);

        profile_name.setText(response.getName());
        profile_email.setText(response.getEmail());
        profile_locality.setText(response.getLocality());
        profile_county.setText(response.getCounty());
        profile_district.setText(response.getDistrict());
    }
}