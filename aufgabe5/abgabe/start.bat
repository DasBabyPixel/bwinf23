@ECHO OFF
SETLOCAL EnableDelayedExpansion

IF "%*"=="" (
    SET /P file="Datei mit der Tour: "
    ECHO Datei: !file!
    CMD /C "jre\bin\java.exe" -jar aufgabe5.jar !file!
    PAUSE
) ELSE (
    CMD /C "jre\bin\java.exe" -jar aufgabe5.jar %*
    PAUSE
)