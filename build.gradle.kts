allprojects {
    extensions.findByType<JavaPluginExtension>()?.apply {
        toolchain {
            languageVersion = JavaLanguageVersion.of(21)
            vendor = JvmVendorSpec.ADOPTIUM
        }
    }
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
    }
}