@echo off

for /f "skip=1 usebackq" %%g in (`wmic nicconfig where "description like '%%Check Point%%' and DHCPServer is not null" get DHCPServer ^| findstr /r /v "^$"`) do (
	if "%%g"=="" (
		echo Cannot find correct CheckPointGateway
		goto:eof
	) else (
		SET CheckPointGateway=%%g
	)
)
echo CheckPointGateway=%CheckPointGateway%
for /f "tokens=1,2,3 usebackq" %%g in (`route PRINT ^| findstr "%CheckPointGateway%"`) do (
	echo %%g | >nul findstr /r /c:"10\..*" || echo %%g | >nul findstr /r /c:"192\.168\..*" || echo %%g | >nul findstr /r /c:"172\.[0-2][0-9]\..*" || echo %%g | >nul findstr /r /c:"172\.3[0-1]\..*" || (
		route DELETE %%g mask %%h %%i >nul
	)
	echo | set /p="."
)
