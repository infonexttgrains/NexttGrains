import "./Contact.css";
import { submitContact } from "../../services/contactService";
import { toast } from "react-toastify";
import { useState } from "react";

import {
    Phone,
    Mail,
    MapPin,
    Clock3,
    Send,
    ChevronDown,
} from "lucide-react";

function Contact() {

    /* ==========================================
            CONTACT INFO
    ========================================== */
const[loading,setLoading]=useState(false);
    const contactCards = [

        {
            icon: <Phone size={26} />,
            title: "Call Us",
            value: "+91 98348 31937",
            description: "Mon - Sat | 9:00 AM - 7:00 PM",
        },

        {
            icon: <Mail size={26} />,
            title: "Email Us",
            value: "infonexttgrains@gmail.com",
            description: "We'll respond within 24 hours",
        },

        {
            icon: <MapPin size={26} />,
            title: "Visit Us",
            value: "Wardha, Maharashtra",
            description: "India",
        },

        {
            icon: <Clock3 size={26} />,
            title: "Business Hours",
            value: "Monday - Saturday",
            description: "09:00 AM - 07:00 PM",
        },

    ];

    /* ==========================================
            FAQ
    ========================================== */

    const faqData = [

        {
            question: "How long does delivery take?",
            answer:
                "Most orders are delivered within 24-48 hours depending on your location.",
        },

        {
            question: "Do you offer bulk orders?",
            answer:
                "Yes. We provide wholesale and bulk pricing for businesses, restaurants and retailers.",
        },

        {
            question: "Are all products organic?",
            answer:
                "Our products are carefully sourced from trusted farmers with strict quality standards.",
        },

        {
            question: "Can I become a vendor?",
            answer:
                "Absolutely! Contact our partnership team and we'll get back to you shortly.",
        },

    ];

    /* ==========================================
            STATES
    ========================================== */

    const [activeFaq, setActiveFaq] = useState(null);

    const [formData, setFormData] = useState({

        fullName: "",

        email: "",

        phone: "",

        subject: "",

        category: "",

        message: "",

    });

    /* ==========================================
            HANDLERS
    ========================================== */

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value,

        }));

    };

  const handleSubmit = async (e) => {

e.preventDefault();

try{

setLoading(true);

const response=await submitContact(formData);

toast.success(response.message);

setFormData({

fullName:"",
email:"",
phone:"",
category:"",
subject:"",
message:""

});

}
catch(error){

toast.error(

error.response?.data?.message ||

"Something went wrong"

);

}
finally{

setLoading(false);

}

};

    return (

    <div className="next-contact-page">

        {/* ==========================================
                HERO SECTION
        ========================================== */}

        <section className="next-contact-hero">

            <div className="next-contact-hero-background">

                <span className="next-contact-blob next-contact-blob-one"></span>

                <span className="next-contact-blob next-contact-blob-two"></span>

                <span className="next-contact-blob next-contact-blob-three"></span>

            </div>

            <div className="next-contact-hero-content">

                <p className="next-contact-label">

                    CONTACT US

                </p>

                <h1 className="next-contact-title">

                    Let's Start a
                    <span>

                        Conversation

                    </span>

                </h1>

                <p className="next-contact-subtitle">

                    Whether you're looking for premium organic products,

                    wholesale partnerships, delivery assistance, or simply

                    want to learn more about NexttGrains, our team is here

                    to help you every step of the way.

                </p>

            </div>

        </section>

        {/* ==========================================
                CONTACT INFO
        ========================================== */}

        <section className="next-contact-info-section">

            <div className="next-contact-info-grid">

                {

                    contactCards.map((item, index) => (

                        <div
                            key={index}
                            className="next-contact-card"
                        >

                            <div className="next-contact-card-icon">

                                {item.icon}

                            </div>

                            <h3 className="next-contact-card-title">

                                {item.title}

                            </h3>

                            <p className="next-contact-card-value">

                                {item.value}

                            </p>

                            <p className="next-contact-card-description">

                                {item.description}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>
                {/* ==========================================
                CONTACT SECTION
        ========================================== */}

        <section className="next-contact-main-section">

            <div className="next-contact-wrapper">

                {/* ==========================
                        CONTACT FORM
                ========================== */}

                <div className="next-contact-left">

                    <div className="next-contact-form-header">

                        <p className="next-contact-small-label">

                            SEND A MESSAGE

                        </p>

                        <h2 className="next-contact-section-title">

                            We'd Love To Hear From You

                        </h2>

                        <p className="next-contact-section-description">

                            Fill out the form below and our team will get back
                            to you as soon as possible.

                        </p>

                    </div>

                    <form
                        className="next-contact-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="next-contact-form-row">

                            <div className="next-contact-form-group">

                                <label>

                                    Full Name

                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="next-contact-input"
                                />

                            </div>

                            <div className="next-contact-form-group">

                                <label>

                                    Email Address

                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="next-contact-input"
                                />

                            </div>

                        </div>

                        <div className="next-contact-form-row">

                            <div className="next-contact-form-group">

                                <label>

                                    Phone Number

                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="next-contact-input"
                                />

                            </div>

                            <div className="next-contact-form-group">

                                <label>

                                    Category

                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="next-contact-input"
                                >

                                    <option value="">

                                        Select Category

                                    </option>

                                    <option>

                                        General Inquiry

                                    </option>

                                    <option>

                                        Order Support

                                    </option>

                                    <option>

                                        Bulk Orders

                                    </option>

                                    <option>

                                        Vendor Partnership

                                    </option>

                                    <option>

                                        Franchise

                                    </option>

                                    <option>

                                        Feedback

                                    </option>

                                </select>

                            </div>

                        </div>

                        <div className="next-contact-form-group">

                            <label>

                                Subject

                            </label>

                            <input
                                type="text"
                                name="subject"
                                placeholder="Write subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="next-contact-input"
                            />

                        </div>

                        <div className="next-contact-form-group">

                            <label>

                                Message

                            </label>

                            <textarea
                                rows="7"
                                name="message"
                                placeholder="Write your message..."
                                value={formData.message}
                                onChange={handleChange}
                                className="next-contact-textarea"
                            />

                        </div>

                        <button 
                            type="submit"
                            className="next-contact-submit-button"
                            disabled={loading}
                        >

                            {

loading

?

"Sending..."

:

"Send Message"

}

                            <Send size={18} />

                        </button>

                    </form>

                </div>

                {/* ==========================
                        RIGHT PANEL
                ========================== */}

                <div className="next-contact-right">

                    <div className="next-contact-business-card">

                        <p className="next-contact-small-label">

                            BUSINESS DETAILS

                        </p>

                        <h3 className="next-contact-business-title">

                            NexttGrains Headquarters

                        </h3>

                        <p className="next-contact-business-text">

                            We believe in building meaningful relationships
                            with our customers through transparency,
                            sustainability and premium-quality products.

                        </p>

                    </div>

                    <div className="next-contact-business-card">

                        <h4 className="next-contact-business-subtitle">

                            Business Hours

                        </h4>

                        <div className="next-contact-hours-list">

                            <div className="next-contact-hours-item">

                                <span>

                                    Monday - Friday

                                </span>

                                <strong>

                                    09:00 AM - 07:00 PM

                                </strong>

                            </div>

                            <div className="next-contact-hours-item">

                                <span>

                                    Saturday

                                </span>

                                <strong>

                                    10:00 AM - 05:00 PM

                                </strong>

                            </div>

                            <div className="next-contact-hours-item">

                                <span>

                                    Sunday

                                </span>

                                <strong>

                                    Closed

                                </strong>

                            </div>

                        </div>

                    </div>

                    <div className="next-contact-business-card">

                        <h4 className="next-contact-business-subtitle">

                            Office Address

                        </h4>

                        <p className="next-contact-business-text">

                            Near Gramin Sarvjanik Vachanalay, Sai nagar, Wardha, Maharashtra - 442001

                        </p>

                    </div>

                </div>

            </div>

        </section>
                {/* ==========================================
                MAP SECTION
        ========================================== */}

        <section className="next-contact-map-section">

            <div className="next-contact-map-header">

                <p className="next-contact-small-label">

                    FIND US

                </p>

                <h2 className="next-contact-section-title">

                    Visit Our Office

                </h2>

            </div>

            <div className="next-contact-map-wrapper">

                <iframe
                    title="NexttGrains Location"
                    src="https://www.google.com/maps?q=Near Gramin Sarvjanik Vachanalay, Sai nagar, Wardha, Maharashtra - 442001&output=embed"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="next-contact-map"
                />

            </div>

        </section>

        {/* ==========================================
                FAQ SECTION
        ========================================== */}

        <section className="next-contact-faq-section">

            <div className="next-contact-faq-header">

                <p className="next-contact-small-label">

                    FAQ

                </p>

                <h2 className="next-contact-section-title">

                    Frequently Asked Questions

                </h2>

            </div>

            <div className="next-contact-faq-list">

                {

                    faqData.map((item, index) => (

                        <div
                            key={index}
                            className={`next-contact-faq-item ${
                                activeFaq === index
                                    ? "next-contact-faq-active"
                                    : ""
                            }`}
                        >

                            <button
                                className="next-contact-faq-question"
                                onClick={() =>
                                    setActiveFaq(
                                        activeFaq === index
                                            ? null
                                            : index
                                    )
                                }
                            >

                                <span>

                                    {item.question}

                                </span>

                                <ChevronDown size={20} />

                            </button>

                            {

                                activeFaq === index && (

                                    <div className="next-contact-faq-answer">

                                        <p>

                                            {item.answer}

                                        </p>

                                    </div>

                                )

                            }

                        </div>

                    ))

                }

            </div>

        </section>

        {/* ==========================================
                CTA SECTION
        ========================================== */}

        <section className="next-contact-cta-section">

            <div className="next-contact-cta-card">

                <p className="next-contact-small-label">

                    NEED QUICK HELP?

                </p>

                <h2 className="next-contact-cta-title">

                    Our Team Is Always Ready To Assist You

                </h2>

                <p className="next-contact-cta-description">

                    Whether it's an order inquiry, partnership opportunity,
                    product question or technical support, we're just one
                    message away.

                </p>

                <button
                    className="next-contact-cta-button"
                >

                    Contact Support

                    <Send size={18} />

                </button>

            </div>

        </section>

    </div>

);

}

export default Contact;