import React from 'react';
import './FAQ.css'; // Add your CSS styles here

const FAQ = () => {
  return (
    <div className="faq-container">
      <h1 className="faq-heading">Frequently Asked Questions</h1>
      <div className="faq-content">
        <div className="faq-item">
          <h2 className="faq-question">1. How can I place an order?</h2>
          <p className="faq-answer">
            Placing an order is easy! Simply browse through our product catalog, add the items you want to your cart, and proceed to checkout. Follow the prompts to enter your shipping details and payment information, and your order will be processed.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="faq-question">2. What payment methods do you accept?</h2>
          <p className="faq-answer">
            We accept a wide range of payment methods, including Credit/Debit Cards, PayPal, and UPI (for Indian customers). You can choose your preferred payment option during checkout.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="faq-question">3. Can I modify or cancel my order?</h2>
          <p className="faq-answer">
            Once an order has been placed, it is processed immediately to ensure quick shipping. If you need to modify or cancel an order, please contact our customer service team as soon as possible. We will try to accommodate your request if the order hasn't been shipped.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="faq-question">4. How do I track my order?</h2>
          <p className="faq-answer">
            After your order is shipped, we will send you an email with tracking details. You can track your order directly through the shipping provider's website using the tracking number provided.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="faq-question">5. What should I do if I receive a damaged or incorrect item?</h2>
          <p className="faq-answer">
            If you receive a damaged or incorrect item, please contact our customer service team immediately with your order number and pictures of the item. We will assist you in resolving the issue by either sending a replacement or processing a return.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="faq-question">6. Do you offer gift cards?</h2>
          <p className="faq-answer">
            Yes, we offer digital gift cards that can be purchased directly from our website. These gift cards can be used to purchase any item available on our platform.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="faq-question">7. Can I return or exchange an item?</h2>
          <p className="faq-answer">
            Yes, we offer a 30-day return policy on most items. To initiate a return, please visit our returns page and follow the instructions. Items must be returned in their original condition and packaging.
          </p>
        </div>

        <div className="faq-item">
          <h2 className="faq-question">8. How can I contact customer support?</h2>
          <p className="faq-answer">
            You can contact our customer support team through email at <strong>support@jaswanth.com</strong> or by calling our customer service hotline at <strong>1-800-123-4567</strong>. Our team is available 24/7 to assist you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
