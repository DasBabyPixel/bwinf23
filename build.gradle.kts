allprojects {
    repositories {
        mavenCentral()
        maven("https://nexus.darkcube.eu/repository/dasbabypixel/")
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
        javaPlugin.apply {
            toolchain {
                languageVersion = JavaLanguageVersion.of(21)
                vendor = JvmVendorSpec.ADOPTIUM
            }
        }
    }
}