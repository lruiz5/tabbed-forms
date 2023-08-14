-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carrierName" TEXT,
    "unitNum" TEXT,
    "year" TEXT,
    "make" TEXT,
    "licenseNum" TEXT,
    "mileage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Vehicle" ("carrierName", "createdAt", "id", "licenseNum", "make", "mileage", "unitNum", "updatedAt", "year") SELECT "carrierName", "createdAt", "id", "licenseNum", "make", "mileage", "unitNum", "updatedAt", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE TABLE "new_Inspection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inspectorId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL DEFAULT (CAST(strftime('%m', 'now') AS INTEGER)),
    "year" INTEGER NOT NULL DEFAULT (CAST(strftime('%Y', 'now') AS INTEGER)),
    "fireExtinguisher" BOOLEAN NOT NULL DEFAULT false,
    "hornDefroster" BOOLEAN NOT NULL DEFAULT false,
    "mirrorsAnd" BOOLEAN NOT NULL DEFAULT false,
    "windshieldWipers" BOOLEAN NOT NULL DEFAULT false,
    "allLights" BOOLEAN NOT NULL DEFAULT false,
    "electricalWiring" BOOLEAN NOT NULL DEFAULT false,
    "batteriesWater" BOOLEAN NOT NULL DEFAULT false,
    "warningDevices" BOOLEAN NOT NULL DEFAULT false,
    "radiatorAnd" BOOLEAN NOT NULL DEFAULT false,
    "beltsCompressors" BOOLEAN NOT NULL DEFAULT false,
    "airHoses" BOOLEAN NOT NULL DEFAULT false,
    "fuelSystem" BOOLEAN NOT NULL DEFAULT false,
    "exhaustSystem" BOOLEAN NOT NULL DEFAULT false,
    "engineMounting" BOOLEAN NOT NULL DEFAULT false,
    "clutchAdjustment" BOOLEAN NOT NULL DEFAULT false,
    "airFilter" BOOLEAN NOT NULL DEFAULT false,
    "startingAnd" BOOLEAN NOT NULL DEFAULT false,
    "tractorProtection" BOOLEAN NOT NULL DEFAULT false,
    "hydraulicBrake" BOOLEAN NOT NULL DEFAULT false,
    "hydraulicMaster" BOOLEAN NOT NULL DEFAULT false,
    "hosesAnd" BOOLEAN NOT NULL DEFAULT false,
    "airBrake" BOOLEAN NOT NULL DEFAULT false,
    "minuteTest" BOOLEAN NOT NULL DEFAULT false,
    "airCompressor" BOOLEAN NOT NULL DEFAULT false,
    "primaryAir" BOOLEAN NOT NULL DEFAULT false,
    "otherAir" BOOLEAN NOT NULL DEFAULT false,
    "tiresTread" BOOLEAN NOT NULL DEFAULT false,
    "wheelsLugnuts" BOOLEAN NOT NULL DEFAULT false,
    "parkingBrake" BOOLEAN NOT NULL DEFAULT false,
    "emergencyStopping" BOOLEAN NOT NULL DEFAULT false,
    "brakesRelease" BOOLEAN NOT NULL DEFAULT false,
    "steeringSystem" BOOLEAN NOT NULL DEFAULT false,
    "steeringArms" BOOLEAN NOT NULL DEFAULT false,
    "connectingDevices" BOOLEAN NOT NULL DEFAULT false,
    "suspensionSystem" BOOLEAN NOT NULL DEFAULT false,
    "frameAnd" BOOLEAN NOT NULL DEFAULT false,
    "driveShaft" BOOLEAN NOT NULL DEFAULT false,
    "transmissionAnd" BOOLEAN NOT NULL DEFAULT false,
    "wheelSeals" BOOLEAN NOT NULL DEFAULT false,
    "underCarriage" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inspection_inspectorId_fkey" FOREIGN KEY ("inspectorId") REFERENCES "Inspector" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inspection_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inspection" ("airBrake", "airCompressor", "airFilter", "airHoses", "allLights", "batteriesWater", "beltsCompressors", "brakesRelease", "clutchAdjustment", "connectingDevices", "createdAt", "driveShaft", "electricalWiring", "emergencyStopping", "engineMounting", "exhaustSystem", "fireExtinguisher", "frameAnd", "fuelSystem", "hornDefroster", "hosesAnd", "hydraulicBrake", "hydraulicMaster", "id", "inspectorId", "minuteTest", "mirrorsAnd", "month", "otherAir", "parkingBrake", "primaryAir", "radiatorAnd", "startingAnd", "steeringArms", "steeringSystem", "suspensionSystem", "tiresTread", "tractorProtection", "transmissionAnd", "underCarriage", "updatedAt", "vehicleId", "warningDevices", "wheelSeals", "wheelsLugnuts", "windshieldWipers", "year") SELECT "airBrake", "airCompressor", "airFilter", "airHoses", "allLights", "batteriesWater", "beltsCompressors", "brakesRelease", "clutchAdjustment", "connectingDevices", "createdAt", "driveShaft", "electricalWiring", "emergencyStopping", "engineMounting", "exhaustSystem", "fireExtinguisher", "frameAnd", "fuelSystem", "hornDefroster", "hosesAnd", "hydraulicBrake", "hydraulicMaster", "id", "inspectorId", "minuteTest", "mirrorsAnd", "month", "otherAir", "parkingBrake", "primaryAir", "radiatorAnd", "startingAnd", "steeringArms", "steeringSystem", "suspensionSystem", "tiresTread", "tractorProtection", "transmissionAnd", "underCarriage", "updatedAt", "vehicleId", "warningDevices", "wheelSeals", "wheelsLugnuts", "windshieldWipers", "year" FROM "Inspection";
DROP TABLE "Inspection";
ALTER TABLE "new_Inspection" RENAME TO "Inspection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
