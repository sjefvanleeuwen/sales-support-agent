export const productCatalog = [
  {
    id: "ev001",
    name: "HomeCharge 7kW",
    price: 699.99,
    description: "Affordable home charging solution for everyday EV owners with single-phase power.",
    features: [
      "7kW maximum output",
      "32 amp, single-phase",
      "Type 2 connector",
      "Wall-mountable design",
      "LED status indicators",
      "3-year warranty"
    ],
    availableStock: 125,
    installationRequirements: "Requires professional installation with dedicated 40A circuit",
    chargingSpeed: "25-30 miles of range per hour",
    compatibility: "Compatible with all EVs using Type 2 connector (Tesla with adapter)"
  },
  {
    id: "ev002",
    name: "PowerFlex 11kW",
    price: 1299.99,
    description: "Premium three-phase charging solution with smart features for home and small business use.",
    features: [
      "11kW maximum output",
      "16 amp, three-phase",
      "Type 2 connector",
      "WiFi connectivity",
      "Smartphone app control",
      "Load balancing",
      "Energy monitoring",
      "5-year warranty"
    ],
    availableStock: 85,
    installationRequirements: "Requires professional installation with three-phase supply",
    chargingSpeed: "40-50 miles of range per hour",
    compatibility: "Compatible with all EVs using Type 2 connector (Tesla with adapter)"
  },
  {
    id: "ev003",
    name: "CommercialPro 22kW",
    price: 2499.99,
    description: "High-powered commercial charging station ideal for businesses, apartment complexes, and public locations.",
    features: [
      "22kW maximum output",
      "32 amp, three-phase",
      "Dual Type 2 connectors (charge two vehicles)",
      "RFID authentication",
      "4G/WiFi/Ethernet connectivity",
      "OCPP 1.6J compliant",
      "Dynamic load management",
      "Remote monitoring and management",
      "Payment integration options",
      "Weather-resistant (IP54)"
    ],
    availableStock: 42,
    installationRequirements: "Requires professional installation with three-phase supply and 40A circuit per connector",
    chargingSpeed: "75-100 miles of range per hour",
    compatibility: "Compatible with all EVs using Type 2 connector (Tesla with adapter)"
  },
  {
    id: "ev004",
    name: "RapidDC 50kW",
    price: 19999.99,
    description: "DC fast charging station for rapid charging in commercial and highway locations.",
    features: [
      "50kW maximum output",
      "DC fast charging",
      "CCS and CHAdeMO connectors",
      "10-inch touchscreen display",
      "RFID authentication",
      "4G/WiFi/Ethernet connectivity",
      "OCPP 2.0 compliant",
      "Advanced power management",
      "24/7 monitoring service",
      "IP55 rated outdoor enclosure"
    ],
    availableStock: 15,
    installationRequirements: "Requires professional installation with three-phase supply, transformer and dedicated high-amperage circuit",
    chargingSpeed: "150-200 miles of range in 30 minutes",
    compatibility: "Compatible with all EVs supporting DC fast charging via CCS or CHAdeMO"
  },
  {
    id: "ev005",
    name: "EcoCharge 3.7kW",
    price: 399.99,
    description: "Economical portable charging solution for budget-conscious EV owners or as a backup charger.",
    features: [
      "3.7kW output",
      "16 amp, single-phase",
      "Type 2 connector",
      "Portable design",
      "No installation required",
      "Thermal protection",
      "2-year warranty"
    ],
    availableStock: 210,
    installationRequirements: "Plugs into standard 220-240V outlet (no permanent installation)",
    chargingSpeed: "10-15 miles of range per hour",
    compatibility: "Compatible with all EVs using Type 2 connector (Tesla with adapter)"
  }
];

export const getProductById = (id) => {
  return productCatalog.find(product => product.id === id);
};

export const getProductByName = (name) => {
  return productCatalog.find(product => 
    product.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const getAllProducts = () => {
  return productCatalog;
};
