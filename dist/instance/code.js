function run() {
  const IGSF = IGStoriesToGDrive.getInstance();
  IGSF.batchFetch();
}

function createBadges() {
  const IGSF = IGStoriesToGDrive.getInstance();
  IGSF.createBadages();
}

function deleteSelected() {
  const IGSF = IGStoriesToGDrive.getInstance();
  IGSF.deleteSelected();
}

function moveSelected() {
  const IGSF = IGStoriesToGDrive.getInstance();
  IGSF.moveSelected();
}

function runTestPipeline() {
  const IGSF = IGStoriesToGDrive.getInstance();
  IGSF.test_pipeline();
}
