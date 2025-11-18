🚀 Built It – AI Powered Project Discovery Platform

    Built It is a lightweight, front-end web platform that helps students and developers quickly discover project ideas and learning resources. It automatically pulls high-quality tutorials and repositories from     YouTube and GitHub, and uses Google Gemini AI to generate smart summaries and one-line explanations for each result. 
    
    This project was built using HTML, CSS, and Vanilla JavaScript, with zero backend, and is fully deployable on Netlify or any static hosting service.


✨ Features

    🔍 Unified Search System
    Easily search any topic and get instant project resources.
    
    📺 Top YouTube Tutorials (API)
    Fetches top 5 videos with “load more” option.
    
    💻 Top GitHub Repositories (API)
    Shows most-starred repos for your search topic.
    
    🤖 Gemini AI Summary
    Generates a short, clear paragraph explaining the topic + beginner projects.
    
    💡 AI Insights for Each Result
    One-line “What, Why & Outcome” explanation for every YT/GitHub item.
    
    ⚡ Smart Caching
    Results stored in localStorage → faster loads → minimal API usage.
    
    🌓 Dark / Light Theme Toggle
    Theme preference saved across sessions.
    
    🔐 Simple Login Demo
    LocalStorage-based mock login (no backend needed).
    
    📱 Fully Responsive UI
    Works on phone, tablet, and laptop.


🛠️ Tech Stack


    Frontend:

        HTML5
        
        CSS3 (minimal clean theme + dark/light mode)
        
        JavaScript (DOM, Fetch API, Async/Await)
        
        APIs Used:
        
        YouTube Data API v3
        
        GitHub Search API
        
        Google Gemini 2.0 Flash API


    Storage:

        localStorage (client-side caching + demo login)


📦 Project Structure

    /index.html
    /login.html
    /search.html
    /result.html
    /css/style.css
    /js/login.js
    /js/search.js
    /js/result.js
    /js/theme.js
    

🔧 How It Works

    1. User searches a topic
    
    2. App fetches tutorials from YouTube
    
    3. App fetches repositories from GitHub
    
    4. Gemini AI generates:
        
        a short topic summary
        
        a 1-line description for each item
    
    5. Results are cached locally for faster future searches
    
    6. User can toggle between dark/light themes


🚀 Getting Started

    Clone the repo:

        git clone https://github.com/yourusername/built-it.git


    Add your API keys inside /js/result.js:

        const KEYS = {
          YT: "YOUR_YT_API_KEY",
          GEMINI: "YOUR_GEMINI_API_KEY",
          GITHUB_TOKEN: "" // optional
        };


    Open index.html in your browser — everything runs client-side!
    
    Deploy on Netlify or GitHub Pages (static hosting works perfectly).


📌 Future Improvements

    Add Dev.to article integration
    
    Add Kaggle project suggestions
    
    Add user dashboard with saved searches
    
    Add backend caching layer to avoid rate limits
    
    Provide difficulty slider (Beginner/Intermediate/Advanced)


📄 License

    This project is open-source and available under the MIT License.
