package com.sigapocket;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import java.util.Map;
import java.util.HashMap;

public class SigaPocketModule extends ReactContextBaseJavaModule
{
    public static final String CHANNEL_ID = "siga-pocket-chan";
    public static final String CHANNEL_NAME = "SigaPocketChannel";
    
    public SigaPocketModule(ReactApplicationContext context)
    {
        super(context);
    }

    @Override
    public String getName() 
	{
    	return "SigaPocketModule";
    }

    @Override
    public Map<String, Object> getConstants() 
    {
       final Map<String, Object> constants = new HashMap<>();
       constants.put("CHANNEL_ID", CHANNEL_ID);
       constants.put("CHANNEL_NAME", CHANNEL_NAME);
       return constants;
    }    

    @ReactMethod
    public void isAppOnForeground(Promise promise)
    {
        promise.resolve(Util.isAppOnForeground(getReactApplicationContext()));
    }    
}
