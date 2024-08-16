document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.querySelector('form[action="/submit_form"]');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

          
            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const phone = contactForm.querySelector('input[name="phone"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }

       
            console.log('Contact Form Data:', {
                name,
                email,
                phone,
                message
            });

            alert('Thank you for contacting us! We will get back to you soon.');

            contactForm.reset();
        });
    }

    const bookingForm = document.querySelector('form[action="/submit-booking"]');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

      
            const name = bookingForm.querySelector('input[name="name"]').value;
            const email = bookingForm.querySelector('input[name="email"]').value;
            const service = bookingForm.querySelector('select[name="service"]').value;
            const date = bookingForm.querySelector('input[name="date"]').value;
            const time = bookingForm.querySelector('input[name="time"]').value;

            if (!name || !email || !service || !date || !time) {
                alert('Please fill out all required fields.');
                return;
            }

            console.log('Booking Form Data:', {
                name,
                email,
                service,
                date,
                time
            });

            alert('Your service booking has been received. We will confirm your appointment soon.');

            bookingForm.reset();
        });
    }
});
