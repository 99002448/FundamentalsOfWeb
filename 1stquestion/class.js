let entry=function(name,dob,profession,years){
    this.Name=name;
    this.dob=dob;
    this.profession=profession;
    this.years=years;
    
    this.display=function(){
        console.log("The name:"+this.Name);
        console.log("DOB is:"+this.dob);
        console.log("The Profession:"+this.profession);
        console.log("The Years of exp:"+this.years);

        
    }
    }