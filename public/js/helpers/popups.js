
// =============================== [ Helpers ] ===============================
import { callDurationFormatter } from "./text_formatter.js";

/**
 * Show customer details popup
 * @param {object} _customerData 
 */
export const popup_customerDetails = (_customerData) => {
    const {
        name,
        email,
        mobile,
        address} = _customerData;

    Swal.fire({
        title: 'Customer Details',
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${mobile}</p>
            <p><strong>Address:</strong> ${address}</p>
        `,
        confirmButtonText: 'Close',
    });
}

/**
 * Show call details popup
 * @param {object} _callData 
 */
export const popup_callDetails = (_callData) => {
    const {
        agent_name,
        customer_name,
        duration,
        date,
        title,
        comment} = _callData;

    Swal.fire({
        title: 'Call Details',
        html: `
            <p><strong>Agent:</strong> ${agent_name}</p>
            <p><strong>Customer:</strong> ${customer_name}</p>
            <p><strong>Duration:</strong> ${callDurationFormatter(duration)}</p>
            <p><strong>Date:</strong> ${date}</p>            
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Comment:</strong> ${comment}</p>
        `,
        confirmButtonText: 'Close',
    });
}