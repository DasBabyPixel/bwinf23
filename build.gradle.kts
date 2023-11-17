gradle.taskGraph.whenReady {
    allTasks.filterIsInstance<JavaExec>().forEach {
        it.setExecutable(it.javaLauncher.get().executablePath.asFile.absolutePath)
    }
}

allprojects {
    repositories {
        maven("https://nexus.darkcube.eu/repository/dasbabypixel/")
        mavenCentral()
    }
    tasks.withType<Test> {
        useJUnitPlatform()
    }
    pluginManager.withPlugin("java") {
        dependencies {
            "testImplementation"(rootProject.libs.junit.jupiter)
            "testRuntimeOnly"(rootProject.libs.junit.platform.launcher)
        }
        val javaPlugin = extensions.getByType<JavaPluginExtension>()
        val toolchainService = extensions.getByType<JavaToolchainService>()
        javaPlugin.toolchain {
            languageVersion = JavaLanguageVersion.of(21)
            vendor = JvmVendorSpec.ADOPTIUM
        }
        tasks.withType<JavaExec>().configureEach {
            javaLauncher = toolchainService.launcherFor(javaPlugin.toolchain)
        }
    }
}