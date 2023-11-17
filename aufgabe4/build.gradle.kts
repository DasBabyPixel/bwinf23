plugins {
    application
    id("org.openjfx.javafxplugin") version "0.1.0"
    id("com.gluonhq.gluonfx-gradle-plugin") version "1.0.23-custom-SNAPSHOT"
}

application {
    mainClass = "de.dasbabypixel.bwinf.a4.FXTest"
}

java.toolchain.languageVersion = JavaLanguageVersion.of(17)

repositories {
    mavenCentral()
    maven("https://nexus.gluonhq.com/nexus/content/repositories/releases")
}

dependencies {
    implementation("org.openjfx:javafx-controls:20")
}

javafx {
    version = "20"
    modules("javafx.controls")
}

gluonfx {
    target = "web"
    isVerbose = true
}

/*

            WebTargetConfiguration.WEB_AOT_DEPENDENCIES
                    .stream()
                    .map(s -> s.split(":"))
                    .map(a -> new DefaultArtifact(a[0], a[1], a.length == 4 ? a[3] : null, "jar", a[2]))
                    .flatMap(a -> {
                        Set<Artifact> resolve = MavenArtifactResolver.getInstance().resolve(a);
                        if (resolve == null) {
                            return Stream.empty();
                        }
                        return resolve.stream();
                    })
                    .distinct()
                    .map(Artifact::getFile)
                    .peek(i -> getLog().error("2: " + i))
                    .forEach(list::add);
 */