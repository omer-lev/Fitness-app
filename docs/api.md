# Endpoints
GET '/' - Landing
GET '/login' - Login
POST '/login' - Post Login
GET '/register' - Register
POST '/register' - Post register
GET '/user_define' User define BMI page
POST '/user_define' User posts BMI
GET '/workout/:id' Specific workout page

# Models

```ts
interface User {
    name: String,
    weight: Number,
    height: Number,
    workouts: Number,
    lastDifficulty: String
}

interface Workout {
    name: String,
    type: String,
    sets: Number,
    reps: Number
}

```