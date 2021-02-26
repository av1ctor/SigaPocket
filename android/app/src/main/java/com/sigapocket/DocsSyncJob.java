package com.sigapocket;

import java.util.List;
import android.app.Application;
import android.app.ActivityManager;
import android.content.Context;
import android.app.job.JobParameters;
import android.app.job.JobService;
import android.app.job.JobInfo;
import android.app.job.JobScheduler;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import com.facebook.react.HeadlessJsTaskService;
import android.util.Log;

public class DocsSyncJob extends JobService
{
	//NOTA: se for usado 60 secs ou mais, o app vai entrar em modo background e, mesmo com notification, nunca será iniciado o headless service
	public static long INTERVAL = 30 * 1; // em segundos
	
	@Override
	public boolean onStartJob(JobParameters params) 
	{
		Context context = getApplicationContext();
		
		try
		{
			if(!isAppOnForeground(context)) 
			{
				Intent serviceIntent = new Intent(context, DocsSyncService.class);
				context.startService(serviceIntent);
				HeadlessJsTaskService.acquireWakeLockNow(context);
			}
		}
		catch(Exception e)
		{
			Log.e("SigaPocket", e.getMessage());
		}
			
		Util.scheduleJob(context, INTERVAL, DocsSyncJob.class);

		// não é necessário reagendar, porque foi feito manualmente acima
		return false;
	}

	@Override
	public boolean onStopJob(JobParameters params) 
	{
		// se estiver sem conexão de rede, reiniciar job quando ela voltar
		return true;
	}

	private boolean isAppOnForeground(Context context) 
	{
		ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
		List<ActivityManager.RunningAppProcessInfo> appProcesses =
		activityManager.getRunningAppProcesses();
		if (appProcesses == null) {
			return false;
		}
		final String packageName = context.getPackageName();
		for (ActivityManager.RunningAppProcessInfo appProcess : appProcesses) {
			if (appProcess.importance ==
			ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND &&
				appProcess.processName.equals(packageName)) {
				return true;
			}
		}
		return false;
	}
}
