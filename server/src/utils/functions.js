export const structureValueConstruction = (structure, modelNumber) => {
    console.log(modelNumber);

    if (structure.type.length === 0) {
        structure.value = Array(structure.units.length).fill([]);
        for (let i = 0; i < structure.units.length; i++) {
            for (let j = 0; j < modelNumber; j++) {
                structure.value[i][j] = "";
            }
        }
    } else {
        structure.value = Array(structure.type.length).fill([]);
        for (let i = 0; i < structure.type.length; i++) {
            for (let j = 0; j < modelNumber; j++) {
                structure.value[i][j] = "";
            }
        }
    }

    console.log(structure.value);
    return structure.value;
};