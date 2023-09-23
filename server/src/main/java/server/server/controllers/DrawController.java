package server.server.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;

import jakarta.json.Json;
import jakarta.json.JsonObject;

import org.springframework.http.MediaType;
import java.util.Random;

@Controller
@CrossOrigin(origins = "*")
public class DrawController {

    @PostMapping(path = "/api/draw", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> drawRestaurant(
            @RequestPart("date") String date,
            @RequestPart("meal") String meal,
            @RequestPart("lots") String longString
    ) {
        // Split the long string into an array of restaurant names
        String[] restaurantInfo = longString.split(",");

        if (restaurantInfo.length > 0) {
            // Use a random number generator to select a random index from the array
            Random random = new Random();
            int randomIndex = random.nextInt(restaurantInfo.length);

            // Get the selected restaurant info at the random index
            String selectedRestaurantInfo = restaurantInfo[randomIndex];
            System.out.println(selectedRestaurantInfo);

            // Extract the restaurant name from the selected info
            String selectedRestaurantName = selectedRestaurantInfo.split("-")[1];
            System.out.println(selectedRestaurantName);

            JsonObject response = Json.createObjectBuilder()
            .add("result",selectedRestaurantName)
            .add("date",date)
            .add("meal",meal)
            .build();

            // Return the selected restaurant's name as the response
            return ResponseEntity.ok(response.toString());
        } else {
            return ResponseEntity.badRequest().body("No restaurants to choose from.");
        }
    }
}




