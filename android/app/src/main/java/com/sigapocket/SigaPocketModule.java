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
    public SigaPocketModule(ReactApplicationContext context)
    {
        super(context);
    }

    @Override
    public String getName() 
	{
    	return "SigaPocketModule";
    }

    @ReactMethod
    public void isAppOnForeground(Promise promise)
    {
        promise.resolve(Util.isAppOnForeground(getReactApplicationContext()));
    }    
}
