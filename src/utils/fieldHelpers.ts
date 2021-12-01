const fieldsMissing = (fields:string[],source: any):string | null => {

    for(let i = 0;i < fields.length; i++){
        
        if(source[fields[i]] == undefined || source[fields[i]] == null){
            return fields[i];
        }
    };

    return null;
}

export default fieldsMissing;