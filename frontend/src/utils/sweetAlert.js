import Swal from "sweetalert2";

// Common Custom Styling for Medical Teal Theme
const customSwalClass = {
    popup: "rounded-2xl border border-slate-100 shadow-2xl font-sans",
    confirmButton: "rounded-xl px-5 py-2.5 font-semibold text-sm shadow-sm",
    cancelButton: "rounded-xl px-5 py-2.5 font-semibold text-sm",
};

// Success Alert
export const showSuccess = (title, text) => {
    return Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonColor: "#0d9488", // Teal 600
        customClass: customSwalClass,
    });
};

// Error Alert
export const showError = (title, text) => {
    return Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonColor: "#e11d48", // Rose 600
        customClass: customSwalClass,
    });
};

// Warning Alert
export const showWarning = (title, text) => {
    return Swal.fire({
        icon: "warning",
        title,
        text,
        confirmButtonColor: "#f59e0b", // Amber 500
        customClass: customSwalClass,
    });
};

// Toast Notification (Quick feedback)
export const showToast = (icon, title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    return Toast.fire({
        icon,
        title,
    });
};

// Delete Confirmation
export const confirmDelete = (text = "This action cannot be undone.") => {
    return Swal.fire({
        title: "Delete Medical Report?",
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#e11d48",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
        customClass: customSwalClass,
    });
};