package com.sigapocket;

import android.os.Bundle;
import android.os.Build;
import android.app.PendingIntent;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Intent;
import android.content.Context;
import android.graphics.Color;
import androidx.core.app.NotificationCompat;
import androidx.annotation.RequiresApi;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;
import android.util.Log;

public class DocsSyncService extends HeadlessJsTaskService
{
	@Override
	protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) 
	{
	  	Bundle extras = intent.getExtras();

		return new HeadlessJsTaskConfig(
			"DocsSyncTask",
			Arguments.fromBundle(extras != null? extras: new Bundle()),
			10000,
			false
		);
	}

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) 
	{
		keepRunning(getReactNativeHost().getReactInstanceManager().getCurrentReactContext());
		return super.onStartCommand(intent, flags, startId);
	}

    private void keepRunning(ReactContext context)
    {
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) 
        {
            NotificationCompat.Builder builder = 
                new NotificationCompat.Builder(
                    context, 
                    Util.createNotificationChannel(
                        context, 
                        "siga-pocket-chan", 
                        "SigaPocket"));
            
			builder.setPriority(NotificationCompat.PRIORITY_MIN);
			
			Intent notificationIntent = new Intent(context, context.getCurrentActivity().getClass());
			PendingIntent contentIntent = PendingIntent.getActivity(context, 0, notificationIntent, PendingIntent.FLAG_UPDATE_CURRENT);
			builder.setContentIntent(contentIntent);

            startForeground(1, builder.build());
        }
    }	
}
