import { useState } from "react";
import "./App.css";
import mindful from "./assets/mindful.jpg";

const voiceId = "21m00Tcm4TlvDq8ikWAM";
const sampleText = `Remember that this moment does not define you. Like waves on the shore, challenges come and go, but your inner strength remains constant. You've overcome difficult times before, and while this path may feel heavy now, each step forward, no matter how small, is a victory worth celebrating. Take time to breathe, to rest, and to be gentle with yourself. Let's take a 5 second break <break time="5.0s" /> Now we're back. The dawn always comes, even after the longest night, and you are never as alone as you might feel. Your resilience is remarkable, even when you don't feel strong. Trust in your journey, in your ability to heal, and in the better days ahead.`;

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playAudio = async () => {
    try {
      setIsPlaying(true);
      setError(null);

      console.log("Starting TTS request...");
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
        {
          method: "POST",
          headers: {
            Accept: "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": import.meta.env.VITE_PUBLIC_ELEVENLABS_APIKEY,
          },
          body: JSON.stringify({
            text: sampleText,
            model_id: "eleven_monolingual_v1",
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Response received:", response.status);
      const audioBlob = await response.blob();
      console.log("Audio blob size:", audioBlob.size);

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        console.log("Audio playback completed");
      };

      audio.onerror = (e) => {
        setIsPlaying(false);
        setError(`Audio error: ${e}`);
        console.error("Audio playback error:", e);
      };

      console.log("Starting audio playback...");
      await audio.play();
    } catch (error) {
      console.error("Full error:", error);
      setError(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
      setIsPlaying(false);
    }
  };

  return (
    <>
      <div>
        <img
          width={400}
          src={mindful}
          alt="Person sitting on beach in meditation pose"
        />
      </div>
      <h1>Mindful</h1>
      <button onClick={playAudio} disabled={isPlaying}>
        {isPlaying ? "Playing..." : "Encourage Me!"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </>
  );
}

export default App;
