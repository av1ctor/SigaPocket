package com.sigapocket;

import javax.annotation.Nullable;
import android.app.Application;
import android.app.ActivityManager;
import android.content.Context;
import android.app.job.JobParameters;
import android.app.job.JobService;
import android.app.job.JobInfo;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.PowerManager;
import android.os.PowerManager.WakeLock;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import android.util.Log;

public class DocsSyncJob extends JobService
{
	public static long INTERVAL = 60; // em segundos
	private WakeLock wakeLock = null;

	@Override
	public boolean onStartJob(JobParameters params) 
	{
		Context context = getApplicationContext();
		
		if(wakeLock == null)
		{
			PowerManager powerManager = (PowerManager)getSystemService(POWER_SERVICE);
			wakeLock = powerManager.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "SigaPocket::DocsSyncJob");
		}
		
		try
		{
			if(wakeLock != null)
			{
				wakeLock.acquire();	
			}
			sendEvent(getReactNativeHost().getReactInstanceManager().getCurrentReactContext(), "DocsSyncEvent", null);
		}
		catch(Exception e)
		{
			Log.e("SigaPocket", e.getMessage());
		}
		finally
		{
			Util.scheduleJob(context, INTERVAL, DocsSyncJob.class);

			if(wakeLock != null && wakeLock.isHeld())
			{
				wakeLock.release();
			}
		}
			
		// não é necessário reagendar, porque foi feito manualmente acima
		return false;
	}

	@Override
	public boolean onStopJob(JobParameters params) 
	{
		if(wakeLock != null && wakeLock.isHeld())
		{
			wakeLock.release();
		}

		// se estiver sem conexão de rede, reiniciar job quando ela voltar
		return true;
	}

	private void sendEvent(
		ReactContext reactContext,
        String eventName,
        @Nullable WritableMap params) 
	{
 		reactContext
     		.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
     		.emit(eventName, params);
	}

	private ReactNativeHost getReactNativeHost() 
	{
		return ((ReactApplication)getApplication()).getReactNativeHost();
	}	
}
