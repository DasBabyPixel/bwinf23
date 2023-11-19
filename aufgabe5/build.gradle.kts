plugins {
    application
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

application {
    mainClass = "de.dasbabypixel.bwinf.a5.Main"
}

dependencies {
    implementation(libs.utils)
}

tasks {
    jar {
        manifest {
            attributes["Main-Class"] = application.mainClass
        }
        archiveClassifier = "dev"
    }
    shadowJar {
        archiveClassifier = null
    }
    assemble {
        dependsOn(shadowJar)
    }
}