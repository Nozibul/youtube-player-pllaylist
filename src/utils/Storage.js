// create local storage using class or function
class Storage { 
 // using two method
 save(key , data){ // key for save data name and get actual data
   localStorage.setItem(key, JSON.stringify(data));
 }

 get(key){
    const json = localStorage.getItem(key)
    return JSON.parse(json)
 }

}

// create object
const storage = new Storage();
export default storage ;