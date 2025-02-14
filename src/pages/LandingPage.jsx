import { useState } from "react";
import "../styles/LandingPage.css";

function LandingPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email submitted:", email);
        setSubmitted(true);
    };

    return (
        <div className="container">
            <section className="hero">
                <h1>Welcome to VetFlowAI</h1>
                <h1>🚀 VetFlowAI: Future of Vet Clinics</h1>

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
            </section>
        </div>
    );
}

export default LandingPage;
