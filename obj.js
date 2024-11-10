document.addEventListener("DOMContentLoaded", ()=>{

   class Dog {
    #name;
    #race;
    #age;
    #sexe;

    constructor(name, race, age, sexe){
        this.name = name;
        this.race = race;
        this.age = age;
        this.sexe = sexe;
    }

    getName(){
        return this.name;
    }

    getRace(){
        return this.race;
    }

    getAge(){
        return this.age;
    }

    getSexe(){
        return this.sexe;
    }

    setName(name){
        return this.name = name;
    }

    setRace(race){
        return this.name = race;
    }

    setAge(age){
        return this.name = age;
    }

    setSexe(sexe){
        return this.name = sexe;
    }

     aboie(){
        return 'Wouaf wouaf';
    }

   };


   let dog1 = new Dog("Baltazard", "PitBull", "6", "Male");
   let dog2 = new Dog("Maurice", "bulli", "6", "Femelle");

   function presentation(race){
    console.log(`Voici mon chien ${race.getName()} il à ${race.getAge()} mois c'est de la race des ${race.getRace()} et c'est un ${race.getSexe()}, ${race.getName()} aboie ${race.aboie()}`);

   }

   presentation(dog1);
   presentation(dog2);
})