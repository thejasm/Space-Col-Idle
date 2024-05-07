const atmosphere_types = [
    //index, name, rarity
    [0, "No Atmosphere", 0.4],
    [1, "Nitrogen-Oxygen", 0.2],
    [2, "Carbon Dioxide", 0.2],
    [3, "Methane", 0.1],
    [4, "Ammonia", 0.1],
    [5, "Hydrogen-Helium", 0]
];

var current_planet = {
    "atmosphere": 0,
    "pressure": 0,
    "water": 0,
    "metals": 0,
    "organics": 0,
    "chemicals": 0
};

function planet_gen(planet){
    var seed = Math.random();
    // 30% chance of planet being a gas giant
    if(seed < 0.3){
        planet.atmosphere = 5;
        planet.pressure = 1;
        planet.water = 0.05;
        planet.organics = 0.01;
        planet.metals = 0.01;
        planet.chemicals = 1;
    } else { // Not a gas giant
        // Generate atmosphere
        var seed = Math.random();
        var cumulativeRarity = 0;
        for (var i = 0; i < atmosphere_types.length; i++) {
            cumulativeRarity += atmosphere_types[i][2];
            if (seed < cumulativeRarity) {
                planet.atmosphere = atmosphere_types[i][0]; // Set the atmosphere type
                break;
            }
        }
        // Generate other stats
        if(planet.atmosphere == 0) planet.pressure = 0;
        else planet.pressure = (Math.random()).toFixed(2);
        planet.water = (Math.random()).toFixed(2);
        planet.organics = (Math.random()).toFixed(2);
        planet.metals = (Math.random()).toFixed(2);
        planet.chemicals = (Math.random()).toFixed(2);

    }
}

function planet_display(planet){
    
}




// DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG
function printPlanet(planet) {
    if (planet) {
        console.log("Current planet properties:");
        console.log("atmosphere: " + atmosphere_types.find(atmosphere => atmosphere[0] === planet.atmosphere)[1]);
        Object.entries(planet).forEach(([key, value]) => {
            if (key !== "atmosphere") {
                console.log(key + ": " + value);
            }
        });
    } else {
        console.log("No planet data to print.");
    }
}

// Test the planet generation
console.log("Generating a planet...");
planet_gen(current_planet);
printPlanet(current_planet);

// Function to run planet_gen 100 times and count atmosphere types
function countAtmosphereTypes() {
    var atmosphereCounts = {};
    // Initialize atmosphereCounts
    atmosphere_types.forEach(([index, name, rarity]) => {
        atmosphereCounts[name] = 0;
    });

    // Run planet_gen 100 times
    for (var i = 0; i < 100; i++) {
        var planet = {};
        planet_gen(planet);
        var atmosphereName = atmosphere_types.find(atmosphere => atmosphere[0] === planet.atmosphere)[1];
        atmosphereCounts[atmosphereName]++;
    }

    return atmosphereCounts;
}

// Count atmosphere types
var atmosphereCounts = countAtmosphereTypes();

// Output the results
console.log("Atmosphere Type Counts:");
for (var atmosphereName in atmosphereCounts) {
    console.log(atmosphereName + ": " + atmosphereCounts[atmosphereName] + " - " + (atmosphereCounts[atmosphereName]/100) + "%");
}
// DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG ---------- DEBUG