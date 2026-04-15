// Extract HL7 fields
var patientId = msg['PID']['PID.3']['PID.3.1'].toString();
var family = msg['PID']['PID.5']['PID.5.1'].toString();
var given = msg['PID']['PID.5']['PID.5.2'].toString();
var dob = msg['PID']['PID.7']['PID.7.1'].toString();
var gender = msg['PID']['PID.8']['PID.8.1'].toString();

var glucose = msg['OBX']['OBX.5']['OBX.5.1'].toString();
var unit = msg['OBX']['OBX.6']['OBX.6.1'].toString();

// Convert to JSON
var json = {
  patient: {
    id: patientId,
    family: family,
    given: given,
    dob: dob,
    gender: gender
  },
  observation: {
    test: "GLUCOSE",
    value: parseFloat(glucose),
    unit: unit
  }
};

channelMap.put("jsonOutput", JSON.stringify(json));
