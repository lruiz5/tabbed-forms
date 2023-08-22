-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inspection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inspectorId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "mileage" TEXT NOT NULL DEFAULT '',
    "month" TEXT NOT NULL DEFAULT (CAST(strftime('%m', 'now') AS TEXT)),
    "year" TEXT NOT NULL DEFAULT (CAST(strftime('%Y', 'now') AS TEXT)),
    "fireExtinguisher" TEXT NOT NULL DEFAULT '',
    "hornDefroster" TEXT NOT NULL DEFAULT '',
    "mirrorsAnd" TEXT NOT NULL DEFAULT '',
    "windshieldWipers" TEXT NOT NULL DEFAULT '',
    "allLights" TEXT NOT NULL DEFAULT '',
    "electricalWiring" TEXT NOT NULL DEFAULT '',
    "batteriesWater" TEXT NOT NULL DEFAULT '',
    "warningDevices" TEXT NOT NULL DEFAULT '',
    "radiatorAnd" TEXT NOT NULL DEFAULT '',
    "beltsCompressors" TEXT NOT NULL DEFAULT '',
    "airHoses" TEXT NOT NULL DEFAULT '',
    "fuelSystem" TEXT NOT NULL DEFAULT '',
    "exhaustSystem" TEXT NOT NULL DEFAULT '',
    "engineMounting" TEXT NOT NULL DEFAULT '',
    "clutchAdjustment" TEXT NOT NULL DEFAULT '',
    "airFilter" TEXT NOT NULL DEFAULT '',
    "startingAnd" TEXT NOT NULL DEFAULT '',
    "tractorProtection" TEXT NOT NULL DEFAULT '',
    "hydraulicBrake" TEXT NOT NULL DEFAULT '',
    "hydraulicMaster" TEXT NOT NULL DEFAULT '',
    "hosesAnd" TEXT NOT NULL DEFAULT '',
    "airBrake" TEXT NOT NULL DEFAULT '',
    "minuteTest" TEXT NOT NULL DEFAULT '',
    "airCompressor" TEXT NOT NULL DEFAULT '',
    "primaryAir" TEXT NOT NULL DEFAULT '',
    "otherAir" TEXT NOT NULL DEFAULT '',
    "tiresTread" TEXT NOT NULL DEFAULT '',
    "wheelsLugnuts" TEXT NOT NULL DEFAULT '',
    "parkingBrake" TEXT NOT NULL DEFAULT '',
    "emergencyStopping" TEXT NOT NULL DEFAULT '',
    "brakesRelease" TEXT NOT NULL DEFAULT '',
    "steeringSystem" TEXT NOT NULL DEFAULT '',
    "steeringArms" TEXT NOT NULL DEFAULT '',
    "connectingDevices" TEXT NOT NULL DEFAULT '',
    "suspensionSystem" TEXT NOT NULL DEFAULT '',
    "frameAnd" TEXT NOT NULL DEFAULT '',
    "driveShaft" TEXT NOT NULL DEFAULT '',
    "transmissionAnd" TEXT NOT NULL DEFAULT '',
    "wheelSeals" TEXT NOT NULL DEFAULT '',
    "underCarriage" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inspection_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "Inspector" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inspection_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inspection" ("airBrake", "airCompressor", "airFilter", "airHoses", "allLights", "batteriesWater", "beltsCompressors", "brakesRelease", "clutchAdjustment", "connectingDevices", "createdAt", "driveShaft", "electricalWiring", "emergencyStopping", "engineMounting", "exhaustSystem", "fireExtinguisher", "frameAnd", "fuelSystem", "hornDefroster", "hosesAnd", "hydraulicBrake", "hydraulicMaster", "id", "inspectorId", "mileage", "minuteTest", "mirrorsAnd", "month", "otherAir", "parkingBrake", "primaryAir", "radiatorAnd", "startingAnd", "steeringArms", "steeringSystem", "suspensionSystem", "tiresTread", "tractorProtection", "transmissionAnd", "underCarriage", "updatedAt", "vehicleId", "warningDevices", "wheelSeals", "wheelsLugnuts", "windshieldWipers", "year") SELECT "airBrake", "airCompressor", "airFilter", "airHoses", "allLights", "batteriesWater", "beltsCompressors", "brakesRelease", "clutchAdjustment", "connectingDevices", "createdAt", "driveShaft", "electricalWiring", "emergencyStopping", "engineMounting", "exhaustSystem", "fireExtinguisher", "frameAnd", "fuelSystem", "hornDefroster", "hosesAnd", "hydraulicBrake", "hydraulicMaster", "id", "inspectorId", "mileage", "minuteTest", "mirrorsAnd", "month", "otherAir", "parkingBrake", "primaryAir", "radiatorAnd", "startingAnd", "steeringArms", "steeringSystem", "suspensionSystem", "tiresTread", "tractorProtection", "transmissionAnd", "underCarriage", "updatedAt", "vehicleId", "warningDevices", "wheelSeals", "wheelsLugnuts", "windshieldWipers", "year" FROM "Inspection";
DROP TABLE "Inspection";
ALTER TABLE "new_Inspection" RENAME TO "Inspection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
