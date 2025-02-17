import { useState } from "react";
import "../styles/LandingPage.css";

function LandingPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/waitlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error("Failed to join waitlist");

            const data = await response.json();
            console.log(data);
            setSubmitted(true);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container">
            <section className="hero">
                <h1>Welcome to VetFlowAI</h1>
                <p>AI-powered efficiency for veterinary clinics.</p>

                {submitted ? (
                    <p>✅ Thank you! You’ll hear from us soon.</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Join the Waitlist</button>
                    </form>
                )}
                {error && <p className="error">{error}</p>}
            </section>
        </div>
    );
}

export default LandingPage;
