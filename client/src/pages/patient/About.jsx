import React from "react";
import "./About.css";

const highlights = [
    {
        title: "Trusted Specialists",
        value: "200+",
        detail: "Verified doctors across major specialties.",
    },
    {
        title: "Appointments Booked",
        value: "15K+",
        detail: "Consultations scheduled through our platform.",
    },
    {
        title: "Average Response",
        value: "< 5 min",
        detail: "Fast confirmations for urgent care needs.",
    },
];

const About = () => {
    return (
        <main className="about-page">
            <section className="about-hero">
                <p className="about-kicker">About MediConnect</p>
                <h1>Connecting Patients and Doctors with Confidence</h1>
                <p>
                    MediConnect is built to simplify healthcare access. We make it easy to
                    find the right doctor, schedule appointments, and manage care from one
                    clean dashboard.
                </p>
            </section>

            <section className="about-grid">
                <article className="about-card">
                    <h2>Our Mission</h2>
                    <p>
                        We believe quality healthcare should be easier to reach. Our mission
                        is to reduce delays and improve patient outcomes by creating a smooth
                        digital experience for both patients and providers.
                    </p>
                </article>

                <article className="about-card">
                    <h2>What We Offer</h2>
                    <ul>
                        <li>Quick doctor discovery by specialty and location.</li>
                        <li>Simple appointment booking and tracking.</li>
                        <li>Role-based dashboards for patients, doctors, and admins.</li>
                    </ul>
                </article>
            </section>

            <section className="about-highlights">
                {highlights.map((item) => (
                    <article key={item.title} className="highlight-card">
                        <p className="highlight-value">{item.value}</p>
                        <h3>{item.title}</h3>
                        <p>{item.detail}</p>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default About;
