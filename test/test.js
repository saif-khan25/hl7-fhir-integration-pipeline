// Simulated HL7 parsed message (like Mirth msg object)
var msg = {
  PID: {
    "PID.3": { "PID.3.1": "123456" },
    "PID.5": { "PID.5.1": "Khan", "PID.5.2": "Saif" },
    "PID.7": { "PID.7.1": "19980101" },
    "PID.8": { "PID.8.1": "M" }
  },
  OBX: {
    "OBX.3": { "OBX.3.1": "GLUCOSE" },
    "OBX.5": { "OBX.5.1": "140" },
    "OBX.6": { "OBX.6.1": "mg/dL" }
  }
};

// Extract HL7 fields
var patientId = msg['PID']['PID.3']['PID.3.1'];
var family = msg['PID']['PID.5']['PID.5.1'];
var given = msg['PID']['PID.5']['PID.5.2'];
var dob = msg['PID']['PID.7']['PID.7.1'];
var gender = msg['PID']['PID.8']['PID.8.1'];

var test = msg['OBX']['OBX.3']['OBX.3.1'];
var value = msg['OBX']['OBX.5']['OBX.5.1'];
var unit = msg['OBX']['OBX.6']['OBX.6.1'];

// JSON output
var jsonOutput = {
  patient: {
    id: patientId,
    name: {
      family: family,
      given: given
    },
    dob: dob,
    gender: gender
  },
  observation: {
    test: test,
    value: parseFloat(value),
    unit: unit
  }
};

// Convert to FHIR
var patient = {
  resourceType: "Patient",
  id: patientId,
  name: [{
    family: family,
    given: [given]
  }],
  gender: (gender === "M") ? "male" : "female"
};

var observation = {
  resourceType: "Observation",
  status: "final",
  code: { text: test },
  valueQuantity: {
    value: parseFloat(value),
    unit: unit
  },
  subject: {
    reference: "Patient/" + patientId
  }
};

var bundle = {
  resourceType: "Bundle",
  type: "collection",
  entry: [
    { resource: patient },
    { resource: observation }
  ]
};

// Output
console.log("===== JSON OUTPUT =====");
console.log(JSON.stringify(jsonOutput, null, 2));

console.log("\n===== FHIR OUTPUT =====");
console.log(JSON.stringify(bundle, null, 2));
