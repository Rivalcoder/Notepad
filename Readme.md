# 📝 My Notes Application  

A simple, user-friendly web application for creating, saving, and managing personal notes. Built with **Node.js**, **Express**, and **MongoDB**, this project allows users to add, view, and retrieve notes in real-time. 🚀  

---

## 🗃️ Features  
- ✍️ **Add Notes**: Users can add notes with a simple click of a button.  
- 🐂 **View Notes**: Fetch and display all notes saved for a particular user.  
- 💾 **Persistent Storage**: Notes are stored in **MongoDB**, ensuring that user data is saved securely.  
- 🎨 **Clean UI**: A minimalist, user-friendly interface.  

---

## 🛠️ Technologies Used  

| Technology        | Description                               |
|-------------------|-------------------------------------------|
| **Node.js**       | Backend runtime for server-side JavaScript |
| **Express**       | Web framework for Node.js                  |
| **MongoDB**       | NoSQL database for storing notes           |
| **HTML/CSS/JS**   | Frontend design and interactivity          |
| **Body-Parser**   | Middleware for parsing JSON requests       |

---

## 🚀 Getting Started  

### 1. Clone the Repository  
```bash
git clone https://github.com/Rivalcoder/Notepad.git
cd my-notes-app
```

### 2. Install Dependencies  
```bash
npm install
```

### 3. Set Up MongoDB Connection  
- Replace the following line in the code with your **MongoDB URI**:  
  ```javascript
  const uri = `mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority`;
  ```
- Make sure to URL-encode your password using `encodeURIComponent()`.

### 4. Start the Server  
```bash
npm start
```
The app will run on [http://localhost:3000](http://localhost:3000). 🎉  

---

## 🔅 Usage  

1. Open the app in your browser.  
2. Enter a username to start adding and viewing notes.  
3. Use the **Add Note** button to save a new note.  
4. Click **Show Notes** to view all saved notes for the current user.

---

## 🗂 Project Structure  

```bash
my-notes-app/
├── public/
│   ├── index.html      # Main HTML file
│   ├── style.css       # Stylesheet
│   └── script.js       # Client-side JavaScript
├── server.js           # Express server setup
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

---

## 🤝 Contribution  

Contributions are always welcome! If you’d like to contribute:  
1. Fork the repository.  
2. Create a new feature branch (`git checkout -b feature/new-feature`).  
3. Commit your changes (`git commit -m 'Add some feature'`).  
4. Push to the branch (`git push origin feature/new-feature`).  
5. Open a pull request.

---


## 📧 Contact  

Feel free to reach out for any questions or feedback!  
- **Email**: [rivalcoder01@gmail.com](mailto:rivalcoder01@gmail.com)  
- **GitHub**: [Rivalcoder](https://github.com/Rivalcoder)

---

⭐ If you found this project useful, give it a star!  

### Hosted Url

- The app is live on [http://livenote.vercel.app](http://livenote.vercel.app). 🎉
