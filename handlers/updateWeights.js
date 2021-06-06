const updateWeights = (diff, workouts, currentWorkout) => {
    const updatedKg = workouts;
    const index = updatedKg.findIndex(workout => workout.name === currentWorkout);

    for (let i = 1; i < Object.keys(updatedKg[index]).length; i++) {
        const excersizes = Object.keys(updatedKg[index])[i];

        for (let j = 0; j < updatedKg[index][excersizes].length; j++) {
            const excersize = updatedKg[index][excersizes][j];

            if (excersize.hasOwnProperty('kg')) {
                excersize.kg += diff;
            }
        }
    }

    return updatedKg;
}

module.exports = updateWeights;