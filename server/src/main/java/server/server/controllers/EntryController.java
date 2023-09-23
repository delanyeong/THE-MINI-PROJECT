package server.server.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import server.server.models.Entry;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

// @RestController
// @RequestMapping("/api")
// @CrossOrigin(origins = "*")
// public class EntryController {

//     private final List<Entry> entries = new ArrayList<>();

//     @PostMapping("/entry")
//     public void addEntry(@RequestBody @Validated Entry entry) {
//         entries.add(entry);
//     }

//     @GetMapping("/random-entry")
//     public Entry getRandomEntry() {
//         if (entries.isEmpty()) {
//             throw new RuntimeException("No entries available.");
//         }

//         Random random = new Random();
//         int randomIndex = random.nextInt(entries.size());
//         return entries.get(randomIndex);
//     }
// }

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EntryController {

    private final List<Entry> entries = new ArrayList<>();

    @PostMapping(path="/entry", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseBody
    public ResponseEntity<String> addEntry(
        @RequestPart String username,
        @RequestPart String restaurant
    ) {
        // Handle the entry and file as needed
        // For example, you can save the file, validate the entry, and store it in your database

        Entry entry = new Entry();
        entry.setUsername(username);
        entry.setRestaurant(restaurant);
        entries.add(entry);

        // Respond with a success message
        return ResponseEntity.status(HttpStatus.CREATED).body("Entry added successfully.");
    }

    @GetMapping("/random-entry")
    public Entry getRandomEntry() {
        if (entries.isEmpty()) {
            throw new RuntimeException("No entries available.");
        }

        Random random = new Random();
        int randomIndex = random.nextInt(entries.size());
        return entries.get(randomIndex);
    }
}
