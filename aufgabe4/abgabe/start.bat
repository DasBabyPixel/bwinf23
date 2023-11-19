@ECHO OFF
SETLOCAL EnableDelayedExpansion

IF "%*"=="" (
    SET /P file="Datei mit dem Bauplan: "
    ECHO Datei: !file!
    CMD /C "jre\bin\java.exe" -jar aufgabe4.jar !file!
    PAUSE
) ELSE (
    CMD /C "jre\bin\java.exe" -jar aufgabe4.jar %*
    PAUSE
)