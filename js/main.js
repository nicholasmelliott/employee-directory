
$(document).ready(function(){
    
    const $body = $('body').get(0);
    let $emCells = $('.cell');
    const $searchInput = $('#searchInput');
    const $emPhotoColl = $('.emPhoto');
    const $emNameColl = $('.emName');
    const $emEmailColl = $('.emEmail');
    const $emCityColl = $('.emCity');
    const $overlay = $('.overlay');
    const $overlayBlack = $('.overlayBlack');
    const $emPhotoOvrly = $('.emPhotoOverlay').get(0);
    const $emNameOvrly = $('.emNameOverlay').get(0);
    const $emUsernameOvrly = $('.emUsernameOverlay').get(0);
    const $emCityOvrly = $('.emCityOverlay').get(0);
    const $emEmailOvrly = $('.emEmailOverlay').get(0);
    const $emPhoneOvrly = $('.emPhoneOverlay').get(0);
    const $emAddressOvrly = $('.emAddressOverlay').get(0);
    const $emDOBOvrly = $('.emDOBOverlay').get(0);
    const $xBtnOvrly = $('#xBtnOverlay');
    const $nextBtn = $('#nextBtn').get(0);
    const $previousBtn = $('#prevBtn').get(0);
    let currentEmployee = '';
    let indexOfEmployee = '';
    let employees = [];
    let searchedEmployees = [];
 
    
    //Capitalizes every word's first letter
    function cap1stLetter(str){
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    };
    
    //Abbreviates state's name
    function abbrState(input, to){
        const states = [
            ['Arizona', 'AZ'],
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['Arizona', 'AZ'],
            ['Arkansas', 'AR'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
        ];
        if(to === 'abbr'){
            input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            for(i = 0; i < states.length; i++){
                if(states[i][0] == input){
                    return(states[i][1]);
                }
            }    
        }else if(to === 'name'){
            input = input.toUpperCase();
            for(i = 0; i < states.length; i++){
                if(states[i][1] == input){
                    return(states[i][0]);
                }
            }    
        }
    };

    //creates an array of the data.results
    function createEmployeesArray(data) {
        $.each(data.results, function(i){
            employees.push(data.results[i]);
        });
    }

    //creates and appends each employee cell
    function createEmployee(data) { 
        for(let j = 0; j < data.results.length; j++){
            $('#employeeLayout').append('<div class="cell" id="employee' + (j) + '"></div>');
        };
        $.each(data.results, function(j){
                $('#employee' + j).append(
                '<img class="emPhoto" src="' + data.results[j].picture.large + '">'
                + '<div class="infoDiv">'
                + '<span class="emName">' + cap1stLetter(data.results[j].name.first) + ' ' + cap1stLetter(data.results[j].name.last) + '</span>'
                + '<span class="emEmail">' + data.results[j].email + '</span>'
                + '<span class="emCity">' + cap1stLetter(data.results[j].location.city) + '</span>'
                + '</div>');    
        });
        $emCells = $('.cell');
    }

    //populates overlay with correct employee information  
    function employeeOverlay (array, i) {
        const date = new Date(array[i].dob);
            currentEmployee = i;
            indexOfEmployee = searchedEmployees.indexOf(i);
            showOverlays();
            $emPhotoOvrly
                .setAttribute('src', array[i].picture.large);   
            $emNameOvrly
                .textContent = 
                    cap1stLetter(array[i].name.first) + " " +              
                    cap1stLetter(array[i].name.last);  
            $emUsernameOvrly
                .textContent = array[i].login.username;
            $emEmailOvrly
                .textContent = array[i].email;   
            $emCityOvrly
                .textContent = cap1stLetter(array[i].location.city);     
            $emPhoneOvrly
                .textContent = array[i].cell;
            $emAddressOvrly
                .textContent = 
                    cap1stLetter(array[i].location.street) + ", " +
                    abbrState(array[i].location.state, 'abbr') + " " +
                    array[i].location.postcode;
            $emDOBOvrly
                .textContent = 
                    "Birthday: " + (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear(); 
    };
    
    function showOverlays() {
        $overlay
            .css("display", "block");
        $overlayBlack
            .css("display", "block");    
    }
    
    function hideOverlays() {
        $overlay
            .css("display", "none");
        $overlayBlack
            .css("display", "none");    
    }
    
    function nextEmployee() {
        let nextEmployee = null;
        //determines whether to use searchedEmployees array or Employees array
        if(searchedEmployees.length > 0){
            //if not at end of array, continue
            if(indexOfEmployee < searchedEmployees.length - 1){
                nextEmployee = searchedEmployees[indexOfEmployee + 1];
                employeeOverlay(employees, nextEmployee); 
            }
        }else{
            //if not at end of array, continue
            if(currentEmployee < employees.length - 1){
                nextEmployee = currentEmployee + 1;
                employeeOverlay(employees, nextEmployee); 
            }      
        } 
    };
    
    function previousEmployee() {
        let prevEmployee = null;
        //determines whether to use searchedEmployees array or Employees array
        if(searchedEmployees.length > 0){
            //if not at beginning of array, continue
            if(indexOfEmployee > 0){
                prevEmployee = searchedEmployees[indexOfEmployee - 1];
                employeeOverlay(employees, prevEmployee);
            }
        }else{
            //if not at beginning of array, continue
            if(currentEmployee > 0){
                prevEmployee = currentEmployee - 1;
                employeeOverlay(employees, prevEmployee);
            }    
        }
    };
   
    
    function employeeSearch(array) {
        searchedEmployees = [];
        $.each(array, function(i){
            const fName = array[i].name.first;
            const lName = array[i].name.last;
            const username = array[i].login.username;
            const userInput = $searchInput.val();
            //checks search input against employee's names. if input doesn't match the employee name; the employee is removed from page. 
            if(fName.toUpperCase().startsWith(userInput.toUpperCase())
                || lName.toUpperCase().startsWith(userInput.toUpperCase()) 
                || (fName.toUpperCase() + ' ' +lName.toUpperCase()).startsWith(userInput.toUpperCase())
                || username.toUpperCase().startsWith(userInput.toUpperCase())){
                    $('#employee' + i).css('display', 'inline-block');
                    searchedEmployees.push(i);
                }else{                    
                    $('#employee' + i).css('display', 'none');
                }
        }); 
    }
    
    /**********Event listeners*****************************************/
    
    //adds the event to each employee cell
    function addEventsToEmploy(){
        $.each(employees, function(i){
            $emCells[i].addEventListener('click', function() {
                employeeOverlay(employees, i); 
            }); 
        }); 
    }
    
    //close btn event for module
    $xBtnOvrly.click(function(){
        hideOverlays();
    });
    
    $overlayBlack.click(function(){
        hideOverlays();
    });

    $previousBtn.addEventListener('click', function(employees){
        previousEmployee();
    });
    
    $nextBtn.addEventListener('click', function(){
        nextEmployee();
    });
    
    $searchInput.on('keyup', function(){
        employeeSearch(employees);
    });
    
    /******************************************************/

    $.ajax({
        url: 'https://randomuser.me/api/?results=12&nat=US&inc=name,login,email,cell,dob,location,picture',
        dataType: 'json',
        success: function(data) {
            createEmployeesArray(data);
            createEmployee(data);
            addEventsToEmploy();
        }      
    });
    

});