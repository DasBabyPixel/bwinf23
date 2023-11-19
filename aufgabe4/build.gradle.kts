plugins {
    application
}

application {
    mainClass = "de.dasbabypixel.bwinf.a4.Main"
}

tasks {
    jar {
        manifest {
            attributes["Main-Class"] = application.mainClass
        }
    }
}