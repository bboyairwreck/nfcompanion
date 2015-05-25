var patientID = localStorage.getItem("patient");
var firstName = localStorage.getItem("firstName");
var lastName = localStorage.getItem("lastName");

!(function() {
    $(document).ready(function() {
        $fullName = firstName + " " + lastName;
        $("#main").html($fullName);

        $("#editButton").click(function(){
            $name = $("#main").text();
            $("#editMain").text($name);
            $("input[name='name']").prop('value', $name);
            $dob = $("#birthdate").text();
            $("input[name='dob']").prop('value', $dob);
            $address = $("#address").text();
            $("input[name='address']").prop('value', $address);
            $citystate = $("#citystate").text();
            $("input[name='citystate']").prop('value', $citystate);
            $phone = $("#phone").text();
            $("input[name='phone']").prop('value', $phone);
            $emergency = $("#emergency").text();
            $("input[name='emergency']").prop('value', $emergency);
            $doctor = $("#doctor").text();
            $("input[name='doctor']").prop('value', $doctor);
            $hospital = $("#hospital").text();
            $("input[name='hospital']").prop('value', $hospital);
            $blood = $("#blood").text();
            $("input[name='blood']").prop('value', $blood);
            $allergies = "";
            $("#allergies li").each(function(index) {
                $allergies = $allergies + $(this).text() + " ";
            });
            alert($allergies);
            $("input[name='allergies']").prop('value', $allergies);
            $meds = "";
            $("#meds li").each(function(index) {
                $meds = $meds + $(this).text() + " ";
            });
            alert($meds);
            $("input[name='meds']").prop('value', $meds);
            $insurance = $("#insurance").text();
            $("input[name='insurance']").prop('value', $insurance);
        });

        // update profile information
        $("#submitProfile").click(function() {
            $setName = $("input[name='name']").prop('value');
            $("#main").text($setName);
            $setDob = $("input[name='dob']").prop('value');
            $("#birthdate").text($setDob);
            $setAddress = $("input[name='address']").prop('value');
            $("#address").text($setAddress);
            $setCityState = $("input[name='citystate']").prop('value');
            $("#citystate").text($setCityState);
            $setPhone = $("input[name='phone']").prop('value');
            $("#phone").text($setPhone);
            $setEmergency = $("input[name='emergency']").prop('value');
            $("#emergency").text($setEmergency);
            $setDoctor = $("input[name='doctor']").prop('value');
            $("#doctor").text($setDoctor);
            $setHospital = $("input[name='hospital']").prop('value');
            $("#hospital").text($setHospital);
            $setBlood = $("input[name='blood']").prop('value');
            $("#blood").text($setBlood);
            $setAllergies = $("input[name='allergies']").prop('value');
            $("#allergies").text($setAllergies);
            $setMeds = $("input[name='meds']").prop('value');
            $("#meds").text($setMeds);
            $setInsurance = $("input[name='insurance']").prop('value');
            $("#insurance").text($setInsurance);
        });
    });
}());