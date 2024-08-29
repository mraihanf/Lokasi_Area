package Lokasi_Area.Controller;

import Lokasi_Area.Model.Location;
import Lokasi_Area.Service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class MapController {
    @Autowired
    private LocationService locationService;

    @GetMapping("/")
    public String index(Model model) {
        return "index";
    }

    @GetMapping("/api/locations")
    @ResponseBody
    public List<Location> getLocations() {
        return locationService.getAllLocations();
    }
}
