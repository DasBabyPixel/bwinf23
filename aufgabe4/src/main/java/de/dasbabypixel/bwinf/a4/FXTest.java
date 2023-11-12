package de.dasbabypixel.bwinf.a4;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.StackPane;
import javafx.scene.shape.Rectangle;
import javafx.stage.Stage;

public class FXTest extends Application {

    public static void main(String[] args) {
        launch(FXTest.class, args);
    }

    @Override
    public void start(Stage stage) throws Exception {
        Rectangle rect = new Rectangle(100, 100);
        var pane = new StackPane(rect);
        var scene = new Scene(pane);
        stage.setScene(scene);
        stage.show();
    }
}
