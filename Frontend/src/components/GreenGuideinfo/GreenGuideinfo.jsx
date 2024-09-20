import React, { useEffect, useState } from "react";
import "./GreenGuideinfo.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { useForm } from "react-hook-form";

const GreenGuideinfo = () => {
  const [conversation, setConversation] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const parseAnswer = (answer) => {
    const lines = answer.split("*");
    return lines.map((line, index) => {
      if (line.trim().startsWith("**") && line.trim().endsWith("**")) {
        const headingText = line.trim().slice(2, -2);
        return (
          <h3 key={index} className="answer-heading">
            {headingText}
          </h3>
        );
      } else {
        return (
          <p key={index} className="answer-text">
            {line.trim()}
          </p>
        );
      }
    });
  };

  const generateAnswer = async ({ question }) => {
    if (!isLoggedIn) {
      toast.error("Please login to ask a question!", {
        className: "toast-error",
        position: "top-right",
      });
      return;
    }

    // Check if the question is empty and show a toast message
    if (!question.trim()) {
      toast.error("Please write something!", {
        className: "toast-error",
        position: "top-right",
      });
      return;
    }

    setConversation((prev) => [...prev, { question, answer: "typing..." }]);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA5JJjL91dFTbFAbuBnnQWwT0Hh0CWJLIs",
        { contents: [{ parts: [{ text: question }] }] }
      );
      const answer = response.data.candidates[0].content.parts[0].text;
      setConversation((prev) =>
        prev.map((conv, index) =>
          index === prev.length - 1 ? { ...conv, answer } : conv
        )
      );
    } catch (error) {
      setConversation((prev) =>
        prev.map((conv, index) =>
          index === prev.length - 1
            ? { ...conv, answer: "Error generating answer" }
            : conv
        )
      );
      toast.error("There was an error generating the answer!", {
        className: "toast-error",
        position: "top-right",
      });
      console.error("There was an error!", error);
    }
    setValue("question", "");
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  const handlePClick = (text) => {
    setValue("question", text);
  };

  return (
    <div className="bigcontainer">
      <div data-aos="fade-right" className="example">
        <h1 className="exhead">AI Chatbot: Ask and Talk to AI about Plants</h1>
        <p>
          The free chatbot by AI Chatting that can answer any question you may
          have. It's user-friendly and easy to interact with, simply type your
          question and get a response. Try it now and see how it can help you!
        </p>
        <div className="exquestion">
          <div
            className="que1"
            onClick={() => handlePClick("Best season for planting mangoes?")}
          >
            <p>Best season for planting mangoes?</p>
          </div>
          <div
            className="que1"
            onClick={() => handlePClick("Which fertilizer suits roses?")}
          >
            <p>Which fertilizer suits roses?</p>
          </div>
          <div
            className="que1"
            onClick={() => handlePClick("Optimal soil type for aloe vera?")}
          >
            <p>Optimal soil type for aloe vera?</p>
          </div>
        </div>
        <div className="exque">
          <div
            className="que1"
            onClick={() => handlePClick("Sunlight needs for basil?")}
          >
            <p>Sunlight needs for basil?</p>
          </div>
          <div
            className="que1"
            onClick={() => handlePClick("Top pest control for cucumbers?")}
          >
            <p>Top pest control for cucumbers?</p>
          </div>
        </div>
      </div>
      <div data-aos="fade-left" className="GreenGuide">
        <div className="conversation">
          {conversation.map((conv, index) => (
            <div key={index} className="message">
              <p className="you">
                <strong className="youhead">You:</strong> {conv.question}
              </p>
              <div className="ai">
                <strong className="aihead">AI:</strong>
                {parseAnswer(conv.answer)}
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(generateAnswer)}
          className="input-container"
        >
          <input
            type="text"
            placeholder="Ask a question..."
            {...register("question", { required: true })}
            onKeyDown={(e) =>
              e.key === "Enter" && handleSubmit(generateAnswer)()
            }
          />
          {errors.question && (
            <span className="error">Question is required!</span>
          )}
          <button type="submit">Send</button>
        </form>
      </div>

      {/* ToastContainer outside the chat box */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default GreenGuideinfo;
