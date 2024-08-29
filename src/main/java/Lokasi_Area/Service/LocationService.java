package Lokasi_Area.Service;


import Lokasi_Area.Model.Location;
import Lokasi_Area.Repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {
    @Autowired
    private LocationRepository locationRepository;

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location getLocationById(Long id) {
        return locationRepository.findById(id).orElse(null);
    }

    public Location saveLocation(Location location) {
        // Round the coordinates to 2 decimal places
        location.setX(Math.round(location.getX() * 100.0) / 100.0);
        location.setY(Math.round(location.getY() * 100.0) / 100.0);
        location.setWidth(Math.round(location.getWidth() * 100.0) / 100.0);
        location.setHeight(Math.round(location.getHeight() * 100.0) / 100.0);
        return locationRepository.save(location);
    }

    public void deleteLocation(Long id) {
        locationRepository.deleteById(id);
    }
}