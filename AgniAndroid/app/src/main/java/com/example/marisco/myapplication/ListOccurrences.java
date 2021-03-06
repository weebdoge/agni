package com.example.marisco.myapplication;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.example.marisco.myapplication.constructors.CursorList;
import com.example.marisco.myapplication.constructors.ListOccurrenceData;
import com.example.marisco.myapplication.constructors.ListOccurrenceLikeData;
import com.example.marisco.myapplication.constructors.OccurrenceAcceptListData;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

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
public class ListOccurrences extends Fragment implements AbsListView.OnScrollListener {

    public static final String ENDPOINT = "https://custom-tine-204615.appspot.com/rest/";
    private static final String TITLE = "title";
    private static final String STATE = "state";
    private static final String DESCRIPTION = "description";
    private static final String LATITUDE = "latitude";
    private static final String LONGITUDE = "longitude";
    private static final String VISIBILITY = "visibility";
    private static final String ID = "occurrence_id";
    private static final String LEVEL = "level";
    private static final String TOKEN = "token";
    private static final String MODE = "mode";
    private static final String LIKED_OCCURRENCES = "liked_occurrences";
    private static final String REGISTERED_OCCURRENCES = "registered_occurrences";
    private static final String ACCEPTED_OCCURRENCES = "accepted_occurrences";
    private Retrofit retrofit;

    @BindView(R.id.list_occurrences) ListView lv;

    private List<Map<String, Object>> map_list;
    private String cursor, mode;
    private LoginResponse token;

    public ListOccurrences() { }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {


        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_list_ocurrences, container, false);
        ButterKnife.bind(this, v);

        Bundle b = this.getArguments();
        if (b != null) {
            this.token = (LoginResponse) b.getSerializable(TOKEN);
            this.mode = (String)b.getSerializable(MODE);
        }
        if(mode == null)
            ((HomePage) getActivity()).setActionBarTitle(getResources().getString(R.string.list_occurrences));
        else if(mode.equals(LIKED_OCCURRENCES))
            ((HomePage) getActivity()).setActionBarTitle(getResources().getString(R.string.supported_occurrences));
        else if(mode.equals(REGISTERED_OCCURRENCES))
            ((HomePage) getActivity()).setActionBarTitle(getResources().getString(R.string.registered_occurrences));
        else if(mode.equals(ACCEPTED_OCCURRENCES))
            ((HomePage) getActivity()).setActionBarTitle(getResources().getString(R.string.accepted_occurrences));

        lv.setOnItemClickListener(new AdapterView.OnItemClickListener()
        {
            @Override
            public void onItemClick(AdapterView<?> adapter, View v, int position,
                                    long arg3)
            {
                // assuming string and if you want to get the value on click of list item
                // do what you intend to do on click of listview row
                listOccurrenceDetails(adapter, v, position);
            }
        });

        map_list = new LinkedList<Map<String, Object>>();
        getMoreOccurrences();
        lv.setOnScrollListener(this);

        return v;
    }

    private void listOccurrenceDetails(AdapterView<?> adapter, View v, int position){

        OccurrenceDetails od = new OccurrenceDetails();
        FragmentManager fman = getFragmentManager();
        Bundle args = new Bundle();
        args.putSerializable(TITLE, (String) map_list.get(position).get("user_occurrence_title"));
        args.putSerializable(STATE, (String) map_list.get(position).get("user_occurrence_status"));
        args.putSerializable(DESCRIPTION, (String) map_list.get(position).get("user_occurrence_description"));
        args.putSerializable(LEVEL, (double) map_list.get(position).get("user_occurrence_level"));
        args.putSerializable(VISIBILITY, (boolean) map_list.get(position).get("user_occurrence_visibility"));
        args.putSerializable(LATITUDE, (double) map_list.get(position).get("user_occurrence_lat"));
        args.putSerializable(LONGITUDE, (double) map_list.get(position).get("user_occurrence_lon"));
        args.putSerializable(ID, Long.parseLong((String) map_list.get(position).get("occurrenceID")));
        args.putSerializable("userID", Long.parseLong((String)map_list.get(position).get("userID")) );
        args.putSerializable("mediaIDs", (ArrayList) map_list.get(position).get("mediaIDs"));
        args.putSerializable(TOKEN, token);

        od.setArguments(args);
        fman.beginTransaction().add(R.id.fragment, od) // Add this transaction to the back stack (name is an optional name for this back stack state, or null).
                .addToBackStack(null).commit();
    }

    private void getMoreOccurrences(){
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                    .baseUrl(ENDPOINT)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        AgniAPI agniAPI = retrofit.create(AgniAPI.class);
        Call<CursorList> call = null;
        if(mode == null)
            call = agniAPI.getMoreOccurrences(new ListOccurrenceData(null, false, null, cursor, null, null, null));
        else if (mode.equals(REGISTERED_OCCURRENCES))
            call = agniAPI.getMoreOccurrences(new ListOccurrenceData(token, true, token.username, cursor, null, null, null));
        else if(mode.equals(LIKED_OCCURRENCES))
            call = agniAPI.getLikedOccurrences(new ListOccurrenceLikeData(token, Long.parseLong(token.userID), cursor));
        else if(mode.equals(ACCEPTED_OCCURRENCES)){
            call = agniAPI.getAcceptedOccurrences(new OccurrenceAcceptListData(token, Long.parseLong(token.userID), cursor));
        }


        call.enqueue(new Callback<CursorList>() {
            public void onResponse(Call<CursorList> call, Response<CursorList> response) {
                if (response.code() == 200) {
                    CursorList c = response.body();
                    cursor = c.getCursor();
                    if(!c.getMapList().isEmpty()){
                        map_list.addAll( c.getMapList());
                        ListAdapterOccurrence adapter = new ListAdapterOccurrence(getContext(), map_list);
                        lv.setAdapter(adapter);
                    }
                }
                else {
                    Toast toast = Toast.makeText(getActivity(), "Failed to get occurrences" + response.code(), Toast.LENGTH_SHORT);
                    toast.show();
                }
            }
            public void onFailure(Call<CursorList> call, Throwable t) {
                Log.e("ERROR", t.toString());
            }
        });
    }

    @Override
    public void onScrollStateChanged (AbsListView view, int scrollState){
        if(lv != null && lv.getAdapter() != null) {
            if (lv.getLastVisiblePosition() == lv.getAdapter().getCount() - 1){
                getMoreOccurrences();
            }
        }
    }

    @Override
    public void onScroll (AbsListView view, int firstVisibleItem, int visibleItemCount,
                                   int totalItemCount){  }
}
