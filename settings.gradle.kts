pluginManagement {
    repositories {
        gradlePluginPortal()
        maven("https://nexus.darkcube.eu/repository/dasbabypixel/") { name = "DasBabyPixel" }
    }
}

plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.7.0"
}

rootProject.name = "bwinf"

include("aufgabe4")
include("aufgabe5")