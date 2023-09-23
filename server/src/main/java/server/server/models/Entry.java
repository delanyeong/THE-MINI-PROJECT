package server.server.models;

public class Entry {
    private String username;
    private String restaurant;

    public Entry() {
    }

    public Entry(String username, String restaurant) {
        this.username = username;
        this.restaurant = restaurant;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(String restaurant) {
        this.restaurant = restaurant;
    }
}
