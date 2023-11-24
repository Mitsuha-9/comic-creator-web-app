import React, { useState } from "react";
import "./styles.css";

function App() {
  const [comicText, setComicText] = useState("");
  const [comicImages, setComicImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiKey = "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM"; // Replace with your actual API key
  const apiUrl = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";

  const handleInputChange = (event) => {
    setComicText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const images = await Promise.all(
        Array.from({ length: 10 }, async (_, index) => {
          const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
              headers: { 
                "Accept": "image/png",
                "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                "Content-Type": "application/json" 
              },
              method: "POST",
              body: JSON.stringify({ inputs: comicText }),
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to generate comic for panel ${index + 1}`);
          }

          const blob = await response.blob();
          return { id: index, url: URL.createObjectURL(blob) };
        }),
      );

      setComicImages(images);
    } catch (error) {
      console.error(error);
      alert("Failed to generate comic. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Comic Strip Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter text for all panels"
          value={comicText}
          onChange={handleInputChange}
        />
        <button type="submit">Generate Comic</button>
      </form>

      {loading && <div className="loader">Loading...</div>}

      {comicImages.length > 0 && (
        <div className="ComicDisplay">
          <div className="ComicGrid">
            {comicImages.map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={`Generated Comic Panel ${image.id + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
