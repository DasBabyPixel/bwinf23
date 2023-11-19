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
    register<Copy>("copyAufgabe4ToAbgabe") {
        mustRunAfter(jar.get())
        from(jar)
        val launcher = project.javaToolchains.launcherFor(java.toolchain).get();
        from(launcher.metadata.installationPath) { into("jre") }
        into(file("abgabe"))
    }
}