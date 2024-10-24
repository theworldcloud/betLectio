@echo off
setlocal EnableDelayedExpansion

type nul > betLectio.updater.log

title betLectio - Updater
call :log "[betLectio - Updater]"
call :log ""
start https://google.com
pause
 
set /p currentVersion=<version.txt
call :log "Local version: %currentVersion%"

echo.
echo Fetching cloud version...
for /F "delims=" %%I in ('curl -s https://storage.theworldcloud.dk/betLectio/version.txt') do set "cloudVersion=%%I"
call :log "Cloud version: %cloudVersion%"
call :log ""

if !currentVersion!==!cloudVersion! (
	call :log "No update available."
	goto :exit
) else (
	goto :update
)

:update
call :log "Updating to version: %cloudVersion%"

for /F "delims=" %%I in ('curl -s https://storage.theworldcloud.dk/betLectio/source') do set "filesString=%%I"
set filesString=%filesString:"=%
set "filesString=%filesString:~1,-1%"	
set filesString=%filesString:,= %
set count=0
set current=0
for %%A in (%filesString%) do set /a count += 1
call :progressBar 0 %count% 

for %%A in (%filesString%) do (
	echo.
	echo.
	echo Current file: %%A
	echo.
	echo Updating %%A...
	curl -s https://storage.theworldcloud.dk/betLectio/source/%%A > %%A
	echo Updated %%A successfully.
	timeout 1 >nul

	set /a current += 1
	call :printLog
	call :progressBar !current! %count%
)

echo %cloudVersion%>version.txt
call :log "Update completed."
timeout 1 >nul
goto :exit

:progressBar
set length=20
set current=%~1
set max=%~2
set /a "percentage=(%current%*100)/%max%"
set /a "progress=(%length%*%percentage%)/100"
set /a "remaining=%length%-%progress%"

set "status="
for /l %%x in (1, 1, %progress%) do (
	set status=!status!X
)

for /l %%x in (1, 1, %remaining%) do (
	set status=!status!-
)

echo [%status%] 	
echo Progress: %percentage%%%
echo Updated files: %current%/%max%

:exit
timeout 1 >nul
del betLectio.updater.log
exit /b

:log
if "%~1"=="" (
	echo. >> betLectio.updater.log
) else (
	echo %~1 >> betLectio.updater.log
)
call :printLog

:printLog
cls
for /f "tokens=*" %%x in (betLectio.updater.log) do (
	if "%%x"=="" (
		echo.
	) else (
		echo %%x 
	)
)