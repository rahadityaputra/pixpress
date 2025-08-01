# PixPress: Web Image Compression Tool

PixPress is a modern web application for compressing and optimizing images. Built with React and Radix UI for the frontend and Node.js with Sharp.js for the backend, PixPress provides a simple and efficient way for users to reduce image file sizes without significant loss of visual quality.

## ✨ Features

- **Flexible Compression Modes**  
  - **Resize**: Set specific width and height dimensions to scale your images.  
  - **Target File Size**: Automatically adjust image quality to achieve a specific file size (e.g., 200 KB).

- **Multiple File Formats**  
  - Output as **JPEG** (lossy, smaller files) or **PNG** (lossless, higher quality).

- **Before & After Comparison**  
  - View your original and compressed images side by side, including file size and percentage saved.

- **Batch Processing**  
  - Upload and compress multiple images at once.

- **Single ZIP Download**  
  - Download all compressed images in a single `.zip` file for convenience.

- **Responsive and Accessible UI**  
  - Built with **Radix UI** to ensure a modern, accessible, and responsive experience.

## 🔧 Technologies Used

### Frontend
- React
- TypeScript
- Radix UI Themes
- Font Awesome (for icons)
- Tailwind CSS (for styling)

### Backend
- Node.js
- Express.js
- Multer (for handling file uploads)
- Sharp.js (for high-performance image compression)
- Archiver (for creating ZIP files)

## 🚀 Getting Started

Follow these steps to run PixPress locally for development and testing.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://your-repo-link.git
   cd pixpress

2. Install frontend dependencies:

   ```bash
    cd client
    npm install

3. Install backend dependencies:

   ```bash
    cd ../server
    npm install
4. Set up the project structure:
From the root directory, create the necessary folders:

   ```bash
    mkdir uploads_temp
    mkdir compressed_images

5. Running the Application
    Start the backend server:

    ```bash
    cd server
    npm run dev

The server will run on http://localhost:3000.

6. Start the frontend development server:

    ```bash
    cd ../client
    npm start

The frontend will run on http://localhost:5173.


🤝 Contributing
We welcome contributions!
If you have suggestions for improvements, bug fixes, or new features, feel free to open an issue or submit a pull request.

📄 License
This project is licensed under the MIT License.