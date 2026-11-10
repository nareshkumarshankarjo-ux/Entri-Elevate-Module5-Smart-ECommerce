import { useState } from "react";
import { FaEnvelope, FaPhone, FaPaperPlane } from "react-icons/fa";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess(false);
  }

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Enter at least 2 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailPattern.test(form.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Enter at least 10 characters.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    // Frontend demonstration only.
    // No email or database request is performed.
    setErrors({});
    setSuccess(true);
    setForm(initialForm);
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">Contact Us</h2>

        <p className="text-muted">
          Have questions about our products?
          Send us a message using the form below.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-7 col-md-9">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="mb-4">
                <FaEnvelope className="me-2 text-primary" />
                Contact Form
              </h4>

              {success && (
                <div
                  className="alert alert-info"
                  role="status"
                >
                  Form validation passed successfully!
                  This is a demonstration form;
                  your message has not been sent.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label
                    htmlFor="contactName"
                    className="form-label"
                  >
                    Full Name
                  </label>

                  <input
                    id="contactName"
                    type="text"
                    name="name"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    maxLength={100}
                  />

                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="contactEmail"
                    className="form-label"
                  >
                    Email Address
                  </label>

                  <input
                    id="contactEmail"
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    maxLength={254}
                  />

                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="contactSubject"
                    className="form-label"
                  >
                    Subject
                  </label>

                  <input
                    id="contactSubject"
                    type="text"
                    name="subject"
                    className={`form-control ${
                      errors.subject ? "is-invalid" : ""
                    }`}
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    maxLength={150}
                  />

                  {errors.subject && (
                    <div className="invalid-feedback">
                      {errors.subject}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contactMessage"
                    className="form-label"
                  >
                    Message
                  </label>

                  <textarea
                    id="contactMessage"
                    name="message"
                    rows={5}
                    className={`form-control ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    maxLength={2000}
                  />

                  {errors.message && (
                    <div className="invalid-feedback">
                      {errors.message}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  <FaPaperPlane className="me-2" />
                  Validate Message
                </button>
              </form>

              <p className="text-muted small mt-3 mb-0">
                Demonstration only — no message is transmitted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}