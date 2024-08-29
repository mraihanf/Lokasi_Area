package Lokasi_Area.Controller;

import Lokasi_Area.Model.Location;
import Lokasi_Area.Service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private LocationService locationService;

    @GetMapping
    public String adminPage(Model model) {
        model.addAttribute("locations", locationService.getAllLocations());
        return "admin";
    }

    @PostMapping("/location")
    public String addLocation(@ModelAttribute Location location) {
        locationService.saveLocation(location);
        return "redirect:/admin";
    }

    @PostMapping("/location/{id}")
    public String updateLocation(@PathVariable Long id, @ModelAttribute Location location) {
        location.setId(id);
        locationService.saveLocation(location);
        return "redirect:/admin";
    }

    @PostMapping("/location/{id}/delete")
    public String deleteLocation(@PathVariable Long id) {
        locationService.deleteLocation(id);
        return "redirect:/admin";
    }
}
