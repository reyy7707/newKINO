const config = { 
    baseUrl: 'https://api.themoviedb.org/3/', 
    apiKey: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDU2YTA2MWM1ZjllOTYwM2I4ZWIxYjQzMmRlNDU0ZSIsInN1YiI6IjY2MWU1ZDM5OTY2NzBlMDE3ZGQ5Mjk3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i3exZvpRuW6sDsBDcMxtX17C88C5Ke-5RVbQAabwwGg', 
    originalImage: (path) => `https://image.tmdb.org/t/p/original/${path}`,
    w500Image: (path) => `https://image.tmdb.org/t/p/w500/${path}`
} 
export default config