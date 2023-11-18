#Als erstes wird die Variable n abgefragt
n = int(input("Was soll n sein? (n≥4)"))


#Das ist die Methode, die das erste Arukon-Rätsel erstellt und direkt ausgibt
def erstes_arukon_printen (n):
    print('Das ist das erste Arukon:')
    print(' ')
    print(str(n))
    print(str(n-2))
    #Hier wir die erste Zeile erstellt und ausgeben
    string1 = '1 2 1 0'
    for c in range (3,n-1):
        string1 = string1 + ' ' + str(c)
    print(string1)
    #string0 soll eine Variable, die n-1 Nullen enthält sein, da diese
    #in den folgenden Zeilen öfter benötigt wird
    string0 = '0'
    for d in range (2,n):
        string0 = string0 + ' 0'
    #Das ist die zweite Zeile, die nur aus Nullen besteht
    print(string0+' 0')
    #In string2 wird die dritte Zeile erstellt, die etwas komplizierter ist,
    #weil erst 0 0 2 kommt und danach Nullen 
    string2=''
    for e in range (0,n-3):
        string2 = string2+' 0'
    string2 = '0 0 2'+string2
    print(string2)
    #Das ist die dritte Zeile
    print('3 '+string0)
    #Das ist die vierte Zeile
    print(string0+' 0')
    #Hier werden die weiteren n-4 Zeilen ausgegeben
    for f in range (4,n-1):
        print(str(f)+' '+string0)
    #Die zwei Leerzeilen in der Ausgabe sind für eine bessere Übersichtlichkeit
    print(' ')
    print(' ')


#Diese Methode erstellt das zweite Rätsel
def zweites_arukon_printen (n):
    print('Hier ein weiteres Arukon-Rätsel mit der gleichen Gittergröße:')
    print(' ')
    print(str(n))
    print(str(n))
    #Das grundlegende Muster ist hier relativ groß und funktioniert erst ab n=8
    if n >= 8:
        #string0 soll ein String mit n-8 Nullen werden, den wir später noch brauchen
        string0 = ''
        for a in range (8,n):
            string0 = string0 + ' 0'
        #string1 soll ein String mit den Zahlen von 9 bis n werden, der an die erste
        #und letzte Zeile angehängt wird, um mehr Spalten anzuhängen 
        string1 = ''
        for b in range (9,n+1):
            string1 = string1 + ' ' + str(b)
        #Hier kommen die ersten vier Zeilen
        print('4 0 0 0 5 6 7 8'+string1)
        print('3 0 0 0 0 0 0 0'+string0)
        print('0 1 0 0 0 0 0 0'+string0)
        print('0 2 0 0 0 0 0 0'+string0)
        #Hier werden n-8 Zeilen mit nur Nullen eingefügt, um auf n Zeilen zu kommen
        for c in range (8,n):
            print('0 0 0 0 0 0 0 0'+string0)
        #Das sind die letzten vier Zeilen
        print('0 0 0 0 0 6 0 8'+string0)
        print('0 0 3 4 5 7 0 1'+string0)
        print('0 0 0 0 0 0 2 0'+string0)
        print('0 0 0 0 0 0 0 0'+string1)
    #Für n=7;6;5 müssen jetzt noch speziell ausgedachte Arukone ausgeben, da
    #das Grundmuster zu groß ist und in einer kleineren Version vom BWINF-
    #Lösungsprogramm gelöst werden würde
    elif n == 7:
        print('1 0 0 0 0 0 0')
        print('0 0 0 0 0 0 0')
        print('0 0 0 0 3 0 0')
        print('0 0 4 0 0 0 0')
        print('0 0 4 0 0 0 0')
        print('2 0 0 0 3 2 0')
        print('1 0 0 0 0 0 0')
    elif n == 6:
        print('1 0 0 0 0 0')
        print('0 0 0 0 0 0')
        print('0 0 0 3 0 0')
        print('0 0 4 4 0 0')
        print('2 0 0 3 2 0')
        print('1 0 0 0 0 0')
    elif n == 5:
        print('0 0 0 0 0')
        print('0 1 2 3 0')
        print('0 0 0 0 0')
        print('0 3 1 2 0')
        print('0 0 0 0 0')



# Hier werden dann die Arukone ausgegeben
# Im Fall n > 4 funktionieren die vorher definierten Methoden
if n > 4:
    erstes_arukon_printen(n)
    zweites_arukon_printen(n)
# Der Fall n = 4 wird gesondert betrachtet, weil die vorher definierten
# Methoden nur ab n=5 funktionieren
else:
    print('Das ist das erste Arukon:')
    print(' ')
    print('4')
    print('3')
    print('2 0 1 3')
    print('1 0 0 0')
    print('0 2 0 0')
    print('0 0 0 3')
    print(' ')
    print(' ')
    print('Hier ein weiteres Arukon-Rätsel mit der gleichen Gittergröße:')
    print(' ')
    print('4')
    print('3')
    print('0 0 0 1')
    print('1 2 0 0')
    print('0 0 3 0')
    print('3 2 0 0')
